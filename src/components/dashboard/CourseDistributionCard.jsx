import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

function CourseDistributionCard({
  courses = [],
  isLoading = false,
}) {
  const { t } = useTranslation()

  const distribution = useMemo(() => {
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

    const cancelled = courses.filter(
      (course) =>
        course.status === 'cancelled',
    ).length

    const total =
      pending +
      active +
      completed +
      cancelled

    return [
      {
        key: 'pending',
        label: t(
          'dashboard.distributionCard.status.pending',
        ),
        value: pending,
      },
      {
        key: 'active',
        label: t(
          'dashboard.distributionCard.status.active',
        ),
        value: active,
      },
      {
        key: 'completed',
        label: t(
          'dashboard.distributionCard.status.completed',
        ),
        value: completed,
      },
      {
        key: 'cancelled',
        label: t(
          'dashboard.distributionCard.status.cancelled',
        ),
        value: cancelled,
      },
    ].map((item) => ({
      ...item,
      percentage:
        total > 0
          ? Math.round(
              (item.value / total) * 100,
            )
          : 0,
    }))
  }, [courses, t])

  return (
    <article className="dashboard-card distribution-card dashboard-block">
      <header className="dashboard-card-header">
        <div>
          <h2>
            {t(
              'dashboard.distributionCard.title',
            )}
          </h2>

          <p>
            {t(
              'dashboard.distributionCard.description',
            )}
          </p>
        </div>
      </header>

      <div className="distribution-list">
        {distribution.map((item) => (
          <div
            className="distribution-row"
            key={item.key}
          >
            <div className="distribution-row-label">
              <span>{item.label}</span>

              <strong>
                {isLoading
                  ? '—'
                  : item.value}
              </strong>
            </div>

            <div
              className="distribution-track"
              aria-hidden="true"
            >
              <span
                style={{
                  width: `${
                    isLoading
                      ? 0
                      : item.percentage
                  }%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}

export default CourseDistributionCard