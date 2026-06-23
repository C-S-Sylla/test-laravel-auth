import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  
  // ÉTAPE 1 : Variables pour l'erreur et le chargement
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null) // On vide l'ancienne erreur

    // ÉTAPE 2 : Sécurité mot de passe identique
    if (password !== passwordConfirmation) {
      setError("LES CLÉS D'ACCÈS NE CORRESPONDENT PAS");
      setLoading(false);
      return;
    }

    try {
      await register({ name, email, password, password_confirmation: passwordConfirmation })
      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      // ÉTAPE 3 : Capturer l'erreur du serveur (ex: email déjà utilisé)
      setError(err.response?.data?.message || "ÉCHEC DE LA CRÉATION DE L'AGENT");
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-black font-mono p-4">
      <div className="max-w-md w-full bg-cyber-dark border border-cyber-pink p-8 rounded-sm shadow-neon-pink">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-cyber-blue tracking-tighter uppercase italic">
            // NOUVEL_AGENT
          </h2>
          <div className="h-1 w-20 bg-cyber-pink mx-auto mt-2"></div>
        </div>

        {/* ÉTAPE 4 : BLOC D'AFFICHAGE DE L'ALERTE */}
        {error && (
          <div className="bg-cyber-pink/15 border border-cyber-pink p-3 mb-6 animate-pulse">
            <p className="text-cyber-pink text-[11px] font-black uppercase tracking-widest text-center">
              [!] ERREUR SYSTÈME : {error} [!]
            </p>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-[10px] text-cyber-pink uppercase mb-1 block">Identité (Nom)</label>
            <input 
              type="text" required
              className="w-full bg-black border border-cyber-pink/50 p-2 text-cyber-pink focus:outline-none focus:border-cyber-pink" 
              value={name} onChange={(e) => setName(e.target.value)} 
            />
          </div>

          <div>
            <label className="text-[10px] text-cyber-pink uppercase mb-1 block">Canal Email</label>
            <input 
              type="email" required
              className="w-full bg-black border border-cyber-pink/50 p-2 text-cyber-pink focus:outline-none focus:border-cyber-pink" 
              value={email} onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-cyber-pink uppercase mb-1 block">Clé d'accès</label>
              <input 
                type="password" required
                className="w-full bg-black border border-cyber-pink/50 p-2 text-cyber-pink focus:outline-none focus:border-cyber-pink" 
                value={password} onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <div>
              <label className="text-[10px] text-cyber-pink uppercase mb-1 block">Confirmation</label>
              <input 
                type="password" required
                className="w-full bg-black border border-cyber-pink/50 p-2 text-cyber-pink focus:outline-none focus:border-cyber-pink" 
                value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-cyber-pink text-black font-black py-3 mt-4 uppercase tracking-widest hover:bg-cyber-blue transition-all shadow-neon-pink disabled:opacity-50"
          >
            {loading ? 'INSCRIPTION EN COURS...' : "Générer l'identité"}
          </button>

          <div className="text-center mt-4">
            <Link to="/login" className="text-[10px] text-gray-500 hover:text-cyber-blue uppercase underline">
              Déjà identifié ? Accéder au terminal
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Register