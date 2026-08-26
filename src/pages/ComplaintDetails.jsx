import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  MessageSquareWarning,
  Route,
  UserRound,
} from 'lucide-react'

import { getComplaintById } from '../services/complaintService'
import { getCustomers } from '../services/customerService'
import Spinner from '../components/Spinner'

function ComplaintDetails() {
  const { complaintId } = useParams()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  const [complaint, setComplaint] = useState(null)
  const [customer, setCustomer] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const getStatusLabel = (status) => {
    const labels = {
      pending: t('complaintDetails.status.pending'),
      resolved: t('complaintDetails.status.resolved'),
      rejected: t('complaintDetails.status.rejected'),
    }

    return labels[status] || status || '—'
  }

  const getLocale = () => {
    if (i18n.language?.startsWith('ar')) {
      return 'ar'
    }

    if (i18n.language?.startsWith('en')) {
      return 'en-US'
    }

    return 'fr-FR'
  }

  const formatDate = (value) => {
    if (!value) {
      return '—'
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
      return '—'
    }

    return new Intl.DateTimeFormat(
      getLocale(),
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      },
    ).format(date)
  }

  const formatCourseId = (id) => {
    if (!id) {
      return '—'
    }

    return `DJ-${String(id).padStart(5, '0')}`
  }

  const getCustomerName = (customerData) => {
    if (!customerData) {
      return t('complaintDetails.customer.defaultName')
    }

    return (
      [
        customerData.user?.first_name,
        customerData.user?.last_name,
      ]
        .filter(Boolean)
        .join(' ') ||
      t('complaintDetails.customer.defaultName')
    )
  }

  const getAdministratorName = () => {
    const administrator =
      complaint?.resolved_by_user

    if (!administrator) {
      return '—'
    }

    const fullName = [
      administrator.first_name,
      administrator.last_name,
    ]
      .filter(Boolean)
      .join(' ')
      .trim()

    return (
      fullName ||
      t('complaintDetails.resolution.administrator')
    )
  }

  const getAdministratorRole = () => {
    const administrator =
      complaint?.resolved_by_user

    if (!administrator) {
      return ''
    }

    if (administrator.is_superuser) {
      return t(
        'complaintDetails.resolution.superAdmin',
      )
    }

    if (
      administrator.user_type === 'admin' ||
      administrator.is_staff
    ) {
      return t(
        'complaintDetails.resolution.admin',
      )
    }

    return ''
  }

  useEffect(() => {
    const loadComplaint = async () => {
      try {
        setIsLoading(true)
        setError('')

        const complaintData =
          await getComplaintById(complaintId)

        setComplaint(complaintData)

        try {
          const customersData =
            await getCustomers()

          const customers =
            Array.isArray(customersData)
              ? customersData
              : customersData?.results ?? []

          const relatedCustomer =
            customers.find(
              (item) =>
                item.id === complaintData.customer,
            )

          setCustomer(
            relatedCustomer || null,
          )
        } catch (customerError) {
          console.error(customerError)
          setCustomer(null)
        }
      } catch (requestError) {
        console.error(requestError)

        setError(
          t('complaintDetails.errors.load'),
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadComplaint()
  }, [complaintId, t])

  if (isLoading) {
    return (
      <section className="complaint-details-page">
        <div className="complaints-loading">
          <Spinner />
        </div>
      </section>
    )
  }

  if (error || !complaint) {
    return (
      <section className="complaint-details-page">
        <button
          type="button"
          className="complaint-back-link"
          onClick={() =>
            navigate('/admin/complaints')
          }
        >
          <ArrowLeft size={17} />

          {t('complaintDetails.back')}
        </button>

        <div className="complaints-table-state is-error">
          <strong>
            {t('complaintDetails.errors.notFound')}
          </strong>

          <p>{error}</p>
        </div>
      </section>
    )
  }

  const customerName =
    getCustomerName(customer)

  const administratorName =
    getAdministratorName()

  const administratorRole =
    getAdministratorRole()

  return (
    <section className="complaint-details-page">
      <div className="complaint-details-topline">
        <button
          type="button"
          className="complaint-back-link"
          onClick={() =>
            navigate('/admin/complaints')
          }
        >
          <ArrowLeft size={17} />

          {t('complaintDetails.back')}
        </button>

        <span
          className={`complaint-status-badge status-${complaint.status}`}
        >
          {getStatusLabel(complaint.status)}
        </span>
      </div>

      <section className="complaint-summary-card">
        <div className="complaint-summary-identity">
          <span className="complaint-summary-icon">
            <MessageSquareWarning size={23} />
          </span>

          <div>
            <span className="complaint-summary-label">
              {t(
                'complaintDetails.summary.complaintNumber',
                {
                  id: complaint.id,
                },
              )}
            </span>

            <h2>
              {formatCourseId(
                complaint.course,
              )}
            </h2>

            <p>
              {t(
                'complaintDetails.summary.registered',
              )}
            </p>
          </div>
        </div>

        <div className="complaint-summary-metrics">
          <div>
            <span>
              {t(
                'complaintDetails.common.customer',
              )}
            </span>

            <strong>
              {customerName}
            </strong>
          </div>

          <div>
            <span>
              {t(
                'complaintDetails.common.course',
              )}
            </span>

            <strong>
              {formatCourseId(
                complaint.course,
              )}
            </strong>
          </div>

          <div>
            <span>
              {t(
                'complaintDetails.common.status',
              )}
            </span>

            <strong>
              {getStatusLabel(
                complaint.status,
              )}
            </strong>
          </div>
        </div>
      </section>

      <div className="complaint-details-grid">

        <section className="complaint-detail-card">
          <div className="complaint-detail-card-heading">
            <UserRound size={18} />

            <div>
              <h3>
                {t(
                  'complaintDetails.customer.title',
                )}
              </h3>

              <p>
                {t(
                  'complaintDetails.customer.subtitle',
                )}
              </p>
            </div>
          </div>

          <div className="complaint-detail-list">
            <div>
              <span>
                {t(
                  'complaintDetails.customer.name',
                )}
              </span>

              <strong>
                {customerName}
              </strong>
            </div>

            <div>
              <span>
                {t(
                  'complaintDetails.common.customer',
                )}
              </span>

              <strong>
                #
                {customer?.id ||
                  complaint.customer ||
                  '—'}
              </strong>
            </div>

            <div>
              <span>
                {t(
                  'complaintDetails.customer.phone',
                )}
              </span>

              <strong>
                {customer?.user?.phone || '—'}
              </strong>
            </div>

            <div>
              <span>
                {t(
                  'complaintDetails.customer.email',
                )}
              </span>

              <strong>
                {customer?.user?.email || '—'}
              </strong>
            </div>
          </div>
        </section>

        <section className="complaint-detail-card">
          <div className="complaint-detail-card-heading">
            <Route size={18} />

            <div>
              <h3>
                {t(
                  'complaintDetails.course.title',
                )}
              </h3>

              <p>
                {t(
                  'complaintDetails.course.subtitle',
                )}
              </p>
            </div>
          </div>

          <div className="complaint-course-module">
            <div>
              <span>
                {t(
                  'complaintDetails.common.course',
                )}
              </span>

              <strong>
                {formatCourseId(
                  complaint.course,
                )}
              </strong>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/admin/courses/${complaint.course}`,
                )
              }
            >
              {t(
                'complaintDetails.course.view',
              )}
            </button>
          </div>
        </section>

        <section className="complaint-detail-card complaint-description-card">
          <div className="complaint-detail-card-heading">
            <MessageSquareWarning size={18} />

            <div>
              <h3>
                {t(
                  'complaintDetails.description.title',
                )}
              </h3>

              <p>
                {t(
                  'complaintDetails.description.subtitle',
                )}
              </p>
            </div>
          </div>

          <div className="complaint-description-full">
            {complaint.description ||
              t(
                'complaintDetails.description.empty',
              )}
          </div>
        </section>

        <section className="complaint-detail-card">
          <div className="complaint-detail-card-heading">
            <CalendarDays size={18} />

            <div>
              <h3>
                {t(
                  'complaintDetails.dates.title',
                )}
              </h3>

              <p>
                {t(
                  'complaintDetails.dates.subtitle',
                )}
              </p>
            </div>
          </div>

          <div className="complaint-detail-list">
            <div>
              <span>
                {t(
                  'complaintDetails.dates.created',
                )}
              </span>

              <strong>
                {formatDate(
                  complaint.created_at,
                )}
              </strong>
            </div>

            <div>
              <span>
                {t(
                  'complaintDetails.dates.resolved',
                )}
              </span>

              <strong>
                {formatDate(
                  complaint.resolved_at,
                )}
              </strong>
            </div>

            <div>
              <span>
                {t(
                  'complaintDetails.dates.updated',
                )}
              </span>

              <strong>
                {formatDate(
                  complaint.updated_at,
                )}
              </strong>
            </div>
          </div>
        </section>

        <section className="complaint-detail-card complaint-resolution-card">
          <div className="complaint-detail-card-heading">
            <CheckCircle2 size={18} />

            <div>
              <h3>
                {t(
                  'complaintDetails.resolution.title',
                )}
              </h3>

              <p>
                {t(
                  'complaintDetails.resolution.subtitle',
                )}
              </p>
            </div>
          </div>

          <div className="complaint-detail-list">
            <div>
              <span>
                {t(
                  'complaintDetails.common.status',
                )}
              </span>

              <strong>
                {getStatusLabel(
                  complaint.status,
                )}
              </strong>
            </div>

            <div>
              <span>
                {t(
                  'complaintDetails.resolution.resolvedBy',
                )}
              </span>

              <div className="complaint-resolver">
                <strong>
                  {administratorName}
                </strong>

                {administratorRole && (
                  <small>
                    {administratorRole}
                  </small>
                )}
              </div>
            </div>
          </div>

          <div className="complaint-resolution-note">
            <span>
              {t(
                'complaintDetails.resolution.note',
              )}
            </span>

            <p>
              {complaint.resolution_note ||
                t(
                  'complaintDetails.resolution.noNote',
                )}
            </p>
          </div>
        </section>
      </div>
    </section>
  )
}

export default ComplaintDetails