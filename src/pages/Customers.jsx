import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ChevronRight,
  Mail,
  Phone,
  RefreshCw,
  Search,
  UserRound,
  UsersRound,
} from 'lucide-react'

import { getCustomers } from '../services/customerService'
import Spinner from '../components/Spinner'

function Customers() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  const [customers, setCustomers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const locale =
    i18n.resolvedLanguage === 'ar'
      ? 'ar'
      : i18n.resolvedLanguage === 'en'
        ? 'en-US'
        : 'fr-FR'

  const getCustomerName = (customer) =>
    [
      customer.user?.first_name,
      customer.user?.last_name,
    ]
      .filter(Boolean)
      .join(' ') ||
    t('customers.fallback.customer')

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
      },
    ).format(date)
  }

  const loadCustomers = async ({
    refresh = false,
  } = {}) => {
    try {
      if (refresh) {
        setIsRefreshing(true)
      } else {
        setIsLoading(true)
      }

      setError('')

      const data =
        await getCustomers()

      setCustomers(
        Array.isArray(data)
          ? data
          : data?.results ?? [],
      )
    } catch (err) {
      console.error(err)

      setError(
        t(
          'customers.errors.load',
        ),
      )
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    loadCustomers()
  }, [])

  const filteredCustomers =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLowerCase()

      if (!normalizedSearch) {
        return customers
      }

      return customers.filter(
        (customer) => {
          const searchable = [
            getCustomerName(
              customer,
            ),
            customer.user?.email,
            customer.user?.phone,
            customer.id,
          ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase()

          return searchable.includes(
            normalizedSearch,
          )
        },
      )
    }, [customers, search, t])

  if (isLoading) {
    return (
      <section className="customers-page">
        <div className="customers-loading">
          <Spinner />
        </div>
      </section>
    )
  }

  return (
    <section className="customers-page">
      <div className="customers-stats-grid">
        <article className="customers-stat-card">
          <span className="customers-stat-icon">
            <UsersRound size={18} />
          </span>

          <div>
            <span>
              {t(
                'customers.stats.total',
              )}
            </span>

            <strong>
              {customers.length}
            </strong>
          </div>
        </article>

        <article className="customers-stat-card">
          <span className="customers-stat-icon">
            <UserRound size={18} />
          </span>

          <div>
            <span>
              {t(
                'customers.stats.profiles',
              )}
            </span>

            <strong>
              {customers.length}
            </strong>
          </div>
        </article>
      </div>

      <section className="customers-list-card">
        <div className="customers-list-toolbar">
          <div className="customers-search">
            <Search size={17} />

            <input
              type="search"
              placeholder={t(
                'customers.searchPlaceholder',
              )}
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              aria-label={t(
                'customers.searchLabel',
              )}
            />
          </div>

          <button
            type="button"
            className="customers-refresh-button"
            onClick={() =>
              loadCustomers({
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
              'customers.refresh',
            )}
          </button>
        </div>

        {error ? (
          <div className="customers-table-state is-error">
            <strong>
              {t(
                'customers.errors.title',
              )}
            </strong>

            <p>{error}</p>

            <button
              type="button"
              onClick={() =>
                loadCustomers()
              }
            >
              {t(
                'customers.retry',
              )}
            </button>
          </div>
        ) : (
          <div className="customers-table-wrapper">
            <table className="customers-table">
              <thead>
                <tr>
                  <th>
                    {t(
                      'customers.table.customer',
                    )}
                  </th>

                  <th>
                    {t(
                      'customers.table.phone',
                    )}
                  </th>

                  <th>
                    {t(
                      'customers.table.email',
                    )}
                  </th>

                  <th>
                    {t(
                      'customers.table.registeredAt',
                    )}
                  </th>

                  <th
                    aria-label={t(
                      'customers.table.actions',
                    )}
                  />
                </tr>
              </thead>

              <tbody>
                {filteredCustomers.length ===
                0 ? (
                  <tr>
                    <td colSpan="5">
                      <div className="customers-table-state">
                        <UsersRound
                          size={25}
                          strokeWidth={1.6}
                        />

                        <strong>
                          {customers.length ===
                          0
                            ? t(
                                'customers.empty.noCustomers',
                              )
                            : t(
                                'customers.empty.noResults',
                              )}
                        </strong>

                        <p>
                          {customers.length ===
                          0
                            ? t(
                                'customers.empty.noCustomersDescription',
                              )
                            : t(
                                'customers.empty.noResultsDescription',
                              )}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredCustomers.map(
                    (customer) => (
                      <tr
                        key={
                          customer.id
                        }
                      >
                        <td>
                          <div className="customer-identity-cell">
                            <span className="customer-list-avatar">
                              {customer.user
                                ?.first_name?.[0] ||
                                'C'}
                            </span>

                            <div>
                              <strong>
                                {getCustomerName(
                                  customer,
                                )}
                              </strong>

                              <small>
                                {t(
                                  'customers.customerNumber',
                                  {
                                    id:
                                      customer.id,
                                  },
                                )}
                              </small>
                            </div>
                          </div>
                        </td>

                        <td>
                          <span className="customer-contact-value">
                            <Phone
                              size={14}
                            />

                            {customer.user
                              ?.phone ||
                              '—'}
                          </span>
                        </td>

                        <td>
                          <span className="customer-contact-value">
                            <Mail
                              size={14}
                            />

                            {customer.user
                              ?.email ||
                              '—'}
                          </span>
                        </td>

                        <td>
                          {formatDate(
                            customer.created_at,
                          )}
                        </td>

                        <td>
                          <button
                            type="button"
                            className="customer-row-action"
                            aria-label={t(
                              'customers.viewCustomer',
                              {
                                name:
                                  getCustomerName(
                                    customer,
                                  ),
                              },
                            )}
                            onClick={() =>
                              navigate(
                                `/admin/clients/${customer.id}`,
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

export default Customers