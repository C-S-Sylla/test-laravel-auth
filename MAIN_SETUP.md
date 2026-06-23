# 🎯 Architecture Complète

## 📂 Structure Séparée

```
test-laravel-auth/
│
├── 📁 frontend/                 ← APP REACT (Port 5173)
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   └── api.js
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
│
├── 📁 backend/                  ← APP LARAVEL (Port 8000)
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   │       └── Api/
│   │   │           └── AuthController.php
│   │   └── Models/
│   │       └── User.php
│   ├── routes/
│   │   └── api.php
│   ├── config/
│   │   └── cors.php
│   ├── composer.json
│   ├── .env.example
│   ├── artisan
│   └── README.md
│
├── MAIN_SETUP.md          ← LIRE CECI D'ABORD!
├── START_HERE.md
├── README.md
└── ... (autres fichiers au root)
```

---

## 🚀 Comment Démarrer

### Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Accès: **http://localhost:5173**

### Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

Accès: **http://localhost:8000/api**

---

## 💻 Deux Projets Indépendants

| | **Frontend** | **Backend** |
|---|---|---|
| **Dossier** | `frontend/` | `backend/` |
| **Technologie** | React 18 + Vite | Laravel 11 |
| **Port** | 5173 | 8000 |
| **Installation** | `npm install` | `composer install` |
| **Démarrer** | `npm run dev` | `php artisan serve` |
| **Base de données** | Aucune | SQLite/MySQL |
| **Authentification** | Context API | Sanctum |

---

## 🔌 Comment Ils Communiquent

```
Frontend (React)
    ↓
    API Calls (HTTP)
    ↓
Backend (Laravel)
    ↓
    Database (SQLite)
```

**URL API Frontend:** `http://localhost:8000/api`
(Configuré dans `frontend/src/api.js`)

---

## 📝 Files to Edit

### Frontend
- `frontend/src/pages/` - Pages React
- `frontend/src/components/` - Composants
- `frontend/src/api.js` - API calls

### Backend
- `backend/app/Http/Controllers/Api/` - Controllers
- `backend/app/Models/` - Models
- `backend/routes/api.php` - Routes
- `backend/.env` - Configuration

---

## 🧪 Tester l'API

```bash
# Register
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }'
```

---

## ✅ Checklist Installation

- [ ] `cd frontend && npm install`
- [ ] `cd backend && composer install`
- [ ] `cd backend && cp .env.example .env`
- [ ] `cd backend && php artisan key:generate`
- [ ] `cd backend && php artisan migrate`
- [ ] Frontend: `npm run dev`
- [ ] Backend: `php artisan serve`
- [ ] Accès: http://localhost:5173

---

## 📚 Documentation

| Fichier | Contenu |
|---------|---------|
| `START_HERE.md` | Guide rapide 5 min |
| `MAIN_SETUP.md` | Guide complet |
| `STRUCTURE.md` | Arborescence |
| `frontend/README.md` | Docs React |
| `backend/README.md` | Docs Laravel |

---

## 🐛 Problèmes Courants

### Port 5173 occupé?
```bash
cd frontend
npm run dev -- --port 3000
```

### Erreurs base de données?
```bash
cd backend
php artisan migrate:fresh
php artisan migrate
```

### Erreurs CORS?
Vérifier `backend/config/cors.php`

### Token invalide?
Vérifier `frontend/src/api.js` - URL de l'API

---

**C'est ça! Deux apps complètement séparées! 🎉**
