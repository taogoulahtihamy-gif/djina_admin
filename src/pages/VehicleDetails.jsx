import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowLeft,
  CalendarDays,
  CarFront,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from 'lucide-react'

import { getVehicleById } from '../services/vehicleService'
import Spinner from '../components/Spinner'

function VehicleDetails() {
  const { vehicleId } = useParams()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  const [vehicle, setVehicle] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const locale =
    i18n.resolvedLanguage === 'ar'
      ? 'ar'
      : i18n.resolvedLanguage === 'en'
        ? 'en-US'
        : 'fr-FR'

  const getDriverName = (value) => {
    const driver = value?.driver

    if (!driver) {
      return t('vehicles.fallback.unassigned')
    }

    return (
      [
        driver.user?.first_name,
        driver.user?.last_name,
      ]
        .filter(Boolean)
        .join(' ') ||
      t('vehicles.fallback.driver')
    )
  }

  const getVehicleType = (type) =>
    t(`vehicles.types.${type}`, {
      defaultValue: type || '—',
    })

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

  useEffect(() => {
    const loadVehicle = async () => {
      try {
        setIsLoading(true)
        setError('')

        const data = await getVehicleById(vehicleId)

        setVehicle(data)
      } catch (err) {
        console.error(err)

        setError(
          t('vehicleDetails.errors.load'),
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadVehicle()
  }, [vehicleId, t])

  if (isLoading) {
    return (
      <section className="vehicle-details-page">
        <div className="vehicles-loading">
          <Spinner />
        </div>
      </section>
    )
  }

  if (error || !vehicle) {
    return (
      <section className="vehicle-details-page">
        <button
          type="button"
          className="vehicle-back-link"
          onClick={() =>
            navigate('/admin/vehicles')
          }
        >
          <ArrowLeft size={17} />

          {t('vehicleDetails.back')}
        </button>

        <div className="vehicles-table-state is-error">
          <strong>
            {t(
              'vehicleDetails.errors.notFound',
            )}
          </strong>

          <p>{error}</p>
        </div>
      </section>
    )
  }

  const driverName =
    getDriverName(vehicle)

  return (
    <section className="vehicle-details-page">
      <div className="vehicle-details-topline">
        <button
          type="button"
          className="vehicle-back-link"
          onClick={() =>
            navigate('/admin/vehicles')
          }
        >
          <ArrowLeft size={17} />

          {t('vehicleDetails.back')}
        </button>

        <span
          className={`vehicle-status-badge ${
            vehicle.is_active
              ? 'is-active'
              : 'is-inactive'
          }`}
        >
          <span />

          {vehicle.is_active
            ? t('vehicles.status.active')
            : t('vehicles.status.inactive')}
        </span>
      </div>

      <section className="vehicle-summary-card">
        <div className="vehicle-summary-identity">
          <span className="vehicle-summary-icon">
            <CarFront size={23} />
          </span>

          <div>
            <span className="vehicle-summary-label">
              {t(
                'vehicleDetails.vehicleNumber',
                {
                  id: vehicle.id,
                },
              )}
            </span>

            <h2>
              {vehicle.model ||
                t('vehicles.fallback.vehicle')}
            </h2>

            <p>
              {vehicle.license_plate || '—'}
            </p>
          </div>
        </div>

        <div className="vehicle-summary-metrics">
          <div>
            <span>
              {t(
                'vehicleDetails.summary.type',
              )}
            </span>

            <strong>
              {getVehicleType(vehicle.type)}
            </strong>
          </div>

          <div>
            <span>
              {t(
                'vehicleDetails.summary.comfort',
              )}
            </span>

            <strong>
              {vehicle.with_comfort
                ? t('vehicles.common.yes')
                : t('vehicles.common.no')}
            </strong>
          </div>

          <div>
            <span>
              {t(
                'vehicleDetails.summary.state',
              )}
            </span>

            <strong>
              {vehicle.is_active
                ? t('vehicles.status.active')
                : t(
                    'vehicles.status.inactive',
                  )}
            </strong>
          </div>
        </div>
      </section>

      <div className="vehicle-details-grid">
        <section className="vehicle-detail-card">
          <div className="vehicle-detail-card-heading">
            <CarFront size={18} />

            <div>
              <h3>
                {t(
                  'vehicleDetails.information.title',
                )}
              </h3>

              <p>
                {t(
                  'vehicleDetails.information.description',
                )}
              </p>
            </div>
          </div>

          <div className="vehicle-detail-list">
            <div>
              <span>
                {t(
                  'vehicleDetails.fields.model',
                )}
              </span>

              <strong>
                {vehicle.model || '—'}
              </strong>
            </div>

            <div>
              <span>
                {t(
                  'vehicleDetails.fields.type',
                )}
              </span>

              <strong>
                {getVehicleType(vehicle.type)}
              </strong>
            </div>

            <div>
              <span>
                {t(
                  'vehicleDetails.fields.licensePlate',
                )}
              </span>

              <strong>
                {vehicle.license_plate || '—'}
              </strong>
            </div>

            <div>
              <span>
                <ShieldCheck size={15} />

                {t(
                  'vehicleDetails.fields.comfort',
                )}
              </span>

              <strong>
                {vehicle.with_comfort
                  ? t('vehicles.common.yes')
                  : t('vehicles.common.no')}
              </strong>
            </div>

            <div>
              <span>
                <CalendarDays size={15} />

                {t(
                  'vehicleDetails.fields.registeredAt',
                )}
              </span>

              <strong>
                {formatDate(
                  vehicle.created_at,
                )}
              </strong>
            </div>
          </div>
        </section>

        <section className="vehicle-detail-card">
          <div className="vehicle-detail-card-heading">
            <UserRound size={18} />

            <div>
              <h3>
                {t(
                  'vehicleDetails.driver.title',
                )}
              </h3>

              <p>
                {t(
                  'vehicleDetails.driver.description',
                )}
              </p>
            </div>
          </div>

          {vehicle.driver ? (
            <div className="vehicle-detail-list">
              <div>
                <span>
                  {t(
                    'vehicleDetails.fields.name',
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
                    'vehicleDetails.fields.phone',
                  )}
                </span>

                <strong>
                  {vehicle.driver?.user?.phone ||
                    '—'}
                </strong>
              </div>

              <div>
                <span>
                  <Mail size={15} />

                  {t(
                    'vehicleDetails.fields.email',
                  )}
                </span>

                <strong>
                  {vehicle.driver?.user?.email ||
                    '—'}
                </strong>
              </div>

              <div>
                <span>
                  {t(
                    'vehicleDetails.fields.driver',
                  )}
                </span>

                <strong>
                  #{vehicle.driver.id}
                </strong>
              </div>
            </div>
          ) : (
            <div className="vehicle-empty-module">
              <UserRound
                size={23}
                strokeWidth={1.6}
              />

              <strong>
                {t(
                  'vehicleDetails.driver.none',
                )}
              </strong>

              <p>
                {t(
                  'vehicleDetails.driver.noneDescription',
                )}
              </p>
            </div>
          )}
        </section>

        <section className="vehicle-detail-card vehicle-image-card">
          <div className="vehicle-detail-card-heading">
            <CarFront size={18} />

            <div>
              <h3>
                {t(
                  'vehicleDetails.image.title',
                )}
              </h3>

              <p>
                {t(
                  'vehicleDetails.image.description',
                )}
              </p>
            </div>
          </div>

          {vehicle.image ? (
            <div className="vehicle-image-wrapper">
              <img
                src={vehicle.image}
                alt={
                  vehicle.model ||
                  t(
                    'vehicles.fallback.vehicle',
                  )
                }
              />
            </div>
          ) : (
            <div className="vehicle-empty-module">
              <CarFront
                size={23}
                strokeWidth={1.6}
              />

              <strong>
                {t(
                  'vehicleDetails.image.none',
                )}
              </strong>

              <p>
                {t(
                  'vehicleDetails.image.noneDescription',
                )}
              </p>
            </div>
          )}
        </section>
      </div>
    </section>
  )
}

export default VehicleDetails