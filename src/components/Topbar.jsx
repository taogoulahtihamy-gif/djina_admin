import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import {
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  FileText,
  LogOut,
  Menu,
  MessageSquareWarning,
  Route as RouteIcon,
  Settings,
  UserRound,
} from 'lucide-react'

import {
  useLocation,
  useNavigate,
} from 'react-router-dom'

import {
  useTranslation,
} from 'react-i18next'

import {
  useAuth,
} from '../context/authContext'

import {
  getAdminNotifications,
} from '../services/notificationService'

import {
  connectAdminRealtime,
} from '../services/realtimeService'

import {
  getProfilePhoto,
} from '../services/profilePhotoService'

import EditProfileModal from './settings/EditProfileModal'


function Topbar({
  onMenuClick,
}) {
  const navigate =
    useNavigate()

  const location =
    useLocation()

  const {
    user,
    logout,
  } = useAuth()

  const {
    t,
    i18n,
  } = useTranslation()


  /* =====================================================
     PANNEAUX
  ===================================================== */

  const [
    openPanel,
    setOpenPanel,
  ] = useState(null)


  /* =====================================================
     MODAL PROFIL
  ===================================================== */

  const [
    profileModalOpen,
    setProfileModalOpen,
  ] = useState(false)


  /* =====================================================
     PHOTO PROFIL
  ===================================================== */

  const [
    profilePhoto,
    setProfilePhoto,
  ] = useState(null)


  /* =====================================================
     HEURE
  ===================================================== */

  const [
    currentTime,
    setCurrentTime,
  ] = useState(
    () => new Date(),
  )


  /* =====================================================
     NOTIFICATIONS
  ===================================================== */

  const [
    notifications,
    setNotifications,
  ] = useState({
    total: 0,
    items: [],
  })

  const [
    notificationsLoading,
    setNotificationsLoading,
  ] = useState(true)

  const [
    notificationsError,
    setNotificationsError,
  ] = useState(false)


  const adminControlsRef =
    useRef(null)


  const userId =
    user?.id ??
    user?.user_id ??
    null


  /* =====================================================
     CHARGEMENT PHOTO PROFIL
  ===================================================== */

  useEffect(() => {
    if (!userId) {
      setProfilePhoto(null)
      return
    }

    setProfilePhoto(
      getProfilePhoto(
        userId,
      ),
    )
  }, [
    userId,
  ])


  /* =====================================================
     MISE À JOUR PHOTO EN TEMPS RÉEL
  ===================================================== */

  useEffect(() => {
    const handleProfilePhotoUpdated =
      (event) => {
        const detail =
          event?.detail

        if (
          detail?.userId &&
          String(
            detail.userId,
          ) !==
            String(
              userId,
            )
        ) {
          return
        }

        setProfilePhoto(
          detail?.photo ??
          getProfilePhoto(
            userId,
          ),
        )
      }

    window.addEventListener(
      'djina:profile-photo-updated',
      handleProfilePhotoUpdated,
    )

    return () => {
      window.removeEventListener(
        'djina:profile-photo-updated',
        handleProfilePhotoUpdated,
      )
    }
  }, [
    userId,
  ])


  /* =====================================================
     PAGE ACTIVE
  ===================================================== */

  const isCoursesPage =
    location.pathname.startsWith(
      '/admin/courses',
    )

  const isDriversPage =
    location.pathname.startsWith(
      '/admin/drivers',
    )

  const isDocumentsPage =
    location.pathname.startsWith(
      '/admin/documents',
    )

  const isCustomersPage =
    location.pathname.startsWith(
      '/admin/clients',
    )

  const isVehiclesPage =
    location.pathname.startsWith(
      '/admin/vehicles',
    )

  const isPaymentsPage =
    location.pathname.startsWith(
      '/admin/payments',
    )

  const isComplaintsPage =
    location.pathname.startsWith(
      '/admin/complaints',
    )

  const isSettingsPage =
    location.pathname.startsWith(
      '/admin/settings',
    )


  /* =====================================================
     LANGUE / DATE
  ===================================================== */

  const locale =
    i18n.resolvedLanguage === 'ar'
      ? 'ar'
      : i18n.resolvedLanguage === 'en'
        ? 'en-US'
        : 'fr-FR'


  const currentDate =
    new Intl.DateTimeFormat(
      locale,
      {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      },
    ).format(
      currentTime,
    )


  const currentHour =
    new Intl.DateTimeFormat(
      locale,
      {
        hour: '2-digit',
        minute: '2-digit',
      },
    ).format(
      currentTime,
    )


  /* =====================================================
     SUPER ADMIN
  ===================================================== */

  const isSuperAdmin =
    useMemo(() => {
      if (!user) {
        return false
      }

      return (
        user.is_superuser === true ||
        user.isSuperuser === true ||
        user.admin_type === 'super' ||
        user.adminType === 'super' ||
        user.role === 'super_admin' ||
        user.role === 'SUPER_ADMIN'
      )
    }, [
      user,
    ])


  /* =====================================================
     NOM
  ===================================================== */

  const displayName =
    useMemo(() => {
      if (!user) {
        return t(
          'common.administrator',
          {
            defaultValue:
              'Administrateur',
          },
        )
      }

      const firstName =
        user.first_name ||
        user.firstName ||
        ''

      const lastName =
        user.last_name ||
        user.lastName ||
        ''

      const fullName =
        `${firstName} ${lastName}`
          .trim()

      if (fullName) {
        return fullName
      }

      if (user.name) {
        return user.name
      }

      if (user.email) {
        return user.email
      }

      return t(
        'common.administrator',
        {
          defaultValue:
            'Administrateur',
        },
      )
    }, [
      user,
      t,
    ])


  /* =====================================================
     INITIALES AVATAR
  ===================================================== */

  const avatarText =
    useMemo(() => {
      if (!user) {
        return 'AD'
      }

      const firstName =
        user.first_name ||
        user.firstName ||
        ''

      const lastName =
        user.last_name ||
        user.lastName ||
        ''

      if (
        firstName ||
        lastName
      ) {
        return `${firstName.charAt(
          0,
        )}${lastName.charAt(
          0,
        )}`
          .toUpperCase()
          .trim()
      }

      if (user.email) {
        return user.email
          .slice(
            0,
            2,
          )
          .toUpperCase()
      }

      return 'AD'
    }, [
      user,
    ])


  const roleLabel =
    isSuperAdmin
      ? t(
          'common.superAdmin',
          {
            defaultValue:
              'Super Admin',
          },
        )
      : t(
          'common.administrator',
          {
            defaultValue:
              'Administrateur',
          },
        )


  /* =====================================================
     CHARGEMENT DES NOTIFICATIONS
  ===================================================== */

  const loadNotifications =
    useCallback(
      async () => {
        if (!userId) {
          setNotifications({
            total: 0,
            items: [],
          })

          setNotificationsLoading(
            false,
          )

          return
        }

        try {
          setNotificationsError(
            false,
          )

          const data =
            await getAdminNotifications(
              userId,
            )

          setNotifications(
            data,
          )
        } catch (error) {
          console.error(
            'Notification loading error:',
            error,
          )

          setNotificationsError(
            true,
          )
        } finally {
          setNotificationsLoading(
            false,
          )
        }
      },
      [
        userId,
      ],
    )


  /* =====================================================
     HORLOGE
  ===================================================== */

  useEffect(() => {
    const timer =
      window.setInterval(
        () => {
          setCurrentTime(
            new Date(),
          )
        },
        60_000,
      )

    return () =>
      window.clearInterval(
        timer,
      )
  }, [])


  /* =====================================================
     NOTIFICATIONS
     CHARGEMENT INITIAL + POLLING
  ===================================================== */

  useEffect(() => {
    loadNotifications()

    const timer =
      window.setInterval(
        loadNotifications,
        30_000,
      )

    return () =>
      window.clearInterval(
        timer,
      )
  }, [
    loadNotifications,
  ])


  /* =====================================================
     TEMPS RÉEL
  ===================================================== */

  useEffect(() => {
    if (!userId) {
      return undefined
    }

    const disconnectRealtime =
      connectAdminRealtime({
        onEvent:
          async (
            realtimeEvent,
          ) => {
            await loadNotifications()

            window.dispatchEvent(
              new CustomEvent(
                'djina:realtime',
                {
                  detail:
                    realtimeEvent,
                },
              ),
            )
          },
      })

    return () => {
      disconnectRealtime()
    }
  }, [
    userId,
    loadNotifications,
  ])


  /* =====================================================
     CHANGEMENT DE PAGE
  ===================================================== */

  useEffect(() => {
    loadNotifications()
  }, [
    location.pathname,
    loadNotifications,
  ])


  /* =====================================================
     FERMETURE DES MENUS
  ===================================================== */

  useEffect(() => {
    const closePanels =
      (event) => {
        const isEscape =
          event.type ===
            'keydown' &&
          event.key ===
            'Escape'

        const isOutsideClick =
          event.type ===
            'pointerdown' &&
          !adminControlsRef
            .current
            ?.contains(
              event.target,
            )

        if (
          isEscape ||
          isOutsideClick
        ) {
          setOpenPanel(
            null,
          )
        }
      }

    document.addEventListener(
      'pointerdown',
      closePanels,
    )

    document.addEventListener(
      'keydown',
      closePanels,
    )

    return () => {
      document.removeEventListener(
        'pointerdown',
        closePanels,
      )

      document.removeEventListener(
        'keydown',
        closePanels,
      )
    }
  }, [])


  /* =====================================================
     DÉCONNEXION
  ===================================================== */

  const handleLogout =
    () => {
      logout()

      navigate(
        '/login',
        {
          replace: true,
        },
      )
    }


  /* =====================================================
     PROFIL
  ===================================================== */

  const handleOpenProfile =
    () => {
      setOpenPanel(
        null,
      )

      setProfileModalOpen(
        true,
      )
    }


  /* =====================================================
     CLOCHE
  ===================================================== */

  const handleBellClick =
    async () => {
      const willOpen =
        openPanel !==
        'notifications'

      setOpenPanel(
        willOpen
          ? 'notifications'
          : null,
      )

      if (willOpen) {
        setNotificationsLoading(
          true,
        )

        await loadNotifications()
      }
    }


  const openNotification =
    (item) => {
      setOpenPanel(
        null,
      )

      navigate(
        item.path,
      )
    }


  /* =====================================================
     TYPES DE NOTIFICATIONS
  ===================================================== */

  const getNotificationData =
    (type) => {
      switch (type) {
        case 'complaints':
          return {
            icon:
              MessageSquareWarning,

            title:
              t(
                'settings.complaints',
                {
                  defaultValue:
                    'Réclamations',
                },
              ),

            description:
              t(
                'settings.newComplaint',
                {
                  defaultValue:
                    'Nouvelle réclamation client',
                },
              ),
          }


        case 'payments':
          return {
            icon:
              CircleDollarSign,

            title:
              t(
                'settings.payments',
                {
                  defaultValue:
                    'Paiements',
                },
              ),

            description:
              t(
                'settings.paymentEvent',
                {
                  defaultValue:
                    'Paiement ou anomalie de transaction',
                },
              ),
          }


        case 'documents':
          return {
            icon:
              FileText,

            title:
              t(
                'settings.documents',
                {
                  defaultValue:
                    'Documents',
                },
              ),

            description:
              t(
                'settings.newDocument',
                {
                  defaultValue:
                    'Nouveau document chauffeur',
                },
              ),
          }


        case 'courses':
          return {
            icon:
              RouteIcon,

            title:
              t(
                'settings.courses',
                {
                  defaultValue:
                    'Courses',
                },
              ),

            description:
              t(
                'settings.courseEvent',
                {
                  defaultValue:
                    'Événements importants sur une course',
                },
              ),
          }


        default:
          return {
            icon:
              Bell,

            title:
              'Notification',

            description:
              '',
          }
      }
    }


  /* =====================================================
     RENDU
  ===================================================== */

  return (
    <>
      <header className="topbar">

        {/* =================================================
            TITRE
        ================================================= */}

        <div className="topbar-heading">
          <button
            className="topbar-menu"
            type="button"
            onClick={
              onMenuClick
            }
            aria-label={t(
              'common.openMenu',
              {
                defaultValue:
                  'Ouvrir le menu',
              },
            )}
          >
            <Menu
              size={21}
              aria-hidden="true"
            />
          </button>

          <span
            className="topbar-heading-accent"
            aria-hidden="true"
          />

          <div className="topbar-heading-copy">

            {isCoursesPage ? (
              <>
                <span className="topbar-eyebrow">
                  {t(
                    'topbar.courses.eyebrow',
                  )}
                </span>

                <h1>
                  {t(
                    'topbar.courses.title',
                  )}
                </h1>

                <p>
                  {t(
                    'topbar.courses.description',
                  )}
                </p>
              </>
            ) : isDriversPage ? (
              <>
                <span className="topbar-eyebrow">
                  {t(
                    'topbar.drivers.eyebrow',
                  )}
                </span>

                <h1>
                  {t(
                    'topbar.drivers.title',
                  )}
                </h1>

                <p>
                  {t(
                    'topbar.drivers.description',
                  )}
                </p>
              </>
            ) : isDocumentsPage ? (
              <>
                <span className="topbar-eyebrow">
                  {t(
                    'topbar.documents.eyebrow',
                  )}
                </span>

                <h1>
                  {t(
                    'topbar.documents.title',
                  )}
                </h1>

                <p>
                  {t(
                    'topbar.documents.description',
                  )}
                </p>
              </>
            ) : isCustomersPage ? (
              <>
                <span className="topbar-eyebrow">
                  {t(
                    'topbar.customers.eyebrow',
                  )}
                </span>

                <h1>
                  {t(
                    'topbar.customers.title',
                  )}
                </h1>

                <p>
                  {t(
                    'topbar.customers.description',
                  )}
                </p>
              </>
            ) : isVehiclesPage ? (
              <>
                <span className="topbar-eyebrow">
                  {t(
                    'topbar.vehicles.eyebrow',
                  )}
                </span>

                <h1>
                  {t(
                    'topbar.vehicles.title',
                  )}
                </h1>

                <p>
                  {t(
                    'topbar.vehicles.description',
                  )}
                </p>
              </>
            ) : isPaymentsPage ? (
              <>
                <span className="topbar-eyebrow">
                  {t(
                    'topbar.payments.eyebrow',
                  )}
                </span>

                <h1>
                  {t(
                    'topbar.payments.title',
                  )}
                </h1>

                <p>
                  {t(
                    'topbar.payments.description',
                  )}
                </p>
              </>
            ) : isComplaintsPage ? (
              <>
                <span className="topbar-eyebrow">
                  {t(
                    'topbar.complaints.eyebrow',
                  )}
                </span>

                <h1>
                  {t(
                    'topbar.complaints.title',
                  )}
                </h1>

                <p>
                  {t(
                    'topbar.complaints.description',
                  )}
                </p>
              </>
            ) : isSettingsPage ? (
              <>
                <span className="topbar-eyebrow">
                  {t(
                    'topbar.settings.eyebrow',
                  )}
                </span>

                <h1>
                  {t(
                    'topbar.settings.title',
                  )}
                </h1>

                <p>
                  {t(
                    'topbar.settings.description',
                  )}
                </p>
              </>
            ) : (
              <>
                <span className="topbar-eyebrow">
                  {t(
                    'topbar.dashboard.eyebrow',
                  )}
                </span>

                <h1>
                  {t(
                    'topbar.dashboard.title',
                  )}
                </h1>

                <p>
                  {t(
                    'topbar.dashboard.description',
                  )}
                </p>
              </>
            )}

          </div>
        </div>


        {/* =================================================
            DATE
        ================================================= */}

        <div className="topbar-date">
          <CalendarDays
            size={16}
            strokeWidth={1.8}
            aria-hidden="true"
          />

          <div>
            <time
              className="topbar-date-day"
              dateTime={
                currentTime
                  .toISOString()
                  .slice(
                    0,
                    10,
                  )
              }
            >
              {currentDate}
            </time>

            <div className="topbar-date-meta">
              <time
                dateTime={
                  currentTime
                    .toTimeString()
                    .slice(
                      0,
                      5,
                    )
                }
              >
                {currentHour}
              </time>

              <span aria-hidden="true">
                ·
              </span>

              <span>
                N&apos;Djamena
              </span>
            </div>
          </div>
        </div>


        {/* =================================================
            ADMIN CONTROLS
        ================================================= */}

        <div
          className="admin-controls"
          ref={
            adminControlsRef
          }
        >

          {/* =================================================
              CLOCHE
          ================================================= */}

          <button
            className="notification-trigger"
            type="button"
            aria-label={t(
              'common.showNotifications',
              {
                defaultValue:
                  'Afficher les notifications',
              },
            )}
            aria-expanded={
              openPanel ===
              'notifications'
            }
            onClick={
              handleBellClick
            }
          >
            <span className="notification-icon">
              <Bell
                size={18}
                strokeWidth={1.8}
                aria-hidden="true"
              />

              {notifications.total >
                0 && (
                <span
                  className="notification-dot"
                  aria-hidden="true"
                />
              )}
            </span>

            {notifications.total >
              0 && (
              <span className="notification-count">
                {notifications.total >
                99
                  ? '99+'
                  : notifications.total}
              </span>
            )}
          </button>


          {/* =================================================
              PROFIL HEADER
          ================================================= */}

          <button
            className="profile-trigger"
            type="button"
            aria-label={t(
              'common.openProfileMenu',
              {
                defaultValue:
                  'Ouvrir le menu du profil',
              },
            )}
            aria-expanded={
              openPanel ===
              'profile'
            }
            onClick={() =>
              setOpenPanel(
                (current) =>
                  current ===
                  'profile'
                    ? null
                    : 'profile',
              )
            }
          >

            <span
              className={`topbar-avatar ${
                profilePhoto
                  ? 'has-photo'
                  : ''
              }`}
              aria-hidden="true"
            >
              {profilePhoto ? (
                <img
                  src={
                    profilePhoto
                  }
                  alt=""
                />
              ) : (
                avatarText
              )}
            </span>


            <span className="profile-identity">
              <strong>
                {displayName}
              </strong>

              <small>
                {roleLabel}
              </small>
            </span>


            <ChevronDown
              className="profile-chevron"
              size={15}
              aria-hidden="true"
            />
          </button>


          {/* =================================================
              PANEL NOTIFICATIONS
          ================================================= */}

          <div
            className={`notifications-panel ${
              openPanel ===
              'notifications'
                ? 'is-open'
                : ''
            }`}
          >
            <div className="notifications-panel-header">
              <div>
                <strong>
                  {t(
                    'settings.notifications',
                    {
                      defaultValue:
                        'Notifications',
                    },
                  )}
                </strong>

                {notifications.total >
                  0 && (
                  <span>
                    {
                      notifications.total
                    }{' '}
                    à traiter
                  </span>
                )}
              </div>

              <button
                type="button"
                className="notifications-refresh"
                onClick={
                  loadNotifications
                }
              >
                Actualiser
              </button>
            </div>


            {notificationsLoading ? (
              <div className="notifications-empty">
                Chargement…
              </div>
            ) : notificationsError ? (
              <div className="notifications-empty notifications-empty--error">
                Impossible de charger les notifications.
              </div>
            ) : notifications.items
                .length === 0 ? (
              <div className="notifications-empty">
                {t(
                  'common.noNotifications',
                  {
                    defaultValue:
                      'Aucune nouvelle notification',
                  },
                )}
              </div>
            ) : (
              <div className="notifications-list">
                {notifications.items.map(
                  (item) => {
                    const data =
                      getNotificationData(
                        item.type,
                      )

                    const Icon =
                      data.icon

                    return (
                      <button
                        key={
                          item.id
                        }
                        type="button"
                        className={`notification-item notification-item--${item.type}`}
                        onClick={() =>
                          openNotification(
                            item,
                          )
                        }
                      >
                        <span className="notification-item-icon">
                          <Icon
                            size={17}
                            aria-hidden="true"
                          />
                        </span>

                        <span className="notification-item-copy">
                          <strong>
                            {
                              data.title
                            }
                          </strong>

                          <small>
                            {
                              data.description
                            }
                          </small>
                        </span>

                        <span className="notification-item-count">
                          {
                            item.count
                          }
                        </span>

                        <ChevronRight
                          size={15}
                          aria-hidden="true"
                        />
                      </button>
                    )
                  },
                )}
              </div>
            )}
          </div>


          {/* =================================================
              MENU PROFIL
          ================================================= */}

          <div
            className={`profile-menu ${
              openPanel ===
              'profile'
                ? 'is-open'
                : ''
            }`}
          >

            {/* MON PROFIL */}

            <button
              type="button"
              onClick={
                handleOpenProfile
              }
            >
              <UserRound
                size={16}
                aria-hidden="true"
              />

              {t(
                'common.myProfile',
                {
                  defaultValue:
                    'Mon profil',
                },
              )}
            </button>


            {/* PARAMÈTRES */}

            <button
              type="button"
              onClick={() => {
                setOpenPanel(
                  null,
                )

                navigate(
                  '/admin/settings',
                )
              }}
            >
              <Settings
                size={16}
                aria-hidden="true"
              />

              {t(
                'common.settings',
              )}
            </button>


            <span className="profile-menu-separator" />


            {/* DÉCONNEXION */}

            <button
              type="button"
              onClick={
                handleLogout
              }
            >
              <LogOut
                size={16}
                aria-hidden="true"
              />

              {t(
                'common.logout',
                {
                  defaultValue:
                    'Se déconnecter',
                },
              )}
            </button>

          </div>

        </div>
      </header>


      {/* ===================================================
          MODAL PROFIL
      =================================================== */}

      <EditProfileModal
        isOpen={
          profileModalOpen
        }
        user={
          user
        }
        onClose={() =>
          setProfileModalOpen(
            false,
          )
        }
      />
    </>
  )
}


export default Topbar