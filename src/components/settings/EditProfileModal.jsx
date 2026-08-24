import {
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  Camera,
  Mail,
  Phone,
  Save,
  Trash2,
  UserRound,
  X,
} from 'lucide-react'

import {
  useTranslation,
} from 'react-i18next'

import {
  updateMyProfile,
} from '../../services/profileService'

import {
  getProfilePhoto,
  prepareProfilePhoto,
  removeProfilePhoto,
  saveProfilePhoto,
} from '../../services/profilePhotoService'


function EditProfileModal({
  isOpen,
  onClose,
  user,
}) {
  const {
    t,
  } = useTranslation()

  const fileInputRef =
    useRef(null)

  const userId =
    user?.id ??
    user?.user_id ??
    null


  const [
    form,
    setForm,
  ] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  })


  const [
    profilePhoto,
    setProfilePhoto,
  ] = useState(null)


  const [
    photoError,
    setPhotoError,
  ] = useState('')


  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false)


  const [
    error,
    setError,
  ] = useState('')


  const [
    success,
    setSuccess,
  ] = useState('')


  /* =====================================================
     CHARGEMENT
  ===================================================== */

  useEffect(() => {
    if (!isOpen) {
      return
    }

    setForm({
      firstName:
        user?.first_name ||
        user?.firstName ||
        '',

      lastName:
        user?.last_name ||
        user?.lastName ||
        '',

      phone:
        user?.phone ||
        '',
    })

    setProfilePhoto(
      getProfilePhoto(
        userId,
      ),
    )

    setError('')
    setSuccess('')
    setPhotoError('')
  }, [
    isOpen,
    user,
    userId,
  ])


  /* =====================================================
     ESC
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
          !isSubmitting
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
    isSubmitting,
    onClose,
  ])


  /* =====================================================
     CHAMPS
  ===================================================== */

  const handleChange =
    (event) => {
      const {
        name,
        value,
      } = event.target

      setForm(
        (current) => ({
          ...current,
          [name]: value,
        }),
      )

      setError('')
      setSuccess('')
    }


  /* =====================================================
     PHOTO
  ===================================================== */

  const handlePhotoButton =
    () => {
      fileInputRef.current
        ?.click()
    }


  const handlePhotoChange =
    async (event) => {
      const file =
        event.target.files?.[0]

      event.target.value = ''

      if (!file) {
        return
      }

      try {
        setPhotoError('')

        const photo =
          await prepareProfilePhoto(
            file,
          )

        setProfilePhoto(
          photo,
        )

        saveProfilePhoto(
          userId,
          photo,
        )
      } catch (
        photoSelectionError
      ) {
        setPhotoError(
          photoSelectionError
            ?.message ||
            'Impossible d’utiliser cette photo.',
        )
      }
    }


  const handleRemovePhoto =
    () => {
      removeProfilePhoto(
        userId,
      )

      setProfilePhoto(
        null,
      )

      setPhotoError('')
    }


  /* =====================================================
     ENREGISTREMENT
  ===================================================== */

  const handleSubmit =
    async (event) => {
      event.preventDefault()

      setError('')
      setSuccess('')

      if (
        !form.firstName.trim() ||
        !form.lastName.trim() ||
        !form.phone.trim()
      ) {
        setError(
          t(
            'settings.profileModal.required',
          ),
        )

        return
      }

      try {
        setIsSubmitting(
          true,
        )

        await updateMyProfile({
          firstName:
            form.firstName,

          lastName:
            form.lastName,

          phone:
            form.phone,
        })

        setSuccess(
          t(
            'settings.profileModal.success',
          ),
        )

        window.setTimeout(
          () => {
            window.location.reload()
          },
          850,
        )
      } catch (
        requestError
      ) {
        console.error(
          'Profile update error:',
          requestError,
        )

        const data =
          requestError?.data

        if (
          Array.isArray(
            data?.phone,
          )
        ) {
          setError(
            t(
              'settings.profileModal.phoneUsed',
            ),
          )

          return
        }

        setError(
          t(
            'settings.profileModal.saveError',
          ),
        )
      } finally {
        setIsSubmitting(
          false,
        )
      }
    }


  if (!isOpen) {
    return null
  }


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
          !isSubmitting
        ) {
          onClose()
        }
      }}
    >
      <section
        className="security-modal profile-edit-modal profile-edit-modal--modern"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-profile-title"
      >

        {/* =================================================
            FERMER
        ================================================= */}

        <button
          type="button"
          className="security-modal-close profile-modern-close"
          onClick={
            onClose
          }
          disabled={
            isSubmitting
          }
          aria-label={t(
            'settings.profileModal.close',
          )}
        >
          <X
            size={18}
            aria-hidden="true"
          />
        </button>


        {/* =================================================
            EN-TÊTE PROFIL
        ================================================= */}

        <div className="profile-modern-header">

          <div className="profile-modern-avatar-wrapper">

            <button
              type="button"
              className="profile-modern-avatar"
              onClick={
                handlePhotoButton
              }
              aria-label="Modifier la photo de profil"
            >
              {profilePhoto ? (
                <img
                  src={
                    profilePhoto
                  }
                  alt=""
                />
              ) : (
                <UserRound
                  size={52}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              )}

              <span className="profile-modern-camera">
                <Camera
                  size={17}
                  aria-hidden="true"
                />
              </span>
            </button>


            <input
              ref={
                fileInputRef
              }
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="profile-photo-input"
              onChange={
                handlePhotoChange
              }
            />

          </div>


          <h2 id="edit-profile-title">
            {t(
              'settings.profileModal.title',
            )}
          </h2>

          <p>
            {t(
              'settings.profileModal.description',
            )}
          </p>


          <div className="profile-modern-photo-actions">

            <button
              type="button"
              className="profile-photo-change-button"
              onClick={
                handlePhotoButton
              }
            >
              <Camera
                size={15}
                aria-hidden="true"
              />

              <span>
                {profilePhoto
                  ? 'Changer la photo'
                  : 'Ajouter une photo'}
              </span>
            </button>


            {profilePhoto && (
              <button
                type="button"
                className="profile-photo-remove-button"
                onClick={
                  handleRemovePhoto
                }
              >
                <Trash2
                  size={14}
                  aria-hidden="true"
                />

                <span>
                  Supprimer
                </span>
              </button>
            )}

          </div>


          {photoError && (
            <p
              className="profile-photo-error"
              role="alert"
            >
              {photoError}
            </p>
          )}

        </div>


        {/* =================================================
            FORMULAIRE
        ================================================= */}

        <form
          className="profile-edit-form profile-edit-form--modern"
          onSubmit={
            handleSubmit
          }
        >

          <div className="profile-edit-row">

            {/* PRÉNOM */}

            <label className="profile-edit-field">
              <span>
                {t(
                  'settings.profileModal.firstName',
                )}
              </span>

              <div className="profile-edit-input">
                <UserRound
                  size={16}
                  aria-hidden="true"
                />

                <input
                  type="text"
                  name="firstName"
                  value={
                    form.firstName
                  }
                  onChange={
                    handleChange
                  }
                  placeholder={t(
                    'settings.profileModal.firstNamePlaceholder',
                  )}
                  autoComplete="given-name"
                  maxLength={150}
                  required
                />
              </div>
            </label>


            {/* NOM */}

            <label className="profile-edit-field">
              <span>
                {t(
                  'settings.profileModal.lastName',
                )}
              </span>

              <div className="profile-edit-input">
                <UserRound
                  size={16}
                  aria-hidden="true"
                />

                <input
                  type="text"
                  name="lastName"
                  value={
                    form.lastName
                  }
                  onChange={
                    handleChange
                  }
                  placeholder={t(
                    'settings.profileModal.lastNamePlaceholder',
                  )}
                  autoComplete="family-name"
                  maxLength={150}
                  required
                />
              </div>
            </label>

          </div>


          {/* EMAIL */}

          <label className="profile-edit-field">
            <span>
              {t(
                'settings.profileModal.email',
              )}
            </span>

            <div className="profile-edit-input is-readonly">
              <Mail
                size={16}
                aria-hidden="true"
              />

              <input
                type="email"
                value={
                  user?.email ||
                  ''
                }
                disabled
                readOnly
              />
            </div>

            <small>
              {t(
                'settings.profileModal.emailHint',
              )}
            </small>
          </label>


          {/* TÉLÉPHONE */}

          <label className="profile-edit-field">
            <span>
              {t(
                'settings.profileModal.phone',
              )}
            </span>

            <div className="profile-edit-input">
              <Phone
                size={16}
                aria-hidden="true"
              />

              <input
                type="tel"
                name="phone"
                value={
                  form.phone
                }
                onChange={
                  handleChange
                }
                placeholder={t(
                  'settings.profileModal.phonePlaceholder',
                )}
                autoComplete="tel"
                maxLength={20}
                required
              />
            </div>
          </label>


          {/* DROITS */}

          <div className="profile-role-notice">
            <UserRound
              size={17}
              aria-hidden="true"
            />

            <div>
              <strong>
                {t(
                  'settings.profileModal.rightsTitle',
                )}
              </strong>

              <span>
                {t(
                  'settings.profileModal.rightsDescription',
                )}
              </span>
            </div>
          </div>


          {/* ERREUR */}

          {error && (
            <div
              className="security-message security-message--error"
              role="alert"
            >
              {error}
            </div>
          )}


          {/* SUCCÈS */}

          {success && (
            <div
              className="security-message security-message--success"
              role="status"
            >
              {success}
            </div>
          )}


          {/* ACTIONS */}

          <div className="security-modal-actions profile-modern-actions">

            <button
              type="button"
              className="security-cancel-button"
              onClick={
                onClose
              }
              disabled={
                isSubmitting
              }
            >
              {t(
                'settings.profileModal.cancel',
              )}
            </button>


            <button
              type="submit"
              className="security-submit-button profile-save-button"
              disabled={
                isSubmitting ||
                Boolean(
                  success,
                )
              }
            >
              <Save
                size={15}
                aria-hidden="true"
              />

              <span>
                {isSubmitting
                  ? t(
                      'settings.profileModal.saving',
                    )
                  : t(
                      'settings.profileModal.save',
                    )}
              </span>
            </button>

          </div>

        </form>
      </section>
    </div>
  )
}


export default EditProfileModal