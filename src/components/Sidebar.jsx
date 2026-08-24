import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import {
  useLocation,
  useNavigate,
} from 'react-router-dom'

import {
  useTranslation,
} from 'react-i18next'

import {
  Bike,
  CarFront,
  CircleDollarSign,
  FileCheck2,
  Gauge,
  MessageSquareWarning,
  Settings,
  Users,
  X,
} from 'lucide-react'

import {
  useAuth,
} from '../context/authContext'

import {
  getProfilePhoto,
} from '../services/profilePhotoService'

import SignatureDots from './SignatureDots'


const menuItems = [
  {
    labelKey:
      'common.dashboard',
    icon:
      Gauge,
    path:
      '/admin',
  },
  {
    labelKey:
      'common.courses',
    icon:
      CarFront,
    path:
      '/admin/courses',
  },
  {
    labelKey:
      'common.drivers',
    icon:
      Bike,
    path:
      '/admin/drivers',
  },
  {
    labelKey:
      'common.documents',
    icon:
      FileCheck2,
    path:
      '/admin/documents',
  },
  {
    labelKey:
      'common.customers',
    icon:
      Users,
    path:
      '/admin/clients',
  },
  {
    labelKey:
      'common.vehicles',
    icon:
      CarFront,
    path:
      '/admin/vehicles',
  },
  {
    labelKey:
      'common.payments',
    icon:
      CircleDollarSign,
    path:
      '/admin/payments',
  },
  {
    labelKey:
      'common.complaints',
    icon:
      MessageSquareWarning,
    path:
      '/admin/complaints',
  },
  {
    labelKey:
      'common.settings',
    icon:
      Settings,
    path:
      '/admin/settings',
  },
]


