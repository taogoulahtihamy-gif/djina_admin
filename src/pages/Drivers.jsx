import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Bike,
  ChevronRight,
  RefreshCw,
  Search,
  Star,
  UserCheck,
  UserRound,
  Wifi,
} from 'lucide-react'

import { getDrivers } from '../services/driverService'
import Spinner from '../components/Spinner'

function Drivers() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [drivers, setDrivers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const getDriverName = (driver) =>
    [
      driver.user?.first_name,
      driver.user?.last_name,
    ]
      .filter(Boolean)
      .join(' ') ||
    t('drivers.fallback.driver')

  const loadDrivers = async ({ refresh = false } = {}) => {
    try {
      if (refresh) {
        setIsRefreshing(true)
      } else {
        setIsLoading(true)
      }

      setError('')

      const data = await getDrivers()

      setDrivers(
        Array.isArray(data)
          ? data
          : data?.results ?? [],
      )
    } catch (err) {
      console.error(err)

      setError(
        t('drivers.errors.load'),
      )
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    loadDrivers()
  }, [])

  const stats = useMemo(() => {
    const total = drivers.length

    const enabled = drivers.filter(
      (driver) => driver.is_enabled === true,
    ).length

    const online = drivers.filter(
      (driver) => driver.is_online === true,
    ).length

    const rated = drivers.filter(
      (driver) =>
        Number(driver.rating_count) > 0,
    )

    const averageRating =
      rated.length > 0
        ? rated.reduce(
            (sum, driver) =>
              sum +
              Number(driver.rating_avg || 0),
            0,
          ) / rated.length
        : 0

    return {
      total,
      enabled,
      online,
      averageRating,
    }
  }, [drivers])

  const filteredDrivers = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase()

    return drivers.filter((driver) => {
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'online' &&
          driver.is_online === true) ||
        (statusFilter === 'offline' &&
          driver.is_online !== true) ||
        (statusFilter === 'enabled' &&
          driver.is_enabled === true) ||
        (statusFilter === 'disabled' &&
          driver.is_enabled !== true)

      if (!matchesStatus) {
        return false
      }

      if (!normalizedSearch) {
        return true
      }

      const searchable = [
        getDriverName(driver),
        driver.user?.email,
        driver.user?.phone,
        driver.id,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return searchable.includes(
        normalizedSearch,
      )
    })
  }, [
    drivers,
    search,
    statusFilter,
    t,
  ])

  if (isLoading) {
    return (
      <section className="drivers-page">
        <div className="drivers-loading">
          <Spinner />
        </div>
      </section>
    )
  }

  return (
    <section className="drivers-page">
      <div className="drivers-stats-grid">
        <article className="drivers-stat-card">
          <span className="drivers-stat-icon">
            <UserRound size={18} />
          </span>

          <div>
            <span>
              {t('drivers.stats.total')}
            </span>

            <strong>
              {stats.total}
            </strong>
          </div>
        </article>

        <article className="drivers-stat-card">
          <span className="drivers-stat-icon is-enabled">
            <UserCheck size={18} />
          </span>

          <div>
            <span>
              {t('drivers.stats.enabled')}
            </span>

            <strong>
              {stats.enabled}
            </strong>
          </div>
        </article>

        <article className="drivers-stat-card">
          <span className="drivers-stat-icon is-online">
            <Wifi size={18} />
          </span>

          <div>
            <span>
              {t('drivers.stats.online')}
            </span>

            <strong>
              {stats.online}
            </strong>
          </div>
        </article>

        <article className="drivers-stat-card">
          <span className="drivers-stat-icon is-rating">
            <Star size={18} />
          </span>

          <div>
            <span>
              {t(
                'drivers.stats.averageRating',
              )}
            </span>

            <strong>
              {stats.averageRating > 0
                ? stats.averageRating.toFixed(1)
                : '—'}
            </strong>
          </div>
        </article>
      </div>

      <section className="drivers-list-card">
        <div className="drivers-list-toolbar">
          <div className="drivers-search">
            <Search
              size={17}
              aria-hidden="true"
            />

            <input
              type="search"
              placeholder={t(
                'drivers.searchPlaceholder',
              )}
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              aria-label={t(
                'drivers.searchLabel',
              )}
            />
          </div>

          <div className="drivers-toolbar-actions">
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value,
                )
              }
              aria-label={t(
                'drivers.filterLabel',
              )}
            >
              <option value="all">
                {t(
                  'drivers.filters.all',
                )}
              </option>

              <option value="online">
                {t(
                  'drivers.status.online',
                )}
              </option>

              <option value="offline">
                {t(
                  'drivers.status.offline',
                )}
              </option>

              <option value="enabled">
                {t(
                  'drivers.status.enabledPlural',
                )}
              </option>

              <option value="disabled">
                {t(
                  'drivers.status.disabledPlural',
                )}
              </option>
            </select>

            <button
              type="button"
              className="drivers-refresh-button"
              onClick={() =>
                loadDrivers({
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

              {t('drivers.refresh')}
            </button>
          </div>
        </div>

        {error ? (
          <div className="drivers-table-state is-error">
            <strong>
              {t(
                'drivers.errors.title',
              )}
            </strong>

            <p>{error}</p>

            <button
              type="button"
              onClick={() =>
                loadDrivers()
              }
            >
              {t('drivers.retry')}
            </button>
          </div>
        ) : (
          <div className="drivers-table-wrapper">
            <table className="drivers-table">
              <thead>
                <tr>
                  <th>
                    {t(
                      'drivers.table.driver',
                    )}
                  </th>

                  <th>
                    {t(
                      'drivers.table.contact',
                    )}
                  </th>

                  <th>
                    {t(
                      'drivers.table.availability',
                    )}
                  </th>

                  <th>
                    {t(
                      'drivers.table.account',
                    )}
                  </th>

                  <th>
                    {t(
                      'drivers.table.rating',
                    )}
                  </th>

                  <th>
                    {t(
                      'drivers.table.ratings',
                    )}
                  </th>

                  <th
                    aria-label={t(
                      'drivers.table.actions',
                    )}
                  />
                </tr>
              </thead>

              <tbody>
                {filteredDrivers.length === 0 ? (
                  <tr>
                    <td colSpan="7">
                      <div className="drivers-table-state">
                        <Bike
                          size={25}
                          strokeWidth={1.6}
                        />

                        <strong>
                          {drivers.length === 0
                            ? t(
                                'drivers.empty.noDrivers',
                              )
                            : t(
                                'drivers.empty.noResults',
                              )}
                        </strong>

                        <p>
                          {drivers.length === 0
                            ? t(
                                'drivers.empty.noDriversDescription',
                              )
                            : t(
                                'drivers.empty.noResultsDescription',
                              )}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredDrivers.map(
                    (driver) => (
                      <tr key={driver.id}>
                        <td>
                          <div className="driver-identity-cell">
                            <span className="driver-list-avatar">
                              {driver.user
                                ?.first_name?.[0] ||
                                'C'}
                            </span>

                            <div>
                              <strong>
                                {getDriverName(
                                  driver,
                                )}
                              </strong>

                              <small>
                                {t(
                                  'drivers.driverNumber',
                                  {
                                    id: driver.id,
                                  },
                                )}
                              </small>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="driver-contact-cell">
                            <span>
                              {driver.user
                                ?.phone || '—'}
                            </span>

                            <small>
                              {driver.user
                                ?.email || '—'}
                            </small>
                          </div>
                        </td>

                        <td>
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
                        </td>

                        <td>
                          <span
                            className={`driver-account-badge ${
                              driver.is_enabled
                                ? 'is-enabled'
                                : 'is-disabled'
                            }`}
                          >
                            {driver.is_enabled
                              ? t(
                                  'drivers.status.enabled',
                                )
                              : t(
                                  'drivers.status.disabled',
                                )}
                          </span>
                        </td>

                        <td>
                          <div className="driver-rating-cell">
                            <Star size={14} />

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
                        </td>

                        <td>
                          {driver.rating_count ||
                            0}
                        </td>

                        <td>
                          <button
                            type="button"
                            className="driver-row-action"
                            aria-label={t(
                              'drivers.viewDriver',
                              {
                                name:
                                  getDriverName(
                                    driver,
                                  ),
                              },
                            )}
                            onClick={() =>
                              navigate(
                                `/admin/drivers/${driver.id}`,
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

export default Drivers