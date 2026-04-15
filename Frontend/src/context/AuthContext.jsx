import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)
const TOKEN_KEY = 'token'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '')

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token)
      return
    }

    localStorage.removeItem(TOKEN_KEY)
  }, [token])

  const value = {
    token,
    isAuthenticated: Boolean(token),
    login: (nextToken) => setToken(nextToken),
    logout: () => setToken(''),
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
