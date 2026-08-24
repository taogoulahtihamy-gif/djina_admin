import { useState } from 'react'
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, Phone, UserRound } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ApiError } from '../services/api'
import { createAdministrator } from '../services/adminService'

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  adminType: 'simple',
}

function Register() {
  const [form, setForm] = useState(initialForm)
  const [visiblePasswords, setVisiblePasswords] = useState({ password: false, confirmPassword: false })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const togglePassword = (field) => {
    setVisiblePasswords((current) => ({ ...current, [field]: !current[field] }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (form.password !== form.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }

    setIsSubmitting(true)
    try {
      await createAdministrator({
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
        admin_type: form.adminType,
      })
      setSuccess('Le compte administrateur a été créé.')
      window.setTimeout(() => navigate('/admin', { replace: true }), 1200)
    } catch (requestError) {
      if (requestError instanceof ApiError && requestError.status === 403) {
        setError("Vous n’êtes pas autorisé à créer un administrateur.")
      } else if (requestError instanceof ApiError && requestError.data) {
        const messages = Object.values(requestError.data).flat().filter((message) => typeof message === 'string')
        setError(messages[0] || requestError.message)
      } else {
        setError(requestError.message || 'Impossible de créer le compte administrateur.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="login-page">
      <section className="login-shell" aria-label="Créer un compte Djina Administration">
        <div className="login-visual">
          <div className="login-visual-image" aria-hidden="true" />
          <div className="login-brand">
            <span className="login-logo">DJINA</span>
            <span className="login-brand-label">Administration</span>
          </div>
          <div className="login-visual-copy">
            <h1>Pilotez les opérations de la plateforme depuis un espace sécurisé.</h1>
            <p>N'Djamena · Tchad</p>
          </div>
        </div>

        <div className="login-form-panel register-form-panel">
          <div className="login-form-wrap register-form-wrap">
            <header className="login-form-header">
              <h2>Créer un administrateur</h2>
              <p>Créez un accès interne sécurisé à l’espace d’administration Djina.</p>
            </header>

            <form className="register-form" onSubmit={handleSubmit}>
              <div className="register-fields-grid">
                <div className="register-field">
                  <label htmlFor="firstName">Prénom</label>
                  <div className="login-input-wrap">
                    <UserRound className="login-field-icon" size={17} aria-hidden="true" />
                    <input id="firstName" name="firstName" autoComplete="given-name" placeholder="Votre prénom" value={form.firstName} onChange={handleChange} required />
                  </div>
                </div>

                <div className="register-field">
                  <label htmlFor="lastName">Nom</label>
                  <div className="login-input-wrap">
                    <UserRound className="login-field-icon" size={17} aria-hidden="true" />
                    <input id="lastName" name="lastName" autoComplete="family-name" placeholder="Votre nom" value={form.lastName} onChange={handleChange} required />
                  </div>
                </div>

                <div className="register-field">
                  <label htmlFor="registerEmail">Adresse e-mail</label>
                  <div className="login-input-wrap">
                    <Mail className="login-field-icon" size={17} aria-hidden="true" />
                    <input id="registerEmail" name="email" type="email" autoComplete="email" placeholder="admin@djina.com" value={form.email} onChange={handleChange} required />
                  </div>
                </div>

                <div className="register-field">
                  <label htmlFor="phone">Téléphone</label>
                  <div className="login-input-wrap">
                    <Phone className="login-field-icon" size={17} aria-hidden="true" />
                    <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+235 XX XX XX XX" value={form.phone} onChange={handleChange} required />
                  </div>
                </div>

                {[
                  { id: 'password', label: 'Mot de passe temporaire', placeholder: 'Mot de passe temporaire', autoComplete: 'new-password' },
                  { id: 'confirmPassword', label: 'Confirmer le mot de passe', placeholder: 'Confirmez le mot de passe', autoComplete: 'new-password' },
                ].map((field) => (
                  <div className="register-field" key={field.id}>
                    <label htmlFor={field.id}>{field.label}</label>
                    <div className="login-input-wrap">
                      <LockKeyhole className="login-field-icon" size={17} aria-hidden="true" />
                      <input
                        id={field.id}
                        name={field.id}
                        type={visiblePasswords[field.id] ? 'text' : 'password'}
                        autoComplete={field.autoComplete}
                        placeholder={field.placeholder}
                        value={form[field.id]}
                        onChange={handleChange}
                        required
                      />
                      <button className="password-toggle" type="button" onClick={() => togglePassword(field.id)} aria-label={visiblePasswords[field.id] ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}>
                        {visiblePasswords[field.id] ? <EyeOff size={17} /> : <Eye size={17} />}
                      </button>
                    </div>
                  </div>
                ))}
                <div className="register-field register-field-full">
                  <label htmlFor="adminType">Type d’administrateur</label>
                  <div className="login-input-wrap">
                    <UserRound className="login-field-icon" size={17} aria-hidden="true" />
                    <select id="adminType" name="adminType" value={form.adminType} onChange={handleChange} required>
                      <option value="simple">Administrateur</option>
                      <option value="super">Super administrateur</option>
                    </select>
                  </div>
                </div>
              </div>

              {error && <div className="login-error" role="alert">{error}</div>}
              {success && <div className="register-success" role="status">{success}</div>}

              <div className="register-action-row">
                <button className="login-submit" type="submit" disabled={isSubmitting || Boolean(success)}>
                  <span>{isSubmitting ? 'Création…' : 'Créer le compte'}</span>
                  <ArrowRight size={17} aria-hidden="true" />
                </button>
              </div>

              <div className="login-legal-links" aria-label="Informations légales">
                <button type="button">Politique de confidentialité</button>
                <span aria-hidden="true">·</span>
                <button type="button">Conditions d’utilisation</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Register
