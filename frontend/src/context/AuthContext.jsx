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
        // Sur la route /me, Laravel peut renvoyer soit l'utilisateur direct, soit {user: ...}
        // On vérifie les deux cas par sécurité
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
      
      // CORRECTION : Ton backend renvoie { user: {...}, token: "..." }
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
      
      // On utilise la même logique que pour le login
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
      // On nettoie toujours le client même si l'appel API échoue
      setUser(null)
      localStorage.removeItem('token')
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
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