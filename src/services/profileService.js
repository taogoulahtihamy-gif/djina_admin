import { apiRequest } from './api'

export function updateMyProfile({
  firstName,
  lastName,
  phone,
}) {
  return apiRequest(
    '/api/auth/me/',
    {
      method: 'PATCH',

      body: JSON.stringify({
        first_name:
          firstName.trim(),

        last_name:
          lastName.trim(),

        phone:
          phone.trim(),
      }),
    },
  )
}