<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CYBER_CORE // ENTER</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background-color: #030303; background-image: radial-gradient(#111827 1px, transparent 1px); background-size: 20px 20px; }
        .cyber-panel { border: 1px solid #06b6d4; box-shadow: 0 0 15px rgba(6, 182, 212, 0.3), inset 0 0 10px rgba(6, 182, 212, 0.1); }
        .neon-text { text-shadow: 0 0 5px #06b6d4, 0 0 15px #06b6d4; }
    </style>
</head>
<body class="font-mono text-cyan-400 flex items-center justify-center min-h-screen">
    <div class="w-full max-w-sm p-8 bg-gray-950/90 rounded-2xl cyber-panel text-center relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-1 bg-cyan-500 animate-pulse"></div>
        
        <h1 class="text-3xl font-bold mb-2 tracking-widest neon-text uppercase">CYBER_CORE</h1>
        <p class="text-[10px] text-gray-500 uppercase tracking-widest mb-8">Système de gestion de profils sécurisé</p>

        <div class="space-y-4">
            @if (Route::has('login'))
                @auth
                    <a href="{{ url('/dashboard') }}" class="block w-full border border-cyan-500 py-2.5 rounded-xl hover:bg-cyan-500 hover:text-black transition-all uppercase text-xs font-semibold">
                        Accéder au Panel
                    </a>
                @else
                    <a href="{{ route('login') }}" class="block w-full border border-cyan-500 py-2.5 rounded-xl hover:bg-cyan-500 hover:text-black transition-all uppercase text-xs font-semibold">
                        S'identifier (Login)
                    </a>
                    @if (Route::has('register'))
                        <a href="{{ route('register') }}" class="block w-full border border-pink-500 text-pink-500 py-2.5 rounded-xl hover:bg-pink-500 hover:text-black transition-all uppercase text-xs font-semibold hover:shadow-[0_0_15px_rgba(236,72,153,0.4)]">
                            S'enregistrer (Register)
                        </a>
                    @endif
                @endauth
            @endif
        </div>
    </div>
</body>
</html>