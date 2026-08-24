import { apiRequest } from './api'

export async function getComplaints() {
  return apiRequest('/api/complaints/')
}

export async function getComplaintById(complaintId) {
  return apiRequest(
    `/api/complaints/${complaintId}/`,
  )
}

export async function resolveComplaint(
  complaintId,
  resolutionNote = '',
) {
  return apiRequest(
    `/api/complaints/${complaintId}/resolve/`,
    {
      method: 'POST',
      body: JSON.stringify({
        resolution_note: resolutionNote,
      }),
    },
  )
}