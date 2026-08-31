import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import {
  Banknote,
  BadgePercent,
  CalendarRange,
  CarFront,
  Check,
  ChevronDown,
  CircleAlert,
  Clock3,
  FileCheck2,
  Plus,
  Radio,
  Route,
  SlidersHorizontal,
  Users,
  WalletCards,
} from 'lucide-react'

import {
  Link,
} from 'react-router-dom'

import {
  useTranslation,
} from 'react-i18next'

import {
  useAuth,
} from '../context/authContext'

import {
  canCreateAdministrator,
} from '../utils/adminPermissions'

import {
  getCourses,
} from '../services/courseService'

import {
  getDrivers,
} from '../services/driverService'

import {
  getCustomers,
} from '../services/customerService'

import {
  getPayments,
} from '../services/paymentService'

import {
  getDriverDocuments,
} from '../services/documentService'

import {
  getComplaints,
} from '../services/complaintService'

import CourseActivityCard from '../components/dashboard/CourseActivityCard'
import CourseDistributionCard from '../components/dashboard/CourseDistributionCard'
import OperationalStat from '../components/dashboard/OperationalStat'
import PendingActions from '../components/dashboard/PendingActions'
import RecentCourses from '../components/dashboard/RecentCourses'
import StatCard from '../components/dashboard/StatCard'
import {
  getCommissions,
  getCommissionStats,
  syncCourseCommissions,
  useCommissionRevision,
} from '../services/commissionService'


const PERIOD_OPTIONS = [
  7,
  30,
  365,
]

const DASHBOARD_PERIOD_KEY =
  'djina-dashboard-period'


function normalizeList(data) {
  if (Array.isArray(data)) {
    return data
  }

  return data?.results ?? []
}


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


function isWithinPeriod(
  value,
  periodStart,
) {
  if (!value) {
    return false
  }

  const date =
    new Date(value)

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return false
  }

  return (
    date.getTime() >=
    periodStart.getTime()
  )
}


function Dashboard() {
  useCommissionRevision()
  const {
    user,
  } = useAuth()

  const {
    t,
    i18n,
  } = useTranslation()


  /* =====================================================
     PÉRIODE
  ===================================================== */

  const [
    periodDays,
    setPeriodDays,
  ] = useState(() => {
    const stored =
      Number(
        localStorage.getItem(
          DASHBOARD_PERIOD_KEY,
        ),
      )

    return PERIOD_OPTIONS.includes(
      stored,
    )
      ? stored
      : 7
  })


  const [
    periodMenuOpen,
    setPeriodMenuOpen,
  ] = useState(false)


  const periodRef =
    useRef(null)


  /* =====================================================
     DONNÉES
  ===================================================== */

  const [
    courses,
    setCourses,
  ] = useState([])

  const [
    drivers,
    setDrivers,
  ] = useState([])

  const [
    customers,
    setCustomers,
  ] = useState([])

  const [
    payments,
    setPayments,
  ] = useState([])

  const [
    documents,
    setDocuments,
  ] = useState([])

  const [
    complaints,
    setComplaints,
  ] = useState([])


  /* =====================================================
     ÉTATS
  ===================================================== */

  const [
    isLoading,
    setIsLoading,
  ] = useState(true)

  const [
    error,
    setError,
  ] = useState('')


  /* =====================================================
     LANGUE
  ===================================================== */

  const language =
    i18n.resolvedLanguage ||
    i18n.language ||
    'fr'


  const locale =
    language.startsWith('ar')
      ? 'ar'
      : language.startsWith('en')
        ? 'en-US'
        : 'fr-FR'


  const formatNumber =
    (value) =>
      new Intl.NumberFormat(
        locale,
      ).format(
        Number(value) || 0,
      )


  /* =====================================================
     LIBELLÉ PÉRIODE
  ===================================================== */

  const getPeriodLabel =
    (days) => {
      if (
        language.startsWith(
          'ar',
        )
      ) {
        if (days === 7) {
          return 'آخر 7 أيام'
        }

        if (days === 30) {
          return 'آخر 30 يومًا'
        }

        return 'آخر سنة'
      }


      if (
        language.startsWith(
          'en',
        )
      ) {
        if (days === 7) {
          return 'Last 7 days'
        }

        if (days === 30) {
          return 'Last 30 days'
        }

        return 'Last year'
      }


      if (days === 7) {
        return '7 derniers jours'
      }

      if (days === 30) {
        return '30 derniers jours'
      }

      return '1 an'
    }


  const selectedPeriodLabel =
    getPeriodLabel(
      periodDays,
    )


  const periodStart =
    useMemo(() => {
      const start =
        startOfDay(
          new Date(),
        )

      start.setDate(
        start.getDate() -
          (
            periodDays -
            1
          ),
      )

      return start
    }, [
      periodDays,
    ])


  /* =====================================================
     MÉMORISATION
  ===================================================== */

  useEffect(() => {
    localStorage.setItem(
      DASHBOARD_PERIOD_KEY,
      String(
        periodDays,
      ),
    )
  }, [
    periodDays,
  ])


  /* =====================================================
     FERMETURE MENU PÉRIODE
  ===================================================== */

  useEffect(() => {
    const handlePointerDown =
      (event) => {
        if (
          !periodRef.current
            ?.contains(
              event.target,
            )
        ) {
          setPeriodMenuOpen(
            false,
          )
        }
      }


    const handleKeyDown =
      (event) => {
        if (
          event.key ===
          'Escape'
        ) {
          setPeriodMenuOpen(
            false,
          )
        }
      }


    document.addEventListener(
      'pointerdown',
      handlePointerDown,
    )

    document.addEventListener(
      'keydown',
      handleKeyDown,
    )


    return () => {
      document.removeEventListener(
        'pointerdown',
        handlePointerDown,
      )

      document.removeEventListener(
        'keydown',
        handleKeyDown,
      )
    }
  }, [])


  /* =====================================================
     CHARGEMENT
  ===================================================== */

  const loadDashboard =
    useCallback(
      async ({
        silent = false,
      } = {}) => {
        try {
          if (!silent) {
            setIsLoading(
              true,
            )
          }

          setError('')


          const [
            coursesData,
            driversData,
            customersData,
            paymentsData,
            documentsData,
            complaintsData,
          ] =
            await Promise.all([
              getCourses(),
              getDrivers(),
              getCustomers(),
              getPayments(),
              getDriverDocuments(),
              getComplaints(),
            ])


          setCourses(
            normalizeList(
              coursesData,
            ),
          )

          setDrivers(
            normalizeList(
              driversData,
            ),
          )

          setCustomers(
            normalizeList(
              customersData,
            ),
          )

          setPayments(
            normalizeList(
              paymentsData,
            ),
          )

          setDocuments(
            normalizeList(
              documentsData,
            ),
          )

          setComplaints(
            normalizeList(
              complaintsData,
            ),
          )
        } catch (err) {
          console.error(
            'Dashboard loading error:',
            err,
          )

          setError(
            t(
              'dashboard.loadError',
              {
                defaultValue:
                  'Impossible de charger les données du tableau de bord.',
              },
            ),
          )
        } finally {
          if (!silent) {
            setIsLoading(
              false,
            )
          }
        }
      },
      [
        t,
      ],
    )


  useEffect(() => {
    loadDashboard()
  }, [
    loadDashboard,
  ])


  /* =====================================================
     TEMPS RÉEL
  ===================================================== */

  useEffect(() => {
    const handleRealtime =
      (event) => {
        const resource =
          event?.detail?.resource

        const acceptedResources = [
          'courses',
          'documents',
          'payments',
          'complaints',
          'drivers',
          'customers',
          'vehicles',
        ]

        if (
          resource &&
          !acceptedResources.includes(
            resource,
          )
        ) {
          return
        }

        loadDashboard({
          silent: true,
        })
      }


    window.addEventListener(
      'djina:realtime',
      handleRealtime,
    )


    return () => {
      window.removeEventListener(
        'djina:realtime',
        handleRealtime,
      )
    }
  }, [
    loadDashboard,
  ])


  /* =====================================================
     DONNÉES FILTRÉES
  ===================================================== */

  const filteredCustomers =
    useMemo(
      () =>
        customers.filter(
          (customer) =>
            isWithinPeriod(
              customer.created_at,
              periodStart,
            ),
        ),
      [
        customers,
        periodStart,
      ],
    )


  const filteredDrivers =
    useMemo(
      () =>
        drivers.filter(
          (driver) =>
            isWithinPeriod(
              driver.created_at,
              periodStart,
            ),
        ),
      [
        drivers,
        periodStart,
      ],
    )


  const filteredCourses =
    useMemo(
      () =>
        courses.filter(
          (course) =>
            isWithinPeriod(
              course.requested_at ||
                course.created_at,
              periodStart,
            ),
        ),
      [
        courses,
        periodStart,
      ],
    )


  useEffect(() => {
    if (courses.length) syncCourseCommissions(courses)
  }, [courses])


  /* =====================================================
     STATISTIQUES ACTUELLES
  ===================================================== */

  const dashboardStats =
    useMemo(() => {
      const activeDrivers =
        drivers.filter(
          (driver) =>
            driver.is_online ===
              true &&
            driver.is_enabled ===
              true,
        ).length


      const pendingCourses =
        courses.filter(
          (course) =>
            course.status ===
            'requested',
        ).length


      const pendingDocuments =
        documents.filter(
          (document) =>
            document.status ===
            'pending',
        ).length


      const pendingComplaints =
        complaints.filter(
          (complaint) =>
            complaint.status ===
            'pending',
        ).length


      return {
        activeDrivers,
        pendingCourses,
        pendingDocuments,
        pendingComplaints,
      }
    }, [
      drivers,
      courses,
      documents,
      complaints,
    ])


  /* =====================================================
     REVENUS
  ===================================================== */

  const filteredCourseIds = new Set(filteredCourses.map((course) => String(course.id)))
  const commissionTotals = getCommissionStats(
    getCommissions().filter((commission) => filteredCourseIds.has(String(commission.courseId))),
  )
  /* =====================================================
     CARTES PRINCIPALES
  ===================================================== */

  const primaryStats = [
    {
      title:
        t(
          'dashboard.primaryStats.customers.title',
        ),

      value:
        isLoading
          ? '—'
          : formatNumber(
              filteredCustomers.length,
            ),

      description:
        `${t(
          'dashboard.primaryStats.customers.description',
        )} · ${selectedPeriodLabel}`,

      icon:
        Users,
    },

    {
      title:
        t(
          'dashboard.primaryStats.drivers.title',
        ),

      value:
        isLoading
          ? '—'
          : formatNumber(
              filteredDrivers.length,
            ),

      description:
        `${t(
          'dashboard.primaryStats.drivers.description',
        )} · ${selectedPeriodLabel}`,

      icon:
        CarFront,
    },

    {
      title:
        t(
          'dashboard.primaryStats.rides.title',
        ),

      value:
        isLoading
          ? '—'
          : formatNumber(
              filteredCourses.length,
            ),

      description:
        `${t(
          'dashboard.primaryStats.rides.description',
        )} · ${selectedPeriodLabel}`,

      icon:
        Route,
    },

    {
      title: t('dashboard.primaryStats.revenue.title'),
      value: isLoading ? '—' : formatNumber(commissionTotals.gross),
      unit: 'FCFA',
      description: `${t('dashboard.primaryStats.revenue.description')} · ${selectedPeriodLabel}`,
      icon: Banknote,
    },

  ]

  const financialStats = [
    { title: t('dashboard.commission.generated'), value: isLoading ? '—' : formatNumber(commissionTotals.generated), unit: 'FCFA', description: selectedPeriodLabel, icon: BadgePercent },
    { title: t('dashboard.commission.collected'), value: isLoading ? '—' : formatNumber(commissionTotals.paid), unit: 'FCFA', description: selectedPeriodLabel, icon: Check },
    { title: t('dashboard.commission.pending'), value: isLoading ? '—' : formatNumber(commissionTotals.pending), unit: 'FCFA', description: selectedPeriodLabel, icon: Clock3 },
    { title: t('dashboard.commission.driverNet'), value: isLoading ? '—' : formatNumber(commissionTotals.net), unit: 'FCFA', description: selectedPeriodLabel, icon: WalletCards },
  ]


  /* =====================================================
     STATS OPÉRATIONNELLES
  ===================================================== */

  const operationalStats = [
    {
      label:
        t(
          'dashboard.operationalStats.activeDrivers',
        ),

      value:
        isLoading
          ? '—'
          : dashboardStats.activeDrivers,

      icon:
        Radio,

      tone:
        'green',
    },

    {
      label:
        t(
          'dashboard.operationalStats.pendingRides',
        ),

      value:
        isLoading
          ? '—'
          : dashboardStats.pendingCourses,

      icon:
        Clock3,

      tone:
        'green',
    },

    {
      label:
        t(
          'dashboard.operationalStats.pendingDocuments',
        ),

      value:
        isLoading
          ? '—'
          : dashboardStats.pendingDocuments,

      icon:
        FileCheck2,

      tone:
        'blue',
    },

    {
      label:
        t(
          'dashboard.operationalStats.pendingComplaints',
        ),

      value:
        isLoading
          ? '—'
          : dashboardStats.pendingComplaints,

      icon:
        CircleAlert,

      tone:
        'red',
    },
  ]


  const pendingPayments =
    useMemo(
      () =>
        payments.filter(
          (payment) =>
            payment.status ===
            'pending',
        ).length,
      [
        payments,
      ],
    )


  const handlePeriodChange =
    (days) => {
      setPeriodDays(
        days,
      )

      setPeriodMenuOpen(
        false,
      )
    }


  /* =====================================================
     RENDU
  ===================================================== */

  return (
    <section className="dashboard-page">

      {/* =================================================
          NOUVELLE BARRE DE PILOTAGE
      ================================================= */}

      <section className="dashboard-control-center">

        <div className="dashboard-control-intro">

          <div className="dashboard-control-icon">
            <SlidersHorizontal
              size={18}
              aria-hidden="true"
            />
          </div>

          <div className="dashboard-control-text">
            <span>
              Vue opérationnelle
            </span>

            <strong>
              Piloter les indicateurs
            </strong>

            <small>
              Les données principales suivent la période sélectionnée.
            </small>
          </div>

        </div>


        <div className="dashboard-control-actions">

          {/* ===============================================
              PÉRIODE
          =============================================== */}

          <div
            className="dashboard-period-control"
            ref={
              periodRef
            }
          >
            <button
              className={`dashboard-top-action dashboard-top-action--period ${
                periodMenuOpen
                  ? 'is-open'
                  : ''
              }`}
              type="button"
              aria-haspopup="menu"
              aria-expanded={
                periodMenuOpen
              }
              onClick={() =>
                setPeriodMenuOpen(
                  (current) =>
                    !current,
                )
              }
            >
              <CalendarRange
                size={17}
                aria-hidden="true"
              />

              <span>
                {
                  selectedPeriodLabel
                }
              </span>

              <ChevronDown
                size={15}
                className="dashboard-top-action-chevron"
                aria-hidden="true"
              />
            </button>


            {periodMenuOpen && (
              <div
                className="dashboard-period-menu-modern"
                role="menu"
              >
                <div className="dashboard-period-menu-heading">
                  <span>
                    Période d’analyse
                  </span>

                  <small>
                    Appliquée au tableau de bord
                  </small>
                </div>


                {PERIOD_OPTIONS.map(
                  (days) => {
                    const selected =
                      periodDays ===
                      days

                    return (
                      <button
                        key={
                          days
                        }
                        type="button"
                        className={`dashboard-period-option-modern ${
                          selected
                            ? 'is-selected'
                            : ''
                        }`}
                        onClick={() =>
                          handlePeriodChange(
                            days,
                          )
                        }
                      >
                        <span>
                          {getPeriodLabel(
                            days,
                          )}
                        </span>

                        {selected && (
                          <span className="dashboard-period-check">
                            <Check
                              size={13}
                              aria-hidden="true"
                            />
                          </span>
                        )}
                      </button>
                    )
                  },
                )}

              </div>
            )}
          </div>


          {/* ===============================================
              CRÉER ADMIN
          =============================================== */}

          {canCreateAdministrator(
            user,
          ) && (
            <Link
              className="dashboard-top-action dashboard-top-action--admin"
              to="/admin/users/new"
            >
              <Plus
                size={17}
                aria-hidden="true"
              />

              <span>
                {t(
                  'dashboard.createAdministrator',
                )}
              </span>
            </Link>
          )}

        </div>

      </section>


      {/* =================================================
          ERREUR
      ================================================= */}

      {error && (
        <div className="dashboard-error">
          {error}
        </div>
      )}


      <div className="dashboard-grid">

        <section
          className="kpi-grid"
          aria-label={t(
            'dashboard.aria.primaryIndicators',
          )}
        >
          {primaryStats.map(
            (stat) => (
              <StatCard
                {...stat}
                key={
                  stat.title
                }
              />
            ),
          )}
        </section>


        <section
          className="operational-grid"
          aria-label={t(
            'dashboard.aria.operationalIndicators',
          )}
        >
          {operationalStats.map(
            (stat) => (
              <OperationalStat
                {...stat}
                key={
                  stat.label
                }
              />
            ),
          )}
        </section>

        <section className="commission-dashboard-grid" aria-label={t('dashboard.commission.aria')}>
          {financialStats.map((stat) => <StatCard {...stat} key={stat.title} />)}
        </section>
        <p className="dashboard-commission-note">{t('dashboard.commission.note')}</p>


        <section
          className="insights-grid"
          aria-label={t(
            'dashboard.aria.rideAnalysis',
          )}
        >
          <CourseActivityCard
            courses={
              filteredCourses
            }
            periodDays={
              periodDays
            }
            periodLabel={
              selectedPeriodLabel
            }
            isLoading={
              isLoading
            }
          />


          <CourseDistributionCard
            courses={
              filteredCourses
            }
            isLoading={
              isLoading
            }
          />
        </section>


        <section
          className="dashboard-bottom-grid"
          aria-label={t(
            'dashboard.aria.recentActivity',
          )}
        >
          <RecentCourses
            courses={
              filteredCourses
            }
            isLoading={
              isLoading
            }
          />


          <PendingActions
            pendingDocuments={
              dashboardStats
                .pendingDocuments
            }
            pendingComplaints={
              dashboardStats
                .pendingComplaints
            }
            pendingPayments={
              pendingPayments
            }
            isLoading={
              isLoading
            }
          />
        </section>

      </div>
    </section>
  )
}


export default Dashboard
