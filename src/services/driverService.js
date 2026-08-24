import { apiRequest } from './api'

export async function getDrivers() {
  return apiRequest('/api/drivers/')
}

export async function getDriverById(driverId) {
  return apiRequest(`/api/drivers/${driverId}/`)
}