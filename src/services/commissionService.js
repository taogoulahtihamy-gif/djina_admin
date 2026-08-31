import { useSyncExternalStore } from 'react'

export const DEFAULT_COMMISSION_RATE = 15
const RATE_STORAGE_KEY = 'djina-commission-rate'
const COMMISSIONS_STORAGE_KEY = 'djina-commissions'
const CHANGE_EVENT = 'djina:commissions-change'
let revision = 0

const normalizeRate = (value) => {
  const rate = Number(value)
  return Number.isFinite(rate) ? Math.min(100, Math.max(0, rate)) : DEFAULT_COMMISSION_RATE
}

const emitChange = () => {
  revision += 1
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: revision }))
}

export const getCommissionRate = () => {
  if (typeof window === 'undefined') return DEFAULT_COMMISSION_RATE
  return normalizeRate(window.localStorage.getItem(RATE_STORAGE_KEY) ?? DEFAULT_COMMISSION_RATE)
}

export const saveCommissionRate = (value) => {
  const rate = normalizeRate(value)
  window.localStorage.setItem(RATE_STORAGE_KEY, String(rate))
  emitChange()
  return rate
}

export const getGrossAmount = (record = {}) => {
  const amount = Number(record.final_price ?? record.final_amount ?? record.amount ?? 0)
  return Number.isFinite(amount) && amount > 0 ? amount : 0
}

export const calculateCommission = (record, rate = getCommissionRate(), eligible = true) => {
  const gross = getGrossAmount(record)
  const appliedRate = eligible ? normalizeRate(rate) : 0
  const commission = gross * appliedRate / 100
  return { gross, rate: appliedRate, commission, net: gross - commission }
}

export const calculateCourseCommission = (course, rate = getCommissionRate()) =>
  calculateCommission(course, rate, course?.status === 'completed')

export const calculatePaymentCommission = (payment, rate = getCommissionRate()) =>
  calculateCommission(payment, rate, payment?.status === 'paid')

export const getCommissions = () => {
  if (typeof window === 'undefined') return []
  try {
    const parsed = JSON.parse(window.localStorage.getItem(COMMISSIONS_STORAGE_KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const saveCommissions = (commissions) => {
  window.localStorage.setItem(COMMISSIONS_STORAGE_KEY, JSON.stringify(commissions))
  emitChange()
  return commissions
}

const getDriverId = (course) => course?.driver?.id ?? course?.driver ?? null

const buildCommission = (course) => {
  const values = calculateCourseCommission(course, getCommissionRate())
  return {
    id: `commission-${course.id}`,
    courseId: course.id,
    driverId: getDriverId(course),
    grossAmount: values.gross,
    commissionRate: values.rate,
    commissionAmount: values.commission,
    driverNetAmount: values.net,
    status: 'pending',
    createdAt: course.completed_at || course.updated_at || new Date().toISOString(),
    paidAt: null,
    settlementReference: '',
    settlementMode: '',
  }
}

export const createCommission = (course) => {
  if (!course?.id || course.status !== 'completed' || getDriverId(course) == null) return null
  const commissions = getCommissions()
  const existing = commissions.find((item) => String(item.courseId) === String(course.id))
  if (existing) return existing
  const commission = buildCommission(course)
  saveCommissions([...commissions, commission])
  return commission
}

export const syncCourseCommissions = (courses = []) => {
  const commissions = getCommissions()
  const knownCourseIds = new Set(commissions.map((item) => String(item.courseId)))
  const additions = []
  courses.forEach((course) => {
    if (!course?.id || course.status !== 'completed' || getDriverId(course) == null || knownCourseIds.has(String(course.id))) return
    additions.push(buildCommission(course))
    knownCourseIds.add(String(course.id))
  })
  return additions.length ? saveCommissions([...commissions, ...additions]) : commissions
}

export const getCommissionByCourseId = (courseId) =>
  getCommissions().find((item) => String(item.courseId) === String(courseId)) || null

export const confirmCommissionSettlement = (commissionIds, details = {}) => {
  const selected = new Set((commissionIds || []).map(String))
  if (!selected.size) return getCommissions()
  const paidAt = details.paidAt || new Date().toISOString()
  return saveCommissions(getCommissions().map((commission) =>
    selected.has(String(commission.id)) && commission.status === 'pending'
      ? { ...commission, status: 'paid', paidAt, settlementReference: details.settlementReference || '', settlementMode: details.settlementMode || '' }
      : commission,
  ))
}

const total = (items, key) => items.reduce((sum, item) => sum + (Number(item[key]) || 0), 0)

export const getCommissionStats = (commissions = getCommissions()) => {
  const pending = commissions.filter((item) => item.status === 'pending')
  const paid = commissions.filter((item) => item.status === 'paid')
  return {
    count: commissions.length,
    gross: total(commissions, 'grossAmount'),
    generated: total(commissions, 'commissionAmount'),
    pending: total(pending, 'commissionAmount'),
    paid: total(paid, 'commissionAmount'),
    net: total(commissions, 'driverNetAmount'),
    pendingCount: pending.length,
  }
}

export const getDriverCommissions = (driverId) =>
  getCommissions().filter((item) => String(item.driverId) === String(driverId))

export const getDriverCommissionStats = (driverId) =>
  getCommissionStats(getDriverCommissions(driverId))

const subscribe = (callback) => {
  const onStorage = (event) => {
    if (!event.key || event.key === RATE_STORAGE_KEY || event.key === COMMISSIONS_STORAGE_KEY) {
      revision += 1
      callback()
    }
  }
  window.addEventListener(CHANGE_EVENT, callback)
  window.addEventListener('storage', onStorage)
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback)
    window.removeEventListener('storage', onStorage)
  }
}

export const useCommissionRevision = () =>
  useSyncExternalStore(subscribe, () => revision, () => 0)

export const useCommissionRate = () => {
  useCommissionRevision()
  return getCommissionRate()
}
