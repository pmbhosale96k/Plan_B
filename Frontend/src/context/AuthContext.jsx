import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)
const USER_TOKEN_KEY = 'token'
const ADMIN_TOKEN_KEY = 'adminToken'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(USER_TOKEN_KEY) || '')
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem(ADMIN_TOKEN_KEY) || '')

  useEffect(() => {
    if (token) {
      localStorage.setItem(USER_TOKEN_KEY, token)
      return
    }

    localStorage.removeItem(USER_TOKEN_KEY)
  }, [token])

  useEffect(() => {
    if (adminToken) {
      localStorage.setItem(ADMIN_TOKEN_KEY, adminToken)
      return
    }

    localStorage.removeItem(ADMIN_TOKEN_KEY)
  }, [adminToken])

  const value = {
    token,
    adminToken,
    isAuthenticated: Boolean(token),
    isAdminAuthenticated: Boolean(adminToken),
    login: (nextToken) => setToken(nextToken),
    loginAdmin: (nextToken) => setAdminToken(nextToken),
    logout: () => setToken(''),
    logoutAdmin: () => setAdminToken(''),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }

  return context
}
