import { useState } from 'react'
import {
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  UserPlus,
  UserRound,
} from 'lucide-react'
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

function CreateAdmin() {
  const navigate = useNavigate()
  const [form, setForm] = useState(initialForm)
  const [visiblePasswords, setVisiblePasswords] = useState({ password: false, confirmPassword: false })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const passwordFields = [
    { id: 'password', label: 'Mot de passe temporaire', placeholder: 'Mot de passe temporaire' },
    { id: 'confirmPassword', label: 'Confirmer le mot de passe', placeholder: 'Confirmez le mot de passe' },
  ]

  return (
    <section className="create-admin-page">
      <button className="create-admin-back" type="button" onClick={() => navigate('/admin')}>
        <ArrowLeft size={16} aria-hidden="true" />
        Retour
      </button>

      <header className="create-admin-header">
        <p>Utilisateurs <span aria-hidden="true">/</span> Administrateurs</p>
        <h2>Créer un administrateur</h2>
        <span>Créez un nouvel accès à l’espace d’administration Djina.</span>
      </header>

      <div className="create-admin-card">
        <form className="create-admin-form" onSubmit={handleSubmit}>
          <div className="create-admin-fields">
            <div className="create-admin-field">
              <label htmlFor="firstName">Prénom</label>
              <div className="create-admin-input">
                <UserRound size={17} aria-hidden="true" />
                <input id="firstName" name="firstName" autoComplete="given-name" placeholder="Prénom" value={form.firstName} onChange={handleChange} required />
              </div>
            </div>

            <div className="create-admin-field">
              <label htmlFor="lastName">Nom</label>
              <div className="create-admin-input">
                <UserRound size={17} aria-hidden="true" />
                <input id="lastName" name="lastName" autoComplete="family-name" placeholder="Nom" value={form.lastName} onChange={handleChange} required />
              </div>
            </div>

            <div className="create-admin-field">
              <label htmlFor="adminEmail">Adresse e-mail</label>
              <div className="create-admin-input">
                <Mail size={17} aria-hidden="true" />
                <input id="adminEmail" name="email" type="email" autoComplete="email" placeholder="admin@djina.com" value={form.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="create-admin-field">
              <label htmlFor="phone">Téléphone</label>
              <div className="create-admin-input">
                <Phone size={17} aria-hidden="true" />
                <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+235 XX XX XX XX" value={form.phone} onChange={handleChange} required />
              </div>
            </div>

            {passwordFields.map((field) => (
              <div className="create-admin-field" key={field.id}>
                <label htmlFor={field.id}>{field.label}</label>
                <div className="create-admin-input">
                  <LockKeyhole size={17} aria-hidden="true" />
                  <input
                    id={field.id}
                    name={field.id}
                    type={visiblePasswords[field.id] ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder={field.placeholder}
                    value={form[field.id]}
                    onChange={handleChange}
                    required
                  />
                  <button className="create-admin-password-toggle" type="button" onClick={() => togglePassword(field.id)} aria-label={visiblePasswords[field.id] ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}>
                    {visiblePasswords[field.id] ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
              </div>
            ))}

            <div className="create-admin-field create-admin-field--full">
              <label htmlFor="adminType">Type d’administrateur</label>
              <div className="create-admin-input">
                <UserRound size={17} aria-hidden="true" />
                <select id="adminType" name="adminType" value={form.adminType} onChange={handleChange} required>
                  <option value="simple">Administrateur</option>
                  <option value="super">Super administrateur</option>
                </select>
              </div>
            </div>
          </div>

          {error && <div className="create-admin-message create-admin-message--error" role="alert">{error}</div>}
          {success && <div className="create-admin-message create-admin-message--success" role="status">{success}</div>}

          <div className="create-admin-actions">
            <button className="create-admin-cancel" type="button" onClick={() => navigate('/admin')} disabled={isSubmitting}>Annuler</button>
            <button className="create-admin-submit" type="submit" disabled={isSubmitting || Boolean(success)}>
              {isSubmitting ? <span className="create-admin-spinner" aria-hidden="true" /> : <UserPlus size={17} aria-hidden="true" />}
              {isSubmitting ? 'Création…' : 'Créer le compte'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default CreateAdmin
