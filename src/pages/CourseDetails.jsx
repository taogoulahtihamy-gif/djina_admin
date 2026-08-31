import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowLeft,
  BadgePercent,
  CalendarDays,
  CarFront,
  CircleDollarSign,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Route,
  Star,
  UserRound,
  XCircle,
} from 'lucide-react'

import {
  cancelCourse,
  getCourseById,
} from '../services/courseService'

import Spinner from '../components/Spinner'
import {
  getCommissionByCourseId,
  syncCourseCommissions,
  useCommissionRevision,
} from '../services/commissionService'

function formatCourseId(id) {
  return `DJ-${String(id).padStart(5, '0')}`
}

function CourseDetails() {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  useCommissionRevision()

  const [course, setCourse] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const [showCancelForm, setShowCancelForm] = useState(false)
  const [cancelReason, setCancelReason] = useState('')
  const [isCancelling, setIsCancelling] = useState(false)
  const [cancelError, setCancelError] = useState('')

  const locale =
    i18n.resolvedLanguage === 'ar'
      ? 'ar'
      : i18n.resolvedLanguage === 'en'
        ? 'en-US'
        : 'fr-FR'

  const formatMoney = (value) => {
    const amount = Number(value)

    if (!Number.isFinite(amount)) {
      return '—'
    }

    return `${new Intl.NumberFormat(locale).format(amount)} FCFA`
  }

  const formatDate = (value) => {
    if (!value) {
      return '—'
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
      return '—'
    }

    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const getStatusLabel = (status) =>
    t(`courses.status.${status}`, {
      defaultValue: status || '—',
    })

  const getServiceLabel = (service) =>
    t(`courses.service.${service}`, {
      defaultValue: service || '—',
    })

  useEffect(() => {
    const loadCourse = async () => {
      try {
        setIsLoading(true)
        setError('')

        const data = await getCourseById(courseId)

        setCourse(data)
      } catch (err) {
        console.error(err)

        setError(
          t('courseDetails.errors.load'),
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadCourse()
  }, [courseId, t])

  useEffect(() => {
    if (course) syncCourseCommissions([course])
  }, [course])

  const timeline = useMemo(() => {
    if (!course) {
      return []
    }

    return [
      {
        key: 'requested',
        label: t('courseDetails.timeline.requested'),
        value: course.requested_at,
      },
      {
        key: 'accepted',
        label: t('courseDetails.timeline.accepted'),
        value: course.accepted_at,
      },
      {
        key: 'arriving',
        label: t('courseDetails.timeline.arriving'),
        value: course.arriving_at,
      },
      {
        key: 'pickedUp',
        label: t('courseDetails.timeline.pickedUp'),
        value: course.picked_up_at,
      },
      {
        key: 'completed',
        label: t('courseDetails.timeline.completed'),
        value: course.completed_at,
      },
      {
        key: 'cancelled',
        label: t('courseDetails.timeline.cancelled'),
        value: course.cancelled_at,
      },
    ].filter((item) => item.value)
  }, [course, t])

  if (isLoading) {
    return (
      <section className="course-details-page">
        <div className="courses-loading">
          <Spinner />
        </div>
      </section>
    )
  }

  if (error || !course) {
    return (
      <section className="course-details-page">
        <button
          type="button"
          className="course-back-link"
          onClick={() => navigate('/admin/courses')}
        >
          <ArrowLeft size={17} />
          {t('courseDetails.back')}
        </button>

        <div className="courses-table-state is-error">
          <strong>
            {t('courseDetails.errors.notFound')}
          </strong>

          <p>{error}</p>
        </div>
      </section>
    )
  }

  const courseCommission = getCommissionByCourseId(course.id)

  const customerName =
    [
      course.customer?.user?.first_name,
      course.customer?.user?.last_name,
    ]
      .filter(Boolean)
      .join(' ') ||
    t('courses.fallback.customer')

  const driverName =
    [
      course.driver?.user?.first_name,
      course.driver?.user?.last_name,
    ]
      .filter(Boolean)
      .join(' ') ||
    t('courses.fallback.unassigned')

  const displayAmount =
    course.status === 'completed'
      ? course.final_price
      : course.initial_price

  const canCancelCourse = ![
    'completed',
    'cancelled',
  ].includes(course.status)

  const handleCloseCancelForm = () => {
    setShowCancelForm(false)
    setCancelReason('')
    setCancelError('')
  }

  const handleCancelCourse = async () => {
    const reason = cancelReason.trim()

    if (!reason) {
      setCancelError(
        t('courseDetails.cancel.reasonRequired'),
      )

      return
    }

    try {
      setIsCancelling(true)
      setCancelError('')

      const updatedCourse = await cancelCourse(
        course.id,
        reason,
      )

      setCourse(updatedCourse)
      setShowCancelForm(false)
      setCancelReason('')
    } catch (err) {
      console.error(err)

      setCancelError(
        t('courseDetails.cancel.error'),
      )
    } finally {
      setIsCancelling(false)
    }
  }

  return (
    <section className="course-details-page">
      <div className="course-details-topline">
        <button
          type="button"
          className="course-back-link"
          onClick={() => navigate('/admin/courses')}
        >
          <ArrowLeft size={17} />
          {t('courseDetails.back')}
        </button>

        <div className="course-details-actions">
          <span
            className={`course-status-badge status-${course.status}`}
          >
            {getStatusLabel(course.status)}
          </span>

          {canCancelCourse && (
            <button
              type="button"
              className="course-cancel-trigger"
              onClick={() =>
                setShowCancelForm(true)
              }
            >
              <XCircle size={16} />

              {t('courseDetails.cancel.trigger')}
            </button>
          )}
        </div>
      </div>

      {showCancelForm && (
        <section className="course-cancel-panel">
          <div className="course-cancel-heading">
            <div>
              <h3>
                {t('courseDetails.cancel.title')}
              </h3>

              <p>
                {t(
                  'courseDetails.cancel.description',
                )}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCloseCancelForm}
              aria-label={t(
                'courseDetails.cancel.close',
              )}
            >
              ×
            </button>
          </div>

          <label htmlFor="cancel-reason">
            {t('courseDetails.cancel.reasonLabel')}
          </label>

          <textarea
            id="cancel-reason"
            value={cancelReason}
            onChange={(event) =>
              setCancelReason(event.target.value)
            }
            placeholder={t(
              'courseDetails.cancel.placeholder',
            )}
            rows={3}
          />

          {cancelError && (
            <p className="course-cancel-error">
              {cancelError}
            </p>
          )}

          <div className="course-cancel-footer">
            <button
              type="button"
              className="course-cancel-secondary"
              onClick={handleCloseCancelForm}
              disabled={isCancelling}
            >
              {t('courseDetails.cancel.back')}
            </button>

            <button
              type="button"
              className="course-cancel-confirm"
              onClick={handleCancelCourse}
              disabled={isCancelling}
            >
              {isCancelling
                ? t(
                    'courseDetails.cancel.cancelling',
                  )
                : t(
                    'courseDetails.cancel.confirm',
                  )}
            </button>
          </div>
        </section>
      )}

      <section className="course-summary-card">
        <div className="course-summary-main">
          <span className="course-summary-label">
            {t('courseDetails.summary.course')}
          </span>

          <h2>
            {formatCourseId(course.id)}
          </h2>

          <div className="course-summary-route">
            <div>
              <span>
                {t(
                  'courseDetails.summary.departure',
                )}
              </span>

              <strong>
                {course.starting_landmark ||
                  t(
                    'courseDetails.fallback.notProvidedMasculine',
                  )}
              </strong>
            </div>

            <Route size={20} />

            <div>
              <span>
                {t(
                  'courseDetails.summary.destination',
                )}
              </span>

              <strong>
                {course.arrival_landmark ||
                  t(
                    'courseDetails.fallback.notProvidedFeminine',
                  )}
              </strong>
            </div>
          </div>
        </div>

        <div className="course-summary-metrics">
          <div>
            <span>
              {t('courseDetails.summary.service')}
            </span>

            <strong>
              {getServiceLabel(
                course.requested_service_tier,
              )}
            </strong>
          </div>

          <div>
            <span>
              {t('courseDetails.summary.distance')}
            </span>

            <strong>
              {course.distance_km
                ? `${course.distance_km} km`
                : '—'}
            </strong>
          </div>

          <div>
            <span>
              {t('courseDetails.summary.amount')}
            </span>

            <strong>
              {formatMoney(displayAmount)}
            </strong>
          </div>
        </div>
      </section>

      <div className="course-details-grid">
        <section className="course-detail-card">
          <div className="course-detail-card-heading">
            <UserRound size={18} />

            <div>
              <h3>
                {t('courseDetails.customer.title')}
              </h3>

              <p>
                {t(
                  'courseDetails.customer.description',
                )}
              </p>
            </div>
          </div>

          <div className="course-detail-list">
            <div>
              <span>
                {t('courseDetails.fields.name')}
              </span>

              <strong>{customerName}</strong>
            </div>

            <div>
              <span>
                <Phone size={15} />
                {t('courseDetails.fields.phone')}
              </span>

              <strong>
                {course.customer?.user?.phone ||
                  '—'}
              </strong>
            </div>

            <div>
              <span>
                <Mail size={15} />
                {t('courseDetails.fields.email')}
              </span>

              <strong>
                {course.customer?.user?.email ||
                  '—'}
              </strong>
            </div>
          </div>
        </section>

        <section className="course-detail-card">
          <div className="course-detail-card-heading">
            <CarFront size={18} />

            <div>
              <h3>
                {t('courseDetails.driver.title')}
              </h3>

              <p>
                {t(
                  'courseDetails.driver.description',
                )}
              </p>
            </div>
          </div>

          <div className="course-detail-list">
            <div>
              <span>
                {t('courseDetails.fields.name')}
              </span>

              <strong>{driverName}</strong>
            </div>

            <div>
              <span>
                <Phone size={15} />
                {t('courseDetails.fields.phone')}
              </span>

              <strong>
                {course.driver?.user?.phone ||
                  '—'}
              </strong>
            </div>

            <div>
              <span>
                <Star size={15} />
                {t('courseDetails.fields.rating')}
              </span>

              <strong>
                {course.driver?.rating_avg
                  ? `${course.driver.rating_avg} / 5`
                  : '—'}
              </strong>
            </div>
          </div>
        </section>

        <section className="course-detail-card">
          <div className="course-detail-card-heading">
            <MapPin size={18} />

            <div>
              <h3>
                {t('courseDetails.route.title')}
              </h3>

              <p>
                {t(
                  'courseDetails.route.description',
                )}
              </p>
            </div>
          </div>

          <div className="course-detail-list">
            <div>
              <span>
                {t(
                  'courseDetails.summary.departure',
                )}
              </span>

              <strong>
                {course.starting_landmark || '—'}
              </strong>

              <small>
                {course.departure_latitude &&
                course.departure_longitude
                  ? `${course.departure_latitude}, ${course.departure_longitude}`
                  : t(
                      'courseDetails.route.coordinatesUnavailable',
                    )}
              </small>
            </div>

            <div>
              <span>
                {t(
                  'courseDetails.summary.destination',
                )}
              </span>

              <strong>
                {course.arrival_landmark || '—'}
              </strong>

              <small>
                {course.destination_latitude &&
                course.destination_longitude
                  ? `${course.destination_latitude}, ${course.destination_longitude}`
                  : t(
                      'courseDetails.route.coordinatesUnavailable',
                    )}
              </small>
            </div>
          </div>
        </section>

        <section className="course-detail-card">
          <div className="course-detail-card-heading">
            <CircleDollarSign size={18} />

            <div>
              <h3>
                {t('courseDetails.pricing.title')}
              </h3>

              <p>
                {t(
                  'courseDetails.pricing.description',
                )}
              </p>
            </div>
          </div>

          <div className="course-detail-list">
            <div>
              <span>
                {t(
                  'courseDetails.pricing.estimated',
                )}
              </span>

              <strong>
                {formatMoney(
                  course.initial_price,
                )}
              </strong>
            </div>

            <div>
              <span>
                {t(
                  'courseDetails.pricing.final',
                )}
              </span>

              <strong>
                {course.final_price &&
                Number(course.final_price) > 0
                  ? formatMoney(
                      course.final_price,
                    )
                  : t(
                      'courseDetails.pricing.notDefined',
                    )}
              </strong>
            </div>
          </div>
        </section>

        <section className="course-detail-card course-financial-card">
          <div className="course-detail-card-heading">
            <BadgePercent size={18} />
            <div>
              <h3>{t('courseDetails.financial.title')}</h3>
              <p>{t('courseDetails.financial.description')}</p>
            </div>
          </div>

          {course.status === 'completed' ? (
            <div className="course-detail-list financial-detail-list">
              <div><span>{t('commission.coursePrice')}</span><strong>{formatMoney(courseCommission?.grossAmount)}</strong></div>
              <div><span>{t('commission.rateApplied')}</span><strong>{courseCommission?.commissionRate ?? 0}%</strong></div>
              <div><span>{t('commission.djinaCommission')}</span><strong>{formatMoney(courseCommission?.commissionAmount)}</strong></div>
              <div><span>{t('commission.driverNet')}</span><strong>{formatMoney(courseCommission?.driverNetAmount)}</strong></div>
              <div><span>{t('commission.status')}</span><strong className={`commission-status-badge is-${courseCommission?.status || 'pending'}`}>{t(`commission.statuses.${courseCommission?.status || 'pending'}`)}</strong></div>
            </div>
          ) : (
            <p className="commission-pending-note">{t('courseDetails.financial.pending')}</p>
          )}
        </section>
      </div>

      {course.status === 'cancelled' && (
        <section className="course-cancellation-info">
          <div className="course-detail-card-heading">
            <XCircle size={18} />

            <div>
              <h3>
                {t(
                  'courseDetails.cancellation.title',
                )}
              </h3>

              <p>
                {t(
                  'courseDetails.cancellation.description',
                )}
              </p>
            </div>
          </div>

          <div className="course-detail-list">
            <div>
              <span>
                {t(
                  'courseDetails.cancellation.by',
                )}
              </span>

              <strong>
                {course.cancelled_by ||
                  t(
                    'courseDetails.fallback.notProvidedMasculine',
                  )}
              </strong>
            </div>

            <div>
              <span>
                {t(
                  'courseDetails.cancellation.reason',
                )}
              </span>

              <strong>
                {course.cancellation_reason ||
                  t(
                    'courseDetails.cancellation.noReason',
                  )}
              </strong>
            </div>

            <div>
              <span>
                {t(
                  'courseDetails.cancellation.date',
                )}
              </span>

              <strong>
                {formatDate(
                  course.cancelled_at,
                )}
              </strong>
            </div>
          </div>
        </section>
      )}

      <section className="course-timeline-card">
        <div className="course-detail-card-heading">
          <Clock3 size={18} />

          <div>
            <h3>
              {t('courseDetails.timeline.title')}
            </h3>

            <p>
              {t(
                'courseDetails.timeline.description',
              )}
            </p>
          </div>
        </div>

        <div className="course-timeline">
          {timeline.length === 0 ? (
            <div className="course-timeline-empty">
              {t('courseDetails.timeline.empty')}
            </div>
          ) : (
            timeline.map((item) => (
              <div
                className="course-timeline-item"
                key={item.key}
              >
                <span className="course-timeline-dot" />

                <div>
                  <strong>{item.label}</strong>

                  <span>
                    <CalendarDays size={14} />

                    {formatDate(item.value)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </section>
  )
}

export default CourseDetails
