import { apiRequest } from './api'

export async function getCustomers() {
  return apiRequest('/api/customers/')
}

export async function getCustomerById(customerId) {
  return apiRequest(`/api/customers/${customerId}/`)
}