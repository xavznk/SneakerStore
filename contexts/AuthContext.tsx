"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  email: string
  name: string
  role: "admin"
}

interface AuthState {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

// Données d'admin par défaut (en production, cela viendrait d'une base de données)
const ADMIN_CREDENTIALS = {
  email: "admin@sneakerstore.com",
  password: "admin123",
  user: {
    id: "1",
    email: "admin@sneakerstore.com",
    name: "Administrateur",
    role: "admin" as const,
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté (localStorage)
    const savedUser = localStorage.getItem("admin_user")
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        setState({
          user,
          isLoading: false,
          isAuthenticated: true,
        })
      } catch {
        localStorage.removeItem("admin_user")
        setState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        })
      }
    } else {
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      })
    }
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setState((prev) => ({ ...prev, isLoading: true }))

    // Simulation d'une requête API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const user = ADMIN_CREDENTIALS.user
      localStorage.setItem("admin_user", JSON.stringify(user))
      setState({
        user,
        isLoading: false,
        isAuthenticated: true,
      })
      return true
    } else {
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      })
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("admin_user")
    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
