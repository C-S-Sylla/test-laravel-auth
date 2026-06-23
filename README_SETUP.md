# Laravel React Authentication Project

Complete authentication system with separate **Frontend (React)** and **Backend (Laravel)** folders.

## 📁 Project Structure

```
test-laravel-auth/
├── frontend/                    # React SPA with Vite
│   ├── src/
│   │   ├── pages/              # Login, Register, Dashboard, Profile
│   │   ├── components/         # Layout, PrivateRoute
│   │   ├── context/            # AuthContext
│   │   ├── api.js              # Axios API client
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README.md
│
├── backend/                     # Configuration reference
│   └── README.md
│
├── app/                         # Laravel App (Backend)
│   ├── Http/
│   │   └── Controllers/
│   │       └── Api/
│   │           └── AuthController.php
│   └── Models/
│       └── User.php
│
├── routes/
│   ├── api.php                 # API routes
│   └── web.php
│
├── config/
│   ├── cors.php                # CORS config
│   └── auth.php
│
├── database/
│   ├── migrations/
│   └── seeders/
│
├── .env.example
├── package.json                # Backend scripts (Laravel)
├── composer.json               # Laravel dependencies
└── README_SETUP.md             # This file
```

## 🚀 Quick Start

### Prerequisites
- PHP 8.1+
- Node.js 16+
- Composer
- MySQL/SQLite

### 1. Install Backend Dependencies

```bash
composer install
```

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
cd ..
```

### 3. Setup Environment

```bash
cp .env.example .env
```

### 4. Generate App Key

```bash
php artisan key:generate
```

### 5. Create Database

```bash
php artisan migrate
```

## 🎯 Running the Application

### Option A: Run Both Servers (Recommended)

```bash
npm run dev
```

This runs:
- **Laravel**: http://localhost:8000
- **React Frontend**: http://localhost:5173

### Option B: Run Separately

**Terminal 1 - Backend:**
```bash
php artisan serve
```
Runs at: http://localhost:8000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Runs at: http://localhost:5173

## 📝 API Endpoints

All endpoints at `http://localhost:8000/api`

### Authentication
- `POST /auth/register` - Create account
- `POST /auth/login` - Login
- `GET /auth/me` - Get current user (needs token)
- `POST /auth/logout` - Logout (needs token)
- `PUT /auth/profile` - Update profile (needs token)
- `DELETE /auth/profile` - Delete account (needs token)

## 🔐 Authentication Flow

1. User registers/logs in on React frontend
2. Backend returns user data + auth token
3. React stores token in localStorage
4. Token sent with each API request
5. Backend validates token with Sanctum
6. Protected routes redirect to login if not authenticated

## 📦 Frontend Technologies

- **React 18** - UI library
- **React Router v6** - Navigation
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **React Context** - State management

## 🛠 Backend Technologies

- **Laravel 11** - Framework
- **Laravel Sanctum** - API authentication
- **MySQL** - Database
- **PHP 8.1+** - Language

## 🔍 Project Files

### Frontend (`frontend/src/`)
- **pages/** - Login, Register, Dashboard, Profile pages
- **components/** - Layout, PrivateRoute components
- **context/** - AuthContext for state management
- **api.js** - Axios instance + API endpoints
- **App.jsx** - Main component with routing
- **main.jsx** - React entry point

### Backend (`app/`, `routes/`, `config/`)
- **Controllers/Api/AuthController.php** - API auth methods
- **Models/User.php** - User model with Sanctum
- **routes/api.php** - API route definitions
- **config/cors.php** - CORS settings

## 🧪 Testing

### Login with test account:
1. Visit http://localhost:5173/register
2. Create an account
3. You're automatically logged in
4. Access dashboard and profile

### API Testing (with curl):
```bash
# Register
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }'

# Login
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## ⚙️ Configuration

### Environment Variables (`.env`)
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=laravel_auth
DB_USERNAME=root
DB_PASSWORD=

VITE_API_URL=http://localhost:8000/api
```

### CORS (Allowed Origins)
Edit `config/cors.php` to allow specific frontend URLs:
```php
'allowed_origins' => ['http://localhost:5173', 'http://localhost:3000'],
```

## 🐛 Troubleshooting

### Port 5173 already in use
```bash
cd frontend
npm run dev -- --port 3000
```

### Database errors
```bash
php artisan migrate:fresh
php artisan migrate
```

### Composer issues
```bash
composer install --no-cache
```

### NPM issues
```bash
cd frontend
npm cache clean --force
npm install
```

### CORS errors
- Check `config/cors.php` is configured
- Verify frontend URL matches CORS settings
- Restart backend server

## 📚 Additional Resources

- [Laravel Documentation](https://laravel.com/docs)
- [React Documentation](https://react.dev)
- [Laravel Sanctum](https://laravel.com/docs/sanctum)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)

## 🔒 Security Notes

✅ Passwords hashed with bcrypt
✅ CSRF protection enabled
✅ Sanctum token-based auth
✅ Protected routes require authentication
✅ Automatic logout on 401 response

## 📊 Next Steps

Consider adding:
- ✅ Email verification
- ✅ Password reset
- ✅ Social authentication (OAuth)
- ✅ User roles & permissions
- ✅ Two-factor authentication
- ✅ User profile images
- ✅ Real-time notifications

## 💬 Support

For issues:
1. Check error messages in browser console (F12)
2. Check Laravel logs: `storage/logs/laravel.log`
3. Verify `.env` configuration
4. Ensure database is migrated
5. Check backend/frontend are running

---

**Happy coding! 🎉**
