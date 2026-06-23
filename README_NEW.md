# 🔐 Laravel + React Authentication System

Système d'authentification complet avec **Frontend React** et **Backend Laravel** complètement séparés.

## 📂 Structure

```
test-laravel-auth/
│
├── 📁 frontend/              ← Application React (http://localhost:5173)
│   ├── src/
│   │   ├── pages/           (Login, Register, Dashboard, Profile)
│   │   ├── components/      (Layout, PrivateRoute)
│   │   ├── context/         (AuthContext)
│   │   └── api.js
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── 📁 backend/               ← Application Laravel (http://localhost:8000)
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/Api/
│   │   │       └── AuthController.php
│   │   └── Models/
│   │       └── User.php
│   ├── routes/
│   │   └── api.php
│   ├── config/
│   │   └── cors.php
│   ├── composer.json
│   ├── .env.example
│   └── README.md
│
└── Documentation:
    ├── MAIN_SETUP.md        ← START HERE!
    ├── START_HERE.md
    └── STRUCTURE.md
```

## 🚀 Démarrage en 3 Minutes

### Terminal 1 - Frontend

```bash
cd frontend
npm install
npm run dev
```

→ Ouvre: http://localhost:5173

### Terminal 2 - Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

→ API: http://localhost:8000/api

## ✨ Fonctionnalités

✅ Système d'inscription complet
✅ Connexion avec authentification JWT
✅ Profil utilisateur (affichage, modification, suppression)
✅ Routes protégées (seulement utilisateurs authentifiés)
✅ CORS configuré
✅ Gestion des erreurs
✅ Design responsive (Tailwind CSS)
✅ Stockage du token en localStorage

## 🛠 Technologies

| Frontend | Backend |
|----------|---------|
| React 18 | Laravel 11 |
| Vite | Laravel Sanctum |
| React Router v6 | SQLite/MySQL |
| Tailwind CSS | PHP 8.1+ |
| Axios | Composer |

## 📚 Documentation

1. **[MAIN_SETUP.md](MAIN_SETUP.md)** - Guide complet d'installation
2. **[START_HERE.md](START_HERE.md)** - Démarrage rapide
3. **[STRUCTURE.md](STRUCTURE.md)** - Organisation des fichiers
4. **[frontend/README.md](frontend/README.md)** - Documentations React
5. **[backend/README.md](backend/README.md)** - Documentation Laravel

## 🧪 Tester l'Application

1. Visite http://localhost:5173
2. Clique sur "Sign up"
3. Remplis le formulaire
4. Tu es connecté! ✅

## 🔐 Authentification

Le système utilise **Laravel Sanctum** pour les tokens.

1. User enregistre/se connecte
2. Backend génère un token
3. Frontend stocke le token en localStorage
4. Token envoyé à chaque requête API
5. Backend valide le token

## 📞 Support

### Erreur: Port 5173 occupé?
```bash
cd frontend && npm run dev -- --port 3000
```

### Erreur: Database?
```bash
cd backend && php artisan migrate:fresh && php artisan migrate
```

### Erreur: CORS?
Vérifier `backend/config/cors.php`

### Erreur: Token invalide?
Vérifier `frontend/src/api.js` - URL correcte?

---

**Prêt? → Lis [MAIN_SETUP.md](MAIN_SETUP.md)** 🚀
