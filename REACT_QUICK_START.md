# React Frontend Quick Start Guide

## What's New?

A complete React frontend has been added to this Laravel project! The React app includes:

- 🎨 Modern UI with React components
- 🔐 Complete authentication system
- 👤 User profile management  
- 🛣️ React Router for navigation
- 🎯 Protected routes
- 📱 Responsive design with Tailwind CSS
- 🔌 Axios for API calls
- 🪝 Custom hooks for authentication

## Quick Start (5 minutes)

### 1. Install dependencies
```bash
npm install
```

### 2. Copy environment file
```bash
cp .env.example .env
```

### 3. Configure database
Edit `.env` and set your database credentials:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_DATABASE=laravel_auth
DB_USERNAME=root
DB_PASSWORD=
```

### 4. Setup Laravel
```bash
php artisan key:generate
php artisan migrate
```

### 5. Start development servers
```bash
npm run dev
```

This runs both Laravel and React dev servers concurrently!

## Access the App

- **React App:** http://localhost:5173 (or http://localhost:8000/react)
- **Blade App:** http://localhost:8000

## File Structure

```
React Components:
├── resources/js/react-app.jsx      ← React entry point
├── resources/js/api.js             ← API client
├── resources/js/context/
│   └── AuthContext.jsx             ← Auth state management
├── resources/js/components/
│   ├── Layout.jsx                  ← Main layout
│   └── PrivateRoute.jsx            ← Route protection
└── resources/js/pages/
    ├── Login.jsx
    ├── Register.jsx
    ├── Dashboard.jsx
    └── Profile.jsx

API Routes:
└── routes/api.php                  ← New API endpoints

Controllers:
└── app/Http/Controllers/Api/
    └── AuthController.php          ← New API controller
```

## Available Scripts

```bash
npm run dev          # Start dev servers (Laravel + Vite)
npm run build        # Production build
npm run build:react  # Build only React
npm run dev:react    # Run only React dev
```

## Key Features

### 1. **Authentication System**
- Register new users
- Login with email/password
- Automatic session management
- Logout functionality

### 2. **Protected Routes**
Routes like `/dashboard` and `/profile` require authentication. Unauthenticated users are redirected to login.

### 3. **API Integration**
All data flows through the new API routes in `routes/api.php`. The React app communicates via:
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get user data
- `PUT /api/auth/profile` - Update profile
- `DELETE /api/auth/profile` - Delete account
- `POST /api/auth/logout` - Logout

### 4. **Error Handling**
Built-in error messages and validation feedback for all operations.

## Troubleshooting

### Issue: Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### Issue: Database errors
Run migrations:
```bash
php artisan migrate
```

### Issue: CORS errors
Check `config/cors.php` is configured correctly for your frontend URL.

### Issue: "Cannot find module"
```bash
npm install
npm cache clean --force
npm install
```

## Next: Extend the App

Ideas for adding more features:
- ✅ Email verification
- ✅ Password reset
- ✅ Role-based permissions
- ✅ User preferences/settings
- ✅ Social login (OAuth)
- ✅ Two-factor authentication
- ✅ User avatars/images
- ✅ Real-time notifications

## Documentation

For detailed setup and API documentation, see: [REACT_FRONTEND_SETUP.md](REACT_FRONTEND_SETUP.md)

## Need Help?

1. Check the [REACT_FRONTEND_SETUP.md](REACT_FRONTEND_SETUP.md) for detailed docs
2. Verify the `.env` file is configured
3. Ensure all npm packages are installed: `npm install`
4. Check Laravel logs: `storage/logs/laravel.log`
5. Open browser DevTools → Network tab to debug API calls

---

**Happy coding! 🚀**
