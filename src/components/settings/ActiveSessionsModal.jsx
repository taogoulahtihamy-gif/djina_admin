import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  Laptop,
  LogOut,
  RefreshCw,
  ShieldCheck,
  X,
} from 'lucide-react'

import {
  useTranslation,
} from 'react-i18next'

import {
  closeOtherSessions,
  closeSession,
  getActiveSessions,
} from '../../services/securityService'


function normalizeSessions(data) {
  if (Array.isArray(data)) {
    return data
  }

  return data?.results ?? []
}


function ActiveSessionsModal({
  isOpen,
  onClose,
}) {
  const {
    t,
    i18n,
  } = useTranslation()

  const [
    sessions,
    setSessions,
  ] = useState([])

  const [
    isLoading,
    setIsLoading,
  ] = useState(false)

  const [
    isRefreshing,
    setIsRefreshing,
  ] = useState(false)

  const [
    closingSessionId,
    setClosingSessionId,
  ] = useState(null)

  const [
    closingOthers,
    setClosingOthers,
  ] = useState(false)

  const [
    error,
    setError,
  ] = useState('')


  /* =====================================================
     LOCALE
  ===================================================== */

  const locale =
    useMemo(() => {
      const language =
        i18n.resolvedLanguage ||
        i18n.language ||
        'fr'

      if (
        language.startsWith('ar')
      ) {
        return 'ar'
      }

      if (
        language.startsWith('en')
      ) {
        return 'en-US'
      }

      return 'fr-FR'
    }, [
      i18n.resolvedLanguage,
      i18n.language,
    ])


  /* =====================================================
     FORMAT DATE
  ===================================================== */

  const formatDate =
    useCallback(
      (value) => {
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
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          },
        ).format(date)
      },
      [locale],
    )


  /* =====================================================
     CHARGEMENT
  ===================================================== */

  const loadSessions =
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
            await getActiveSessions()

          setSessions(
            normalizeSessions(
              data,
            ),
          )
        } catch (requestError) {
          console.error(
            'Active sessions error:',
            requestError,
          )

          setError(
            t(
              'settings.sessionsModal.loadError',
            ),
          )
        } finally {
          setIsLoading(false)
          setIsRefreshing(false)
        }
      },
      [t],
    )


  /* =====================================================
     OUVERTURE
  ===================================================== */

  useEffect(() => {
    if (!isOpen) {
      return
    }

    loadSessions()
  }, [
    isOpen,
    loadSessions,
  ])


  /* =====================================================
     TOUCHE ESC
  ===================================================== */

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleKeyDown =
      (event) => {
        if (
          event.key ===
            'Escape' &&
          !closingSessionId &&
          !closingOthers
        ) {
          onClose()
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
    isOpen,
    onClose,
    closingSessionId,
    closingOthers,
  ])


  /* =====================================================
     FERMER UNE SESSION
  ===================================================== */

  const handleCloseSession =
    async (session) => {
      if (
        !session?.session_id
      ) {
        return
      }

      try {
        setError('')

        setClosingSessionId(
          session.session_id,
        )

        await closeSession(
          session.session_id,
        )

        setSessions(
          (current) =>
            current.filter(
              (item) =>
                item.session_id !==
                session.session_id,
            ),
        )
      } catch (requestError) {
        console.error(
          'Close session error:',
          requestError,
        )

        setError(
          t(
            'settings.sessionsModal.closeError',
          ),
        )
      } finally {
        setClosingSessionId(
          null,
        )
      }
    }


  /* =====================================================
     FERMER LES AUTRES SESSIONS
  ===================================================== */

  const handleCloseOthers =
    async () => {
      try {
        setError('')
        setClosingOthers(true)

        await closeOtherSessions()

        setSessions(
          (current) =>
            current.filter(
              (session) =>
                session.current ===
                true,
            ),
        )

        await loadSessions({
          refresh: true,
        })
      } catch (requestError) {
        console.error(
          'Close other sessions error:',
          requestError,
        )

        setError(
          t(
            'settings.sessionsModal.closeOthersError',
          ),
        )
      } finally {
        setClosingOthers(false)
      }
    }


  if (!isOpen) {
    return null
  }


  const sessionCount =
    sessions.length

  const otherSessionsCount =
    sessions.filter(
      (session) =>
        session.current !== true,
    ).length


  return (
    <div
      className="security-modal-overlay"
      role="presentation"
      onMouseDown={(
        event,
      ) => {
        if (
          event.target ===
            event.currentTarget &&
          !closingSessionId &&
          !closingOthers
        ) {
          onClose()
        }
      }}
    >
      <section
        className="security-modal sessions-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sessions-modal-title"
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="security-modal-header">
          <div className="security-modal-title">
            <span className="settings-card-icon">
              <ShieldCheck
                size={18}
                aria-hidden="true"
              />
            </span>

            <div>
              <h2 id="sessions-modal-title">
                {t(
                  'settings.sessionsModal.title',
                )}
              </h2>

              <p>
                {t(
                  'settings.sessionsModal.description',
                )}
              </p>
            </div>
          </div>

          <button
            type="button"
            className="security-modal-close"
            onClick={onClose}
            disabled={
              Boolean(
                closingSessionId,
              ) ||
              closingOthers
            }
            aria-label={t(
              'settings.sessionsModal.close',
            )}
          >
            <X
              size={18}
              aria-hidden="true"
            />
          </button>
        </header>


        {/* =================================================
            TOOLBAR
        ================================================= */}

        <div className="sessions-toolbar">
          <div>
            <strong>
              {sessionCount}
            </strong>

            <span>
              {sessionCount === 1
                ? t(
                    'settings.sessionsModal.session',
                  )
                : t(
                    'settings.sessionsModal.sessions',
                  )}
            </span>
          </div>

          <button
            type="button"
            className="sessions-refresh-button"
            onClick={() =>
              loadSessions({
                refresh: true,
              })
            }
            disabled={
              isRefreshing ||
              isLoading
            }
          >
            <RefreshCw
              size={14}
              aria-hidden="true"
              className={
                isRefreshing
                  ? 'is-spinning'
                  : ''
              }
            />

            <span>
              {t(
                'settings.sessionsModal.refresh',
              )}
            </span>
          </button>
        </div>


        {/* =================================================
            ERREUR
        ================================================= */}

        {error && (
          <div
            className="security-message security-message--error"
            role="alert"
          >
            {error}
          </div>
        )}


        {/* =================================================
            CHARGEMENT
        ================================================= */}

        {isLoading ? (
          <div className="sessions-state">
            {t(
              'settings.sessionsModal.loading',
            )}
          </div>
        ) : sessionCount === 0 ? (
          <div className="sessions-state">
            {t(
              'settings.sessionsModal.empty',
            )}
          </div>
        ) : (
          <div className="sessions-list">

            {sessions.map(
              (session) => {
                const sessionId =
                  session.session_id

                const isClosing =
                  closingSessionId ===
                  sessionId

                return (
                  <article
                    key={
                      sessionId ||
                      session.id
                    }
                    className={`session-item ${
                      session.current
                        ? 'is-current'
                        : ''
                    }`}
                  >
                    <span className="session-device-icon">
                      <Laptop
                        size={18}
                        aria-hidden="true"
                      />
                    </span>

                    <div className="session-main">

                      <div className="session-title-row">
                        <strong>
                          {t(
                            'settings.sessionsModal.sessionTitle',
                          )}
                        </strong>

                        {session.current && (
                          <span className="session-current-badge">
                            {t(
                              'settings.sessionsModal.current',
                            )}
                          </span>
                        )}
                      </div>

                      <span className="session-date">
                        {t(
                          'settings.sessionsModal.connectedOn',
                          {
                            date:
                              formatDate(
                                session.created_at,
                              ),
                          },
                        )}
                      </span>

                      <small>
                        {t(
                          'settings.sessionsModal.expiration',
                          {
                            date:
                              formatDate(
                                session.expires_at,
                              ),
                          },
                        )}
                      </small>
                    </div>


                    <button
                      type="button"
                      className="session-close-button"
                      disabled={
                        isClosing ||
                        closingOthers
                      }
                      onClick={() =>
                        handleCloseSession(
                          session,
                        )
                      }
                    >
                      <LogOut
                        size={14}
                        aria-hidden="true"
                      />

                      <span>
                        {isClosing
                          ? t(
                              'settings.sessionsModal.disconnecting',
                            )
                          : t(
                              'settings.sessionsModal.disconnect',
                            )}
                      </span>
                    </button>
                  </article>
                )
              },
            )}

          </div>
        )}


        {/* =================================================
            FOOTER
        ================================================= */}

        <footer className="sessions-footer">
          <p>
            {t(
              'settings.sessionsModal.footer',
            )}
          </p>

          <button
            type="button"
            className="sessions-close-others-button"
            onClick={
              handleCloseOthers
            }
            disabled={
              closingOthers ||
              Boolean(
                closingSessionId,
              ) ||
              otherSessionsCount ===
                0
            }
          >
            <LogOut
              size={14}
              aria-hidden="true"
            />

            <span>
              {closingOthers
                ? t(
                    'settings.sessionsModal.closingOthers',
                  )
                : t(
                    'settings.sessionsModal.closeOthers',
                  )}
            </span>
          </button>
        </footer>

      </section>
    </div>
  )
}


export default ActiveSessionsModal