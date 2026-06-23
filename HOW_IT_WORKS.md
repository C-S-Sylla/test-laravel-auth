# 🎯 Explication Complète de la Structure

## Ce Que tu Dois Savoir

### Tu as DEUX applications séparées:

**1. FRONTEND (React)**
- Dossier: `frontend/`
- Port: 5173
- Technologie: React + Vite
- Commande start: `npm run dev`

**2. BACKEND (Laravel)**
- Dossier: `backend/`
- Port: 8000
- Technologie: Laravel + Sanctum
- Commande start: `php artisan serve`

---

## 📂 Frontend Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Login.jsx        # Page de connexion
│   │   ├── Register.jsx     # Page d'inscription
│   │   ├── Dashboard.jsx    # Tableau de bord (protégé)
│   │   └── Profile.jsx      # Profil utilisateur (protégé)
│   │
│   ├── components/
│   │   ├── Layout.jsx       # Navigation + layout
│   │   └── PrivateRoute.jsx # Protection des routes
│   │
│   ├── context/
│   │   └── AuthContext.jsx  # Gestion état authentification
│   │
│   ├── api.js               # Client HTTP (Axios)
│   ├── App.jsx              # Component principal
│   └── main.jsx             # Point d'entrée React
│
├── package.json             # Dépendances npm
├── vite.config.js           # Configuration Vite
├── tailwind.config.js       # Configuration Tailwind
└── index.html               # Fichier HTML principal
```

---

## 📂 Backend Structure

```
backend/
├── app/
│   ├── Http/
│   │   └── Controllers/Api/
│   │       └── AuthController.php   # Logique d'authentification
│   │           ├── register()       # Inscription
│   │           ├── login()          # Connexion
│   │           ├── me()             # Infos utilisateur
│   │           ├── logout()         # Déconnexion
│   │           ├── updateProfile()  # Modifier profil
│   │           └── deleteProfile()  # Supprimer compte
│   │
│   └── Models/
│       └── User.php                 # Modèle utilisateur
│           (with HasApiTokens trait)
│
├── routes/
│   └── api.php                      # Définition des routes API
│       ├── POST   /auth/register
│       ├── POST   /auth/login
│       ├── GET    /auth/me          (protégée)
│       ├── POST   /auth/logout      (protégée)
│       ├── PUT    /auth/profile     (protégée)
│       └── DELETE /auth/profile     (protégée)
│
├── config/
│   └── cors.php                     # Configuration CORS
│
├── .env.example                     # Variables d'environnement
├── composer.json                    # Dépendances PHP
└── artisan                          # CLI Laravel
```

---

## 🔌 Comment Ils Communiquent

```
USER NAVIGATES
    ↓
REACT (frontend/)
    ↓ HTTP REQUESTS (Axios)
    ↓ URL: http://localhost:8000/api
    ↓
LARAVEL API (backend/)
    ↓ VALIDATION + PROCESSING
    ↓ DATABASE (SQLite)
    ↓ RESPONSE (JSON)
    ↓
REACT RECEIVES DATA
    ↓
REACT UPDATES UI
    ↓
USER SEES RESULT
```

---

## 🚀 Démarrage Pas à Pas

### Étape 1: Frontend

```bash
cd frontend
npm install              # Installe dépendances React
npm run dev             # Démarre serveur dev (port 5173)
```

### Étape 2: Backend

Dans un **autre terminal**:

```bash
cd backend
composer install        # Installe dépendances Laravel
cp .env.example .env   # Crée le fichier .env
php artisan key:generate  # Génère clé app
php artisan migrate     # Crée la base de données
php artisan serve       # Démarre serveur (port 8000)
```

### Étape 3: Test

Ouvre http://localhost:5173 et inscription/connexion!

---

## 🔐 Flux d'Authentification

### 1. Registration (Inscription)

```
User remplis formulaire
    ↓
Frontend envoie à /api/auth/register
    ↓
Backend valide données
    ↓
Backend crée utilisateur en base
    ↓
Backend génère token
    ↓
Backend retourne token + user data
    ↓
Frontend stocke token en localStorage
    ↓
Frontend redirige vers /dashboard
```

### 2. Login (Connexion)

```
User entre email + password
    ↓
Frontend envoie à /api/auth/login
    ↓
Backend valide credentials
    ↓
Backend génère token
    ↓
Backend retourne token + user data
    ↓
Frontend stocke token
    ↓
Frontend redirige vers /dashboard
```

### 3. Protected Route (Route Protégée)

```
User veut accéder /dashboard
    ↓
Frontend vérifie si token existe
    ↓
Si oui: affiche la page
Si non: redirige vers /login
    ↓
Chaque requête API inclut: Authorization: Bearer {token}
    ↓
Backend valide le token
    ↓
Si valide: process requête
Si non: retourne 401 Unauthorized
```

---

## 📊 Fichiers Clés

### À Modifier pour Ajouter des Fonctionnalités:

**Frontend:**
- `frontend/src/pages/` - Ajouter nouvelles pages
- `frontend/src/components/` - Ajouter nouveaux composants
- `frontend/src/api.js` - Ajouter endpoints API

**Backend:**
- `backend/app/Http/Controllers/Api/` - Ajouter controllers
- `backend/routes/api.php` - Ajouter routes
- `backend/app/Models/` - Ajouter modèles

---

## ✅ Checklist

- [ ] `frontend/` a `package.json` ✅
- [ ] `backend/` a `composer.json` ✅
- [ ] `backend/app/Http/Controllers/Api/AuthController.php` existe ✅
- [ ] `backend/routes/api.php` existe ✅
- [ ] `frontend/src/api.js` pointant vers `http://localhost:8000/api` ✅
- [ ] `backend/.env.example` existe ✅
- [ ] `backend/config/cors.php` configuré ✅

---

## 🎯 Prochaines Étapes

1. Lis [MAIN_SETUP.md](MAIN_SETUP.md)
2. Lance `npm run dev` dans `frontend/`
3. Lance `php artisan serve` dans `backend/`
4. Visite http://localhost:5173
5. Test l'inscription!

---

**C'est ça! Deux apps autonomes qui travaillent ensemble! 🚀**
