// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  // SI PAS D'UTILISATEUR -> REDIRIGER VERS LOGIN
  return user ? children : <Navigate to="/login" replace />
}

export default PrivateRoute