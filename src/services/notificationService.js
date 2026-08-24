import { getSettings } from './settingService'
import { getComplaints } from './complaintService'
import { getPayments } from './paymentService'
import { getDriverDocuments } from './documentService'
import { getCourses } from './courseService'

function normalizeList(data) {
  if (Array.isArray(data)) {
    return data
  }

  return data?.results ?? []
}

function parseBoolean(value, fallback = true) {
  if (value === undefined || value === null) {
    return fallback
  }

  if (typeof value === 'boolean') {
    return value
  }

  return String(value).toLowerCase() === 'true'
}

function getPreferences(settings, userId) {
  const prefix =
    `admin.${userId}.notifications`

  const findValue = (category) => {
    const settingName =
      `${prefix}.${category}`

    const record = settings.find(
      (item) =>
        item.setting_name ===
        settingName,
    )

    return parseBoolean(
      record?.value,
      true,
    )
  }

  return {
    complaints:
      findValue('complaints'),

    payments:
      findValue('payments'),

    documents:
      findValue('documents'),

    courses:
      findValue('courses'),
  }
}

export async function getAdminNotifications(
  userId,
) {
  if (!userId) {
    return {
      total: 0,
      items: [],
      preferences: {
        complaints: true,
        payments: true,
        documents: true,
        courses: true,
      },
    }
  }

  const [
    settingsResult,
    complaintsResult,
    paymentsResult,
    documentsResult,
    coursesResult,
  ] = await Promise.allSettled([
    getSettings(),
    getComplaints(),
    getPayments(),
    getDriverDocuments(),
    getCourses(),
  ])

  const settings =
    settingsResult.status === 'fulfilled'
      ? normalizeList(
          settingsResult.value,
        )
      : []

  const preferences =
    getPreferences(
      settings,
      userId,
    )

  const complaints =
    complaintsResult.status === 'fulfilled'
      ? normalizeList(
          complaintsResult.value,
        )
      : []

  const payments =
    paymentsResult.status === 'fulfilled'
      ? normalizeList(
          paymentsResult.value,
        )
      : []

  const documents =
    documentsResult.status === 'fulfilled'
      ? normalizeList(
          documentsResult.value,
        )
      : []

  const courses =
    coursesResult.status === 'fulfilled'
      ? normalizeList(
          coursesResult.value,
        )
      : []

  const pendingComplaints =
    preferences.complaints
      ? complaints.filter(
          (item) =>
            item.status === 'pending',
        ).length
      : 0

  const pendingPayments =
    preferences.payments
      ? payments.filter(
          (item) =>
            item.status === 'pending',
        ).length
      : 0

  const pendingDocuments =
    preferences.documents
      ? documents.filter(
          (item) =>
            item.status === 'pending',
        ).length
      : 0

  const pendingCourses =
    preferences.courses
      ? courses.filter(
          (item) =>
            item.status === 'requested',
        ).length
      : 0

  const items = []

  if (
    preferences.complaints &&
    pendingComplaints > 0
  ) {
    items.push({
      id: 'complaints',
      type: 'complaints',
      count: pendingComplaints,
      path: '/admin/complaints',
    })
  }

  if (
    preferences.payments &&
    pendingPayments > 0
  ) {
    items.push({
      id: 'payments',
      type: 'payments',
      count: pendingPayments,
      path: '/admin/payments',
    })
  }

  if (
    preferences.documents &&
    pendingDocuments > 0
  ) {
    items.push({
      id: 'documents',
      type: 'documents',
      count: pendingDocuments,
      path: '/admin/documents',
    })
  }

  if (
    preferences.courses &&
    pendingCourses > 0
  ) {
    items.push({
      id: 'courses',
      type: 'courses',
      count: pendingCourses,
      path: '/admin/courses',
    })
  }

  const total = items.reduce(
    (sum, item) =>
      sum + item.count,
    0,
  )

  return {
    total,
    items,
    preferences,
  }
}