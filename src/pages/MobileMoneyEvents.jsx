import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
  RadioTower,
  RefreshCw,
  RotateCcw,
  Search,
  Smartphone,
  X,
  XCircle,
} from 'lucide-react'

import {
  useTranslation,
} from 'react-i18next'

import Spinner from '../components/Spinner'

import {
  getProviderEvents,
} from '../services/providerEventService'


const INITIAL_FILTERS = {
  provider: 'all',
  outcome: 'all',
  callbackStatus: 'all',
  processed: 'all',
  providerReference: '',
  createdFrom: '',
  createdTo: '',
}


function MobileMoneyEvents() {
  const {
    t,
    i18n,
  } = useTranslation()

  const [
    filters,
    setFilters,
  ] = useState(
    INITIAL_FILTERS,
  )

  const [
    appliedFilters,
    setAppliedFilters,
  ] = useState(
    INITIAL_FILTERS,
  )

  const [
    events,
    setEvents,
  ] = useState([])

  const [
    count,
    setCount,
  ] = useState(0)

  const [
    page,
    setPage,
  ] = useState(1)

  const [
    pageSize,
    setPageSize,
  ] = useState(25)

  const [
    hasNext,
    setHasNext,
  ] = useState(false)

  const [
    hasPrevious,
    setHasPrevious,
  ] = useState(false)

  const [
    selectedEvent,
    setSelectedEvent,
  ] = useState(null)

  const [
    isLoading,
    setIsLoading,
  ] = useState(true)

  const [
    isRefreshing,
    setIsRefreshing,
  ] = useState(false)

  const [
    error,
    setError,
  ] = useState('')


  const locale =
    i18n.resolvedLanguage === 'ar'
      ? 'ar'
      : i18n.resolvedLanguage === 'en'
        ? 'en-US'
        : 'fr-FR'


  const formatDate = (
    value,
  ) => {
    if (!value) {
      return '—'
    }

    const date =
      new Date(value)

    if (
      Number.isNaN(
        date.getTime(),
      )
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


  const formatMoney = (
    value,
  ) => {
    const amount =
      Number(value)

    if (
      !Number.isFinite(
        amount,
      )
    ) {
      return '—'
    }

    return `${
      new Intl.NumberFormat(
        locale,
      ).format(amount)
    } FCFA`
  }


  const queryParams =
    useMemo(() => ({
      page,
      page_size: pageSize,

      provider:
        appliedFilters.provider ===
        'all'
          ? ''
          : appliedFilters.provider,

      outcome:
        appliedFilters.outcome ===
        'all'
          ? ''
          : appliedFilters.outcome,

      callback_status:
        appliedFilters.callbackStatus ===
        'all'
          ? ''
          : appliedFilters.callbackStatus,

      processed:
        appliedFilters.processed ===
        'all'
          ? ''
          : appliedFilters.processed,

      provider_reference:
        appliedFilters
          .providerReference
          .trim(),

      created_from:
        appliedFilters.createdFrom,

      created_to:
        appliedFilters.createdTo,
    }), [
      appliedFilters,
      page,
      pageSize,
    ])


  const loadEvents =
    useCallback(
      async ({
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
            await getProviderEvents(
              queryParams,
            )

          setEvents(
            Array.isArray(data)
              ? data
              : data?.results ?? [],
          )

          setCount(
            Array.isArray(data)
              ? data.length
              : data?.count ?? 0,
          )

          setHasNext(
            Boolean(
              data?.next,
            ),
          )

          setHasPrevious(
            Boolean(
              data?.previous,
            ),
          )
        } catch (requestError) {
          console.error(
            requestError,
          )

          setEvents([])

          setError(
            requestError?.status ===
            403
              ? t(
                  'mobileMoneyEvents.errors.forbidden',
                )
              : t(
                  'mobileMoneyEvents.errors.load',
                ),
          )
        } finally {
          setIsLoading(false)
          setIsRefreshing(false)
        }
      },
      [
        queryParams,
        t,
      ],
    )


  useEffect(() => {
    loadEvents()
  }, [
    loadEvents,
  ])


  useEffect(() => {
    if (!selectedEvent) {
      return undefined
    }

    const handleKeyDown =
      (event) => {
        if (
          event.key ===
          'Escape'
        ) {
          setSelectedEvent(
            null,
          )
        }
      }

    document.addEventListener(
      'keydown',
      handleKeyDown,
    )

    return () => {
      document.removeEventListener(
        'keydown',
        handleKeyDown,
      )
    }
  }, [
    selectedEvent,
  ])


  const handleFilterChange =
    (
      name,
      value,
    ) => {
      setFilters(
        (current) => ({
          ...current,
          [name]: value,
        }),
      )
    }


  const handleApplyFilters =
    (event) => {
      event.preventDefault()

      setPage(1)

      setAppliedFilters({
        ...filters,
      })
    }


  const handleResetFilters =
    () => {
      setFilters({
        ...INITIAL_FILTERS,
      })

      setAppliedFilters({
        ...INITIAL_FILTERS,
      })

      setPage(1)
    }


  const providerLabel =
    (provider) =>
      t(
        `mobileMoneyEvents.providers.${provider}`,
        {
          defaultValue:
            provider || '—',
        },
      )


  const outcomeLabel =
    (outcome) =>
      t(
        `mobileMoneyEvents.outcomes.${outcome}`,
        {
          defaultValue:
            outcome || '—',
        },
      )


  const callbackLabel =
    (status) =>
      t(
        `mobileMoneyEvents.callbackStatuses.${status}`,
        {
          defaultValue:
            status || '—',
        },
      )


  const processedLabel =
    (value) => {
      if (value === true) {
        return t(
          'mobileMoneyEvents.boolean.yes',
        )
      }

      if (value === false) {
        return t(
          'mobileMoneyEvents.boolean.no',
        )
      }

      return t(
        'mobileMoneyEvents.boolean.unknown',
      )
    }


  const pageCount =
    Math.max(
      1,
      Math.ceil(
        count /
          pageSize,
      ),
    )


  if (isLoading) {
    return (
      <section className="mm-events-page">
        <div className="mm-events-loading">
          <Spinner />
        </div>
      </section>
    )
  }


  return (
    <section className="mm-events-page">
      <div className="mm-events-summary">
        <div className="mm-events-summary-copy">
          <span className="mm-events-summary-icon">
            <RadioTower size={19} />
          </span>

          <div>
            <span>
              {t(
                'mobileMoneyEvents.summary.label',
              )}
            </span>

            <strong>
              {count}
            </strong>
          </div>
        </div>

        <button
          type="button"
          className="mm-events-refresh"
          disabled={
            isRefreshing
          }
          onClick={() =>
            loadEvents({
              refresh: true,
            })
          }
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
            'mobileMoneyEvents.refresh',
          )}
        </button>
      </div>


      <form
        className="mm-events-filters"
        onSubmit={
          handleApplyFilters
        }
      >
        <div className="mm-events-filter-heading">
          <div>
            <Filter size={17} />

            <strong>
              {t(
                'mobileMoneyEvents.filters.title',
              )}
            </strong>
          </div>

          <button
            type="button"
            className="mm-events-reset"
            onClick={
              handleResetFilters
            }
          >
            <RotateCcw size={15} />

            {t(
              'mobileMoneyEvents.filters.reset',
            )}
          </button>
        </div>


        <div className="mm-events-filter-grid">
          <label>
            <span>
              {t(
                'mobileMoneyEvents.filters.provider',
              )}
            </span>

            <select
              value={
                filters.provider
              }
              onChange={(event) =>
                handleFilterChange(
                  'provider',
                  event.target.value,
                )
              }
            >
              <option value="all">
                {t(
                  'mobileMoneyEvents.filters.all',
                )}
              </option>

              <option value="airtel_money">
                Airtel Money
              </option>

              <option value="moov_money">
                Moov Money
              </option>

            </select>
          </label>


          <label>
            <span>
              {t(
                'mobileMoneyEvents.filters.outcome',
              )}
            </span>

            <select
              value={
                filters.outcome
              }
              onChange={(event) =>
                handleFilterChange(
                  'outcome',
                  event.target.value,
                )
              }
            >
              <option value="all">
                {t(
                  'mobileMoneyEvents.filters.all',
                )}
              </option>

              <option value="accepted">
                {t(
                  'mobileMoneyEvents.outcomes.accepted',
                )}
              </option>

              <option value="rejected">
                {t(
                  'mobileMoneyEvents.outcomes.rejected',
                )}
              </option>

              <option value="received">
                {t(
                  'mobileMoneyEvents.outcomes.received',
                )}
              </option>
            </select>
          </label>


          <label>
            <span>
              {t(
                'mobileMoneyEvents.filters.callbackStatus',
              )}
            </span>

            <select
              value={
                filters.callbackStatus
              }
              onChange={(event) =>
                handleFilterChange(
                  'callbackStatus',
                  event.target.value,
                )
              }
            >
              <option value="all">
                {t(
                  'mobileMoneyEvents.filters.all',
                )}
              </option>

              <option value="success">
                {t(
                  'mobileMoneyEvents.callbackStatuses.success',
                )}
              </option>

              <option value="failed">
                {t(
                  'mobileMoneyEvents.callbackStatuses.failed',
                )}
              </option>
            </select>
          </label>


          <label>
            <span>
              {t(
                'mobileMoneyEvents.filters.processed',
              )}
            </span>

            <select
              value={
                filters.processed
              }
              onChange={(event) =>
                handleFilterChange(
                  'processed',
                  event.target.value,
                )
              }
            >
              <option value="all">
                {t(
                  'mobileMoneyEvents.filters.all',
                )}
              </option>

              <option value="true">
                {t(
                  'mobileMoneyEvents.boolean.yes',
                )}
              </option>

              <option value="false">
                {t(
                  'mobileMoneyEvents.boolean.no',
                )}
              </option>
            </select>
          </label>


          <label className="mm-events-reference-filter">
            <span>
              {t(
                'mobileMoneyEvents.filters.reference',
              )}
            </span>

            <div className="mm-events-input-icon">
              <Search size={15} />

              <input
                type="text"
                value={
                  filters.providerReference
                }
                placeholder={t(
                  'mobileMoneyEvents.filters.referencePlaceholder',
                )}
                onChange={(event) =>
                  handleFilterChange(
                    'providerReference',
                    event.target.value,
                  )
                }
              />
            </div>
          </label>


          <label>
            <span>
              {t(
                'mobileMoneyEvents.filters.from',
              )}
            </span>

            <input
              type="date"
              value={
                filters.createdFrom
              }
              onChange={(event) =>
                handleFilterChange(
                  'createdFrom',
                  event.target.value,
                )
              }
            />
          </label>


          <label>
            <span>
              {t(
                'mobileMoneyEvents.filters.to',
              )}
            </span>

            <input
              type="date"
              value={
                filters.createdTo
              }
              onChange={(event) =>
                handleFilterChange(
                  'createdTo',
                  event.target.value,
                )
              }
            />
          </label>


          <button
            type="submit"
            className="mm-events-apply"
          >
            <Filter size={15} />

            {t(
              'mobileMoneyEvents.filters.apply',
            )}
          </button>
        </div>
      </form>


      <div className="mm-events-list-card">
        <div className="mm-events-list-header">
          <div>
            <strong>
              {t(
                'mobileMoneyEvents.list.title',
              )}
            </strong>

            <span>
              {t(
                'mobileMoneyEvents.list.count',
                {
                  count,
                },
              )}
            </span>
          </div>

          <label className="mm-events-page-size">
            <span>
              {t(
                'mobileMoneyEvents.pagination.pageSize',
              )}
            </span>

            <select
              value={
                pageSize
              }
              onChange={(event) => {
                setPageSize(
                  Number(
                    event.target.value,
                  ),
                )

                setPage(1)
              }}
            >
              <option value="25">
                25
              </option>

              <option value="50">
                50
              </option>

              <option value="100">
                100
              </option>

              <option value="200">
                200
              </option>
            </select>
          </label>
        </div>


        {error ? (
          <div className="mm-events-state is-error">
            <XCircle size={24} />

            <strong>
              {t(
                'mobileMoneyEvents.errors.title',
              )}
            </strong>

            <p>
              {error}
            </p>

            <button
              type="button"
              onClick={() =>
                loadEvents()
              }
            >
              {t(
                'mobileMoneyEvents.retry',
              )}
            </button>
          </div>
        ) : events.length === 0 ? (
          <div className="mm-events-state">
            <RadioTower size={25} />

            <strong>
              {t(
                'mobileMoneyEvents.empty.title',
              )}
            </strong>

            <p>
              {t(
                'mobileMoneyEvents.empty.description',
              )}
            </p>
          </div>
        ) : (
          <div className="mm-events-table-wrapper">
            <table className="mm-events-table">
              <thead>
                <tr>
                  <th>
                    {t(
                      'mobileMoneyEvents.table.date',
                    )}
                  </th>

                  <th>
                    {t(
                      'mobileMoneyEvents.table.provider',
                    )}
                  </th>

                  <th>
                    {t(
                      'mobileMoneyEvents.table.reference',
                    )}
                  </th>

                  <th>
                    {t(
                      'mobileMoneyEvents.table.callback',
                    )}
                  </th>

                  <th>
                    {t(
                      'mobileMoneyEvents.table.outcome',
                    )}
                  </th>

                  <th>
                    {t(
                      'mobileMoneyEvents.table.amount',
                    )}
                  </th>

                  <th>
                    {t(
                      'mobileMoneyEvents.table.processed',
                    )}
                  </th>

                  <th
                    aria-label={t(
                      'mobileMoneyEvents.table.actions',
                    )}
                  />
                </tr>
              </thead>

              <tbody>
                {events.map(
                  (item) => (
                    <tr
                      key={
                        item.id
                      }
                    >
                      <td>
                        <div className="mm-events-date-cell">
                          <CalendarDays size={15} />

                          <span>
                            {formatDate(
                              item.created_at,
                            )}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className="mm-events-provider-cell">
                          <Smartphone size={15} />

                          <span>
                            {providerLabel(
                              item.provider,
                            )}
                          </span>
                        </div>
                      </td>

                      <td>
                        <code className="mm-events-reference">
                          {
                            item.provider_reference ||
                            '—'
                          }
                        </code>
                      </td>

                      <td>
                        <span
                          className={`mm-events-badge callback-${item.callback_status}`}
                        >
                          {callbackLabel(
                            item.callback_status,
                          )}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`mm-events-badge outcome-${item.outcome}`}
                        >
                          {outcomeLabel(
                            item.outcome,
                          )}
                        </span>
                      </td>

                      <td className="mm-events-amount">
                        {formatMoney(
                          item.amount,
                        )}
                      </td>

                      <td>
                        <span
                          className={`mm-events-processed ${
                            item.processed
                              ? 'is-yes'
                              : 'is-no'
                          }`}
                        >
                          {item.processed ? (
                            <CheckCircle2 size={14} />
                          ) : (
                            <XCircle size={14} />
                          )}

                          {processedLabel(
                            item.processed,
                          )}
                        </span>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="mm-events-view"
                          aria-label={t(
                            'mobileMoneyEvents.view',
                          )}
                          onClick={() =>
                            setSelectedEvent(
                              item,
                            )
                          }
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          </div>
        )}


        <div className="mm-events-pagination">
          <span>
            {t(
              'mobileMoneyEvents.pagination.page',
              {
                page,
                pages:
                  pageCount,
              },
            )}
          </span>

          <div>
            <button
              type="button"
              disabled={
                !hasPrevious ||
                isLoading
              }
              onClick={() =>
                setPage(
                  (current) =>
                    Math.max(
                      1,
                      current - 1,
                    ),
                )
              }
            >
              <ChevronLeft
                size={16}
                className="mm-page-arrow"
              />

              {t(
                'mobileMoneyEvents.pagination.previous',
              )}
            </button>

            <button
              type="button"
              disabled={
                !hasNext ||
                isLoading
              }
              onClick={() =>
                setPage(
                  (current) =>
                    current + 1,
                )
              }
            >
              {t(
                'mobileMoneyEvents.pagination.next',
              )}

              <ChevronRight
                size={16}
                className="mm-page-arrow"
              />
            </button>
          </div>
        </div>
      </div>


      {selectedEvent && (
        <div
          className="mm-event-drawer-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setSelectedEvent(
                null,
              )
            }
          }}
        >
          <aside
            className="mm-event-drawer"
            role="dialog"
            aria-modal="true"
            aria-label={t(
              'mobileMoneyEvents.details.title',
            )}
          >
            <div className="mm-event-drawer-header">
              <div>
                <span>
                  {t(
                    'mobileMoneyEvents.details.eyebrow',
                  )}
                </span>

                <strong>
                  {t(
                    'mobileMoneyEvents.details.title',
                  )}
                </strong>
              </div>

              <button
                type="button"
                aria-label={t(
                  'mobileMoneyEvents.details.close',
                )}
                onClick={() =>
                  setSelectedEvent(
                    null,
                  )
                }
              >
                <X size={18} />
              </button>
            </div>


            <div className="mm-event-detail-status">
              <span
                className={`mm-events-badge outcome-${selectedEvent.outcome}`}
              >
                {outcomeLabel(
                  selectedEvent.outcome,
                )}
              </span>

              <span
                className={`mm-events-badge callback-${selectedEvent.callback_status}`}
              >
                {callbackLabel(
                  selectedEvent.callback_status,
                )}
              </span>
            </div>


            <div className="mm-event-detail-grid">
              <div>
                <span>
                  {t(
                    'mobileMoneyEvents.details.eventId',
                  )}
                </span>

                <strong>
                  #{selectedEvent.id}
                </strong>
              </div>

              <div>
                <span>
                  {t(
                    'mobileMoneyEvents.details.topup',
                  )}
                </span>

                <strong>
                  {
                    selectedEvent.topup_id
                      ? `#${selectedEvent.topup_id}`
                      : '—'
                  }
                </strong>
              </div>

              <div>
                <span>
                  {t(
                    'mobileMoneyEvents.details.reportedTopup',
                  )}
                </span>

                <strong>
                  {
                    selectedEvent.reported_topup_id ??
                    '—'
                  }
                </strong>
              </div>

              <div>
                <span>
                  {t(
                    'mobileMoneyEvents.details.provider',
                  )}
                </span>

                <strong>
                  {providerLabel(
                    selectedEvent.provider,
                  )}
                </strong>
              </div>

              <div className="is-wide">
                <span>
                  {t(
                    'mobileMoneyEvents.details.reference',
                  )}
                </span>

                <code>
                  {
                    selectedEvent.provider_reference ||
                    '—'
                  }
                </code>
              </div>

              <div>
                <span>
                  {t(
                    'mobileMoneyEvents.details.providerStatus',
                  )}
                </span>

                <strong>
                  {
                    selectedEvent.provider_status ||
                    '—'
                  }
                </strong>
              </div>

              <div>
                <span>
                  {t(
                    'mobileMoneyEvents.details.amount',
                  )}
                </span>

                <strong>
                  {formatMoney(
                    selectedEvent.amount,
                  )}
                </strong>
              </div>

              <div>
                <span>
                  {t(
                    'mobileMoneyEvents.details.processed',
                  )}
                </span>

                <strong>
                  {processedLabel(
                    selectedEvent.processed,
                  )}
                </strong>
              </div>

              <div>
                <span>
                  {t(
                    'mobileMoneyEvents.details.transaction',
                  )}
                </span>

                <strong>
                  {
                    selectedEvent.wallet_transaction_id
                      ? `#${selectedEvent.wallet_transaction_id}`
                      : '—'
                  }
                </strong>
              </div>

              <div>
                <span>
                  {t(
                    'mobileMoneyEvents.details.createdAt',
                  )}
                </span>

                <strong>
                  {formatDate(
                    selectedEvent.created_at,
                  )}
                </strong>
              </div>

              <div>
                <span>
                  {t(
                    'mobileMoneyEvents.details.completedAt',
                  )}
                </span>

                <strong>
                  {formatDate(
                    selectedEvent.completed_at,
                  )}
                </strong>
              </div>
            </div>


            {selectedEvent.failure_reason && (
              <div className="mm-event-message-card">
                <span>
                  {t(
                    'mobileMoneyEvents.details.failureReason',
                  )}
                </span>

                <p>
                  {
                    selectedEvent.failure_reason
                  }
                </p>
              </div>
            )}


            {selectedEvent.error_type && (
              <div className="mm-event-message-card is-error">
                <div>
                  <XCircle size={16} />

                  <strong>
                    {
                      selectedEvent.error_type
                    }
                  </strong>
                </div>

                <p>
                  {
                    selectedEvent.error_message ||
                    '—'
                  }
                </p>
              </div>
            )}
          </aside>
        </div>
      )}
    </section>
  )
}


export default MobileMoneyEvents
