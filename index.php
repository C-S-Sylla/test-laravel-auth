<?php
session_start();
require_once 'includes/db.php';

$error = '';
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user = $_POST['username'];
    $pass = $_POST['password'];
    
    // Requête simple (test)
    $result = $conn->query("SELECT * FROM users WHERE username='$user' AND password='$pass'");
    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $_SESSION['user_id'] = $row['id'];
        header('Location: profile.php');
        exit;
    } else {
        $error = "ACCÈS REFUSÉ. IDENTIFIANTS INVALIDES.";
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>CYBER_GATEWAY // LOGIN</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background-color: #050505; background-image: radial-gradient(#1a1a2e 1px, transparent 1px); background-size: 20px 20px; }
        .neon-text { text-shadow: 0 0 5px #06b6d4, 0 0 20px #06b6d4; }
        .neon-border { box-shadow: 0 0 10px #ec4899, inset 0 0 10px #ec4899; }
        .cyber-input { background: rgba(0, 0, 0, 0.7); border: 1px solid #06b6d4; color: #06b6d4; outline: none; transition: all 0.3s; }
        .cyber-input:focus { box-shadow: 0 0 15px #06b6d4; }
    </style>
</head>
<body class="flex items-center justify-center h-screen font-mono text-cyan-400">
    <div class="p-10 border border-pink-500 rounded-lg bg-gray-900 bg-opacity-80 neon-border w-96 relative overflow-hidden">
        <div class="absolute top-0 left-0 w-full h-1 bg-pink-500 animate-pulse"></div>
        <h1 class="text-3xl font-bold mb-8 text-center neon-text tracking-widest">SYS.LOGIN</h1>
        
        <?php if($error): ?>
            <div class="bg-red-900 border border-red-500 text-red-400 p-2 mb-4 text-xs text-center animate-pulse"><?= $error ?></div>
        <?php endif; ?>

        <form method="POST" class="space-y-6">
            <div>
                <label class="block text-xs mb-1 text-pink-500 uppercase">Utilisateur</label>
                <input type="text" name="username" value="admin" class="cyber-input w-full p-2 text-sm" required>
            </div>
            <div>
                <label class="block text-xs mb-1 text-pink-500 uppercase">Mot de passe</label>
                <input type="password" name="password" value="neon123" class="cyber-input w-full p-2 text-sm" required>
            </div>
            <button type="submit" class="w-full bg-cyan-600 hover:bg-cyan-400 text-black font-bold py-2 mt-4 uppercase tracking-widest transition-colors shadow-[0_0_15px_#06b6d4]">
                Initialiser Connexion
            </button>
        </form>
    </div>
</body>
</html>