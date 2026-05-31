<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CYBER_GATEWAY</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background-color: #050505; background-image: radial-gradient(#111827 1px, transparent 1px); background-size: 20px 20px; }
        .cyber-panel { border: 1px solid #ec4899; box-shadow: 0 0 15px rgba(236, 72, 153, 0.4), inset 0 0 10px rgba(236, 72, 153, 0.2); }
        .cyber-input { background: rgba(0, 0, 0, 0.8) !important; border: 1px solid #06b6d4 !important; color: #06b6d4 !important; }
        .cyber-input:focus { box-shadow: 0 0 15px #06b6d4 !important; outline: none !important; }
    </style>
</head>
<body class="font-mono text-cyan-400 flex items-center justify-center min-h-screen">
    <div class="w-full sm:max-w-md p-8 bg-gray-950/90 rounded-2xl cyber-panel relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-1 bg-pink-500 animate-pulse"></div>
        <div class="flex justify-center mb-6">
            <span class="text-xs bg-cyan-950 border border-cyan-500 px-3 py-1 tracking-widest text-cyan-400 font-bold uppercase animate-pulse">
                RESTRICTED_ACCESS
            </span>
        </div>
        {{ $slot }}
    </div>
</body>
</html>