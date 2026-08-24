import { clearTokens, getAccessToken, getRefreshToken, setTokens } from './tokenStorage'

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '')

export class ApiError extends Error {
  constructor(message, { status = 0, code = 'API_ERROR', data = null } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.data = data
  }
}

async function parseResponse(response) {
  if (response.status === 204) return null
  return response.json().catch(() => null)
}

async function refreshAccessToken() {
  const refresh = getRefreshToken()
  if (!refresh) return false

  let response
  try {
    response = await fetch(`${API_BASE_URL}/api/auth/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    })
  } catch {
    return false
  }

  const data = await parseResponse(response)
  if (!response.ok || !data?.access) {
    clearTokens()
    return false
  }

  setTokens({ access: data.access, refresh: data.refresh || refresh })
  return true
}

export async function apiRequest(path, options = {}) {
  const { auth = true, retryOnUnauthorized = true, headers, ...fetchOptions } = options
  const requestHeaders = new Headers(headers)
  const access = getAccessToken()

  if (fetchOptions.body && !requestHeaders.has('Content-Type')) {
    requestHeaders.set('Content-Type', 'application/json')
  }
  if (auth && access) requestHeaders.set('Authorization', `Bearer ${access}`)

  let response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, { ...fetchOptions, headers: requestHeaders })
  } catch {
    throw new ApiError('Impossible de joindre le serveur. Réessayez dans quelques instants.', { code: 'NETWORK_ERROR' })
  }

  if (response.status === 401 && auth && retryOnUnauthorized && await refreshAccessToken()) {
    return apiRequest(path, { ...options, retryOnUnauthorized: false })
  }

  const data = await parseResponse(response)
  if (!response.ok) {
    const code = response.status === 401 ? 'UNAUTHORIZED' : response.status === 403 ? 'FORBIDDEN' : 'API_ERROR'
    throw new ApiError(data?.detail || 'Une erreur est survenue.', { status: response.status, code, data })
  }

  return data
}
