# 🚀 Quick Start Guide

## Structure

```
test-laravel-auth/
├── frontend/       ← React SPA (http://localhost:5173)
├── backend/        ← Configuration reference
├── app/            ← Laravel app code
├── routes/         ← API routes
├── config/         ← Configuration
└── database/       ← Migrations & seeders
```

## ⚡ 3-Step Setup

### 1️⃣ Install Everything

```bash
# Root: Install backend
composer install

# Root: Install frontend
cd frontend
npm install
cd ..
```

### 2️⃣ Configure Database

```bash
cp .env.example .env
php artisan key:generate
php artisan migrate
```

### 3️⃣ Run Both Servers

```bash
npm run dev
```

Done! 

## 📍 Access Points

- **React Frontend:** http://localhost:5173
- **Laravel Backend:** http://localhost:8000
- **API Endpoint:** http://localhost:8000/api

## 📖 Separate Commands

```bash
npm run dev:backend    # Just Laravel
npm run dev:frontend   # Just React
npm run build:all      # Production build
```

## 🧪 Test It

1. Visit http://localhost:5173
2. Click "Sign up"
3. Create an account
4. You're logged in! ✅

## 📚 Full Documentation

- [README_SETUP.md](README_SETUP.md) - Complete setup guide
- [frontend/README.md](frontend/README.md) - React frontend docs
- [backend/README.md](backend/README.md) - Laravel backend info

## ❌ Issues?

### Port 5173 in use?
```bash
cd frontend
npm run dev -- --port 3000
```

### Database errors?
```bash
php artisan migrate:fresh
php artisan migrate
```

### Need to reset?
```bash
composer install --no-cache
cd frontend && npm cache clean --force && npm install
php artisan migrate:fresh
```

---

**All set! Happy coding 🔥**
