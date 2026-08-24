import {
  apiRequest,
  ApiError,
} from './api'

import {
  getAccessToken,
} from './tokenStorage'


export async function createAdministrator(
  payload,
) {
  const accessToken =
    getAccessToken()

  if (!accessToken) {
    throw new ApiError(
      'Session administrateur introuvable. Veuillez vous reconnecter.',
      401,
      {
        detail:
          'Authentication credentials were not provided.',
      },
    )
  }

  return apiRequest(
    '/api/admin/users/create-admin/',
    {
      method: 'POST',

      headers: {
        Authorization:
          `Bearer ${accessToken}`,

        'Content-Type':
          'application/json',
      },

      body:
        JSON.stringify(
          payload,
        ),
    },
  )
}