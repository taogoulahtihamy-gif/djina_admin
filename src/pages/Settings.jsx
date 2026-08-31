import {
  useEffect,
  useMemo,
  useState,
} from 'react'

import {
  Bell,
  BadgePercent,
  Check,
  ChevronRight,
  Eye,
  EyeOff,
  Languages,
  LockKeyhole,
  Moon,
  ShieldCheck,
  SlidersHorizontal,
  Sun,
  UserRound,
  X,
} from 'lucide-react'

import {
  useNavigate,
} from 'react-router-dom'

import {
  useTranslation,
} from 'react-i18next'

import {
  useAuth,
} from '../context/authContext'

import {
  createSetting,
  getSettings,
  updateSetting,
} from '../services/settingService'

import {
  changePassword,
} from '../services/securityService'

import ActiveSessionsModal from '../components/settings/ActiveSessionsModal'
import EditProfileModal from '../components/settings/EditProfileModal'

import {
  applyAppearance,
  getAppearance,
} from '../services/themeService'
import {
  DEFAULT_COMMISSION_RATE,
  getCurrentCommissionSetting,
  updateCommissionRate,
} from '../services/commissionService'
import { canCreateAdministrator } from '../utils/adminPermissions'


const LANGUAGES = [
  {
    code: 'fr',
    translationKey:
      'settings.french',
    nativeLabel:
      'Français',
  },
  {
    code: 'en',
    translationKey:
      'settings.english',
    nativeLabel:
      'English',
  },
  {
    code: 'ar',
    translationKey:
      'settings.arabic',
    nativeLabel:
      'العربية',
  },
]


const DEFAULT_NOTIFICATIONS = {
  complaints: true,
  payments: true,
  documents: true,
  courses: true,
}


const EMPTY_PASSWORD_FORM = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
}


const EMPTY_PASSWORD_VISIBILITY = {
  currentPassword: false,
  newPassword: false,
  confirmPassword: false,
}


function normalizeList(data) {
  if (Array.isArray(data)) {
    return data
  }

  return data?.results ?? []
}


function parseBoolean(
  value,
  fallback = true,
) {
  if (
    value === undefined ||
    value === null
  ) {
    return fallback
  }

  if (
    typeof value === 'boolean'
  ) {
    return value
  }

  return (
    String(value).toLowerCase() ===
    'true'
  )
}


