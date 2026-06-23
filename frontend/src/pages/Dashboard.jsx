import React from 'react'
import { useAuth } from '../context/AuthContext'

function Dashboard() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-cyber-black font-mono p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* En-tête Statut - On affiche l'Alias ici s'il existe */}
        <div className="border-l-4 border-cyber-pink bg-cyber-dark p-6 flex justify-between items-center shadow-neon-pink/10">
          <div>
            <h1 className="text-cyber-blue text-2xl font-black uppercase italic tracking-tighter">
              CONSOLE_AGENT : {user?.alias ? user.alias : 'INCONNU'} 
              <span className="text-gray-600 text-sm ml-4 normal-case font-normal italic">
                ({user?.name})
              </span>
            </h1>
            <p className="text-[10px] text-gray-500 mt-1">
              ID_NODE: 0x8823_AF // ACCESS_LEVEL: RED_PROTOCOL // STATUS: EN_LIGNE
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-cyber-pink animate-pulse text-xs font-bold border border-cyber-pink px-3 py-1">
              ● SYSTÈME_ACTIF
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Colonne Gauche : Données Citoyen & Bio */}
          <div className="space-y-6">
            <div className="bg-cyber-dark border border-cyber-blue/30 p-6 shadow-neon-blue/10">
              <h3 className="text-cyber-blue text-xs border-b border-cyber-blue/30 pb-2 mb-4 uppercase font-black italic">
                {">"} Données_Citoyen
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[9px] text-gray-500 uppercase italic">Email_Encrypté</p>
                  <p className="text-cyber-pink text-sm break-all">{user?.email}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-500 uppercase italic">Membre_Depuis</p>
                  <p className="text-cyber-blue text-sm">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>

            {/* NOUVEAU : Bloc Biographie */}
            <div className="bg-cyber-dark border border-cyber-pink/30 p-6">
              <h3 className="text-cyber-pink text-xs border-b border-cyber-pink/30 pb-2 mb-4 uppercase font-black italic">
                {">"} Biographie_Encryptée
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed italic">
                {user?.bio ? user.bio : "Aucune donnée biographique détectée dans le mainframe..."}
              </p>
            </div>
          </div>

          {/* Colonne Droite : Missions (plus large) */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-cyber-dark border border-cyber-blue/30 p-6">
               <h3 className="text-cyber-blue text-xs border-b border-cyber-blue/30 pb-2 mb-4 uppercase font-black italic">
                {">"} Missions_En_Cours
              </h3>
              <div className="space-y-4">
                 {/* On affiche la mission active du profil */}
                 <div className="bg-black/60 p-4 border-l-2 border-cyber-pink flex justify-between items-center">
                    <div>
                      <p className="text-cyber-pink text-xs font-bold uppercase underline">
                        {user?.active_mission || 'STANDBY'}
                      </p>
                      <p className="text-[9px] text-gray-600 mt-1 uppercase italic">Objectif principal : Extraction de données sensibles</p>
                    </div>
                    <span className="text-[10px] bg-cyber-pink/20 text-cyber-pink px-3 py-1 font-bold">ACTIF</span>
                 </div>

                 {/* Missions secondaires statiques */}
                 <div className="bg-black/40 p-4 border-l-2 border-cyber-blue flex justify-between items-center opacity-60">
                    <span className="text-cyber-blue text-xs italic">Grid Override - Netwatch</span>
                    <span className="text-[9px] bg-cyber-blue/20 text-cyber-blue px-2 py-1">TERMINÉ</span>
                 </div>
              </div>
            </div>

            {/* Optionnel : Un petit log de sécurité pour le style */}
            <div className="bg-black p-3 rounded-sm border border-gray-900">
               <p className="text-[9px] text-green-500 font-mono">
                 [SEC_LOG]: Connexion établie depuis l'IP 192.168.0.25... <br/>
                 [SEC_LOG]: Déchiffrement des données de l'agent terminé.
               </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard