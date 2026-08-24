import { apiRequest } from './api'

export async function getCourses() {
  return apiRequest('/api/courses/')
}

export async function getCourseById(courseId) {
  return apiRequest(`/api/courses/${courseId}/`)
}

export async function cancelCourse(courseId, reason = '') {
  return apiRequest(`/api/courses/${courseId}/cancel/`, {
    method: 'POST',
    body: JSON.stringify({ reason }),
  })
}
