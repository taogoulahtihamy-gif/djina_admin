import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Banknote,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CreditCard,
  RefreshCw,
  Search,
  XCircle,
} from 'lucide-react'

import {
  getPayments,
  markPaymentPaid,
} from '../services/paymentService'

import Spinner from '../components/Spinner'
import {
  calculatePaymentCommission,
  getCommissionByCourseId,
  getGrossAmount,
  useCommissionRate,
} from '../services/commissionService'

function formatCourseId(id) {
  if (!id) {
    return '—'
  }

  return `DJ-${String(id).padStart(5, '0')}`
}

function Payments() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const commissionRate = useCommissionRate()

  const [payments, setPayments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [actionLoadingId, setActionLoadingId] = useState(null)
  const [actionError, setActionError] = useState('')

  const locale =
    i18n.resolvedLanguage === 'ar'
      ? 'ar'
      : i18n.resolvedLanguage === 'en'
        ? 'en-US'
        : 'fr-FR'

  const formatMoney = (
    value,
    currency = 'XAF',
  ) => {
    const amount = Number(value)

    if (!Number.isFinite(amount)) {
      return '—'
    }

    const formatted =
      new Intl.NumberFormat(
        locale,
      ).format(amount)

    return currency === 'XAF'
      ? `${formatted} FCFA`
      : `${formatted} ${currency}`
  }

  const formatDate = (value) => {
    if (!value) {
      return '—'
    }

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
      return '—'
    }

    return new Intl.DateTimeFormat(
      locale,
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      },
    ).format(date)
  }

  const getStatusLabel = (status) =>
    t(`payments.status.${status}`, {
      defaultValue: status || '—',
    })

  const getPaymentMode = (mode) =>
    t(`payments.modes.${mode}`, {
      defaultValue: mode || '—',
    })

  const loadPayments = async ({
    refresh = false,
  } = {}) => {
    try {
      if (refresh) {
        setIsRefreshing(true)
      } else {
        setIsLoading(true)
      }

      setError('')

      const data = await getPayments()

      setPayments(
        Array.isArray(data)
          ? data
          : data?.results ?? [],
      )
    } catch (err) {
      console.error(err)

      setError(
        t('payments.errors.load'),
      )
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    loadPayments()
  }, [])

  const stats = useMemo(() => {
    const paidPayments =
      payments.filter(
        (payment) =>
          payment.status === 'paid',
      )

    const totalPaid =
      paidPayments.reduce(
        (sum, payment) =>
          sum +
          getGrossAmount(payment),
        0,
      )

    return {
      total: payments.length,

      pending: payments.filter(
        (payment) =>
          payment.status === 'pending',
      ).length,

      paid: paidPayments.length,

      failed: payments.filter(
        (payment) =>
          payment.status === 'failed' ||
          payment.status === 'cancelled',
      ).length,

      totalPaid,
    }
  }, [payments])

  const filteredPayments =
    useMemo(() => {
      const normalizedSearch =
        search.trim().toLowerCase()

      return payments.filter(
        (payment) => {
          const matchesStatus =
            statusFilter === 'all' ||
            payment.status ===
              statusFilter

          if (!matchesStatus) {
            return false
          }

          if (!normalizedSearch) {
            return true
          }

          const searchable = [
            payment.id,
            payment.course,
            formatCourseId(
              payment.course,
            ),
            getPaymentMode(
              payment.payment_mode,
            ),
            payment.payment_mode,
            payment.provider,
            payment.transaction_id,
            getStatusLabel(
              payment.status,
            ),
          ]
            .filter(Boolean)
            .join(' ')
            .toLowerCase()

          return searchable.includes(
            normalizedSearch,
          )
        },
      )
    }, [
      payments,
      search,
      statusFilter,
      t,
    ])

  const handleMarkPaid =
    async (paymentId) => {
      try {
        setActionLoadingId(paymentId)
        setActionError('')

        const updatedPayment =
          await markPaymentPaid(
            paymentId,
          )

        setPayments((current) =>
          current.map((payment) =>
            payment.id === paymentId
              ? updatedPayment
              : payment,
          ),
        )
      } catch (err) {
        console.error(err)

        setActionError(
          t(
            'payments.errors.markPaid',
          ),
        )
      } finally {
        setActionLoadingId(null)
      }
    }

  if (isLoading) {
    return (
      <section className="payments-page">
        <div className="payments-loading">
          <Spinner />
        </div>
      </section>
    )
  }

  return (
    <section className="payments-page">
      <div className="payments-stats-grid">
        <article className="payments-stat-card">
          <span className="payments-stat-icon">
            <Banknote size={18} />
          </span>

          <div>
            <span>
              {t('payments.stats.total')}
            </span>

            <strong>{stats.total}</strong>
          </div>
        </article>

        <article className="payments-stat-card">
          <span className="payments-stat-icon is-pending">
            <Clock3 size={18} />
          </span>

          <div>
            <span>
              {t('payments.stats.pending')}
            </span>

            <strong>
              {stats.pending}
            </strong>
          </div>
        </article>

        <article className="payments-stat-card">
          <span className="payments-stat-icon is-paid">
            <CheckCircle2 size={18} />
          </span>

          <div>
            <span>
              {t('payments.stats.paid')}
            </span>

            <strong>{stats.paid}</strong>
          </div>
        </article>

        <article className="payments-stat-card">
          <span className="payments-stat-icon is-failed">
            <XCircle size={18} />
          </span>

          <div>
            <span>
              {t('payments.stats.failed')}
            </span>

            <strong>
              {stats.failed}
            </strong>
          </div>
        </article>
      </div>

      <section className="payments-total-card">
        <div>
          <span>
            {t(
              'payments.collectedAmount',
            )}
          </span>

          <strong>
            {formatMoney(
              stats.totalPaid,
            )}
          </strong>
        </div>
      </section>

      <section className="payments-list-card">
        <div className="payments-list-toolbar">
          <div className="payments-search">
            <Search size={17} />

            <input
              type="search"
              placeholder={t(
                'payments.searchPlaceholder',
              )}
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              aria-label={t(
                'payments.searchLabel',
              )}
            />
          </div>

          <div className="payments-toolbar-actions">
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value,
                )
              }
              aria-label={t(
                'payments.filterLabel',
              )}
            >
              <option value="all">
                {t(
                  'payments.filters.all',
                )}
              </option>

              <option value="pending">
                {t(
                  'payments.status.pending',
                )}
              </option>

              <option value="paid">
                {t(
                  'payments.status.paidPlural',
                )}
              </option>

              <option value="cancelled">
                {t(
                  'payments.status.cancelledPlural',
                )}
              </option>

              <option value="failed">
                {t(
                  'payments.status.failedPlural',
                )}
              </option>
            </select>

            <button
              type="button"
              className="payments-refresh-button"
              onClick={() =>
                loadPayments({
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

              {t('payments.refresh')}
            </button>
          </div>
        </div>

        {actionError && (
          <div className="payments-action-error">
            {actionError}
          </div>
        )}

        {error ? (
          <div className="payments-table-state is-error">
            <strong>
              {t(
                'payments.errors.title',
              )}
            </strong>

            <p>{error}</p>
          </div>
        ) : (
          <div className="payments-table-wrapper">
            <table className="payments-table">
              <thead>
                <tr>
                  <th>
                    {t(
                      'payments.table.payment',
                    )}
                  </th>

                  <th>
                    {t(
                      'payments.table.course',
                    )}
                  </th>

                  <th>
                    {t(
                      'payments.table.mode',
                    )}
                  </th>

                  <th>
                    {t(
                      'payments.table.amount',
                    )}
                  </th>

                  <th className="payment-commission-column">{t('payments.table.commission')}</th>
                  <th className="payment-net-column">{t('payments.table.driverNet')}</th>
                  <th>{t('payments.table.commissionStatus')}</th>

                  <th>
                    {t(
                      'payments.table.status',
                    )}
                  </th>

                  <th>
                    {t(
                      'payments.table.date',
                    )}
                  </th>

                  <th>
                    {t(
                      'payments.table.actions',
                    )}
                  </th>

                  <th />
                </tr>
              </thead>

              <tbody>
                {filteredPayments.length ===
                0 ? (
                  <tr>
                    <td colSpan="11">
                      <div className="payments-table-state">
                        <CreditCard
                          size={25}
                          strokeWidth={1.6}
                        />

                        <strong>
                          {payments.length ===
                          0
                            ? t(
                                'payments.empty.noPayments',
                              )
                            : t(
                                'payments.empty.noResults',
                              )}
                        </strong>

                        <p>
                          {payments.length ===
                          0
                            ? t(
                                'payments.empty.noPaymentsDescription',
                              )
                            : t(
                                'payments.empty.noResultsDescription',
                              )}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map(
                    (payment) => {
                      const storedCommission = getCommissionByCourseId(payment.course)
                      const fallback = calculatePaymentCommission(payment, commissionRate)
                      const commissionStatus = storedCommission?.status || (payment.status === 'paid' ? 'pending' : null)
                      const split = storedCommission ? {
                        gross: storedCommission.grossAmount,
                        commission: storedCommission.commissionAmount,
                        net: storedCommission.driverNetAmount,
                      } : fallback
                      return (
                      <tr key={payment.id}>
                        <td>
                          <div className="payment-identity-cell">
                            <span className="payment-list-icon">
                              <CreditCard
                                size={16}
                              />
                            </span>

                            <div>
                              <strong>
                                {t(
                                  'payments.paymentNumber',
                                  {
                                    id:
                                      payment.id,
                                  },
                                )}
                              </strong>

                              <small>
                                {payment.transaction_id ||
                                  t(
                                    'payments.noReference',
                                  )}
                              </small>
                            </div>
                          </div>
                        </td>

                        <td>
                          <button
                            type="button"
                            className="payment-course-link"
                            onClick={() =>
                              navigate(
                                `/admin/courses/${payment.course}`,
                              )
                            }
                          >
                            {formatCourseId(
                              payment.course,
                            )}
                          </button>
                        </td>

                        <td>
                          <div className="payment-mode-cell">
                            <strong>
                              {getPaymentMode(
                                payment.payment_mode,
                              )}
                            </strong>

                            {payment.provider && (
                              <small>
                                {
                                  payment.provider
                                }
                              </small>
                            )}
                          </div>
                        </td>

                        <td>
                          <strong className="payment-amount">
                            {formatMoney(
                              getGrossAmount(payment),
                              payment.currency,
                            )}
                          </strong>
                        </td>

                        <td className="payment-commission-column">
                          <strong className="payment-commission-amount">{formatMoney(split.commission, payment.currency)}</strong>
                        </td>

                        <td className="payment-net-column">
                          <strong className="payment-net-amount">{formatMoney(split.net, payment.currency)}</strong>
                        </td>

                        <td>{commissionStatus ? <span className={`commission-status-badge is-${commissionStatus}`}>{t(`commission.statuses.${commissionStatus}`)}</span> : '—'}</td>

                        <td>
                          <span
                            className={`payment-status-badge status-${payment.status}`}
                          >
                            {getStatusLabel(
                              payment.status,
                            )}
                          </span>
                        </td>

                        <td>
                          {formatDate(
                            payment.paid_at ||
                              payment.created_at,
                          )}
                        </td>

                        <td>
                          {payment.status ===
                          'pending' ? (
                            <button
                              type="button"
                              className="payment-mark-paid-button"
                              disabled={
                                actionLoadingId ===
                                payment.id
                              }
                              onClick={() =>
                                handleMarkPaid(
                                  payment.id,
                                )
                              }
                            >
                              <CheckCircle2
                                size={15}
                              />

                              {actionLoadingId ===
                              payment.id
                                ? t(
                                    'payments.processing',
                                  )
                                : t(
                                    'payments.markPaid',
                                  )}
                            </button>
                          ) : (
                            <span className="payment-processed">
                              {t(
                                'payments.processed',
                              )}
                            </span>
                          )}
                        </td>

                        <td>
                          <button
                            type="button"
                            className="payment-row-action"
                            aria-label={t(
                              'payments.viewPayment',
                              {
                                id:
                                  payment.id,
                              },
                            )}
                            onClick={() =>
                              navigate(
                                `/admin/payments/${payment.id}`,
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

export default Payments
