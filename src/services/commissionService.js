import { apiRequest } from './api'

export const DEFAULT_COMMISSION_RATE = 15

const numberOrZero = (value) => {
  const number = Number(value)
  return Number.isFinite(number) ? number : 0
}

export const getGrossAmount = (record = {}) => {
  const amount = numberOrZero(record.final_price ?? record.final_amount ?? record.amount)
  return amount > 0 ? amount : 0
}

export const calculateCommission = (record, rate = DEFAULT_COMMISSION_RATE, eligible = true) => {
  const gross = getGrossAmount(record)
  const normalizedRate = Math.min(100, Math.max(0, numberOrZero(rate)))
  const appliedRate = eligible ? normalizedRate : 0
  const commission = gross * appliedRate / 100
  return { gross, rate: appliedRate, commission, net: gross - commission }
}

export const calculatePaymentCommission = (payment, rate = DEFAULT_COMMISSION_RATE) =>
  calculateCommission(payment, rate, payment?.status === 'paid')

const normalizeCommission = (item = {}) => ({
  id: item.id,
  courseId: item.course,
  driverId: item.driver,
  grossAmount: numberOrZero(item.gross_amount),
  commissionRate: numberOrZero(item.commission_rate),
  commissionAmount: numberOrZero(item.commission_amount),
  driverNetAmount: numberOrZero(item.driver_net_amount),
  status: item.status,
  settlementId: item.settlement,
  paidAt: item.paid_at,
  settlementReference: item.settlement_reference || '',
  settlementMode: item.settlement_mode || '',
  startingLandmark: item.starting_landmark || '',
  arrivalLandmark: item.arrival_landmark || '',
  completedAt: item.completed_at,
  createdAt: item.created_at,
})

const normalizeList = (data) => (Array.isArray(data) ? data : data?.results ?? [])

export async function getCurrentCommissionSetting() {
  const data = await apiRequest('/api/commission-settings/current/')
  return { ...data, rate: numberOrZero(data?.rate ?? DEFAULT_COMMISSION_RATE) }
}

export async function updateCommissionRate(rate) {
  const data = await apiRequest('/api/commission-settings/current/', {
    method: 'PATCH',
    body: JSON.stringify({ rate }),
  })
  return { ...data, rate: numberOrZero(data?.rate) }
}

export async function getCommissions(filters = {}) {
  const query = new URLSearchParams()
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') query.set(key, value)
  })
  const suffix = query.size ? `?${query.toString()}` : ''
  const data = await apiRequest(`/api/commissions/${suffix}`)
  return normalizeList(data).map(normalizeCommission)
}

export async function getCommissionByCourseId(courseId) {
  const commissions = await getCommissions({ course: courseId })
  return commissions[0] || null
}

export async function getCommissionSummary(driverId) {
  const suffix = driverId ? `?driver_id=${encodeURIComponent(driverId)}` : ''
  const data = await apiRequest(`/api/commissions/summary/${suffix}`)
  return {
    gross: numberOrZero(data?.gross_course_volume),
    generated: numberOrZero(data?.commissions_generated),
    pending: numberOrZero(data?.commissions_pending),
    paid: numberOrZero(data?.commissions_paid),
    net: numberOrZero(data?.driver_net_revenue),
  }
}

export async function confirmCommissionSettlement(driverId, commissionIds, details = {}) {
  return apiRequest('/api/commission-settlements/confirm/', {
    method: 'POST',
    body: JSON.stringify({
      driver_id: driverId,
      commission_ids: commissionIds,
      payment_mode: details.settlementMode,
      reference: details.settlementReference || '',
      paid_at: details.paidAt,
    }),
  })
}

export async function getCommissionDashboardStats() {
  const data = await apiRequest('/api/admin/dashboard/stats/')
  return {
    gross: numberOrZero(data?.gross_course_volume),
    generated: numberOrZero(data?.commissions_generated),
    paid: numberOrZero(data?.djina_revenue_collected),
    pending: numberOrZero(data?.commissions_pending),
    net: numberOrZero(data?.drivers_net_revenue),
  }
}
