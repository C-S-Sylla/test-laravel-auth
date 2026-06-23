import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  // ÉTAPE 1 : On crée un "state" pour stocker le message d'erreur
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null) // On réinitialise l'erreur à chaque tentative

    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      // ÉTAPE 2 : On récupère l'erreur du serveur ou on met un message par défaut
      setError(err.response?.data?.message || "ACCÈS REFUSÉ : CLÉ DE SÉCURITÉ INVALIDE");
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-black font-mono p-4">
      <div className="max-w-md w-full bg-cyber-dark border border-cyber-blue p-8 rounded-sm shadow-neon-blue">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-cyber-pink tracking-tighter uppercase italic">
            // CONNEXION_REQUISE
          </h2>
          <div className="h-1 w-20 bg-cyber-blue mx-auto mt-2"></div>
        </div>

        {/* ÉTAPE 3 : BLOC D'AFFICHAGE DE L'ALERTE NÉON */}
        {error && (
          <div className="bg-cyber-pink/15 border border-cyber-pink p-3 mb-6 animate-pulse">
            <p className="text-cyber-pink text-[11px] font-black uppercase tracking-widest text-center">
              [!] SÉCURITÉ : {error} [!]
            </p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="text-[10px] text-cyber-blue uppercase mb-1 block">Identifiant Email</label>
            <input
              type="email" required
              className="w-full bg-black border border-cyber-blue/50 p-3 text-cyber-blue focus:outline-none focus:border-cyber-blue shadow-inner"
              value={email} onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-[10px] text-cyber-blue uppercase mb-1 block">Clé d'accès</label>
            <input
              type="password" required
              className="w-full bg-black border border-cyber-blue/50 p-3 text-cyber-blue focus:outline-none focus:border-cyber-blue"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-cyber-blue text-black font-black py-3 uppercase tracking-widest hover:bg-cyber-pink transition-all shadow-neon-blue hover:shadow-neon-pink disabled:opacity-50"
          >
            {loading ? 'CHARGEMENT DES PROTOCOLES...' : 'Initialiser la session'}
          </button>

          <div className="text-center mt-4">
            <Link to="/register" className="text-[10px] text-gray-500 hover:text-cyber-pink uppercase underline">
              Nouveau sujet ? Créer une identité
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Login