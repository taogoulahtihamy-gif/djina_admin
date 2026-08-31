import { useEffect, useState } from 'react'
import {
  useNavigate,
  useParams,
} from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  ArrowLeft,
  BadgePercent,
  Banknote,
  CalendarDays,
  CheckCircle2,
  CreditCard,
  Hash,
  Receipt,
  Route,
  ShieldAlert,
} from 'lucide-react'

import { getPaymentById } from '../services/paymentService'
import Spinner from '../components/Spinner'
import {
  calculatePaymentCommission,
  getCommissionByCourseId,
  getGrossAmount,
  useCommissionRate,
} from '../services/commissionService'

function formatCourseId(id) {
  if (!id) return '—'

  return `DJ-${String(id).padStart(5, '0')}`
}

function PaymentDetails() {
  const { paymentId } = useParams()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const commissionRate = useCommissionRate()

  const [payment, setPayment] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

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
    if (!value) return '—'

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

  useEffect(() => {
    const loadPayment = async () => {
      try {
        setIsLoading(true)
        setError('')

        const data =
          await getPaymentById(
            paymentId,
          )

        setPayment(data)
      } catch (err) {
        console.error(err)

        setError(
          t(
            'paymentDetails.errors.load',
          ),
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadPayment()
  }, [paymentId])

  if (isLoading) {
    return (
      <section className="payment-details-page">
        <div className="payments-loading">
          <Spinner />
        </div>
      </section>
    )
  }

  if (error || !payment) {
    return (
      <section className="payment-details-page">
        <button
          type="button"
          className="payment-back-link"
          onClick={() =>
            navigate(
              '/admin/payments',
            )
          }
        >
          <ArrowLeft size={17} />

          {t(
            'paymentDetails.back',
          )}
        </button>

        <div className="payments-table-state is-error">
          <strong>
            {t(
              'paymentDetails.errors.notFound',
            )}
          </strong>

          <p>{error}</p>
        </div>
      </section>
    )
  }

  const storedCommission = getCommissionByCourseId(payment.course)
  const calculatedSplit = calculatePaymentCommission(payment, commissionRate)
  const paymentSplit = storedCommission ? {
    gross: storedCommission.grossAmount,
    rate: storedCommission.commissionRate,
    commission: storedCommission.commissionAmount,
    net: storedCommission.driverNetAmount,
  } : calculatedSplit
  const commissionStatus = storedCommission?.status || (payment.status === 'paid' ? 'pending' : null)

  return (
    <section className="payment-details-page">
      <div className="payment-details-topline">
        <button
          type="button"
          className="payment-back-link"
          onClick={() =>
            navigate(
              '/admin/payments',
            )
          }
        >
          <ArrowLeft size={17} />

          {t(
            'paymentDetails.back',
          )}
        </button>

        <span
          className={`payment-status-badge status-${payment.status}`}
        >
          {getStatusLabel(
            payment.status,
          )}
        </span>
      </div>

      <section className="payment-summary-card">
        <div className="payment-summary-identity">
          <span className="payment-summary-icon">
            <CreditCard size={23} />
          </span>

          <div>
            <span className="payment-summary-label">
              {t(
                'paymentDetails.paymentNumber',
                {
                  id: payment.id,
                },
              )}
            </span>

            <h2>
              {formatMoney(
                payment.final_amount,
                payment.currency,
              )}
            </h2>

            <p>
              {payment.payment_mode
                ? getPaymentMode(
                    payment.payment_mode,
                  )
                : t(
                    'paymentDetails.modeUndefined',
                  )}
            </p>
          </div>
        </div>

        <div className="payment-summary-metrics">
          <div>
            <span>
              {t(
                'paymentDetails.summary.course',
              )}
            </span>

            <strong>
              {formatCourseId(
                payment.course,
              )}
            </strong>
          </div>

          <div>
            <span>
              {t(
                'paymentDetails.summary.status',
              )}
            </span>

            <strong>
              {getStatusLabel(
                payment.status,
              )}
            </strong>
          </div>

          <div>
            <span>
              {t(
                'paymentDetails.summary.currency',
              )}
            </span>

            <strong>
              {payment.currency ||
                '—'}
            </strong>
          </div>
        </div>
      </section>

      <div className="payment-details-grid">
        <section className="payment-detail-card payment-split-card">
          <div className="payment-detail-card-heading">
            <BadgePercent size={18} />
            <div>
              <h3>{t('paymentDetails.split.title')}</h3>
              <p>{t('paymentDetails.split.description')}</p>
            </div>
          </div>
          <div className="payment-detail-list financial-detail-list">
            <div><span>{t('commission.coursePrice')}</span><strong>{formatMoney(paymentSplit.gross, payment.currency)}</strong></div>
            <div><span>{t('commission.rateApplied')}</span><strong>{paymentSplit.rate}%</strong></div>
            <div><span>{t('commission.djinaCommission')}</span><strong>{formatMoney(paymentSplit.commission, payment.currency)}</strong></div>
            <div><span>{t('commission.driverNet')}</span><strong>{formatMoney(paymentSplit.net, payment.currency)}</strong></div>
            <div><span>{t('commission.status')}</span>{commissionStatus ? <strong className={`commission-status-badge is-${commissionStatus}`}>{t(`commission.statuses.${commissionStatus}`)}</strong> : <strong>—</strong>}</div>
            {storedCommission?.paidAt && <div><span>{t('commission.paidAt')}</span><strong>{formatDate(storedCommission.paidAt)}</strong></div>}
            {storedCommission?.settlementReference && <div><span>{t('commission.reference')}</span><strong>{storedCommission.settlementReference}</strong></div>}
          </div>
        </section>

        <section className="payment-detail-card">
          <div className="payment-detail-card-heading">
            <Receipt size={18} />

            <div>
              <h3>
                {t(
                  'paymentDetails.information.title',
                )}
              </h3>

              <p>
                {t(
                  'paymentDetails.information.description',
                )}
              </p>
            </div>
          </div>

          <div className="payment-detail-list">
            <div>
              <span>
                <Banknote size={15} />

                {t(
                  'paymentDetails.fields.amount',
                )}
              </span>

              <strong>
                {formatMoney(
                  getGrossAmount(payment),
                  payment.currency,
                )}
              </strong>
            </div>

            <div>
              <span>
                {t(
                  'paymentDetails.fields.mode',
                )}
              </span>

              <strong>
                {getPaymentMode(
                  payment.payment_mode,
                )}
              </strong>
            </div>

            <div>
              <span>
                {t(
                  'paymentDetails.fields.provider',
                )}
              </span>

              <strong>
                {payment.provider ||
                  '—'}
              </strong>
            </div>

            <div>
              <span>
                <Hash size={15} />

                {t(
                  'paymentDetails.fields.transaction',
                )}
              </span>

              <strong>
                {payment.transaction_id ||
                  t(
                    'payments.noReference',
                  )}
              </strong>
            </div>
          </div>
        </section>

        <section className="payment-detail-card">
          <div className="payment-detail-card-heading">
            <Route size={18} />

            <div>
              <h3>
                {t(
                  'paymentDetails.course.title',
                )}
              </h3>

              <p>
                {t(
                  'paymentDetails.course.description',
                )}
              </p>
            </div>
          </div>

          <div className="payment-course-module">
            <div>
              <span>
                {t(
                  'paymentDetails.summary.course',
                )}
              </span>

              <strong>
                {formatCourseId(
                  payment.course,
                )}
              </strong>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/admin/courses/${payment.course}`,
                )
              }
            >
              {t(
                'paymentDetails.course.view',
              )}
            </button>
          </div>
        </section>

        <section className="payment-detail-card">
          <div className="payment-detail-card-heading">
            <CalendarDays size={18} />

            <div>
              <h3>
                {t(
                  'paymentDetails.dates.title',
                )}
              </h3>

              <p>
                {t(
                  'paymentDetails.dates.description',
                )}
              </p>
            </div>
          </div>

          <div className="payment-detail-list">
            <div>
              <span>
                {t(
                  'paymentDetails.dates.created',
                )}
              </span>

              <strong>
                {formatDate(
                  payment.created_at,
                )}
              </strong>
            </div>

            <div>
              <span>
                {t(
                  'paymentDetails.dates.paid',
                )}
              </span>

              <strong>
                {formatDate(
                  payment.paid_at,
                )}
              </strong>
            </div>

            <div>
              <span>
                {t(
                  'paymentDetails.dates.updated',
                )}
              </span>

              <strong>
                {formatDate(
                  payment.updated_at,
                )}
              </strong>
            </div>
          </div>
        </section>

        <section className="payment-detail-card">
          <div className="payment-detail-card-heading">
            {payment.status === 'paid' ? (
              <CheckCircle2 size={18} />
            ) : (
              <ShieldAlert size={18} />
            )}

            <div>
              <h3>
                {t(
                  'paymentDetails.state.title',
                )}
              </h3>

              <p>
                {t(
                  'paymentDetails.state.description',
                )}
              </p>
            </div>
          </div>

          <div className="payment-detail-list">
            <div>
              <span>
                {t(
                  'paymentDetails.summary.status',
                )}
              </span>

              <strong>
                {getStatusLabel(
                  payment.status,
                )}
              </strong>
            </div>

            <div>
              <span>
                {t(
                  'paymentDetails.state.failureReason',
                )}
              </span>

              <strong>
                {payment.failure_reason ||
                  '—'}
              </strong>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

export default PaymentDetails
