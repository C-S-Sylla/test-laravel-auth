import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api';

function Profile() {
  // setUser doit être récupéré ici
  const { user, setUser } = useAuth();
  const [alias, setAlias] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Remplit les cases quand l'utilisateur arrive
  useEffect(() => {
    if (user) {
      setAlias(user.alias || '');
      setBio(user.bio || '');
    }
  }, [user]);

  // FONCTION AVATAR
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    setUploading(true);
    try {
      const response = await authAPI.updateAvatar(formData);
      console.log("Réponse Avatar:", response.data);
      
      // On met à jour l'utilisateur globalement
      setUser(response.data.user); 
      alert("SYSTÈME : AVATAR SYNCHRONISÉ");
    } catch (err) {
      console.error("Erreur Avatar:", err);
      alert("ERREUR : ÉCHEC DU TRANSFERT");
    } finally {
      setUploading(false);
    }
  };

  // FONCTION SYNCHRONISER (Alias et Bio)
  const handleSyncIdentity = async () => {
  setLoading(true);
  try {
    const response = await authAPI.updateProfile({
      alias: alias,
      bio: bio
    });

    // CECI VA AFFICHER UN TABLEAU DANS TA CONSOLE F12
    console.log("%c [SYSTEM_UPDATE] : Données reçues du serveur :", "color: #00f2ff; font-weight: bold;");
    console.table(response.data.user); 

    setUser(response.data.user);
    alert("IDENTITÉ SYNCHRONISÉE DANS LE MAINFRAME");
  } catch (err) {
    console.error("ERREUR_SYNCHRO :", err);
    alert("ERREUR DE SYNCHRONISATION");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-cyber-black text-cyber-blue font-mono p-4">
      {/* Header Avatar */}
      <div className="max-w-4xl mx-auto border border-cyber-blue p-6 rounded-lg shadow-neon-blue bg-cyber-dark mb-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full border-2 border-cyber-blue shadow-neon-blue overflow-hidden bg-black">
             <img 
               src={user?.avatar ? `http://localhost:8000/storage/${user.avatar}` : "https://ui-avatars.com/api/?name=Agent"} 
               className="w-full h-full object-cover"
               alt="Avatar" 
             />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-cyber-pink tracking-widest uppercase italic">Agent: {user?.name}</h1>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            <button onClick={() => fileInputRef.current.click()} className="text-[10px] border border-cyber-blue px-2 py-1 mt-2 hover:bg-cyber-blue hover:text-black uppercase italic">
              {uploading ? 'TRANSFERT...' : '> CHANGER_AVATAR'}
            </button>
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <div className="max-w-4xl mx-auto border border-cyber-pink/30 p-8 bg-cyber-dark/50 shadow-inner">
        <h2 className="text-cyber-blue mb-8 border-l-4 border-cyber-pink pl-4 uppercase italic">// INTERFACE_NEURONALE</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-[10px] text-gray-500 uppercase mb-1">Nom de citoyen</label>
            <input className="bg-black border border-cyber-pink/20 p-3 text-gray-600 outline-none" value={user?.name || ''} readOnly />
          </div>
          
          <div className="flex flex-col">
            <label className="text-[10px] text-cyber-blue uppercase mb-1 italic">Nom de code (Alias)</label>
            <input 
              className="bg-black border border-cyber-blue/50 p-3 text-cyber-blue focus:shadow-neon-blue outline-none"
              value={alias} // Lié à la variable d'état
              onChange={(e) => setAlias(e.target.value)} // Met à jour la variable quand tu tapes
            />
          </div>
        </div>

        <div className="mt-8">
          <label className="text-[10px] text-cyber-blue uppercase mb-1 italic">Biographie encryptée</label>
          <textarea 
            className="w-full bg-black border border-cyber-blue/50 p-3 text-cyber-blue h-32 focus:shadow-neon-blue outline-none"
            value={bio} // Lié à la variable d'état
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <button 
          onClick={handleSyncIdentity}
          disabled={loading}
          className="mt-10 w-full md:w-auto bg-cyber-pink text-black font-black py-3 px-10 hover:bg-cyber-blue transition-all uppercase tracking-widest shadow-neon-pink hover:shadow-neon-blue"
        >
          {loading ? 'SYNCHRONISATION...' : 'SYNCHRONISER L\'IDENTITÉ'}
        </button>
      </div>
    </div>
  );
}

export default Profile;