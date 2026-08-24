import { apiRequest } from './api'

export async function getVehicles() {
  return apiRequest('/api/vehicles/')
}

export async function getVehicleById(vehicleId) {
  return apiRequest(`/api/vehicles/${vehicleId}/`)
}