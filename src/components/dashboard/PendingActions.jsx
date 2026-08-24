import {
  ChevronRight,
  CircleAlert,
  FileCheck2,
  WalletCards,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function PendingActions({
  pendingDocuments = 0,
  pendingComplaints = 0,
  pendingPayments = 0,
  isLoading = false,
}) {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const actions = [
    {
      label: t(
        'dashboard.pendingActions.documents',
      ),
      value: pendingDocuments,
      icon: FileCheck2,
      tone: 'blue',
      path: '/admin/documents',
    },
    {
      label: t(
        'dashboard.pendingActions.complaints',
      ),
      value: pendingComplaints,
      icon: CircleAlert,
      tone: 'red',
      path: '/admin/complaints',
    },
    {
      label: t(
        'dashboard.pendingActions.payments',
      ),
      value: pendingPayments,
      icon: WalletCards,
      tone: 'orange',
      path: '/admin/payments',
    },
  ]

  return (
    <article className="dashboard-card pending-actions dashboard-block">
      <header className="dashboard-card-header">
        <div>
          <h2>
            {t(
              'dashboard.pendingActions.title',
            )}
          </h2>

          <p>
            {t(
              'dashboard.pendingActions.description',
            )}
          </p>
        </div>
      </header>

      <div className="pending-actions-list">
        {actions.map(
          ({
            label,
            value,
            icon: Icon,
            tone,
            path,
          }) => (
            <button
              className="pending-action"
              type="button"
              key={path}
              aria-label={label}
              onClick={() =>
                navigate(path)
              }
            >
              <span
                className={`pending-action-icon pending-action-icon--${tone}`}
                aria-hidden="true"
              >
                <Icon size={16} />
              </span>

              <span className="pending-action-label">
                {label}
              </span>

              <strong>
                {isLoading
                  ? '—'
                  : value}
              </strong>

              <ChevronRight
                size={15}
                aria-hidden="true"
              />
            </button>
          ),
        )}
      </div>
    </article>
  )
}

export default PendingActions