import { useEffect, useState } from 'react'
import {
  useNavigate,
  useParams,
} from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Route,
  UserRound,
} from 'lucide-react'

import { getCustomerById } from '../services/customerService'
import { getCourses } from '../services/courseService'
import Spinner from '../components/Spinner'

function formatCourseId(id) {
  return `DJ-${String(id).padStart(5, '0')}`
}

function CustomerDetails() {
  const { customerId } = useParams()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  const [customer, setCustomer] =
    useState(null)

  const [courses, setCourses] =
    useState([])

  const [
    customerLoading,
    setCustomerLoading,
  ] = useState(true)

  const [
    coursesLoading,
    setCoursesLoading,
  ] = useState(true)

  const [error, setError] =
    useState('')

  const locale =
    i18n.resolvedLanguage === 'ar'
      ? 'ar'
      : i18n.resolvedLanguage === 'en'
        ? 'en-US'
        : 'fr-FR'

  const getCustomerName = (value) =>
    [
      value?.user?.first_name,
      value?.user?.last_name,
    ]
      .filter(Boolean)
      .join(' ') ||
    t(
      'customers.fallback.customer',
    )

  const getCourseStatus = (status) =>
    t(`courses.status.${status}`, {
      defaultValue: status || '—',
    })

  const formatDate = (value) => {
    if (!value) {
      return '—'
    }

    const date = new Date(value)

    if (
      Number.isNaN(date.getTime())
    ) {
      return '—'
    }

    return new Intl.DateTimeFormat(
      locale,
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      },
    ).format(date)
  }

  const formatMoney = (value) => {
    const amount = Number(value)

    if (!Number.isFinite(amount)) {
      return '—'
    }

    return `${new Intl.NumberFormat(
      locale,
    ).format(amount)} FCFA`
  }

  useEffect(() => {
    const loadCustomer =
      async () => {
        try {
          setCustomerLoading(
            true,
          )

          setError('')

          const data =
            await getCustomerById(
              customerId,
            )

          setCustomer(data)
        } catch (err) {
          console.error(err)

          setError(
            t(
              'customerDetails.errors.load',
            ),
          )
        } finally {
          setCustomerLoading(
            false,
          )
        }
      }

    loadCustomer()
  }, [customerId])

  useEffect(() => {
    const loadCourses =
      async () => {
        try {
          setCoursesLoading(
            true,
          )

          const data =
            await getCourses()

          setCourses(
            Array.isArray(data)
              ? data
              : data?.results ?? [],
          )
        } catch (err) {
          console.error(err)
          setCourses([])
        } finally {
          setCoursesLoading(
            false,
          )
        }
      }

    loadCourses()
  }, [])

  if (customerLoading) {
    return (
      <section className="customer-details-page">
        <div className="customers-loading">
          <Spinner />
        </div>
      </section>
    )
  }

  if (error || !customer) {
    return (
      <section className="customer-details-page">
        <button
          type="button"
          className="customer-back-link"
          onClick={() =>
            navigate(
              '/admin/clients',
            )
          }
        >
          <ArrowLeft size={17} />

          {t(
            'customerDetails.back',
          )}
        </button>

        <div className="customers-table-state is-error">
          <strong>
            {t(
              'customerDetails.errors.notFound',
            )}
          </strong>

          <p>{error}</p>
        </div>
      </section>
    )
  }

  const customerName =
    getCustomerName(customer)

  const customerCourses =
    courses.filter(
      (course) =>
        course.customer?.id ===
          customer.id ||
        course.customer ===
          customer.id,
    )

  const completedCourses =
    customerCourses.filter(
      (course) =>
        course.status ===
        'completed',
    ).length

  const cancelledCourses =
    customerCourses.filter(
      (course) =>
        course.status ===
        'cancelled',
    ).length

  const activeCourses =
    customerCourses.filter(
      (course) =>
        [
          'requested',
          'accepted',
          'arriving',
          'picked_up',
        ].includes(course.status),
    ).length

  const sortedCourses = [
    ...customerCourses,
  ].sort((a, b) => {
    const dateA = new Date(
      a.requested_at ||
        a.created_at ||
        0,
    )

    const dateB = new Date(
      b.requested_at ||
        b.created_at ||
        0,
    )

    return dateB - dateA
  })

  const latestCourse =
    sortedCourses[0] || null

  return (
    <section className="customer-details-page">
      <button
        type="button"
        className="customer-back-link"
        onClick={() =>
          navigate(
            '/admin/clients',
          )
        }
      >
        <ArrowLeft size={17} />

        {t(
          'customerDetails.back',
        )}
      </button>

      <section className="customer-summary-card">
        <div className="customer-summary-identity">
          <span className="customer-summary-avatar">
            {customer.user
              ?.first_name?.[0] ||
              'C'}
          </span>

          <div>
            <span className="customer-summary-label">
              {t(
                'customerDetails.customerNumber',
                {
                  id:
                    customer.id,
                },
              )}
            </span>

            <h2>
              {customerName}
            </h2>

            <p>
              {t(
                'customerDetails.profileDescription',
              )}
            </p>
          </div>
        </div>

        <div className="customer-summary-metrics">
          <div>
            <span>
              {t(
                'customerDetails.summary.courses',
              )}
            </span>

            <strong>
              {customerCourses.length}
            </strong>
          </div>

          <div>
            <span>
              {t(
                'customerDetails.summary.completed',
              )}
            </span>

            <strong>
              {completedCourses}
            </strong>
          </div>

          <div>
            <span>
              {t(
                'customerDetails.summary.cancelled',
              )}
            </span>

            <strong>
              {cancelledCourses}
            </strong>
          </div>
        </div>
      </section>

      <div className="customer-details-grid">
        <section className="customer-detail-card">
          <div className="customer-detail-card-heading">
            <UserRound size={18} />

            <div>
              <h3>
                {t(
                  'customerDetails.personal.title',
                )}
              </h3>

              <p>
                {t(
                  'customerDetails.personal.description',
                )}
              </p>
            </div>
          </div>

          <div className="customer-detail-list">
            <div>
              <span>
                {t(
                  'customerDetails.fields.name',
                )}
              </span>

              <strong>
                {customerName}
              </strong>
            </div>

            <div>
              <span>
                <Phone size={15} />

                {t(
                  'customerDetails.fields.phone',
                )}
              </span>

              <strong>
                {customer.user
                  ?.phone || '—'}
              </strong>
            </div>

            <div>
              <span>
                <Mail size={15} />

                {t(
                  'customerDetails.fields.email',
                )}
              </span>

              <strong>
                {customer.user
                  ?.email || '—'}
              </strong>
            </div>

            <div>
              <span>
                <CalendarDays
                  size={15}
                />

                {t(
                  'customerDetails.fields.registeredAt',
                )}
              </span>

              <strong>
                {formatDate(
                  customer.created_at,
                )}
              </strong>
            </div>
          </div>
        </section>

        <section className="customer-detail-card">
          <div className="customer-detail-card-heading">
            <Route size={18} />

            <div>
              <h3>
                {t(
                  'customerDetails.activity.title',
                )}
              </h3>

              <p>
                {t(
                  'customerDetails.activity.description',
                )}
              </p>
            </div>
          </div>

          {coursesLoading ? (
            <div className="customer-empty-module">
              <Spinner />
            </div>
          ) : (
            <div className="customer-activity-stats">
              <div>
                <span>
                  {t(
                    'customerDetails.activity.total',
                  )}
                </span>

                <strong>
                  {customerCourses.length}
                </strong>
              </div>

              <div>
                <span>
                  {t(
                    'customerDetails.activity.completed',
                  )}
                </span>

                <strong>
                  {completedCourses}
                </strong>
              </div>

              <div>
                <span>
                  {t(
                    'customerDetails.activity.active',
                  )}
                </span>

                <strong>
                  {activeCourses}
                </strong>
              </div>

              <div>
                <span>
                  {t(
                    'customerDetails.activity.cancelled',
                  )}
                </span>

                <strong>
                  {cancelledCourses}
                </strong>
              </div>
            </div>
          )}
        </section>
      </div>

      <section className="customer-courses-card">
        <div className="customer-detail-card-heading">
          <Route size={18} />

          <div>
            <h3>
              {t(
                'customerDetails.history.title',
              )}
            </h3>

            <p>
              {t(
                'customerDetails.history.description',
              )}
            </p>
          </div>
        </div>

        {coursesLoading ? (
          <div className="customer-empty-module">
            <Spinner />
          </div>
        ) : customerCourses.length ===
          0 ? (
          <div className="customer-empty-module">
            <MapPin
              size={23}
              strokeWidth={1.6}
            />

            <strong>
              {t(
                'customerDetails.history.empty',
              )}
            </strong>

            <p>
              {t(
                'customerDetails.history.emptyDescription',
              )}
            </p>
          </div>
        ) : (
          <div className="customer-courses-list">
            {sortedCourses.map(
              (course) => (
                <button
                  key={course.id}
                  type="button"
                  className="customer-course-row"
                  onClick={() =>
                    navigate(
                      `/admin/courses/${course.id}`,
                    )
                  }
                >
                  <div className="customer-course-main">
                    <strong>
                      {formatCourseId(
                        course.id,
                      )}
                    </strong>

                    <span>
                      {course.starting_landmark ||
                        t(
                          'courses.fallback.departure',
                        )}
                      {' → '}
                      {course.arrival_landmark ||
                        t(
                          'courses.fallback.destination',
                        )}
                    </span>
                  </div>

                  <div className="customer-course-status">
                    <span
                      className={`course-status-badge status-${course.status}`}
                    >
                      {getCourseStatus(
                        course.status,
                      )}
                    </span>
                  </div>

                  <div className="customer-course-date">
                    {formatDate(
                      course.requested_at ||
                        course.created_at,
                    )}
                  </div>

                  <div className="customer-course-price">
                    {formatMoney(
                      course.status ===
                        'completed'
                        ? course.final_price
                        : course.initial_price,
                    )}
                  </div>

                  <ChevronRight
                    size={17}
                  />
                </button>
              ),
            )}
          </div>
        )}
      </section>

      {latestCourse && (
        <section className="customer-latest-card">
          <div>
            <span>
              {t(
                'customerDetails.latest.course',
              )}
            </span>

            <strong>
              {formatCourseId(
                latestCourse.id,
              )}
            </strong>
          </div>

          <div>
            <span>
              {t(
                'customerDetails.latest.route',
              )}
            </span>

            <strong>
              {latestCourse.starting_landmark ||
                t(
                  'courses.fallback.departure',
                )}
              {' → '}
              {latestCourse.arrival_landmark ||
                t(
                  'courses.fallback.destination',
                )}
            </strong>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate(
                `/admin/courses/${latestCourse.id}`,
              )
            }
          >
            {t(
              'customerDetails.latest.view',
            )}

            <ChevronRight
              size={16}
            />
          </button>
        </section>
      )}
    </section>
  )
}

export default CustomerDetails