import {
  useMemo,
} from 'react'

import {
  useTranslation,
} from 'react-i18next'


function startOfDay(date) {
  const result =
    new Date(date)

  result.setHours(
    0,
    0,
    0,
    0,
  )

  return result
}


function getCourseDate(
  course,
) {
  const value =
    course.requested_at ||
    course.created_at

  if (!value) {
    return null
  }

  const date =
    new Date(value)

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return null
  }

  return date
}


function CourseActivityCard({
  courses = [],
  periodDays = 7,
  periodLabel = '',
  isLoading = false,
}) {
  const {
    t,
    i18n,
  } = useTranslation()


  /* =====================================================
     LANGUE
  ===================================================== */

  const language =
    i18n.resolvedLanguage ||
    i18n.language ||
    'fr'


  const locale =
    language.startsWith(
      'ar',
    )
      ? 'ar'
      : language.startsWith(
            'en',
          )
        ? 'en-US'
        : 'fr-FR'


  /* =====================================================
     ACTIVITÉ
  ===================================================== */

  const activity =
    useMemo(() => {

      /*
       * ===================================================
       * 1 AN
       * Affichage par mois pour éviter 365 barres.
       * ===================================================
       */

      if (
        periodDays === 365
      ) {
        const today =
          new Date()

        const months =
          Array.from(
            {
              length: 12,
            },

            (
              _,
              index,
            ) => {
              const date =
                new Date(
                  today.getFullYear(),
                  today.getMonth() -
                    (
                      11 -
                      index
                    ),
                  1,
                )

              return {
                date,
                count: 0,

                key:
                  `${date.getFullYear()}-${date.getMonth()}`,
              }
            },
          )


        const monthMap =
          new Map(
            months.map(
              (item) => [
                item.key,
                item,
              ],
            ),
          )


        courses.forEach(
          (course) => {
            const courseDate =
              getCourseDate(
                course,
              )

            if (!courseDate) {
              return
            }

            const key =
              `${courseDate.getFullYear()}-${courseDate.getMonth()}`

            const month =
              monthMap.get(
                key,
              )

            if (month) {
              month.count += 1
            }
          },
        )


        return months
      }


      /*
       * ===================================================
       * 7 OU 30 JOURS
       * Affichage jour par jour.
       * ===================================================
       */

      const today =
        startOfDay(
          new Date(),
        )


      const days =
        Array.from(
          {
            length:
              periodDays,
          },

          (
            _,
            index,
          ) => {
            const date =
              new Date(
                today,
              )

            date.setDate(
              today.getDate() -
                (
                  periodDays -
                  1 -
                  index
                ),
            )

            return {
              date,
              count: 0,
            }
          },
        )


      const dayMap =
        new Map(
          days.map(
            (item) => [
              item.date
                .getTime(),

              item,
            ],
          ),
        )


      courses.forEach(
        (course) => {
          const rawDate =
            getCourseDate(
              course,
            )

          if (!rawDate) {
            return
          }

          const courseDate =
            startOfDay(
              rawDate,
            )


          const day =
            dayMap.get(
              courseDate
                .getTime(),
            )


          if (day) {
            day.count += 1
          }
        },
      )


      return days
    }, [
      courses,
      periodDays,
    ])


  /* =====================================================
     MAX
  ===================================================== */

  const maxValue =
    Math.max(
      1,

      ...activity.map(
        (item) =>
          item.count,
      ),
    )


  const scaledMax =
    maxValue <= 5
      ? 10
      : maxValue


  /* =====================================================
     FORMAT VALEUR
  ===================================================== */

  const formatValue =
    (value) =>
      new Intl.NumberFormat(
        locale,
      ).format(
        value,
      )


  /* =====================================================
     FORMAT LABEL
  ===================================================== */

  const formatLabel =
    (date) => {

      /*
       * 1 an → mois
       */
      if (
        periodDays === 365
      ) {
        return new Intl.DateTimeFormat(
          locale,
          {
            month:
              'short',
          },
        ).format(
          date,
        )
      }


      /*
       * 30 jours → jour/mois
       */
      if (
        periodDays === 30
      ) {
        return new Intl.DateTimeFormat(
          locale,
          {
            day:
              '2-digit',

            month:
              '2-digit',
          },
        ).format(
          date,
        )
      }


      /*
       * 7 jours → lun., mar., etc.
       */
      return new Intl.DateTimeFormat(
        locale,
        {
          weekday:
            'short',
        },
      ).format(
        date,
      )
    }


  /* =====================================================
     TOOLTIP
  ===================================================== */

  const formatTooltip =
    (date) => {
      if (
        periodDays === 365
      ) {
        return new Intl.DateTimeFormat(
          locale,
          {
            month:
              'long',

            year:
              'numeric',
          },
        ).format(
          date,
        )
      }


      return new Intl.DateTimeFormat(
        locale,
        {
          weekday:
            'long',

          day:
            'numeric',

          month:
            'long',

          year:
            'numeric',
        },
      ).format(
        date,
      )
    }


  /* =====================================================
     LARGEUR DU GRAPHIQUE
  ===================================================== */

  const chartMinWidth =
    periodDays === 30
      ? '980px'
      : '100%'


  /* =====================================================
     RENDU
  ===================================================== */

  return (
    <article className="dashboard-card activity-card dashboard-block">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="dashboard-card-header">
        <div>
          <h2>
            {t(
              'dashboard.activityCard.title',
            )}
          </h2>

          <p>
            {t(
              'dashboard.activityCard.description',
            )}
          </p>
        </div>


        {/* PÉRIODE GLOBALE */}

        <span className="activity-period-badge">
          {periodLabel}
        </span>
      </header>


      {/* =================================================
          GRAPHIQUE
      ================================================= */}

      <div
        className={`activity-bars-chart activity-bars-chart--${periodDays}`}
        aria-label={t(
          'dashboard.activityCard.chartAria',
        )}
      >
        {isLoading ? (
          <div className="activity-chart-empty">
            —
          </div>
        ) : (
          <>

            {/* GRILLE */}

            <div
              className="activity-bars-grid"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
              <span />
            </div>


            {/* SCROLL POUR 30 JOURS */}

            <div className="activity-bars-scroll">

              <div
                className="activity-bars"
                style={{
                  gridTemplateColumns:
                    `repeat(${activity.length}, minmax(32px, 1fr))`,

                  minWidth:
                    chartMinWidth,
                }}
              >
                {activity.map(
                  (
                    item,
                    index,
                  ) => {

                    const percentage =
                      item.count === 0
                        ? 0
                        : Math.max(
                            6,

                            (
                              item.count /
                              scaledMax
                            ) * 78,
                          )


                    return (
                      <div
                        className="activity-bar-column"
                        key={`${item.date.toISOString()}-${index}`}
                      >

                        {/* NOMBRE */}

                        <div className="activity-bar-value">
                          {formatValue(
                            item.count,
                          )}
                        </div>


                        {/* BARRE */}

                        <div className="activity-bar-area">
                          <div
                            className={`activity-bar ${
                              item.count === 0
                                ? 'is-empty'
                                : ''
                            }`}
                            style={{
                              height:
                                `${percentage}%`,
                            }}
                            title={`${formatTooltip(
                              item.date,
                            )} : ${formatValue(
                              item.count,
                            )}`}
                          />
                        </div>


                        {/* JOUR / MOIS */}

                        <span className="activity-bar-day">
                          {formatLabel(
                            item.date,
                          )}
                        </span>

                      </div>
                    )
                  },
                )}

              </div>
            </div>

          </>
        )}
      </div>
    </article>
  )
}


export default CourseActivityCard