function Sidebar({
  isOpen,
  isCollapsed,
  onClose,
  onToggleCollapse,
}) {
  const iconRefs =
    useRef([])

  const previousPositions =
    useRef(null)

  const navigate =
    useNavigate()

  const location =
    useLocation()

  const {
    t,
  } = useTranslation()

  const {
    user,
  } = useAuth()


  /* =====================================================
     UTILISATEUR
  ===================================================== */

  const userId =
    user?.id ??
    user?.user_id ??
    null


  /* =====================================================
     PHOTO PROFIL
  ===================================================== */

  const [
    profilePhoto,
    setProfilePhoto,
  ] = useState(null)


  useEffect(() => {
    if (!userId) {
      setProfilePhoto(
        null,
      )

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
     MISE À JOUR PHOTO IMMÉDIATE
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
     SUPER ADMIN
  ===================================================== */

  const isSuperAdmin =
    useMemo(() => {
      if (!user) {
        return false
      }

      return (
        user.is_superuser ===
          true ||
        user.isSuperuser ===
          true ||
        user.admin_type ===
          'super' ||
        user.adminType ===
          'super' ||
        user.role ===
          'super_admin' ||
        user.role ===
          'SUPER_ADMIN'
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
     INITIALES
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


  /* =====================================================
     RÔLE
  ===================================================== */

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
     ANIMATION SIDEBAR
  ===================================================== */

  useLayoutEffect(() => {
    const icons =
      iconRefs.current.filter(
        Boolean,
      )

    const currentPositions =
      icons.map(
        (icon) =>
          icon.getBoundingClientRect(),
      )

    if (
      previousPositions.current &&
      !window
        .matchMedia(
          '(max-width: 960px)',
        )
        .matches
    ) {
      const reduceMotion =
        window
          .matchMedia(
            '(prefers-reduced-motion: reduce)',
          )
          .matches

      if (!reduceMotion) {
        icons.forEach(
          (
            icon,
            index,
          ) => {
            const previous =
              previousPositions
                .current[index]

            const current =
              currentPositions[
                index
              ]

            if (
              !previous ||
              !current
            ) {
              return
            }

            icon.animate(
              [
                {
                  transform:
                    `translate(${
                      previous.left -
                      current.left
                    }px, ${
                      previous.top -
                      current.top
                    }px)`,
                },
                {
                  transform:
                    'translate(0, 0)',
                },
              ],
              {
                duration:
                  620,

                delay:
                  index * 40,

                easing:
                  'cubic-bezier(0.22, 1, 0.36, 1)',

                fill:
                  'both',
              },
            )
          },
        )
      }
    }

    previousPositions.current =
      currentPositions
  }, [
    isCollapsed,
  ])


  /* =====================================================
     RENDU
  ===================================================== */

  return (
    <>
      {/* =================================================
          OVERLAY MOBILE
      ================================================= */}

      <button
        className={`sidebar-overlay ${
          isOpen
            ? 'is-visible'
            : ''
        }`}
        type="button"
        aria-label={t(
          'common.closeMenu',
          {
            defaultValue:
              'Fermer le menu',
          },
        )}
        onClick={
          onClose
        }
      />


      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside
        className={`sidebar ${
          isOpen
            ? 'is-open'
            : ''
        } ${
          isCollapsed
            ? 'is-collapsed'
            : ''
        }`}
        aria-label={t(
          'common.mainNavigation',
          {
            defaultValue:
              'Navigation principale',
          },
        )}
      >

        {/* =================================================
            MARQUE
        ================================================= */}

        <div className="sidebar-brand">
          <div>
            <span className="sidebar-logo">
              <span className="logo-full">
                DJINA
              </span>

              <span className="logo-compact">
                D
              </span>
            </span>

            <span className="sidebar-subtitle">
              Administration
            </span>
          </div>


          <SignatureDots
            isCollapsed={
              isCollapsed
            }
            onClick={
              onToggleCollapse
            }
          />


          <button
            className="sidebar-close"
            type="button"
            onClick={
              onClose
            }
            aria-label={t(
              'common.closeMenu',
              {
                defaultValue:
                  'Fermer le menu',
              },
            )}
          >
            <X
              size={20}
              aria-hidden="true"
            />
          </button>
        </div>


        {/* =================================================
            NAVIGATION
        ================================================= */}

        <nav className="sidebar-nav">
          {menuItems.map(
            (
              {
                labelKey,
                icon: Icon,
                path,
              },
              index,
            ) => {
              const label =
                t(
                  labelKey,
                )

              const isActive =
                path
                  ? path ===
                    '/admin'
                    ? location
                        .pathname ===
                      '/admin'
                    : location
                        .pathname
                        .startsWith(
                          path,
                        )
                  : false

              return (
                <button
                  className={`nav-item ${
                    isActive
                      ? 'is-active'
                      : ''
                  }`}
                  type="button"
                  key={
                    labelKey
                  }
                  title={
                    isCollapsed
                      ? label
                      : undefined
                  }
                  aria-current={
                    isActive
                      ? 'page'
                      : undefined
                  }
                  onClick={() => {
                    if (!path) {
                      return
                    }

                    navigate(
                      path,
                    )

                    if (
                      window
                        .matchMedia(
                          '(max-width: 960px)',
                        )
                        .matches
                    ) {
                      onClose()
                    }
                  }}
                >
                  <span
                    className="nav-icon"
                    ref={(
                      element,
                    ) => {
                      iconRefs.current[
                        index
                      ] =
                        element
                    }}
                  >
                    <Icon
                      size={18}
                      strokeWidth={
                        1.8
                      }
                      aria-hidden="true"
                    />
                  </span>

                  <span className="nav-label">
                    {label}
                  </span>
                </button>
              )
            },
          )}
        </nav>


        {/* =================================================
            COMPTE ADMIN EN BAS
        ================================================= */}

        <div
          className="admin-card"
          role="button"
          tabIndex={0}
          onClick={() =>
            navigate(
              '/admin/settings',
            )
          }
          onKeyDown={(
            event,
          ) => {
            if (
              event.key ===
                'Enter' ||
              event.key ===
                ' '
            ) {
              event.preventDefault()

              navigate(
                '/admin/settings',
              )
            }
          }}
        >

          {/* PHOTO / INITIALES */}

          <div
            className={`admin-card-avatar ${
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
          </div>


          {/* IDENTITÉ */}

          <div className="admin-card-copy">
            <strong>
              {displayName}
            </strong>

            <span>
              {roleLabel}
            </span>
          </div>

        </div>

      </aside>
    </>
  )
}


export default Sidebar