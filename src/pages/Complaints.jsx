import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  CheckCircle2,
  ChevronRight,
  Clock3,
  MessageSquareWarning,
  RefreshCw,
  Search,
  XCircle,
} from 'lucide-react'

import {
  getComplaints,
  resolveComplaint,
} from '../services/complaintService'

import { getCustomers } from '../services/customerService'
import Spinner from '../components/Spinner'

function formatCourseId(id) {
  if (!id) return '—'

  return `DJ-${String(id).padStart(5, '0')}`
}

function Complaints() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  const [complaints, setComplaints] = useState([])
  const [customers, setCustomers] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const [resolvingId, setResolvingId] = useState(null)
  const [resolutionNote, setResolutionNote] = useState('')
  const [actionLoadingId, setActionLoadingId] = useState(null)
  const [actionError, setActionError] = useState('')

  const locale =
    i18n.resolvedLanguage === 'ar'
      ? 'ar'
      : i18n.resolvedLanguage === 'en'
        ? 'en-US'
        : 'fr-FR'

  const getCustomerName = (customer) => {
    if (!customer) {
      return t(
        'complaints.fallback.customer',
      )
    }

    return (
      [
        customer.user?.first_name,
        customer.user?.last_name,
      ]
        .filter(Boolean)
        .join(' ') ||
      t(
        'complaints.fallback.customer',
      )
    )
  }

  const getStatusLabel = (status) =>
    t(
      `complaints.status.${status}`,
      {
        defaultValue: status || '—',
      },
    )

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

  const loadComplaints = async ({
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
        await getComplaints()

      setComplaints(
        Array.isArray(data)
          ? data
          : data?.results ?? [],
      )
    } catch (err) {
      console.error(err)

      setError(
        t(
          'complaints.errors.load',
        ),
      )
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  const loadCustomers = async () => {
    try {
      const data =
        await getCustomers()

      setCustomers(
        Array.isArray(data)
          ? data
          : data?.results ?? [],
      )
    } catch (err) {
      console.error(err)
      setCustomers([])
    }
  }

  useEffect(() => {
    loadComplaints()
    loadCustomers()
  }, [])

  const stats = useMemo(() => {
    return {
      total: complaints.length,

      pending: complaints.filter(
        (complaint) =>
          complaint.status ===
          'pending',
      ).length,

      resolved: complaints.filter(
        (complaint) =>
          complaint.status ===
          'resolved',
      ).length,

      rejected: complaints.filter(
        (complaint) =>
          complaint.status ===
          'rejected',
      ).length,
    }
  }, [complaints])

  const filteredComplaints =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLowerCase()

      return complaints.filter(
        (complaint) => {
          const customer =
            customers.find(
              (item) =>
                item.id ===
                complaint.customer,
            )

          const matchesStatus =
            statusFilter === 'all' ||
            complaint.status ===
              statusFilter

          if (!matchesStatus) {
            return false
          }

          if (!normalizedSearch) {
            return true
          }

          const searchable = [
            complaint.id,
            complaint.course,
            formatCourseId(
              complaint.course,
            ),
            getCustomerName(
              customer,
            ),
            customer?.user?.email,
            customer?.user?.phone,
            complaint.description,
            getStatusLabel(
              complaint.status,
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
      complaints,
      customers,
      search,
      statusFilter,
      t,
    ])

  const handleResolve =
    async (complaintId) => {
      try {
        setActionLoadingId(
          complaintId,
        )

        setActionError('')

        const updatedComplaint =
          await resolveComplaint(
            complaintId,
            resolutionNote.trim(),
          )

        setComplaints((current) =>
          current.map((complaint) =>
            complaint.id ===
            complaintId
              ? updatedComplaint
              : complaint,
          ),
        )

        setResolvingId(null)
        setResolutionNote('')
      } catch (err) {
        console.error(err)

        setActionError(
          t(
            'complaints.errors.resolve',
          ),
        )
      } finally {
        setActionLoadingId(null)
      }
    }

  const closeResolveDialog = () => {
    setResolvingId(null)
    setResolutionNote('')
    setActionError('')
  }

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true)

      await Promise.all([
        loadComplaints({
          refresh: true,
        }),
        loadCustomers(),
      ])
    } finally {
      setIsRefreshing(false)
    }
  }

  if (isLoading) {
    return (
      <section className="complaints-page">
        <div className="complaints-loading">
          <Spinner />
        </div>
      </section>
    )
  }

  return (
    <section className="complaints-page">
      <div className="complaints-stats-grid">
        <article className="complaints-stat-card">
          <span className="complaints-stat-icon">
            <MessageSquareWarning
              size={18}
            />
          </span>

          <div>
            <span>
              {t(
                'complaints.stats.total',
              )}
            </span>

            <strong>{stats.total}</strong>
          </div>
        </article>

        <article className="complaints-stat-card">
          <span className="complaints-stat-icon is-pending">
            <Clock3 size={18} />
          </span>

          <div>
            <span>
              {t(
                'complaints.stats.pending',
              )}
            </span>

            <strong>
              {stats.pending}
            </strong>
          </div>
        </article>

        <article className="complaints-stat-card">
          <span className="complaints-stat-icon is-resolved">
            <CheckCircle2
              size={18}
            />
          </span>

          <div>
            <span>
              {t(
                'complaints.stats.resolved',
              )}
            </span>

            <strong>
              {stats.resolved}
            </strong>
          </div>
        </article>

        <article className="complaints-stat-card">
          <span className="complaints-stat-icon is-rejected">
            <XCircle size={18} />
          </span>

          <div>
            <span>
              {t(
                'complaints.stats.rejected',
              )}
            </span>

            <strong>
              {stats.rejected}
            </strong>
          </div>
        </article>
      </div>

      <section className="complaints-list-card">
        <div className="complaints-list-toolbar">
          <div className="complaints-search">
            <Search size={17} />

            <input
              type="search"
              placeholder={t(
                'complaints.searchPlaceholder',
              )}
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              aria-label={t(
                'complaints.searchLabel',
              )}
            />
          </div>

          <div className="complaints-toolbar-actions">
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value,
                )
              }
              aria-label={t(
                'complaints.filterLabel',
              )}
            >
              <option value="all">
                {t(
                  'complaints.filters.all',
                )}
              </option>

              <option value="pending">
                {t(
                  'complaints.status.pending',
                )}
              </option>

              <option value="resolved">
                {t(
                  'complaints.status.resolvedPlural',
                )}
              </option>

              <option value="rejected">
                {t(
                  'complaints.status.rejectedPlural',
                )}
              </option>
            </select>

            <button
              type="button"
              className="complaints-refresh-button"
              onClick={handleRefresh}
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
                'complaints.refresh',
              )}
            </button>
          </div>
        </div>

        {error ? (
          <div className="complaints-table-state is-error">
            <strong>
              {t(
                'complaints.errors.title',
              )}
            </strong>

            <p>{error}</p>
          </div>
        ) : (
          <div className="complaints-table-wrapper">
            <table className="complaints-table">
              <thead>
                <tr>
                  <th>
                    {t(
                      'complaints.table.complaint',
                    )}
                  </th>

                  <th>
                    {t(
                      'complaints.table.customer',
                    )}
                  </th>

                  <th>
                    {t(
                      'complaints.table.course',
                    )}
                  </th>

                  <th>
                    {t(
                      'complaints.table.description',
                    )}
                  </th>

                  <th>
                    {t(
                      'complaints.table.status',
                    )}
                  </th>

                  <th>
                    {t(
                      'complaints.table.createdAt',
                    )}
                  </th>

                  <th>
                    {t(
                      'complaints.table.actions',
                    )}
                  </th>

                  <th />
                </tr>
              </thead>

              <tbody>
                {filteredComplaints.length ===
                0 ? (
                  <tr>
                    <td colSpan="8">
                      <div className="complaints-table-state">
                        <MessageSquareWarning
                          size={25}
                          strokeWidth={1.6}
                        />

                        <strong>
                          {complaints.length ===
                          0
                            ? t(
                                'complaints.empty.noComplaints',
                              )
                            : t(
                                'complaints.empty.noResults',
                              )}
                        </strong>

                        <p>
                          {complaints.length ===
                          0
                            ? t(
                                'complaints.empty.noComplaintsDescription',
                              )
                            : t(
                                'complaints.empty.noResultsDescription',
                              )}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredComplaints.map(
                    (complaint) => {
                      const customer =
                        customers.find(
                          (item) =>
                            item.id ===
                            complaint.customer,
                        )

                      return (
                        <tr
                          key={
                            complaint.id
                          }
                        >
                          <td>
                            <strong>
                              {t(
                                'complaints.complaintNumber',
                                {
                                  id:
                                    complaint.id,
                                },
                              )}
                            </strong>
                          </td>

                          <td>
                            <div className="complaint-customer-cell">
                              <strong>
                                {getCustomerName(
                                  customer,
                                )}
                              </strong>

                              <small>
                                {t(
                                  'complaints.customerNumber',
                                  {
                                    id:
                                      customer?.id ||
                                      complaint.customer ||
                                      '—',
                                  },
                                )}
                              </small>
                            </div>
                          </td>

                          <td>
                            <button
                              type="button"
                              className="complaint-course-link"
                              onClick={() =>
                                navigate(
                                  `/admin/courses/${complaint.course}`,
                                )
                              }
                            >
                              {formatCourseId(
                                complaint.course,
                              )}
                            </button>
                          </td>

                          <td>
                            <span className="complaint-description-preview">
                              {
                                complaint.description
                              }
                            </span>
                          </td>

                          <td>
                            <span
                              className={`complaint-status-badge status-${complaint.status}`}
                            >
                              {getStatusLabel(
                                complaint.status,
                              )}
                            </span>
                          </td>

                          <td>
                            {formatDate(
                              complaint.created_at,
                            )}
                          </td>

                          <td>
                            {complaint.status ===
                            'pending' ? (
                              <button
                                type="button"
                                className="complaint-resolve-button"
                                onClick={() => {
                                  setResolvingId(
                                    complaint.id,
                                  )
                                  setResolutionNote(
                                    '',
                                  )
                                  setActionError(
                                    '',
                                  )
                                }}
                              >
                                <CheckCircle2
                                  size={15}
                                />

                                {t(
                                  'complaints.resolve',
                                )}
                              </button>
                            ) : (
                              <span className="complaint-processed">
                                {t(
                                  'complaints.processed',
                                )}
                              </span>
                            )}
                          </td>

                          <td>
                            <button
                              type="button"
                              className="complaint-row-action"
                              aria-label={t(
                                'complaints.viewComplaint',
                                {
                                  id:
                                    complaint.id,
                                },
                              )}
                              onClick={() =>
                                navigate(
                                  `/admin/complaints/${complaint.id}`,
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

      {resolvingId !== null && (
        <div
          className="complaint-resolve-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeResolveDialog()
            }
          }}
        >
          <div
            className="complaint-resolve-dialog"
            role="dialog"
            aria-modal="true"
          >
            <div>
              <h3>
                {t(
                  'complaints.resolveDialog.title',
                )}
              </h3>

              <p>
                {t(
                  'complaints.resolveDialog.description',
                )}
              </p>
            </div>

            <label htmlFor="resolution-note">
              {t(
                'complaints.resolveDialog.noteLabel',
              )}
            </label>

            <textarea
              id="resolution-note"
              rows={4}
              value={resolutionNote}
              onChange={(event) =>
                setResolutionNote(
                  event.target.value,
                )
              }
              placeholder={t(
                'complaints.resolveDialog.placeholder',
              )}
            />

            {actionError && (
              <p className="complaint-action-error">
                {actionError}
              </p>
            )}

            <div className="complaint-resolve-footer">
              <button
                type="button"
                className="complaint-dialog-secondary"
                onClick={
                  closeResolveDialog
                }
                disabled={
                  actionLoadingId ===
                  resolvingId
                }
              >
                {t(
                  'complaints.resolveDialog.cancel',
                )}
              </button>

              <button
                type="button"
                className="complaint-dialog-confirm"
                onClick={() =>
                  handleResolve(
                    resolvingId,
                  )
                }
                disabled={
                  actionLoadingId ===
                  resolvingId
                }
              >
                {actionLoadingId ===
                resolvingId
                  ? t(
                      'complaints.processing',
                    )
                  : t(
                      'complaints.resolveDialog.confirm',
                    )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Complaints