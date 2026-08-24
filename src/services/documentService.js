import { apiRequest } from './api'

export async function getDriverDocuments() {
  return apiRequest('/api/driver-documents/')
}

export async function getDriverDocumentById(documentId) {
  return apiRequest(`/api/driver-documents/${documentId}/`)
}

export async function approveDriverDocument(documentId) {
  return apiRequest(
    `/api/driver-documents/${documentId}/approve/`,
    {
      method: 'POST',
    },
  )
}

export async function rejectDriverDocument(documentId, reason) {
  return apiRequest(
    `/api/driver-documents/${documentId}/reject/`,
    {
      method: 'POST',
      body: JSON.stringify({
        rejection_reason: reason,
      }),
    },
  )
}