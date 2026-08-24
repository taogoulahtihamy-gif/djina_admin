import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function formatCourseId(id) {
  if (!id) {
    return '—'
  }

  return `DJ-${String(id).padStart(5, '0')}`
}

function RecentCourses({
  courses = [],
  isLoading = false,
}) {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

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

    return `${new Intl.NumberFormat(
      locale,
    ).format(amount)} FCFA`
  }

  const getCustomerName = (course) =>
    [
      course.customer?.user?.first_name,
      course.customer?.user?.last_name,
    ]
      .filter(Boolean)
      .join(' ') ||
    t('courses.fallback.customer')

  const getDriverName = (course) =>
    [
      course.driver?.user?.first_name,
      course.driver?.user?.last_name,
    ]
      .filter(Boolean)
      .join(' ') ||
    t('courses.fallback.unassigned')

  const getStatusLabel = (status) =>
    t(`courses.status.${status}`, {
      defaultValue: status || '—',
    })

  const recentCourses = useMemo(() => {
    return [...courses]
      .sort((a, b) => {
        const dateA = new Date(
          a.requested_at ||
            a.created_at ||
            0,
        ).getTime()

        const dateB = new Date(
          b.requested_at ||
            b.created_at ||
            0,
        ).getTime()

        return dateB - dateA
      })
      .slice(0, 3)
  }, [courses])

  return (
    <article className="dashboard-card recent-courses dashboard-block">
      <header className="dashboard-card-header">
        <div>
          <h2>
            {t(
              'dashboard.recentCourses.title',
            )}
          </h2>

          <p>
            {t(
              'dashboard.recentCourses.description',
            )}
          </p>
        </div>
      </header>

      <div className="courses-table-wrap">
        <table className="courses-table">
          <thead>
            <tr>
              <th>
                {t(
                  'dashboard.recentCourses.columns.course',
                )}
              </th>

              <th>
                {t(
                  'dashboard.recentCourses.columns.customer',
                )}
              </th>

              <th>
                {t(
                  'dashboard.recentCourses.columns.driver',
                )}
              </th>

              <th>
                {t(
                  'dashboard.recentCourses.columns.route',
                )}
              </th>

              <th>
                {t(
                  'dashboard.recentCourses.columns.status',
                )}
              </th>

              <th>
                {t(
                  'dashboard.recentCourses.columns.amount',
                )}
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              Array.from(
                { length: 3 },
                (_, index) => (
                  <tr key={index}>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                    <td>—</td>
                  </tr>
                ),
              )
            ) : recentCourses.length === 0 ? (
              <tr>
                <td colSpan="6">
                  —
                </td>
              </tr>
            ) : (
              recentCourses.map(
                (course) => {
                  const route = `${
                    course.starting_landmark ||
                    t(
                      'courses.fallback.departure',
                    )
                  } → ${
                    course.arrival_landmark ||
                    t(
                      'courses.fallback.destination',
                    )
                  }`

                  const amount =
                    course.status ===
                      'completed' &&
                    Number(
                      course.final_price,
                    ) > 0
                      ? course.final_price
                      : course.initial_price

                  return (
                    <tr
                      key={course.id}
                      onClick={() =>
                        navigate(
                          `/admin/courses/${course.id}`,
                        )
                      }
                      style={{
                        cursor: 'pointer',
                      }}
                    >
                      <td
                        data-label={t(
                          'dashboard.recentCourses.columns.course',
                        )}
                      >
                        <strong>
                          {formatCourseId(
                            course.id,
                          )}
                        </strong>
                      </td>

                      <td
                        data-label={t(
                          'dashboard.recentCourses.columns.customer',
                        )}
                      >
                        {getCustomerName(
                          course,
                        )}
                      </td>

                      <td
                        data-label={t(
                          'dashboard.recentCourses.columns.driver',
                        )}
                      >
                        {getDriverName(
                          course,
                        )}
                      </td>

                      <td
                        data-label={t(
                          'dashboard.recentCourses.columns.route',
                        )}
                      >
                        {route}
                      </td>

                      <td
                        data-label={t(
                          'dashboard.recentCourses.columns.status',
                        )}
                      >
                        {getStatusLabel(
                          course.status,
                        )}
                      </td>

                      <td
                        data-label={t(
                          'dashboard.recentCourses.columns.amount',
                        )}
                      >
                        {formatMoney(
                          amount,
                        )}
                      </td>
                    </tr>
                  )
                },
              )
            )}
          </tbody>
        </table>
      </div>
    </article>
  )
}

export default RecentCourses