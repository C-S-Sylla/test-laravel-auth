<x-app-layout>
    <div class="space-y-6 pb-12">
        
        <!-- Carte de Bienvenue -->
        <div class="bg-gray-950 border border-blue-900 rounded-2xl p-6 relative overflow-hidden cyber-border">
            <div class="absolute top-2 right-4 text-[10px] text-blue-600 font-mono">SYS_STATUS: ONLINE</div>
            
            <div class="flex items-center gap-5">
                <!-- Affichage de l'avatar avec lueur néon -->
                <div class="w-16 h-16 rounded-full overflow-hidden border-2 border-cyan-400 shadow-[0_0_15px_#06b6d4] shrink-0 bg-black flex items-center justify-center">
                    @if(Auth::user()->avatar)
                        <img src="{{ asset('storage/' . Auth::user()->avatar) }}" class="w-full h-full object-cover">
                    @else
                        <span class="text-cyan-400 font-bold text-xl font-mono">?</span>
                    @endif
                </div>
                <div>
                    <h1 class="text-xl font-bold uppercase tracking-widest text-pink-500 neon-text mb-1">AGENT: {{ Auth::user()->alias ?? 'INCONNU' }}</h1>
                    <p class="text-xs text-gray-400">
                        Mission active : <span class="text-cyan-400 font-bold uppercase font-mono">
                            {{ Auth::user()->mission === 'heist' ? 'Arasaka Data Heist' : (Auth::user()->mission === 'mainframe' ? 'Militech Mainframe Hack' : 'NetWatch Grid Override') }}
                        </span>
                    </p>
                </div>
            </div>
        </div>

        <!-- Formulaire d'édition de Profil Cyberpunk -->
        <div class="bg-gray-950 border border-blue-900 rounded-2xl p-6 cyber-border">
            <h2 class="text-sm font-semibold uppercase tracking-wider text-blue-400 mb-6 border-l-2 border-pink-500 pl-3">
                Configuration de l'interface neuronale
            </h2>

            @if (session('status') === 'profile-updated')
                <div class="bg-green-500/10 border border-green-500/20 text-green-400 p-3 rounded-xl text-xs uppercase mb-6 animate-pulse">
                    ✓ Profil synchronisé avec la grille réseau
                </div>
            @endif

            <!-- ⚠️ multipart/form-data est OBLIGATOIRE pour l'upload d'image -->
            <form method="post" action="{{ route('profile.update') }}" enctype="multipart/form-data" class="space-y-6">
                @csrf
                @method('patch')

                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-[10px] text-gray-500 uppercase font-mono mb-1.5">Nom de citoyen</label>
                        <input type="text" name="name" value="{{ Auth::user()->name }}" required class="w-full bg-black border border-pink-500/40 focus:border-pink-500 rounded-xl px-4 py-2.5 text-xs text-pink-400 font-mono focus:outline-none transition-colors">
                    </div>
                    <div>
                        <label class="block text-[10px] text-gray-500 uppercase font-mono mb-1.5">Nom de code (Alias)</label>
                        <input type="text" name="alias" value="{{ Auth::user()->alias }}" class="w-full bg-black border border-pink-500/40 focus:border-pink-500 rounded-xl px-4 py-2.5 text-xs text-pink-400 font-mono focus:outline-none transition-colors" placeholder="NetRunner_01">
                    </div>
                </div>

                <!-- Upload de l'avatar -->
                <div>
                    <label class="block text-[10px] text-gray-500 uppercase font-mono mb-1.5">Mettre à jour l'avatar (.jpg, .png)</label>
                    <input type="file" name="avatar" class="w-full bg-black border border-blue-900 rounded-xl px-4 py-2 text-xs text-blue-400 font-mono focus:outline-none file:mr-4 file:py-1 file:px-3 file:border-0 file:text-xs file:font-semibold file:bg-blue-950 file:text-blue-400 hover:file:bg-blue-900 cursor-pointer">
                </div>

                <div>
                    <label class="block text-[10px] text-gray-500 uppercase font-mono mb-1.5">Biographie encryptée</label>
                    <textarea name="bio" rows="3" class="w-full bg-black border border-pink-500/40 focus:border-pink-500 rounded-xl px-4 py-2.5 text-xs text-pink-400 font-mono focus:outline-none transition-colors" placeholder="Écrivez votre histoire...">{{ old('bio', Auth::user()->bio) }}</textarea>
                </div>

                <!-- Boutons Radio Néons pour les Missions -->
                <div class="border-t border-blue-900/40 pt-4">
                    <p class="text-[10px] text-gray-500 uppercase font-mono mb-3">Sélectionner une mission de Netrunner</p>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                        
                        <!-- Mission 1 -->
                        <label class="flex items-center gap-3 bg-black/60 border border-blue-900/40 p-3 rounded-xl cursor-pointer hover:border-cyan-500 transition-colors">
                            <input type="radio" name="mission" value="heist" {{ Auth::user()->mission === 'heist' ? 'checked' : '' }} class="w-4 h-4 text-cyan-500 bg-black border-cyan-500 focus:ring-0">
                            <div>
                                <p class="text-xs text-text font-bold">Data Heist</p>
                                <p class="text-[9px] text-gray-500">Infiltration Arasaka Tower</p>
                            </div>
                        </label>

                        <!-- Mission 2 -->
                        <label class="flex items-center gap-3 bg-black/60 border border-blue-900/40 p-3 rounded-xl cursor-pointer hover:border-cyan-500 transition-colors">
                            <input type="radio" name="mission" value="mainframe" {{ Auth::user()->mission === 'mainframe' ? 'checked' : '' }} class="w-4 h-4 text-cyan-500 bg-black border-cyan-500 focus:ring-0">
                            <div>
                                <p class="text-xs text-text font-bold">Mainframe Hack</p>
                                <p class="text-[9px] text-gray-500">Piratage Militech</p>
                            </div>
                        </label>

                        <!-- Mission 3 -->
                        <label class="flex items-center gap-3 bg-black/60 border border-blue-900/40 p-3 rounded-xl cursor-pointer hover:border-cyan-500 transition-colors">
                            <input type="radio" name="mission" value="grid" {{ Auth::user()->mission === 'grid' ? 'checked' : '' }} class="w-4 h-4 text-cyan-500 bg-black border-cyan-500 focus:ring-0">
                            <div>
                                <p class="text-xs text-text font-bold">Grid Override</p>
                                <p class="text-[9px] text-gray-500">Contournement NetWatch</p>
                            </div>
                        </label>

                    </div>
                </div>

                <div class="pt-2">
                    <button type="submit" class="bg-pink-600 hover:bg-pink-500 text-black font-bold py-2.5 px-6 rounded-xl uppercase tracking-widest transition-colors shadow-[0_0_15px_rgba(236,72,153,0.4)] text-xs">
                        Synchroniser l'identité
                    </button>
                </div>
            </form>
        </div>

    </div>
</x-app-layout>