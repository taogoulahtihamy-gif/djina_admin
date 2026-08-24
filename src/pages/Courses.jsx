import { useEffect, useMemo, useState } from 'react'
import {
  Search,
  RefreshCw,
  ChevronRight,
  Route,
  Clock3,
  CircleCheckBig,
  CarFront,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { getCourses } from '../services/courseService'
import Spinner from '../components/Spinner'

function formatCourseId(id) {
  return `DJ-${String(id).padStart(5, '0')}`
}

function Courses() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()

  const [courses, setCourses] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const locale =
    i18n.resolvedLanguage === 'ar'
      ? 'ar'
      : i18n.resolvedLanguage === 'en'
        ? 'en-US'
        : 'fr-FR'

  const formatDate = (value) => {
    if (!value) return '—'

    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value))
  }

  const formatMoney = (value) => {
    const amount = Number(value)

    if (!Number.isFinite(amount)) {
      return '—'
    }

    return `${new Intl.NumberFormat(locale).format(amount)} FCFA`
  }

  const getStatusLabel = (status) =>
    t(`courses.status.${status}`, {
      defaultValue: status || '—',
    })

  const getServiceLabel = (service) =>
    t(`courses.service.${service}`, {
      defaultValue: service || '—',
    })

  const loadCourses = async ({
    refresh = false,
  } = {}) => {
    try {
      if (refresh) {
        setIsRefreshing(true)
      } else {
        setIsLoading(true)
      }

      setError('')

      const data = await getCourses()

      setCourses(
        Array.isArray(data)
          ? data
          : data?.results ?? [],
      )
    } catch (err) {
      console.error(err)

      setError(
        t('courses.errors.load'),
      )
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    loadCourses()
  }, [])

  const stats = useMemo(() => {
    const pending = courses.filter(
      (course) =>
        course.status === 'requested',
    ).length

    const active = courses.filter(
      (course) =>
        [
          'accepted',
          'arriving',
          'picked_up',
        ].includes(course.status),
    ).length

    const completed = courses.filter(
      (course) =>
        course.status === 'completed',
    ).length

    return {
      total: courses.length,
      pending,
      active,
      completed,
    }
  }, [courses])

  const filteredCourses = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase()

    return courses.filter((course) => {
      const matchesStatus =
        statusFilter === 'all' ||
        course.status === statusFilter

      if (!matchesStatus) {
        return false
      }

      if (!normalizedSearch) {
        return true
      }

      const customerName = [
        course.customer?.user?.first_name,
        course.customer?.user?.last_name,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      const driverName = [
        course.driver?.user?.first_name,
        course.driver?.user?.last_name,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      const searchable = [
        String(course.id ?? ''),
        formatCourseId(course.id),
        customerName,
        driverName,
        course.starting_landmark,
        course.arrival_landmark,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return searchable.includes(
        normalizedSearch,
      )
    })
  }, [
    courses,
    search,
    statusFilter,
  ])

  if (isLoading) {
    return (
      <section className="courses-page">
        <div className="courses-loading">
          <Spinner />
        </div>
      </section>
    )
  }

  return (
    <section className="courses-page">
      <div className="courses-stats-grid">
        <article className="courses-stat-card">
          <span className="courses-stat-icon">
            <Route size={18} />
          </span>

          <div>
            <span>
              {t(
                'courses.stats.total',
              )}
            </span>

            <strong>
              {stats.total}
            </strong>
          </div>
        </article>

        <article className="courses-stat-card">
          <span className="courses-stat-icon is-warning">
            <Clock3 size={18} />
          </span>

          <div>
            <span>
              {t(
                'courses.stats.pending',
              )}
            </span>

            <strong>
              {stats.pending}
            </strong>
          </div>
        </article>

        <article className="courses-stat-card">
          <span className="courses-stat-icon is-active">
            <CarFront size={18} />
          </span>

          <div>
            <span>
              {t(
                'courses.stats.active',
              )}
            </span>

            <strong>
              {stats.active}
            </strong>
          </div>
        </article>

        <article className="courses-stat-card">
          <span className="courses-stat-icon is-success">
            <CircleCheckBig
              size={18}
            />
          </span>

          <div>
            <span>
              {t(
                'courses.stats.completed',
              )}
            </span>

            <strong>
              {stats.completed}
            </strong>
          </div>
        </article>
      </div>

      <section className="courses-list-card">
        <div className="courses-list-toolbar">
          <div className="courses-search">
            <Search
              size={17}
              aria-hidden="true"
            />

            <input
              type="search"
              placeholder={t(
                'courses.searchPlaceholder',
              )}
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              aria-label={t(
                'courses.searchLabel',
              )}
            />
          </div>

          <div className="courses-toolbar-actions">
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value,
                )
              }
              aria-label={t(
                'courses.filterLabel',
              )}
            >
              <option value="all">
                {t(
                  'courses.filters.all',
                )}
              </option>

              <option value="requested">
                {getStatusLabel(
                  'requested',
                )}
              </option>

              <option value="accepted">
                {getStatusLabel(
                  'accepted',
                )}
              </option>

              <option value="arriving">
                {getStatusLabel(
                  'arriving',
                )}
              </option>

              <option value="picked_up">
                {getStatusLabel(
                  'picked_up',
                )}
              </option>

              <option value="completed">
                {getStatusLabel(
                  'completed',
                )}
              </option>

              <option value="cancelled">
                {getStatusLabel(
                  'cancelled',
                )}
              </option>
            </select>

            <button
              type="button"
              className="courses-refresh-button"
              onClick={() =>
                loadCourses({
                  refresh: true,
                })
              }
              disabled={isRefreshing}
            >
              <RefreshCw
                size={16}
                className={
                  isRefreshing
                    ? 'is-spinning'
                    : ''
                }
              />

              {t(
                'courses.refresh',
              )}
            </button>
          </div>
        </div>

        {error ? (
          <div className="courses-table-state is-error">
            <strong>
              {t(
                'courses.errors.title',
              )}
            </strong>

            <p>{error}</p>

            <button
              type="button"
              onClick={() =>
                loadCourses()
              }
            >
              {t(
                'courses.retry',
              )}
            </button>
          </div>
        ) : (
          <div className="courses-table-wrapper">
            <table className="courses-table">
              <thead>
                <tr>
                  <th>
                    {t(
                      'courses.table.course',
                    )}
                  </th>

                  <th>
                    {t(
                      'courses.table.customer',
                    )}
                  </th>

                  <th>
                    {t(
                      'courses.table.driver',
                    )}
                  </th>

                  <th>
                    {t(
                      'courses.table.route',
                    )}
                  </th>

                  <th>
                    {t(
                      'courses.table.service',
                    )}
                  </th>

                  <th>
                    {t(
                      'courses.table.status',
                    )}
                  </th>

                  <th>
                    {t(
                      'courses.table.amount',
                    )}
                  </th>

                  <th>
                    {t(
                      'courses.table.requestedAt',
                    )}
                  </th>

                  <th
                    aria-label={t(
                      'courses.table.actions',
                    )}
                  />
                </tr>
              </thead>

              <tbody>
                {filteredCourses.length === 0 ? (
                  <tr>
                    <td colSpan="9">
                      <div className="courses-table-state">
                        <Route
                          size={24}
                          strokeWidth={1.6}
                        />

                        <strong>
                          {courses.length ===
                          0
                            ? t(
                                'courses.empty.noCourses',
                              )
                            : t(
                                'courses.empty.noResults',
                              )}
                        </strong>

                        <p>
                          {courses.length ===
                          0
                            ? t(
                                'courses.empty.noCoursesDescription',
                              )
                            : t(
                                'courses.empty.noResultsDescription',
                              )}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredCourses.map(
                    (course) => {
                      const customerName =
                        [
                          course
                            .customer
                            ?.user
                            ?.first_name,
                          course
                            .customer
                            ?.user
                            ?.last_name,
                        ]
                          .filter(
                            Boolean,
                          )
                          .join(' ') ||
                        t(
                          'courses.fallback.customer',
                        )

                      const driverName =
                        [
                          course
                            .driver
                            ?.user
                            ?.first_name,
                          course
                            .driver
                            ?.user
                            ?.last_name,
                        ]
                          .filter(
                            Boolean,
                          )
                          .join(' ') ||
                        t(
                          'courses.fallback.unassigned',
                        )

                      const amount =
                        course.status ===
                        'completed'
                          ? course.final_price
                          : course.initial_price

                      return (
                        <tr
                          key={
                            course.id
                          }
                        >
                          <td>
                            <strong>
                              {formatCourseId(
                                course.id,
                              )}
                            </strong>
                          </td>

                          <td>
                            {
                              customerName
                            }
                          </td>

                          <td>
                            {driverName}
                          </td>

                          <td>
                            <div className="course-route-cell">
                              <span>
                                {course.starting_landmark ||
                                  t(
                                    'courses.fallback.departure',
                                  )}
                              </span>

                              <span className="course-route-arrow">
                                →
                              </span>

                              <span>
                                {course.arrival_landmark ||
                                  t(
                                    'courses.fallback.destination',
                                  )}
                              </span>
                            </div>
                          </td>

                          <td>
                            {getServiceLabel(
                              course.requested_service_tier,
                            )}
                          </td>

                          <td>
                            <span
                              className={`course-status-badge status-${course.status}`}
                            >
                              {getStatusLabel(
                                course.status,
                              )}
                            </span>
                          </td>

                          <td>
                            {formatMoney(
                              amount,
                            )}
                          </td>

                          <td>
                            {formatDate(
                              course.requested_at,
                            )}
                          </td>

                          <td>
                            <button
                              type="button"
                              className="course-row-action"
                              aria-label={t(
                                'courses.viewCourse',
                                {
                                  course:
                                    formatCourseId(
                                      course.id,
                                    ),
                                },
                              )}
                              onClick={() =>
                                navigate(
                                  `/admin/courses/${course.id}`,
                                )
                              }
                            >
                              <ChevronRight
                                size={17}
                              />
                            </button>
                          </td>
                        </tr>
                      )
                    },
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </section>
  )
}

export default Courses