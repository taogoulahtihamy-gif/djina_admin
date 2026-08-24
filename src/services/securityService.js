import { apiRequest } from './api'
import { getRefreshToken } from './tokenStorage'

export function changePassword(
  currentPassword,
  newPassword,
) {
  return apiRequest(
    '/api/auth/change-password/',
    {
      method: 'POST',
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
      }),
    },
  )
}

export function logoutServer() {
  return apiRequest(
    '/api/auth/logout/',
    {
      method: 'POST',
      body: JSON.stringify({
        refresh: getRefreshToken(),
      }),
    },
  )
}

export function getActiveSessions() {
  return apiRequest(
    '/api/auth/sessions/',
  )
}

export function closeSession(
  sessionId,
) {
  return apiRequest(
    `/api/auth/sessions/${encodeURIComponent(
      sessionId,
    )}/`,
    {
      method: 'DELETE',
    },
  )
}

export function closeOtherSessions() {
  return apiRequest(
    '/api/auth/sessions/close-others/',
    {
      method: 'POST',
    },
  )
}