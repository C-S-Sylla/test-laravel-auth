import React from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    // On change bg-gray-100 en bg-cyber-black
    <div className="min-h-screen bg-cyber-black font-mono">
      {/* Barre de navigation style Cyber */}
      <nav className="bg-cyber-dark border-b border-cyber-blue/30 shadow-neon-blue/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/dashboard" className="text-xl font-black text-cyber-blue tracking-tighter italic uppercase">
                CYBER_NET <span className="text-cyber-pink text-[10px] animate-pulse">v1.0</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-6 text-xs">
              {user && (
                <>
                  <div className="flex flex-col items-end">
                    <span className="text-gray-500 uppercase text-[9px]">User_ID</span>
                    <span className="text-cyber-blue font-bold">{user.name}</span>
                  </div>
                  <Link to="/profile" className="text-gray-400 hover:text-cyber-pink uppercase transition-colors">
                    [ Profil ]
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="bg-cyber-pink/10 border border-cyber-pink text-cyber-pink px-3 py-1 hover:bg-cyber-pink hover:text-black transition-all uppercase font-bold shadow-neon-pink/20"
                  >
                    Déconnexion
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout