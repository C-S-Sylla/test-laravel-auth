<?php
session_start();
require_once 'includes/db.php';

if (!isset($_SESSION['user_id'])) {
    header('Location: index.php');
    exit;
}

$id = $_SESSION['user_id'];
$success = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $alias = $conn->real_escape_string($_POST['alias']);
    $bio = $conn->real_escape_string($_POST['bio']);
    $conn->query("UPDATE users SET alias='$alias', bio='$bio' WHERE id=$id");
    $success = "DONNÉES SYNCHRONISÉES AVEC LE MAINFRAME.";
}

$user = $conn->query("SELECT * FROM users WHERE id=$id")->fetch_assoc();
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>CYBER_CORE // PROFIL</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { background-color: #050505; }
        .neon-text { text-shadow: 0 0 5px #ec4899, 0 0 20px #ec4899; }
        .cyber-panel { border: 1px solid #3b82f6; box-shadow: 0 0 10px #3b82f6, inset 0 0 10px rgba(59, 130, 246, 0.2); }
        .cyber-input { background: rgba(0, 0, 0, 0.7); border: 1px solid #ec4899; color: #ec4899; outline: none; }
        .cyber-input:focus { box-shadow: 0 0 15px #ec4899; }
    </style>
</head>
<body class="p-8 font-mono text-blue-400 h-screen flex flex-col">
    
    <div class="flex justify-between items-center mb-8 border-b border-blue-500 pb-4">
        <h1 class="text-2xl font-bold uppercase tracking-widest neon-text text-pink-500">Terminal Utilisateur</h1>
        <a href="logout.php" class="border border-red-500 text-red-500 px-4 py-1 hover:bg-red-900 transition-colors uppercase text-xs">Déconnexion</a>
    </div>

    <div class="max-w-2xl mx-auto w-full cyber-panel bg-gray-900 p-8 relative">
        <div class="absolute top-0 right-0 p-2 text-xs text-blue-600">ID: #<?= $user['id'] ?></div>
        
        <h2 class="text-xl mb-6 uppercase border-l-4 border-pink-500 pl-3">Paramètres du profil</h2>

        <?php if($success): ?>
            <div class="bg-green-900 border border-green-500 text-green-400 p-2 mb-6 text-xs uppercase animate-pulse"><?= $success ?></div>
        <?php endif; ?>

        <form method="POST" class="space-y-6">
            <div>
                <label class="block text-xs mb-1 text-gray-400 uppercase">Nom de code (Alias)</label>
                <input type="text" name="alias" value="<?= htmlspecialchars($user['alias']) ?>" class="cyber-input w-full p-2 text-sm">
            </div>
            <div>
                <label class="block text-xs mb-1 text-gray-400 uppercase">Biographie cryptée</label>
                <textarea name="bio" rows="4" class="cyber-input w-full p-2 text-sm"><?= htmlspecialchars($user['bio']) ?></textarea>
            </div>
            <div class="pt-4">
                <button type="submit" class="bg-pink-600 hover:bg-pink-500 text-black font-bold py-2 px-6 uppercase tracking-widest transition-colors shadow-[0_0_15px_#ec4899]">
                    Mettre à jour
                </button>
            </div>
        </form>
    </div>

    <div class="mt-auto text-center text-xs text-gray-600 uppercase">
        Infrastructure propulsée par Deployel Engine v2.0
    </div>
</body>
</html>