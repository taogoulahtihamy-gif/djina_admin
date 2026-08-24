import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/authContext'

function ProtectedRoute({ children }) {
  const location = useLocation()
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="auth-loader" role="status" aria-live="polite">
        <span aria-hidden="true" />
        <p>Vérification de votre session…</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}

export default ProtectedRoute
