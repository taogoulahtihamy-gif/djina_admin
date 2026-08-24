import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  CarFront,
  CheckCircle2,
  ChevronRight,
  RefreshCw,
  Search,
  ShieldCheck,
  XCircle,
} from 'lucide-react'

import { getVehicles } from '../services/vehicleService'
import Spinner from '../components/Spinner'

function Vehicles() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [vehicles, setVehicles] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const getDriverName = (vehicle) => {
    const driver = vehicle.driver

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

  const loadVehicles = async ({ refresh = false } = {}) => {
    try {
      if (refresh) {
        setIsRefreshing(true)
      } else {
        setIsLoading(true)
      }

      setError('')

      const data = await getVehicles()

      setVehicles(
        Array.isArray(data)
          ? data
          : data?.results ?? [],
      )
    } catch (err) {
      console.error(err)

      setError(t('vehicles.errors.load'))
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    loadVehicles()
  }, [])

  const stats = useMemo(() => {
    return {
      total: vehicles.length,

      active: vehicles.filter(
        (vehicle) => vehicle.is_active,
      ).length,

      inactive: vehicles.filter(
        (vehicle) => !vehicle.is_active,
      ).length,

      comfort: vehicles.filter(
        (vehicle) => vehicle.with_comfort,
      ).length,
    }
  }, [vehicles])

  const filteredVehicles = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase()

    return vehicles.filter((vehicle) => {
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' &&
          vehicle.is_active) ||
        (statusFilter === 'inactive' &&
          !vehicle.is_active)

      if (!matchesStatus) {
        return false
      }

      if (!normalizedSearch) {
        return true
      }

      const searchable = [
        vehicle.model,
        vehicle.license_plate,
        getVehicleType(vehicle.type),
        vehicle.type,
        getDriverName(vehicle),
        vehicle.driver?.user?.email,
        vehicle.driver?.user?.phone,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return searchable.includes(
        normalizedSearch,
      )
    })
  }, [
    vehicles,
    search,
    statusFilter,
    t,
  ])

  if (isLoading) {
    return (
      <section className="vehicles-page">
        <div className="vehicles-loading">
          <Spinner />
        </div>
      </section>
    )
  }

  return (
    <section className="vehicles-page">
      <div className="vehicles-stats-grid">
        <article className="vehicles-stat-card">
          <span className="vehicles-stat-icon">
            <CarFront size={18} />
          </span>

          <div>
            <span>
              {t('vehicles.stats.total')}
            </span>

            <strong>{stats.total}</strong>
          </div>
        </article>

        <article className="vehicles-stat-card">
          <span className="vehicles-stat-icon is-active">
            <CheckCircle2 size={18} />
          </span>

          <div>
            <span>
              {t('vehicles.stats.active')}
            </span>

            <strong>{stats.active}</strong>
          </div>
        </article>

        <article className="vehicles-stat-card">
          <span className="vehicles-stat-icon is-inactive">
            <XCircle size={18} />
          </span>

          <div>
            <span>
              {t('vehicles.stats.inactive')}
            </span>

            <strong>{stats.inactive}</strong>
          </div>
        </article>

        <article className="vehicles-stat-card">
          <span className="vehicles-stat-icon is-comfort">
            <ShieldCheck size={18} />
          </span>

          <div>
            <span>
              {t('vehicles.stats.comfort')}
            </span>

            <strong>{stats.comfort}</strong>
          </div>
        </article>
      </div>

      <section className="vehicles-list-card">
        <div className="vehicles-list-toolbar">
          <div className="vehicles-search">
            <Search size={17} />

            <input
              type="search"
              placeholder={t(
                'vehicles.searchPlaceholder',
              )}
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              aria-label={t(
                'vehicles.searchLabel',
              )}
            />
          </div>

          <div className="vehicles-toolbar-actions">
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value,
                )
              }
              aria-label={t(
                'vehicles.filterLabel',
              )}
            >
              <option value="all">
                {t('vehicles.filters.all')}
              </option>

              <option value="active">
                {t(
                  'vehicles.status.activePlural',
                )}
              </option>

              <option value="inactive">
                {t(
                  'vehicles.status.inactivePlural',
                )}
              </option>
            </select>

            <button
              type="button"
              className="vehicles-refresh-button"
              onClick={() =>
                loadVehicles({
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

              {t('vehicles.refresh')}
            </button>
          </div>
        </div>

        {error ? (
          <div className="vehicles-table-state is-error">
            <strong>
              {t('vehicles.errors.title')}
            </strong>

            <p>{error}</p>

            <button
              type="button"
              onClick={() =>
                loadVehicles()
              }
            >
              {t('vehicles.retry')}
            </button>
          </div>
        ) : (
          <div className="vehicles-table-wrapper">
            <table className="vehicles-table">
              <thead>
                <tr>
                  <th>
                    {t(
                      'vehicles.table.vehicle',
                    )}
                  </th>

                  <th>
                    {t(
                      'vehicles.table.licensePlate',
                    )}
                  </th>

                  <th>
                    {t(
                      'vehicles.table.driver',
                    )}
                  </th>

                  <th>
                    {t(
                      'vehicles.table.comfort',
                    )}
                  </th>

                  <th>
                    {t(
                      'vehicles.table.state',
                    )}
                  </th>

                  <th
                    aria-label={t(
                      'vehicles.table.actions',
                    )}
                  />
                </tr>
              </thead>

              <tbody>
                {filteredVehicles.length === 0 ? (
                  <tr>
                    <td colSpan="6">
                      <div className="vehicles-table-state">
                        <CarFront
                          size={25}
                          strokeWidth={1.6}
                        />

                        <strong>
                          {vehicles.length === 0
                            ? t(
                                'vehicles.empty.noVehicles',
                              )
                            : t(
                                'vehicles.empty.noResults',
                              )}
                        </strong>

                        <p>
                          {vehicles.length === 0
                            ? t(
                                'vehicles.empty.noVehiclesDescription',
                              )
                            : t(
                                'vehicles.empty.noResultsDescription',
                              )}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredVehicles.map(
                    (vehicle) => (
                      <tr key={vehicle.id}>
                        <td>
                          <div className="vehicle-identity-cell">
                            <span className="vehicle-list-icon">
                              <CarFront
                                size={17}
                              />
                            </span>

                            <div>
                              <strong>
                                {vehicle.model ||
                                  t(
                                    'vehicles.fallback.vehicle',
                                  )}
                              </strong>

                              <small>
                                {getVehicleType(
                                  vehicle.type,
                                )}
                              </small>
                            </div>
                          </div>
                        </td>

                        <td>
                          <strong className="vehicle-license">
                            {vehicle.license_plate ||
                              '—'}
                          </strong>
                        </td>

                        <td>
                          <div className="vehicle-driver-cell">
                            <strong>
                              {getDriverName(
                                vehicle,
                              )}
                            </strong>

                            {vehicle.driver && (
                              <small>
                                {t(
                                  'vehicles.driverNumber',
                                  {
                                    id:
                                      vehicle.driver
                                        .id,
                                  },
                                )}
                              </small>
                            )}
                          </div>
                        </td>

                        <td>
                          <span
                            className={`vehicle-comfort-badge ${
                              vehicle.with_comfort
                                ? 'has-comfort'
                                : ''
                            }`}
                          >
                            {vehicle.with_comfort
                              ? t(
                                  'vehicles.common.yes',
                                )
                              : t(
                                  'vehicles.common.no',
                                )}
                          </span>
                        </td>

                        <td>
                          <span
                            className={`vehicle-status-badge ${
                              vehicle.is_active
                                ? 'is-active'
                                : 'is-inactive'
                            }`}
                          >
                            <span />

                            {vehicle.is_active
                              ? t(
                                  'vehicles.status.active',
                                )
                              : t(
                                  'vehicles.status.inactive',
                                )}
                          </span>
                        </td>

                        <td>
                          <button
                            type="button"
                            className="vehicle-row-action"
                            aria-label={t(
                              'vehicles.viewVehicle',
                              {
                                name:
                                  vehicle.model ||
                                  t(
                                    'vehicles.fallback.vehicle',
                                  ),
                              },
                            )}
                            onClick={() =>
                              navigate(
                                `/admin/vehicles/${vehicle.id}`,
                              )
                            }
                          >
                            <ChevronRight
                              size={17}
                            />
                          </button>
                        </td>
                      </tr>
                    ),
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

export default Vehicles