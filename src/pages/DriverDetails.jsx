import { useEffect, useState } from 'react'
import {
  useNavigate,
  useParams,
} from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowLeft,
  Bike,
  CarFront,
  ChevronRight,
  Mail,
  Phone,
  Route,
  Star,
  UserRound,
  Wifi,
} from 'lucide-react'

import { getDriverById } from '../services/driverService'
import { getVehicles } from '../services/vehicleService'
import { getCourses } from '../services/courseService'
import Spinner from '../components/Spinner'

function formatCourseId(id) {
  return `DJ-${String(id).padStart(5, '0')}`
}

function DriverDetails() {
  const { driverId } = useParams()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  const [driver, setDriver] = useState(null)
  const [vehicles, setVehicles] = useState([])
  const [courses, setCourses] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [vehiclesLoading, setVehiclesLoading] =
    useState(true)
  const [coursesLoading, setCoursesLoading] =
    useState(true)

  const [error, setError] = useState('')

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

  const getDriverName = (value) =>
    [
      value?.user?.first_name,
      value?.user?.last_name,
    ]
      .filter(Boolean)
      .join(' ') ||
    t('drivers.fallback.driver')

  const getCourseStatus = (status) =>
    t(`courses.status.${status}`, {
      defaultValue: status || '—',
    })

  const getVehicleType = (type) =>
    t(
      `driverDetails.vehicleTypes.${type}`,
      {
        defaultValue: type || '—',
      },
    )

  useEffect(() => {
    const loadDriver = async () => {
      try {
        setIsLoading(true)
        setError('')

        const data =
          await getDriverById(driverId)

        setDriver(data)
      } catch (err) {
        console.error(err)

        setError(
          t(
            'driverDetails.errors.load',
          ),
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadDriver()
  }, [driverId])

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setVehiclesLoading(true)

        const data =
          await getVehicles()

        setVehicles(
          Array.isArray(data)
            ? data
            : data?.results ?? [],
        )
      } catch (err) {
        console.error(err)
        setVehicles([])
      } finally {
        setVehiclesLoading(false)
      }
    }

    loadVehicles()
  }, [])

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setCoursesLoading(true)

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
        setCoursesLoading(false)
      }
    }

    loadCourses()
  }, [])

  if (isLoading) {
    return (
      <section className="driver-details-page">
        <div className="drivers-loading">
          <Spinner />
        </div>
      </section>
    )
  }

  if (error || !driver) {
    return (
      <section className="driver-details-page">
        <button
          type="button"
          className="driver-back-link"
          onClick={() =>
            navigate('/admin/drivers')
          }
        >
          <ArrowLeft size={17} />

          {t(
            'driverDetails.back',
          )}
        </button>

        <div className="drivers-table-state is-error">
          <strong>
            {t(
              'driverDetails.errors.notFound',
            )}
          </strong>

          <p>{error}</p>
        </div>
      </section>
    )
  }

  const driverName =
    getDriverName(driver)

  const driverVehicles =
    vehicles.filter(
      (vehicle) =>
        vehicle.driver?.id ===
          driver.id ||
        vehicle.driver === driver.id,
    )

  const primaryVehicle =
    driverVehicles[0] || null

  const driverCourses =
    courses.filter(
      (course) =>
        course.driver?.id ===
          driver.id ||
        course.driver === driver.id,
    )

  const completedCourses =
    driverCourses.filter(
      (course) =>
        course.status === 'completed',
    ).length

  const cancelledCourses =
    driverCourses.filter(
      (course) =>
        course.status === 'cancelled',
    ).length

  const activeCourses =
    driverCourses.filter((course) =>
      [
        'accepted',
        'arriving',
        'picked_up',
      ].includes(course.status),
    ).length

  const sortedCourses = [
    ...driverCourses,
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
    <section className="driver-details-page">
      <div className="driver-details-topline">
        <button
          type="button"
          className="driver-back-link"
          onClick={() =>
            navigate('/admin/drivers')
          }
        >
          <ArrowLeft size={17} />

          {t(
            'driverDetails.back',
          )}
        </button>

        <div className="driver-details-statuses">
          <span
            className={`driver-status-badge ${
              driver.is_online
                ? 'is-online'
                : 'is-offline'
            }`}
          >
            <span />

            {driver.is_online
              ? t(
                  'drivers.status.online',
                )
              : t(
                  'drivers.status.offline',
                )}
          </span>

          <span
            className={`driver-account-badge ${
              driver.is_enabled
                ? 'is-enabled'
                : 'is-disabled'
            }`}
          >
            {driver.is_enabled
              ? t(
                  'driverDetails.account.active',
                )
              : t(
                  'driverDetails.account.disabled',
                )}
          </span>
        </div>
      </div>

      <section className="driver-summary-card">
        <div className="driver-summary-identity">
          <span className="driver-summary-avatar">
            {driver.user?.first_name?.[0] ||
              'C'}
          </span>

          <div>
            <span className="driver-summary-label">
              {t(
                'driverDetails.driverNumber',
                {
                  id: driver.id,
                },
              )}
            </span>

            <h2>{driverName}</h2>

            <p>
              {t(
                'driverDetails.profileDescription',
              )}
            </p>
          </div>
        </div>

        <div className="driver-summary-metrics">
          <div>
            <span>
              {t(
                'driverDetails.summary.rating',
              )}
            </span>

            <strong>
              {Number(
                driver.rating_count,
              ) > 0
                ? Number(
                    driver.rating_avg,
                  ).toFixed(1)
                : '—'}
            </strong>
          </div>

          <div>
            <span>
              {t(
                'driverDetails.summary.ratings',
              )}
            </span>

            <strong>
              {driver.rating_count || 0}
            </strong>
          </div>

          <div>
            <span>
              {t(
                'driverDetails.summary.availability',
              )}
            </span>

            <strong>
              {driver.is_online
                ? t(
                    'drivers.status.online',
                  )
                : t(
                    'drivers.status.offline',
                  )}
            </strong>
          </div>
        </div>
      </section>

      <div className="driver-details-grid">
        <section className="driver-detail-card">
          <div className="driver-detail-card-heading">
            <UserRound size={18} />

            <div>
              <h3>
                {t(
                  'driverDetails.personal.title',
                )}
              </h3>

              <p>
                {t(
                  'driverDetails.personal.description',
                )}
              </p>
            </div>
          </div>

          <div className="driver-detail-list">
            <div>
              <span>
                {t(
                  'driverDetails.fields.name',
                )}
              </span>

              <strong>
                {driverName}
              </strong>
            </div>

            <div>
              <span>
                <Phone size={15} />

                {t(
                  'driverDetails.fields.phone',
                )}
              </span>

              <strong>
                {driver.user?.phone ||
                  '—'}
              </strong>
            </div>

            <div>
              <span>
                <Mail size={15} />

                {t(
                  'driverDetails.fields.email',
                )}
              </span>

              <strong>
                {driver.user?.email ||
                  '—'}
              </strong>
            </div>
          </div>
        </section>

        <section className="driver-detail-card">
          <div className="driver-detail-card-heading">
            <Wifi size={18} />

            <div>
              <h3>
                {t(
                  'driverDetails.state.title',
                )}
              </h3>

              <p>
                {t(
                  'driverDetails.state.description',
                )}
              </p>
            </div>
          </div>

          <div className="driver-detail-list">
            <div>
              <span>
                {t(
                  'driverDetails.fields.availability',
                )}
              </span>

              <strong>
                {driver.is_online
                  ? t(
                      'drivers.status.online',
                    )
                  : t(
                      'drivers.status.offline',
                    )}
              </strong>
            </div>

            <div>
              <span>
                {t(
                  'driverDetails.fields.account',
                )}
              </span>

              <strong>
                {driver.is_enabled
                  ? t(
                      'drivers.status.enabled',
                    )
                  : t(
                      'drivers.status.disabled',
                    )}
              </strong>
            </div>

            <div>
              <span>
                <Star size={15} />

                {t(
                  'driverDetails.fields.averageRating',
                )}
              </span>

              <strong>
                {Number(
                  driver.rating_count,
                ) > 0
                  ? `${Number(
                      driver.rating_avg,
                    ).toFixed(1)} / 5`
                  : t(
                      'driverDetails.noRating',
                    )}
              </strong>
            </div>
          </div>
        </section>

        <section className="driver-detail-card">
          <div className="driver-detail-card-heading">
            <CarFront size={18} />

            <div>
              <h3>
                {t(
                  'driverDetails.vehicle.title',
                )}
              </h3>

              <p>
                {t(
                  'driverDetails.vehicle.description',
                )}
              </p>
            </div>
          </div>

          {vehiclesLoading ? (
            <div className="driver-empty-module">
              <Spinner />
            </div>
          ) : primaryVehicle ? (
            <div className="driver-detail-list">
              <div>
                <span>
                  {t(
                    'driverDetails.vehicle.model',
                  )}
                </span>

                <strong>
                  {primaryVehicle.model ||
                    '—'}
                </strong>
              </div>

              <div>
                <span>
                  {t(
                    'driverDetails.vehicle.type',
                  )}
                </span>

                <strong>
                  {getVehicleType(
                    primaryVehicle.type,
                  )}
                </strong>
              </div>

              <div>
                <span>
                  {t(
                    'driverDetails.vehicle.licensePlate',
                  )}
                </span>

                <strong>
                  {primaryVehicle.license_plate ||
                    '—'}
                </strong>
              </div>

              <div>
                <span>
                  {t(
                    'driverDetails.vehicle.comfort',
                  )}
                </span>

                <strong>
                  {primaryVehicle.with_comfort
                    ? t(
                        'driverDetails.common.yes',
                      )
                    : t(
                        'driverDetails.common.no',
                      )}
                </strong>
              </div>

              <div>
                <span>
                  {t(
                    'driverDetails.vehicle.state',
                  )}
                </span>

                <strong>
                  {primaryVehicle.is_active
                    ? t(
                        'driverDetails.vehicle.active',
                      )
                    : t(
                        'driverDetails.vehicle.inactive',
                      )}
                </strong>
              </div>
            </div>
          ) : (
            <div className="driver-empty-module">
              <CarFront
                size={23}
                strokeWidth={1.6}
              />

              <strong>
                {t(
                  'driverDetails.vehicle.none',
                )}
              </strong>

              <p>
                {t(
                  'driverDetails.vehicle.noneDescription',
                )}
              </p>
            </div>
          )}
        </section>

        <section className="driver-detail-card">
          <div className="driver-detail-card-heading">
            <Bike size={18} />

            <div>
              <h3>
                {t(
                  'driverDetails.activity.title',
                )}
              </h3>

              <p>
                {t(
                  'driverDetails.activity.description',
                )}
              </p>
            </div>
          </div>

          {coursesLoading ? (
            <div className="driver-empty-module">
              <Spinner />
            </div>
          ) : driverCourses.length === 0 ? (
            <div className="driver-empty-module">
              <Bike
                size={23}
                strokeWidth={1.6}
              />

              <strong>
                {t(
                  'driverDetails.activity.noCourses',
                )}
              </strong>

              <p>
                {t(
                  'driverDetails.activity.noCoursesDescription',
                )}
              </p>
            </div>
          ) : (
            <div className="driver-activity-content">
              <div className="driver-activity-stats">
                <div>
                  <span>
                    {t(
                      'driverDetails.activity.total',
                    )}
                  </span>

                  <strong>
                    {driverCourses.length}
                  </strong>
                </div>

                <div>
                  <span>
                    {t(
                      'driverDetails.activity.completed',
                    )}
                  </span>

                  <strong>
                    {completedCourses}
                  </strong>
                </div>

                <div>
                  <span>
                    {t(
                      'driverDetails.activity.active',
                    )}
                  </span>

                  <strong>
                    {activeCourses}
                  </strong>
                </div>

                <div>
                  <span>
                    {t(
                      'driverDetails.activity.cancelled',
                    )}
                  </span>

                  <strong>
                    {cancelledCourses}
                  </strong>
                </div>
              </div>

              {latestCourse && (
                <button
                  type="button"
                  className="driver-latest-course"
                  onClick={() =>
                    navigate(
                      `/admin/courses/${latestCourse.id}`,
                    )
                  }
                >
                  <div className="driver-latest-course-icon">
                    <Route size={17} />
                  </div>

                  <div className="driver-latest-course-info">
                    <span>
                      {t(
                        'driverDetails.activity.latestCourse',
                      )}
                    </span>

                    <strong>
                      {formatCourseId(
                        latestCourse.id,
                      )}
                    </strong>

                    <small>
                      {latestCourse.starting_landmark ||
                        t(
                          'courses.fallback.departure',
                        )}
                      {' → '}
                      {latestCourse.arrival_landmark ||
                        t(
                          'courses.fallback.destination',
                        )}
                    </small>
                  </div>

                  <div className="driver-latest-course-meta">
                    <span
                      className={`course-status-badge status-${latestCourse.status}`}
                    >
                      {getCourseStatus(
                        latestCourse.status,
                      )}
                    </span>

                    <strong>
                      {formatMoney(
                        latestCourse.status ===
                          'completed'
                          ? latestCourse.final_price
                          : latestCourse.initial_price,
                      )}
                    </strong>
                  </div>

                  <ChevronRight
                    size={18}
                  />
                </button>
              )}
            </div>
          )}
        </section>
      </div>
    </section>
  )
}

export default DriverDetails