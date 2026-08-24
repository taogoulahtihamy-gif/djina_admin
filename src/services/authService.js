import { ApiError, apiRequest } from './api'
import { clearTokens, getAccessToken, getRefreshToken, setTokens } from './tokenStorage'

export class AuthError extends Error {
  constructor(message, code) {
    super(message)
    this.name = 'AuthError'
    this.code = code
  }
}

export function isAdminUser(user) {
  return Boolean(user && (user.user_type === 'admin' || user.is_staff === true))
}

export async function getCurrentUser() {
  return apiRequest('/api/auth/me/')
}

export async function loginAdministrator({ email, password }) {
  let tokens
  try {
    tokens = await apiRequest('/api/auth/token/', {
      method: 'POST',
      auth: false,
      retryOnUnauthorized: false,
      body: JSON.stringify({ email, password }),
    })
  } catch (error) {
    if (error instanceof ApiError && error.code === 'NETWORK_ERROR') {
      throw new AuthError('Impossible de joindre le serveur. Réessayez dans quelques instants.', 'NETWORK_ERROR')
    }
    if (error instanceof ApiError && error.status === 401) {
      throw new AuthError('Adresse e-mail ou mot de passe incorrect.', 'INVALID_CREDENTIALS')
    }
    throw new AuthError('Adresse e-mail ou mot de passe incorrect.', 'INVALID_CREDENTIALS')
  }

  setTokens(tokens)

  try {
    const user = await getCurrentUser()
    if (!isAdminUser(user)) {
      clearTokens()
      throw new AuthError("Ce compte n'est pas autorisé à accéder à l'administration.", 'NON_ADMIN')
    }
    return user
  } catch (error) {
    if (error instanceof AuthError) throw error
    clearTokens()
    if (error instanceof ApiError && error.code === 'NETWORK_ERROR') {
      throw new AuthError('Impossible de joindre le serveur. Réessayez dans quelques instants.', 'NETWORK_ERROR')
    }
    throw new AuthError('Impossible de vérifier ce compte administrateur.', 'PROFILE_ERROR')
  }
}

export function hasStoredSession() {
  return Boolean(getAccessToken() || getRefreshToken())
}

export function logoutAdministrator() {
  clearTokens()
}
