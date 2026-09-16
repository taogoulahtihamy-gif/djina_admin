import { apiRequest } from './api'

export async function getProviderEvents(params = {}) {
  const query = new URLSearchParams()

  Object.entries(params).forEach(
    ([key, value]) => {
      if (
        value !== undefined &&
        value !== null &&
        value !== ''
      ) {
        query.set(key, String(value))
      }
    },
  )

  const suffix = query.toString()

  return apiRequest(
    `/api/admin/wallet-provider-events/${
      suffix ? `?${suffix}` : ''
    }`,
  )
}

export async function getProviderEvent(eventId) {
  return apiRequest(
    `/api/admin/wallet-provider-events/${eventId}/`,
  )
}