function Settings() {
  const navigate = useNavigate()

  const {
    t,
    i18n,
  } = useTranslation()

  const {
    user,
    logout,
  } = useAuth()

  const [commissionInput, setCommissionInput] = useState(DEFAULT_COMMISSION_RATE)
  const [commissionSaved, setCommissionSaved] = useState(false)
  const [commissionLoading, setCommissionLoading] = useState(true)
  const [commissionError, setCommissionError] = useState('')

  useEffect(() => {
    getCurrentCommissionSetting()
      .then((setting) => setCommissionInput(setting.rate))
      .catch(() => setCommissionError(t('settings.commission.loadError')))
      .finally(() => setCommissionLoading(false))
  }, [t])


  /* =====================================================
     PROFIL
  ===================================================== */

  const [
    profileModalOpen,
    setProfileModalOpen,
  ] = useState(false)


  /* =====================================================
     LANGUE
  ===================================================== */

  const [
    language,
    setLanguage,
  ] = useState(
    i18n.resolvedLanguage ||
    'fr',
  )


  /* =====================================================
     APPARENCE
  ===================================================== */

  const [
    appearance,
    setAppearance,
  ] = useState(
    () => getAppearance(),
  )


  /* =====================================================
     NOTIFICATIONS
  ===================================================== */

  const [
    notifications,
    setNotifications,
  ] = useState(
    DEFAULT_NOTIFICATIONS,
  )

  const [
    settingRecords,
    setSettingRecords,
  ] = useState([])

  const [
    settingsLoading,
    setSettingsLoading,
  ] = useState(true)

  const [
    notificationError,
    setNotificationError,
  ] = useState('')

  const [
    savingNotification,
    setSavingNotification,
  ] = useState({
    complaints: false,
    payments: false,
    documents: false,
    courses: false,
  })


  /* =====================================================
     MOT DE PASSE
  ===================================================== */

  const [
    passwordModalOpen,
    setPasswordModalOpen,
  ] = useState(false)

  const [
    passwordForm,
    setPasswordForm,
  ] = useState(
    EMPTY_PASSWORD_FORM,
  )

  const [
    passwordVisible,
    setPasswordVisible,
  ] = useState(
    EMPTY_PASSWORD_VISIBILITY,
  )

  const [
    passwordError,
    setPasswordError,
  ] = useState('')

  const [
    passwordSuccess,
    setPasswordSuccess,
  ] = useState('')

  const [
    passwordSubmitting,
    setPasswordSubmitting,
  ] = useState(false)


  /* =====================================================
     SESSIONS
  ===================================================== */

  const [
    sessionsModalOpen,
    setSessionsModalOpen,
  ] = useState(false)


  /* =====================================================
     APPARENCE
  ===================================================== */

  const handleAppearanceChange = (
    nextAppearance,
  ) => {
    setAppearance(
      nextAppearance,
    )

    applyAppearance(
      nextAppearance,
    )
  }


  /* =====================================================
     LANGUE SÉLECTIONNÉE
  ===================================================== */

  const selectedLanguage =
    useMemo(
      () =>
        LANGUAGES.find(
          (item) =>
            item.code ===
            language,
        ),
      [language],
    )


  /* =====================================================
     SUPER ADMIN
  ===================================================== */

  const isSuperAdmin =
    useMemo(() => canCreateAdministrator(user), [user])


  /* =====================================================
     NOM UTILISATEUR
  ===================================================== */

  const displayName =
    useMemo(() => {
      if (!user) {
        return t(
          'common.administrator',
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
      )
    }, [
      user,
      t,
    ])


  const roleLabel =
    isSuperAdmin
      ? t(
          'common.superAdmin',
        )
      : t(
          'common.administrator',
        )


  const accountStatus =
    user?.is_active === false
      ? t(
          'settings.inactive',
        )
      : t(
          'settings.active',
        )


  /* =====================================================
     CLÉS DES PRÉFÉRENCES
  ===================================================== */

  const settingPrefix =
    useMemo(
      () =>
        user?.id
          ? `admin.${user.id}.notifications`
          : null,
      [user?.id],
    )


  const settingNames =
    useMemo(() => {
      if (!settingPrefix) {
        return null
      }

      return {
        complaints:
          `${settingPrefix}.complaints`,

        payments:
          `${settingPrefix}.payments`,

        documents:
          `${settingPrefix}.documents`,

        courses:
          `${settingPrefix}.courses`,
      }
    }, [settingPrefix])


  /* =====================================================
     CHARGEMENT DES PRÉFÉRENCES
  ===================================================== */

  useEffect(() => {
    if (!settingNames) {
      setSettingsLoading(false)
      return
    }

    let cancelled = false

    const loadSettings =
      async () => {
        try {
          setSettingsLoading(true)

          setNotificationError('')

          const data =
            await getSettings()

          if (cancelled) {
            return
          }

          const records =
            normalizeList(data)

          setSettingRecords(
            records,
          )

          const nextNotifications = {
            ...DEFAULT_NOTIFICATIONS,
          }

          Object.entries(
            settingNames,
          ).forEach(
            ([
              key,
              settingName,
            ]) => {
              const record =
                records.find(
                  (item) =>
                    item.setting_name ===
                    settingName,
                )

              if (record) {
                nextNotifications[
                  key
                ] =
                  parseBoolean(
                    record.value,
                  )
              }
            },
          )

          setNotifications(
            nextNotifications,
          )
        } catch (error) {
          console.error(
            'Settings loading error:',
            error,
          )

          if (!cancelled) {
            setNotificationError(
              t(
                'settings.notificationLoadError',
              ),
            )
          }
        } finally {
          if (!cancelled) {
            setSettingsLoading(
              false,
            )
          }
        }
      }

    loadSettings()

    return () => {
      cancelled = true
    }
  }, [
    settingNames,
    t,
  ])


  /* =====================================================
     NOTIFICATIONS
  ===================================================== */

  const toggleNotification =
    async (key) => {
      if (
        !settingNames ||
        settingsLoading ||
        savingNotification[key]
      ) {
        return
      }

      const previousValue =
        notifications[key]

      const nextValue =
        !previousValue

      const settingName =
        settingNames[key]

      setNotificationError('')

      setNotifications(
        (current) => ({
          ...current,
          [key]: nextValue,
        }),
      )

      setSavingNotification(
        (current) => ({
          ...current,
          [key]: true,
        }),
      )

      try {
        const existingSetting =
          settingRecords.find(
            (item) =>
              item.setting_name ===
              settingName,
          )

        let savedSetting

        if (existingSetting) {
          savedSetting =
            await updateSetting(
              existingSetting.id,
              String(nextValue),
            )
        } else {
          savedSetting =
            await createSetting({
              setting_name:
                settingName,

              value:
                String(nextValue),
            })
        }

        setSettingRecords(
          (current) => {
            const exists =
              current.some(
                (item) =>
                  item.setting_name ===
                  settingName,
              )

            if (exists) {
              return current.map(
                (item) =>
                  item.setting_name ===
                  settingName
                    ? savedSetting
                    : item,
              )
            }

            return [
              ...current,
              savedSetting,
            ]
          },
        )
      } catch (error) {
        console.error(
          'Notification setting error:',
          error,
        )

        setNotifications(
          (current) => ({
            ...current,
            [key]:
              previousValue,
          }),
        )

        setNotificationError(
          t(
            'settings.notificationSaveError',
          ),
        )
      } finally {
        setSavingNotification(
          (current) => ({
            ...current,
            [key]: false,
          }),
        )
      }
    }


  /* =====================================================
     CHANGEMENT DE LANGUE
  ===================================================== */

  const handleLanguageChange =
    async (
      languageCode,
    ) => {
      await i18n.changeLanguage(
        languageCode,
      )

      setLanguage(
        languageCode,
      )
    }


  /* =====================================================
     OUVRIR MODAL MOT DE PASSE
  ===================================================== */

  const openPasswordModal =
    () => {
      setPasswordForm(
        EMPTY_PASSWORD_FORM,
      )

      setPasswordVisible(
        EMPTY_PASSWORD_VISIBILITY,
      )

      setPasswordError('')
      setPasswordSuccess('')

      setPasswordModalOpen(
        true,
      )
    }


  /* =====================================================
     FERMER MODAL MOT DE PASSE
  ===================================================== */

  const closePasswordModal =
    () => {
      if (
        passwordSubmitting
      ) {
        return
      }

      setPasswordModalOpen(
        false,
      )

      setPasswordForm(
        EMPTY_PASSWORD_FORM,
      )

      setPasswordVisible(
        EMPTY_PASSWORD_VISIBILITY,
      )

      setPasswordError('')
      setPasswordSuccess('')
    }


  /* =====================================================
     INPUTS MOT DE PASSE
  ===================================================== */

  const handlePasswordChange =
    (event) => {
      const {
        name,
        value,
      } = event.target

      setPasswordForm(
        (current) => ({
          ...current,
          [name]: value,
        }),
      )

      if (passwordError) {
        setPasswordError('')
      }
    }


  /* =====================================================
     AFFICHER / MASQUER MOT DE PASSE
  ===================================================== */

  const togglePasswordVisibility =
    (field) => {
      setPasswordVisible(
        (current) => ({
          ...current,

          [field]:
            !current[field],
        }),
      )
    }


  /* =====================================================
     MODIFIER LE MOT DE PASSE
  ===================================================== */

  const handlePasswordSubmit =
    async (event) => {
      event.preventDefault()

      setPasswordError('')
      setPasswordSuccess('')

      if (
        !passwordForm
          .currentPassword ||
        !passwordForm
          .newPassword ||
        !passwordForm
          .confirmPassword
      ) {
        setPasswordError(
          t(
            'settings.passwordModal.required',
          ),
        )

        return
      }

      if (
        passwordForm
          .newPassword !==
        passwordForm
          .confirmPassword
      ) {
        setPasswordError(
          t(
            'settings.passwordModal.mismatch',
          ),
        )

        return
      }

      if (
        passwordForm
          .currentPassword ===
        passwordForm
          .newPassword
      ) {
        setPasswordError(
          t(
            'settings.passwordModal.samePassword',
          ),
        )

        return
      }

      setPasswordSubmitting(
        true,
      )

      try {
        await changePassword(
          passwordForm
            .currentPassword,

          passwordForm
            .newPassword,
        )

        setPasswordSuccess(
          t(
            'settings.passwordModal.success',
          ),
        )

        window.setTimeout(
          async () => {
            await Promise.resolve(
              logout(),
            )

            navigate(
              '/login',
              {
                replace: true,
              },
            )
          },
          1200,
        )
      } catch (error) {
        console.error(
          'Password update error:',
          error,
        )

        const data =
          error?.data

        if (
          Array.isArray(
            data?.current_password,
          )
        ) {
          setPasswordError(
            t(
              'settings.passwordModal.currentIncorrect',
            ),
          )
        } else if (
          Array.isArray(
            data?.new_password,
          )
        ) {
          setPasswordError(
            t(
              'settings.passwordModal.invalidNewPassword',
            ),
          )
        } else {
          setPasswordError(
            t(
              'settings.passwordModal.genericError',
            ),
          )
        }
      } finally {
        setPasswordSubmitting(
          false,
        )
      }
    }


  /* =====================================================
     RENDU
  ===================================================== */

  const handleCommissionSave = async (event) => {
    event.preventDefault()
    try {
      setCommissionLoading(true)
      setCommissionError('')
      const setting = await updateCommissionRate(commissionInput)
      setCommissionInput(setting.rate)
      setCommissionSaved(true)
      window.setTimeout(() => setCommissionSaved(false), 3000)
    } catch (error) {
      setCommissionError(error?.status === 403 ? t('settings.commission.forbidden') : t('settings.commission.saveError'))
    } finally {
      setCommissionLoading(false)
    }
  }

  return (
    <section className="settings-page">
      <div className="settings-grid">

        {/* =================================================
            LANGUE
        ================================================= */}

        <section className="settings-card settings-language-card">
          <div className="settings-card-heading">
            <span className="settings-card-icon">
              <Languages
                size={18}
                aria-hidden="true"
              />
            </span>

            <div>
              <h2>
                {t(
                  'settings.language',
                )}
              </h2>

              <p>
                {t(
                  'settings.languageDescription',
                )}
              </p>
            </div>
          </div>

          <div className="settings-language-list">
            {LANGUAGES.map(
              (item) => {
                const isSelected =
                  language ===
                  item.code

                return (
                  <button
                    key={
                      item.code
                    }
                    type="button"
                    className={`settings-language-option ${
                      isSelected
                        ? 'is-selected'
                        : ''
                    }`}
                    onClick={() =>
                      handleLanguageChange(
                        item.code,
                      )
                    }
                  >
                    <div>
                      <strong>
                        {t(
                          item.translationKey,
                        )}
                      </strong>

                      <span>
                        {
                          item.nativeLabel
                        }
                      </span>
                    </div>

                    <span className="settings-language-check">
                      {isSelected && (
                        <Check
                          size={15}
                          aria-hidden="true"
                        />
                      )}
                    </span>
                  </button>
                )
              },
            )}
          </div>

          <div className="settings-current-language">
            <span>
              {t(
                'settings.currentLanguage',
              )}
            </span>

            <strong>
              {
                selectedLanguage
                  ?.nativeLabel
              }
            </strong>
          </div>
        </section>

        <section className="settings-card settings-commission-card">
          <div className="settings-card-heading">
            <span className="settings-card-icon">
              <BadgePercent size={18} aria-hidden="true" />
            </span>
            <div>
              <h2>{t('settings.commission.title')}</h2>
              <p>{t('settings.commission.description')}</p>
            </div>
          </div>

          <form className="settings-commission-form" onSubmit={handleCommissionSave}>
            <label htmlFor="commission-rate">
              <span>{t('settings.commission.currentRate')}</span>
              <div className="settings-commission-input-wrap">
                <input
                  id="commission-rate"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={commissionInput}
                  disabled={!isSuperAdmin || commissionLoading}
                  onChange={(event) => {
                    setCommissionInput(event.target.value)
                    setCommissionSaved(false)
                  }}
                />
                <span>%</span>
              </div>
            </label>

            {isSuperAdmin && (
              <button type="submit" className="settings-commission-save" disabled={commissionLoading}>
                <Check size={16} aria-hidden="true" />
                {t('settings.commission.save')}
              </button>
            )}
          </form>

          <p className="settings-commission-note">
            {t('settings.commission.note')}
          </p>
          {!isSuperAdmin && (
            <p className="settings-commission-readonly">
              {t('settings.commission.readOnly')}
            </p>
          )}
          {commissionSaved && (
            <p className="settings-commission-success" role="status">
              {t('settings.commission.saved')}
            </p>
          )}
          {commissionError && <p className="settings-notification-error" role="alert">{commissionError}</p>}
        </section>


        {/* =================================================
            PROFIL ADMINISTRATEUR
        ================================================= */}

        <section className="settings-card">
          <div className="settings-card-heading">
            <span className="settings-card-icon">
              <UserRound
                size={18}
                aria-hidden="true"
              />
            </span>

            <div>
              <h2>
                {t(
                  'settings.adminProfile',
                )}
              </h2>

              <p>
                {t(
                  'settings.adminProfileDescription',
                )}
              </p>
            </div>
          </div>

          <div className="settings-detail-list">
            <div>
              <span>
                {t(
                  'settings.name',
                )}
              </span>

              <strong>
                {displayName}
              </strong>
            </div>

            <div>
              <span>
                {t(
                  'settings.role',
                )}
              </span>

              <strong>
                {roleLabel}
              </strong>
            </div>

            <div>
              <span>
                {t(
                  'settings.account',
                )}
              </span>

              <strong>
                {accountStatus}
              </strong>
            </div>
          </div>

          <button
            type="button"
            className="settings-secondary-action"
            onClick={() =>
              setProfileModalOpen(
                true,
              )
            }
          >
            <span>
              {t(
                'settings.editProfile',
              )}
            </span>

            <ChevronRight
              size={16}
              aria-hidden="true"
            />
          </button>
        </section>


        {/* =================================================
            NOTIFICATIONS
        ================================================= */}

        <section className="settings-card">
          <div className="settings-card-heading">
            <span className="settings-card-icon">
              <Bell
                size={18}
                aria-hidden="true"
              />
            </span>

            <div>
              <h2>
                {t(
                  'settings.notifications',
                )}
              </h2>

              <p>
                {settingsLoading
                  ? t(
                      'settings.loadingPreferences',
                    )
                  : t(
                      'settings.notificationsDescription',
                    )}
              </p>
            </div>
          </div>

          {notificationError && (
            <p
              className="settings-notification-error"
              role="alert"
            >
              {
                notificationError
              }
            </p>
          )}

          <div className="settings-toggle-list">

            {/* RÉCLAMATIONS */}

            <label className="settings-toggle-row">
              <div>
                <strong>
                  {t(
                    'settings.complaints',
                  )}
                </strong>

                <span>
                  {t(
                    'settings.newComplaint',
                  )}
                </span>
              </div>

              <span className="settings-switch">
                <input
                  type="checkbox"
                  checked={
                    notifications
                      .complaints
                  }
                  disabled={
                    settingsLoading ||
                    savingNotification
                      .complaints
                  }
                  onChange={() =>
                    toggleNotification(
                      'complaints',
                    )
                  }
                />

                <span className="settings-switch-track">
                  <span className="settings-switch-thumb" />
                </span>
              </span>
            </label>


            {/* PAIEMENTS */}

            <label className="settings-toggle-row">
              <div>
                <strong>
                  {t(
                    'settings.payments',
                  )}
                </strong>

                <span>
                  {t(
                    'settings.paymentEvent',
                  )}
                </span>
              </div>

              <span className="settings-switch">
                <input
                  type="checkbox"
                  checked={
                    notifications
                      .payments
                  }
                  disabled={
                    settingsLoading ||
                    savingNotification
                      .payments
                  }
                  onChange={() =>
                    toggleNotification(
                      'payments',
                    )
                  }
                />

                <span className="settings-switch-track">
                  <span className="settings-switch-thumb" />
                </span>
              </span>
            </label>


            {/* DOCUMENTS */}

            <label className="settings-toggle-row">
              <div>
                <strong>
                  {t(
                    'settings.documents',
                  )}
                </strong>

                <span>
                  {t(
                    'settings.newDocument',
                  )}
                </span>
              </div>

              <span className="settings-switch">
                <input
                  type="checkbox"
                  checked={
                    notifications
                      .documents
                  }
                  disabled={
                    settingsLoading ||
                    savingNotification
                      .documents
                  }
                  onChange={() =>
                    toggleNotification(
                      'documents',
                    )
                  }
                />

                <span className="settings-switch-track">
                  <span className="settings-switch-thumb" />
                </span>
              </span>
            </label>


            {/* COURSES */}

            <label className="settings-toggle-row">
              <div>
                <strong>
                  {t(
                    'settings.courses',
                  )}
                </strong>

                <span>
                  {t(
                    'settings.courseEvent',
                  )}
                </span>
              </div>

              <span className="settings-switch">
                <input
                  type="checkbox"
                  checked={
                    notifications
                      .courses
                  }
                  disabled={
                    settingsLoading ||
                    savingNotification
                      .courses
                  }
                  onChange={() =>
                    toggleNotification(
                      'courses',
                    )
                  }
                />

                <span className="settings-switch-track">
                  <span className="settings-switch-thumb" />
                </span>
              </span>
            </label>
          </div>
        </section>


        {/* =================================================
            APPARENCE
        ================================================= */}

        <section className="settings-card">
          <div className="settings-card-heading">
            <span className="settings-card-icon">
              <Sun
                size={18}
                aria-hidden="true"
              />
            </span>

            <div>
              <h2>
                {t(
                  'settings.appearance',
                )}
              </h2>

              <p>
                {t(
                  'settings.appearanceDescription',
                )}
              </p>
            </div>
          </div>

          <div className="settings-appearance-options">

            <button
              type="button"
              className={
                appearance ===
                'light'
                  ? 'is-selected'
                  : ''
              }
              onClick={() =>
                handleAppearanceChange(
                  'light',
                )
              }
              aria-pressed={
                appearance ===
                'light'
              }
            >
              <Sun
                size={18}
                aria-hidden="true"
              />

              <span>
                {t(
                  'settings.light',
                )}
              </span>
            </button>


            <button
              type="button"
              className={
                appearance ===
                'dark'
                  ? 'is-selected'
                  : ''
              }
              onClick={() =>
                handleAppearanceChange(
                  'dark',
                )
              }
              aria-pressed={
                appearance ===
                'dark'
              }
            >
              <Moon
                size={18}
                aria-hidden="true"
              />

              <span>
                {t(
                  'settings.dark',
                )}
              </span>
            </button>


            <button
              type="button"
              className={
                appearance ===
                'system'
                  ? 'is-selected'
                  : ''
              }
              onClick={() =>
                handleAppearanceChange(
                  'system',
                )
              }
              aria-pressed={
                appearance ===
                'system'
              }
            >
              <SlidersHorizontal
                size={18}
                aria-hidden="true"
              />

              <span>
                {t(
                  'settings.system',
                )}
              </span>
            </button>

          </div>
        </section>


        {/* =================================================
            SÉCURITÉ
        ================================================= */}

        <section className="settings-card">
          <div className="settings-card-heading">
            <span className="settings-card-icon">
              <LockKeyhole
                size={18}
                aria-hidden="true"
              />
            </span>

            <div>
              <h2>
                {t(
                  'settings.security',
                )}
              </h2>

              <p>
                {t(
                  'settings.securityDescription',
                )}
              </p>
            </div>
          </div>

          <div className="settings-security-actions">

            <button
              type="button"
              onClick={
                openPasswordModal
              }
            >
              <div>
                <strong>
                  {t(
                    'settings.changePassword',
                  )}
                </strong>

                <span>
                  {t(
                    'settings.changePasswordDescription',
                  )}
                </span>
              </div>

              <ChevronRight
                size={17}
                aria-hidden="true"
              />
            </button>


            <button
              type="button"
              onClick={() =>
                setSessionsModalOpen(
                  true,
                )
              }
            >
              <div>
                <strong>
                  {t(
                    'settings.activeSessions',
                  )}
                </strong>

                <span>
                  {t(
                    'settings.activeSessionsDescription',
                  )}
                </span>
              </div>

              <ChevronRight
                size={17}
                aria-hidden="true"
              />
            </button>

          </div>
        </section>


        {/* =================================================
            À PROPOS
        ================================================= */}

        <section className="settings-card">
          <div className="settings-card-heading">
            <span className="settings-card-icon">
              <ShieldCheck
                size={18}
                aria-hidden="true"
              />
            </span>

            <div>
              <h2>
                {t(
                  'settings.about',
                )}
              </h2>

              <p>
                {t(
                  'settings.aboutDescription',
                )}
              </p>
            </div>
          </div>

          <div className="settings-detail-list">
            <div>
              <span>
                {t(
                  'settings.application',
                )}
              </span>

              <strong>
                DJINA Admin
              </strong>
            </div>

            <div>
              <span>
                {t(
                  'settings.version',
                )}
              </span>

              <strong>
                1.0.0
              </strong>
            </div>

            <div>
              <span>
                {t(
                  'settings.environment',
                )}
              </span>

              <strong>
                {t(
                  'settings.development',
                )}
              </strong>
            </div>
          </div>
        </section>

      </div>


      {/* ===================================================
          MODAL MOT DE PASSE
      =================================================== */}

      {passwordModalOpen && (
        <div
          className="security-modal-overlay"
          role="presentation"
          onMouseDown={(
            event,
          ) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closePasswordModal()
            }
          }}
        >
          <section
            className="security-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="change-password-title"
          >
            <header className="security-modal-header">

              <div className="security-modal-title">
                <span className="settings-card-icon">
                  <LockKeyhole
                    size={18}
                    aria-hidden="true"
                  />
                </span>

                <div>
                  <h2 id="change-password-title">
                    {t(
                      'settings.passwordModal.title',
                    )}
                  </h2>

                  <p>
                    {t(
                      'settings.passwordModal.description',
                    )}
                  </p>
                </div>
              </div>


              <button
                type="button"
                className="security-modal-close"
                onClick={
                  closePasswordModal
                }
                disabled={
                  passwordSubmitting
                }
                aria-label={t(
                  'settings.passwordModal.close',
                )}
              >
                <X
                  size={18}
                  aria-hidden="true"
                />
              </button>
            </header>


            <form
              className="security-password-form"
              onSubmit={
                handlePasswordSubmit
              }
            >

              {/* MOT DE PASSE ACTUEL */}

              <label className="security-password-field">
                <span>
                  {t(
                    'settings.passwordModal.currentPassword',
                  )}
                </span>

                <div className="security-password-input">
                  <LockKeyhole
                    size={16}
                    aria-hidden="true"
                  />

                  <input
                    name="currentPassword"
                    type={
                      passwordVisible
                        .currentPassword
                        ? 'text'
                        : 'password'
                    }
                    value={
                      passwordForm
                        .currentPassword
                    }
                    onChange={
                      handlePasswordChange
                    }
                    autoComplete="current-password"
                    placeholder={t(
                      'settings.passwordModal.currentPlaceholder',
                    )}
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      togglePasswordVisibility(
                        'currentPassword',
                      )
                    }
                    aria-label={t(
                      'settings.passwordModal.toggleVisibility',
                    )}
                  >
                    {passwordVisible
                      .currentPassword ? (
                      <EyeOff
                        size={16}
                        aria-hidden="true"
                      />
                    ) : (
                      <Eye
                        size={16}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </div>
              </label>


              {/* NOUVEAU MOT DE PASSE */}

              <label className="security-password-field">
                <span>
                  {t(
                    'settings.passwordModal.newPassword',
                  )}
                </span>

                <div className="security-password-input">
                  <LockKeyhole
                    size={16}
                    aria-hidden="true"
                  />

                  <input
                    name="newPassword"
                    type={
                      passwordVisible
                        .newPassword
                        ? 'text'
                        : 'password'
                    }
                    value={
                      passwordForm
                        .newPassword
                    }
                    onChange={
                      handlePasswordChange
                    }
                    autoComplete="new-password"
                    placeholder={t(
                      'settings.passwordModal.newPlaceholder',
                    )}
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      togglePasswordVisibility(
                        'newPassword',
                      )
                    }
                    aria-label={t(
                      'settings.passwordModal.toggleVisibility',
                    )}
                  >
                    {passwordVisible
                      .newPassword ? (
                      <EyeOff
                        size={16}
                        aria-hidden="true"
                      />
                    ) : (
                      <Eye
                        size={16}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </div>
              </label>


              {/* CONFIRMATION */}

              <label className="security-password-field">
                <span>
                  {t(
                    'settings.passwordModal.confirmPassword',
                  )}
                </span>

                <div className="security-password-input">
                  <LockKeyhole
                    size={16}
                    aria-hidden="true"
                  />

                  <input
                    name="confirmPassword"
                    type={
                      passwordVisible
                        .confirmPassword
                        ? 'text'
                        : 'password'
                    }
                    value={
                      passwordForm
                        .confirmPassword
                    }
                    onChange={
                      handlePasswordChange
                    }
                    autoComplete="new-password"
                    placeholder={t(
                      'settings.passwordModal.confirmPlaceholder',
                    )}
                    required
                  />

                  <button
                    type="button"
                    onClick={() =>
                      togglePasswordVisibility(
                        'confirmPassword',
                      )
                    }
                    aria-label={t(
                      'settings.passwordModal.toggleVisibility',
                    )}
                  >
                    {passwordVisible
                      .confirmPassword ? (
                      <EyeOff
                        size={16}
                        aria-hidden="true"
                      />
                    ) : (
                      <Eye
                        size={16}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </div>
              </label>


              {/* ERREUR */}

              {passwordError && (
                <div
                  className="security-message security-message--error"
                  role="alert"
                >
                  {
                    passwordError
                  }
                </div>
              )}


              {/* SUCCÈS */}

              {passwordSuccess && (
                <div
                  className="security-message security-message--success"
                  role="status"
                >
                  {
                    passwordSuccess
                  }
                </div>
              )}


              {/* ACTIONS */}

              <div className="security-modal-actions">

                <button
                  type="button"
                  className="security-cancel-button"
                  onClick={
                    closePasswordModal
                  }
                  disabled={
                    passwordSubmitting
                  }
                >
                  {t(
                    'settings.passwordModal.cancel',
                  )}
                </button>


                <button
                  type="submit"
                  className="security-submit-button"
                  disabled={
                    passwordSubmitting ||
                    Boolean(
                      passwordSuccess,
                    )
                  }
                >
                  {passwordSubmitting
                    ? t(
                        'settings.passwordModal.submitting',
                      )
                    : t(
                        'settings.passwordModal.submit',
                      )}
                </button>

              </div>
            </form>
          </section>
        </div>
      )}


      {/* ===================================================
          MODAL SESSIONS
      =================================================== */}

      <ActiveSessionsModal
        isOpen={
          sessionsModalOpen
        }
        onClose={() =>
          setSessionsModalOpen(
            false,
          )
        }
      />


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

    </section>
  )
}


export default Settings
