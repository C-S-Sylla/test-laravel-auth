<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CYBER_CORE</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background-color: #030303; }
        .neon-text { text-shadow: 0 0 5px #ec4899, 0 0 15px #ec4899; }
        .cyber-border { border: 1px solid #3b82f6; box-shadow: 0 0 10px rgba(59, 130, 246, 0.3); }
    </style>
</head>
<body class="font-mono text-blue-400 min-h-screen flex flex-col">
    
    <!-- Navbar néon -->
    <nav class="border-b border-blue-900 bg-black/60 px-6 py-4 flex justify-between items-center shrink-0">
        <div class="flex items-center gap-3">
            <span class="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
            <span class="font-bold tracking-widest text-pink-500 neon-text">CYBER_NET</span>
        </div>
        <div class="flex items-center gap-4 text-xs">
            <span class="text-gray-500">USER: {{ Auth::user()->name }}</span>
            <form method="POST" action="{{ route('logout') }}">
                @csrf
                <button type="submit" class="border border-red-500/30 text-red-500 px-3 py-1 hover:bg-red-500/10 transition-colors uppercase">
                    Disconnect
                </button>
            </form>
        </div>
    </nav>

    <!-- Contenu Principal -->
    <main class="flex-1 p-6 max-w-4xl mx-auto w-full">
        {{ $slot }}
    </main>

</body>
</html>