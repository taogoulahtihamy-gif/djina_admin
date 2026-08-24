import { apiRequest } from './api'

export async function getPayments() {
  return apiRequest('/api/payments/')
}

export async function getPaymentById(paymentId) {
  return apiRequest(
    `/api/payments/${paymentId}/`,
  )
}

export async function markPaymentPaid(paymentId) {
  return apiRequest(
    `/api/payments/${paymentId}/mark-paid/`,
    {
      method: 'POST',
      body: JSON.stringify({}),
    },
  )
}