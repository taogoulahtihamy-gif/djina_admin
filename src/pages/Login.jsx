import { useState } from 'react'
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from 'lucide-react'
import {
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import { useAuth } from '../context/authContext'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const {
    isAuthenticated,
    isLoading,
    login,
  } = useAuth()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [showPassword, setShowPassword] =
    useState(false)

  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] =
    useState(false)

  if (isLoading) {
    return (
      <div
        className="auth-loader"
        role="status"
        aria-live="polite"
      >
        <span aria-hidden="true" />

        <p>
          Vérification de votre session…
        </p>
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to="/admin"
        replace
      />
    )
  }

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))

    if (error) {
      setError('')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setIsSubmitting(true)

    try {
      await login(form)

      navigate(
        location.state?.from?.pathname ||
          '/admin',
        {
          replace: true,
        },
      )
    } catch (loginError) {
      setError(
        loginError?.message ||
          'Impossible de vous connecter.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="login-page">
      <section
        className="login-shell"
        aria-label="Connexion à Djina Administration"
      >
        <div className="login-visual">
          <div
            className="login-visual-image"
            aria-hidden="true"
          />

          <div className="login-brand">
            <span className="login-logo">
              DJINA
            </span>

            <span className="login-brand-label">
              Administration
            </span>
          </div>

          <div className="login-visual-copy">
            <h1>
              Pilotez les opérations de la
              plateforme depuis un espace
              sécurisé.
            </h1>

            <p>
              N&apos;Djamena · Tchad
            </p>
          </div>
        </div>

        <div className="login-form-panel">
          <div className="login-form-wrap">
            <header className="login-form-header">
              <h2>
                Connexion à Djina
              </h2>

              <p>
                Identifiez-vous pour accéder
                au centre de pilotage.
              </p>
            </header>

            <form
              className="login-form"
              onSubmit={handleSubmit}
            >
              <label htmlFor="email">
                Adresse e-mail
              </label>

              <div className="login-input-wrap">
                <Mail
                  className="login-field-icon"
                  size={17}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@djina.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <label htmlFor="password">
                Mot de passe
              </label>

              <div className="login-input-wrap">
                <LockKeyhole
                  className="login-field-icon"
                  size={17}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <input
                  id="password"
                  name="password"
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  autoComplete="current-password"
                  placeholder="Votre mot de passe"
                  value={form.password}
                  onChange={handleChange}
                  required
                />

                <button
                  className="password-toggle"
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (current) => !current,
                    )
                  }
                  aria-label={
                    showPassword
                      ? 'Masquer le mot de passe'
                      : 'Afficher le mot de passe'
                  }
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>

              <div className="login-options">
                <label className="remember-option">
                  <input
                    type="checkbox"
                    name="remember"
                  />

                  <span>
                    Se souvenir de moi
                  </span>
                </label>

                <button
                  className="forgot-password"
                  type="button"
                >
                  Mot de passe oublié ?
                </button>
              </div>

              {error && (
                <p
                  className="login-error"
                  role="alert"
                >
                  {error}
                </p>
              )}

              <div className="login-submit-row">
                <button
                  className="login-submit"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <span
                      className="login-button-spinner"
                      aria-hidden="true"
                    />
                  )}

                  <span>
                    {isSubmitting
                      ? 'Connexion…'
                      : 'Continuer'}
                  </span>

                  {!isSubmitting && (
                    <ArrowRight
                      size={17}
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>

              <div
                className="login-legal-links"
                aria-label="Informations légales"
              >
                <button type="button">
                  Politique de confidentialité
                </button>

                <span aria-hidden="true">
                  ·
                </span>

                <button type="button">
                  Conditions d’utilisation
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Login