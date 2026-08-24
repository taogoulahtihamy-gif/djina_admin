import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import { canCreateAdministrator } from '../utils/adminPermissions'

function SuperAdminRoute({ children }) {
  const { user } = useAuth()

  if (!canCreateAdministrator(user)) {
    return <Navigate to="/admin" replace />
  }

  return children
}

export default SuperAdminRoute
