import React, { createContext, useState, useContext, useEffect } from 'react'
import { authAPI } from '../api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 1. Vérifie si l'utilisateur est déjà connecté au chargement de l'application
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const response = await authAPI.me()
        const userData = response.data.user || response.data
        setUser(userData)
      } catch (err) {
        console.error("Session expirée ou invalide")
        localStorage.removeItem('token')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // 2. Fonction de connexion
  const login = async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authAPI.login(email, password)
      const userData = response.data.user
      const token = response.data.token

      localStorage.setItem('token', token)
      setUser(userData)
      
      return response.data
    } catch (err) {
      const message = err.response?.data?.message || 'Échec de la connexion'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // 3. Fonction d'inscription
  const register = async (data) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authAPI.register(data)
      const userData = response.data.user
      const token = response.data.token

      localStorage.setItem('token', token)
      setUser(userData)
      
      return response.data
    } catch (err) {
      const message = err.response?.data?.message || "Échec de l'inscription"
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // 4. Fonction de déconnexion
  const logout = async () => {
    try {
      await authAPI.logout()
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err)
    } finally {
      setUser(null)
      localStorage.removeItem('token')
    }
  }

  // CORRECTION ICI : Ajout de 'setUser' dans l'objet 'value'
  return (
    <AuthContext.Provider value={{ user, setUser, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth doit être utilisé à l\'intérieur d\'un AuthProvider')
  }
  return context
}