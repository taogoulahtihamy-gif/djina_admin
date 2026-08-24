import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  getCurrentUser,
  hasStoredSession,
  isAdminUser,
  loginAdministrator,
  logoutAdministrator,
} from '../services/authService'
import { AuthContext } from './authContext'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const logout = useCallback(() => {
    logoutAdministrator()
    setUser(null)
  }, [])

  const refreshUser = useCallback(async () => {
    if (!hasStoredSession()) {
      setUser(null)
      return null
    }

    try {
      const currentUser = await getCurrentUser()
      if (!isAdminUser(currentUser)) {
        logoutAdministrator()
        setUser(null)
        return null
      }
      setUser(currentUser)
      return currentUser
    } catch {
      logoutAdministrator()
      setUser(null)
      return null
    }
  }, [])

  useEffect(() => {
    refreshUser().finally(() => setIsLoading(false))
  }, [refreshUser])

  const login = useCallback(async (credentials) => {
    const authenticatedUser = await loginAdministrator(credentials)
    setUser(authenticatedUser)
    return authenticatedUser
  }, [])

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    logout,
    refreshUser,
  }), [isLoading, login, logout, refreshUser, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
