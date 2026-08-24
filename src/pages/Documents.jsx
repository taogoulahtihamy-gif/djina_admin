import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CheckCircle2,
  Clock3,
  FileCheck2,
  RefreshCw,
  Search,
  XCircle,
} from 'lucide-react'

import {
  approveDriverDocument,
  getDriverDocuments,
  rejectDriverDocument,
} from '../services/documentService'

import { getDrivers } from '../services/driverService'
import Spinner from '../components/Spinner'

function Documents() {
  const { t, i18n } = useTranslation()

  const [documents, setDocuments] = useState([])
  const [drivers, setDrivers] = useState([])

  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const [rejectingId, setRejectingId] = useState(null)
  const [rejectionReason, setRejectionReason] =
    useState('')
  const [actionLoadingId, setActionLoadingId] =
    useState(null)
  const [actionError, setActionError] = useState('')

  const locale =
    i18n.resolvedLanguage === 'ar'
      ? 'ar'
      : i18n.resolvedLanguage === 'en'
        ? 'en-US'
        : 'fr-FR'

  const getDriverName = (driver) => {
    if (!driver) {
      return t(
        'documents.fallback.driver',
      )
    }

    return (
      [
        driver.user?.first_name,
        driver.user?.last_name,
      ]
        .filter(Boolean)
        .join(' ') ||
      t(
        'documents.fallback.driver',
      )
    )
  }

  const getDocumentType = (type) =>
    t(
      `documents.types.${type}`,
      {
        defaultValue:
          type ||
          t(
            'documents.fallback.document',
          ),
      },
    )

  const getStatusLabel = (status) =>
    t(
      `documents.status.${status}`,
      {
        defaultValue: status || '—',
      },
    )

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
        hour: '2-digit',
        minute: '2-digit',
      },
    ).format(date)
  }

  const loadDocuments = async ({
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
        await getDriverDocuments()

      setDocuments(
        Array.isArray(data)
          ? data
          : data?.results ?? [],
      )
    } catch (err) {
      console.error(err)

      setError(
        t(
          'documents.errors.load',
        ),
      )
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  const loadDrivers = async () => {
    try {
      const data = await getDrivers()

      setDrivers(
        Array.isArray(data)
          ? data
          : data?.results ?? [],
      )
    } catch (err) {
      console.error(err)
      setDrivers([])
    }
  }

  useEffect(() => {
    loadDocuments()
    loadDrivers()
  }, [])

  const stats = useMemo(() => {
    return {
      total: documents.length,

      pending: documents.filter(
        (document) =>
          document.status ===
          'pending',
      ).length,

      approved: documents.filter(
        (document) =>
          document.status ===
          'approved',
      ).length,

      rejected: documents.filter(
        (document) =>
          document.status ===
          'rejected',
      ).length,
    }
  }, [documents])

  const filteredDocuments =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLowerCase()

      return documents.filter(
        (document) => {
          const driver =
            drivers.find(
              (item) =>
                item.id ===
                document.driver,
            )

          const matchesStatus =
            statusFilter === 'all' ||
            document.status ===
              statusFilter

          if (!matchesStatus) {
            return false
          }

          if (!normalizedSearch) {
            return true
          }

          const searchable = [
            getDriverName(driver),
            driver?.user?.email,
            driver?.user?.phone,
            getDocumentType(
              document.doc_type,
            ),
            document.doc_type,
            document.id,
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
      documents,
      drivers,
      search,
      statusFilter,
      t,
    ])

  const handleApprove =
    async (documentId) => {
      try {
        setActionLoadingId(
          documentId,
        )
        setActionError('')

        const updatedDocument =
          await approveDriverDocument(
            documentId,
          )

        setDocuments((current) =>
          current.map((document) =>
            document.id ===
            documentId
              ? updatedDocument
              : document,
          ),
        )
      } catch (err) {
        console.error(err)

        setActionError(
          t(
            'documents.errors.approve',
          ),
        )
      } finally {
        setActionLoadingId(null)
      }
    }

  const handleReject =
    async (documentId) => {
      const reason =
        rejectionReason.trim()

      if (!reason) {
        setActionError(
          t(
            'documents.errors.reasonRequired',
          ),
        )

        return
      }

      try {
        setActionLoadingId(
          documentId,
        )
        setActionError('')

        const updatedDocument =
          await rejectDriverDocument(
            documentId,
            reason,
          )

        setDocuments((current) =>
          current.map((document) =>
            document.id ===
            documentId
              ? updatedDocument
              : document,
          ),
        )

        setRejectingId(null)
        setRejectionReason('')
      } catch (err) {
        console.error(err)

        setActionError(
          t(
            'documents.errors.reject',
          ),
        )
      } finally {
        setActionLoadingId(null)
      }
    }

  const closeRejectDialog = () => {
    setRejectingId(null)
    setRejectionReason('')
    setActionError('')
  }

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true)

      await Promise.all([
        loadDocuments({
          refresh: true,
        }),
        loadDrivers(),
      ])
    } finally {
      setIsRefreshing(false)
    }
  }

  if (isLoading) {
    return (
      <section className="documents-page">
        <div className="documents-loading">
          <Spinner />
        </div>
      </section>
    )
  }

  return (
    <section className="documents-page">
      <div className="documents-stats-grid">
        <article className="documents-stat-card">
          <span className="documents-stat-icon">
            <FileCheck2 size={18} />
          </span>

          <div>
            <span>
              {t(
                'documents.stats.total',
              )}
            </span>

            <strong>
              {stats.total}
            </strong>
          </div>
        </article>

        <article className="documents-stat-card">
          <span className="documents-stat-icon is-pending">
            <Clock3 size={18} />
          </span>

          <div>
            <span>
              {t(
                'documents.stats.pending',
              )}
            </span>

            <strong>
              {stats.pending}
            </strong>
          </div>
        </article>

        <article className="documents-stat-card">
          <span className="documents-stat-icon is-approved">
            <CheckCircle2
              size={18}
            />
          </span>

          <div>
            <span>
              {t(
                'documents.stats.approved',
              )}
            </span>

            <strong>
              {stats.approved}
            </strong>
          </div>
        </article>

        <article className="documents-stat-card">
          <span className="documents-stat-icon is-rejected">
            <XCircle size={18} />
          </span>

          <div>
            <span>
              {t(
                'documents.stats.rejected',
              )}
            </span>

            <strong>
              {stats.rejected}
            </strong>
          </div>
        </article>
      </div>

      <section className="documents-list-card">
        <div className="documents-list-toolbar">
          <div className="documents-search">
            <Search size={17} />

            <input
              type="search"
              placeholder={t(
                'documents.searchPlaceholder',
              )}
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value,
                )
              }
              aria-label={t(
                'documents.searchLabel',
              )}
            />
          </div>

          <div className="documents-toolbar-actions">
            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value,
                )
              }
              aria-label={t(
                'documents.filterLabel',
              )}
            >
              <option value="all">
                {t(
                  'documents.filters.all',
                )}
              </option>

              <option value="pending">
                {t(
                  'documents.status.pending',
                )}
              </option>

              <option value="approved">
                {t(
                  'documents.status.approvedPlural',
                )}
              </option>

              <option value="rejected">
                {t(
                  'documents.status.rejectedPlural',
                )}
              </option>
            </select>

            <button
              type="button"
              className="documents-refresh-button"
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
                'documents.refresh',
              )}
            </button>
          </div>
        </div>

        {error ? (
          <div className="documents-table-state is-error">
            <strong>
              {t(
                'documents.errors.title',
              )}
            </strong>

            <p>{error}</p>

            <button
              type="button"
              onClick={() =>
                loadDocuments()
              }
            >
              {t(
                'documents.retry',
              )}
            </button>
          </div>
        ) : (
          <div className="documents-table-wrapper">
            <table className="documents-table">
              <thead>
                <tr>
                  <th>
                    {t(
                      'documents.table.driver',
                    )}
                  </th>

                  <th>
                    {t(
                      'documents.table.document',
                    )}
                  </th>

                  <th>
                    {t(
                      'documents.table.status',
                    )}
                  </th>

                  <th>
                    {t(
                      'documents.table.sentAt',
                    )}
                  </th>

                  <th>
                    {t(
                      'documents.table.reviewedAt',
                    )}
                  </th>

                  <th>
                    {t(
                      'documents.table.actions',
                    )}
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredDocuments.length ===
                0 ? (
                  <tr>
                    <td colSpan="6">
                      <div className="documents-table-state">
                        <FileCheck2
                          size={25}
                          strokeWidth={1.6}
                        />

                        <strong>
                          {documents.length ===
                          0
                            ? t(
                                'documents.empty.noDocuments',
                              )
                            : t(
                                'documents.empty.noResults',
                              )}
                        </strong>

                        <p>
                          {documents.length ===
                          0
                            ? t(
                                'documents.empty.noDocumentsDescription',
                              )
                            : t(
                                'documents.empty.noResultsDescription',
                              )}
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredDocuments.map(
                    (document) => {
                      const driver =
                        drivers.find(
                          (item) =>
                            item.id ===
                            document.driver,
                        )

                      return (
                        <tr
                          key={
                            document.id
                          }
                        >
                          <td>
                            <div className="document-driver-cell">
                              <strong>
                                {getDriverName(
                                  driver,
                                )}
                              </strong>

                              <small>
                                {t(
                                  'documents.driverNumber',
                                  {
                                    id:
                                      driver?.id ||
                                      document.driver ||
                                      '—',
                                  },
                                )}
                              </small>
                            </div>
                          </td>

                          <td>
                            <strong>
                              {getDocumentType(
                                document.doc_type,
                              )}
                            </strong>
                          </td>

                          <td>
                            <span
                              className={`document-status-badge status-${document.status}`}
                            >
                              {getStatusLabel(
                                document.status,
                              )}
                            </span>
                          </td>

                          <td>
                            {formatDate(
                              document.created_at,
                            )}
                          </td>

                          <td>
                            {formatDate(
                              document.reviewed_at,
                            )}
                          </td>

                          <td>
                            {document.status ===
                            'pending' ? (
                              <div className="document-actions">
                                <button
                                  type="button"
                                  className="document-approve-button"
                                  disabled={
                                    actionLoadingId ===
                                    document.id
                                  }
                                  onClick={() =>
                                    handleApprove(
                                      document.id,
                                    )
                                  }
                                >
                                  <CheckCircle2
                                    size={15}
                                  />

                                  {actionLoadingId ===
                                  document.id
                                    ? t(
                                        'documents.processing',
                                      )
                                    : t(
                                        'documents.approve',
                                      )}
                                </button>

                                <button
                                  type="button"
                                  className="document-reject-button"
                                  disabled={
                                    actionLoadingId ===
                                    document.id
                                  }
                                  onClick={() => {
                                    setRejectingId(
                                      document.id,
                                    )

                                    setRejectionReason(
                                      '',
                                    )

                                    setActionError(
                                      '',
                                    )
                                  }}
                                >
                                  <XCircle
                                    size={15}
                                  />

                                  {t(
                                    'documents.reject',
                                  )}
                                </button>
                              </div>
                            ) : (
                              <span className="document-processed">
                                {t(
                                  'documents.processed',
                                )}
                              </span>
                            )}
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

      {rejectingId !== null && (
        <div
          className="document-reject-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeRejectDialog()
            }
          }}
        >
          <div
            className="document-reject-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="document-reject-title"
          >
            <div>
              <h3 id="document-reject-title">
                {t(
                  'documents.rejectDialog.title',
                )}
              </h3>

              <p>
                {t(
                  'documents.rejectDialog.description',
                )}
              </p>
            </div>

            <label htmlFor="document-rejection-reason">
              {t(
                'documents.rejectDialog.reasonLabel',
              )}
            </label>

            <textarea
              id="document-rejection-reason"
              rows={4}
              value={rejectionReason}
              onChange={(event) =>
                setRejectionReason(
                  event.target.value,
                )
              }
              placeholder={t(
                'documents.rejectDialog.placeholder',
              )}
            />

            {actionError && (
              <p className="document-action-error">
                {actionError}
              </p>
            )}

            <div className="document-reject-footer">
              <button
                type="button"
                className="document-dialog-secondary"
                onClick={
                  closeRejectDialog
                }
                disabled={
                  actionLoadingId ===
                  rejectingId
                }
              >
                {t(
                  'documents.rejectDialog.cancel',
                )}
              </button>

              <button
                type="button"
                className="document-dialog-confirm"
                disabled={
                  actionLoadingId ===
                  rejectingId
                }
                onClick={() =>
                  handleReject(
                    rejectingId,
                  )
                }
              >
                {actionLoadingId ===
                rejectingId
                  ? t(
                      'documents.rejectDialog.rejecting',
                    )
                  : t(
                      'documents.rejectDialog.confirm',
                    )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Documents