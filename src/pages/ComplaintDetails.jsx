import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  MessageSquareWarning,
  Route,
  UserRound,
} from 'lucide-react'

import {
  getComplaintById,
} from '../services/complaintService'

import {
  getCustomers,
} from '../services/customerService'

import Spinner from '../components/Spinner'

const STATUS_LABELS = {
  pending: 'En attente',
  resolved: 'Résolue',
  rejected: 'Rejetée',
}

function formatDate(value) {
  if (!value) return '—'

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '—'
  }

  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

function formatCourseId(id) {
  if (!id) return '—'

  return `DJ-${String(id).padStart(5, '0')}`
}

function getCustomerName(customer) {
  if (!customer) {
    return 'Client'
  }

  return (
    [
      customer.user?.first_name,
      customer.user?.last_name,
    ]
      .filter(Boolean)
      .join(' ') || 'Client'
  )
}

function ComplaintDetails() {
  const { complaintId } = useParams()
  const navigate = useNavigate()

  const [complaint, setComplaint] = useState(null)
  const [customer, setCustomer] = useState(null)

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadComplaint = async () => {
      try {
        setIsLoading(true)
        setError('')

        const complaintData =
          await getComplaintById(complaintId)

        setComplaint(complaintData)

        try {
          const customersData =
            await getCustomers()

          const customers = Array.isArray(
            customersData,
          )
            ? customersData
            : customersData?.results ?? []

          const relatedCustomer =
            customers.find(
              (item) =>
                item.id ===
                complaintData.customer,
            )

          setCustomer(
            relatedCustomer || null,
          )
        } catch (customerError) {
          console.error(customerError)
          setCustomer(null)
        }
      } catch (err) {
        console.error(err)

        setError(
          'Impossible de charger cette réclamation.',
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadComplaint()
  }, [complaintId])

  if (isLoading) {
    return (
      <section className="complaint-details-page">
        <div className="complaints-loading">
          <Spinner />
        </div>
      </section>
    )
  }

  if (error || !complaint) {
    return (
      <section className="complaint-details-page">
        <button
          type="button"
          className="complaint-back-link"
          onClick={() =>
            navigate('/admin/complaints')
          }
        >
          <ArrowLeft size={17} />
          Retour aux réclamations
        </button>

        <div className="complaints-table-state is-error">
          <strong>
            Réclamation introuvable
          </strong>

          <p>{error}</p>
        </div>
      </section>
    )
  }

  const customerName =
    getCustomerName(customer)

  return (
    <section className="complaint-details-page">
      <div className="complaint-details-topline">
        <button
          type="button"
          className="complaint-back-link"
          onClick={() =>
            navigate('/admin/complaints')
          }
        >
          <ArrowLeft size={17} />
          Retour aux réclamations
        </button>

        <span
          className={`complaint-status-badge status-${complaint.status}`}
        >
          {STATUS_LABELS[
            complaint.status
          ] || complaint.status}
        </span>
      </div>

      <section className="complaint-summary-card">
        <div className="complaint-summary-identity">
          <span className="complaint-summary-icon">
            <MessageSquareWarning
              size={23}
            />
          </span>

          <div>
            <span className="complaint-summary-label">
              Réclamation #
              {complaint.id}
            </span>

            <h2>
              {formatCourseId(
                complaint.course,
              )}
            </h2>

            <p>
              Réclamation enregistrée sur
              Djina.
            </p>
          </div>
        </div>

        <div className="complaint-summary-metrics">
          <div>
            <span>Client</span>

            <strong>
              {customerName}
            </strong>
          </div>

          <div>
            <span>Course</span>

            <strong>
              {formatCourseId(
                complaint.course,
              )}
            </strong>
          </div>

          <div>
            <span>Statut</span>

            <strong>
              {STATUS_LABELS[
                complaint.status
              ] || complaint.status}
            </strong>
          </div>
        </div>
      </section>

      <div className="complaint-details-grid">
        <section className="complaint-detail-card">
          <div className="complaint-detail-card-heading">
            <UserRound size={18} />

            <div>
              <h3>Client</h3>

              <p>
                Informations du demandeur
              </p>
            </div>
          </div>

          <div className="complaint-detail-list">
            <div>
              <span>Nom</span>

              <strong>
                {customerName}
              </strong>
            </div>

            <div>
              <span>Client</span>

              <strong>
                #
                {customer?.id ||
                  complaint.customer ||
                  '—'}
              </strong>
            </div>

            <div>
              <span>Téléphone</span>

              <strong>
                {customer?.user?.phone ||
                  '—'}
              </strong>
            </div>

            <div>
              <span>E-mail</span>

              <strong>
                {customer?.user?.email ||
                  '—'}
              </strong>
            </div>
          </div>
        </section>

        <section className="complaint-detail-card">
          <div className="complaint-detail-card-heading">
            <Route size={18} />

            <div>
              <h3>Course associée</h3>

              <p>
                Course concernée par la
                réclamation
              </p>
            </div>
          </div>

          <div className="complaint-course-module">
            <div>
              <span>Course</span>

              <strong>
                {formatCourseId(
                  complaint.course,
                )}
              </strong>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate(
                  `/admin/courses/${complaint.course}`,
                )
              }
            >
              Voir la course
            </button>
          </div>
        </section>

        <section className="complaint-detail-card complaint-description-card">
          <div className="complaint-detail-card-heading">
            <MessageSquareWarning
              size={18}
            />

            <div>
              <h3>Description</h3>

              <p>
                Motif déclaré par le client
              </p>
            </div>
          </div>

          <div className="complaint-description-full">
            {complaint.description ||
              'Aucune description.'}
          </div>
        </section>

        <section className="complaint-detail-card">
          <div className="complaint-detail-card-heading">
            <CalendarDays size={18} />

            <div>
              <h3>Dates</h3>

              <p>
                Historique de la réclamation
              </p>
            </div>
          </div>

          <div className="complaint-detail-list">
            <div>
              <span>Créée le</span>

              <strong>
                {formatDate(
                  complaint.created_at,
                )}
              </strong>
            </div>

            <div>
              <span>Résolue le</span>

              <strong>
                {formatDate(
                  complaint.resolved_at,
                )}
              </strong>
            </div>

            <div>
              <span>Mise à jour le</span>

              <strong>
                {formatDate(
                  complaint.updated_at,
                )}
              </strong>
            </div>
          </div>
        </section>

        <section className="complaint-detail-card complaint-resolution-card">
          <div className="complaint-detail-card-heading">
            <CheckCircle2 size={18} />

            <div>
              <h3>Résolution</h3>

              <p>
                Traitement effectué par
                l’administration
              </p>
            </div>
          </div>

          <div className="complaint-detail-list">
            <div>
              <span>Statut</span>

              <strong>
                {STATUS_LABELS[
                  complaint.status
                ] || complaint.status}
              </strong>
            </div>

            <div>
              <span>Résolu par</span>

              <strong>
                {complaint.resolved_by
                  ? `Administrateur #${complaint.resolved_by}`
                  : '—'}
              </strong>
            </div>
          </div>

          <div className="complaint-resolution-note">
            <span>Note de résolution</span>

            <p>
              {complaint.resolution_note ||
                'Aucune note de résolution.'}
            </p>
          </div>
        </section>
      </div>
    </section>
  )
}

export default ComplaintDetails