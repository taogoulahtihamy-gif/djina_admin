import { apiRequest } from './api'

export async function getSettings() {
  return apiRequest('/api/settings/')
}

export async function createSetting({
  setting_name,
  value,
}) {
  return apiRequest('/api/settings/', {
    method: 'POST',
    body: JSON.stringify({
      setting_name,
      value,
    }),
  })
}

export async function updateSetting(
  settingId,
  value,
) {
  return apiRequest(
    `/api/settings/${settingId}/`,
    {
      method: 'PATCH',
      body: JSON.stringify({
        value,
      }),
    },
  )
}