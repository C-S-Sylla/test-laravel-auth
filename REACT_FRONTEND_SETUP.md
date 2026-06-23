# React Frontend Setup

## Overview
This project now includes a React frontend that works alongside the Laravel backend. The React app provides a modern, responsive UI for user authentication and profile management.

## Project Structure

```
resources/
├── js/
│   ├── react-app.jsx          # React entry point
│   ├── api.js                 # API client configuration
│   ├── components/
│   │   ├── Layout.jsx         # Main layout with navigation
│   │   └── PrivateRoute.jsx   # Protected route wrapper
│   ├── context/
│   │   └── AuthContext.jsx    # Authentication context & hooks
│   └── pages/
│       ├── Login.jsx          # Login page
│       ├── Register.jsx       # Registration page
│       ├── Dashboard.jsx      # Dashboard page
│       └── Profile.jsx        # User profile page
├── views/
│   └── react.blade.php        # React app HTML entry point
└── css/
    └── app.css                # Tailwind CSS styles
```

## Installation

### 1. Install NPM Dependencies
```bash
npm install
```

### 2. Install Laravel Dependencies
```bash
composer install
```

### 3. Setup Environment
Copy `.env.example` to `.env` and configure your database:
```bash
cp .env.example .env
```

### 4. Generate App Key
```bash
php artisan key:generate
```

### 5. Run Migrations
```bash
php artisan migrate
```

## Running the Application

### Option 1: Run Both Backend and Frontend Concurrently
```bash
npm run dev
```

This starts both the Laravel development server and Vite development server.

### Option 2: Run Separately

**Terminal 1 - Start Laravel Server:**
```bash
php artisan serve
```

**Terminal 2 - Start Vite Development Server:**
```bash
npm run dev
```

## Accessing the Application

### React Frontend
- **URL:** `http://localhost:5173` or `http://localhost:8000/react`
- **Routes:**
  - `/login` - Login page
  - `/register` - Registration page
  - `/dashboard` - User dashboard (protected)
  - `/profile` - User profile (protected)

### API Endpoints
All API endpoints are at `http://localhost:8000/api`:

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)
- `POST /api/auth/logout` - Logout user (requires auth)
- `PUT /api/auth/profile` - Update profile (requires auth)
- `DELETE /api/auth/profile` - Delete account (requires auth)

## API Documentation

### Register
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}

Response:
{
  "message": "User registered successfully",
  "data": { user object },
  "token": "auth-token"
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "message": "Login successful",
  "data": { user object },
  "token": "auth-token"
}
```

### Get Current User
```bash
GET /api/auth/me
Authorization: Bearer {token}

Response:
{
  "data": { user object }
}
```

### Update Profile
```bash
PUT /api/auth/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Jane Doe",
  "email": "jane@example.com"
}

Response:
{
  "message": "Profile updated successfully",
  "data": { updated user object }
}
```

### Logout
```bash
POST /api/auth/logout
Authorization: Bearer {token}

Response:
{
  "message": "Logged out successfully"
}
```

### Delete Account
```bash
DELETE /api/auth/profile
Authorization: Bearer {token}

Response:
{
  "message": "Account deleted successfully"
}
```

## Building for Production

### Build the React app and Blade assets:
```bash
npm run build
```

This generates optimized production builds in the `public/build` directory.

## Features

- ✅ User Authentication (Register, Login, Logout)
- ✅ Protected Routes
- ✅ User Profile Management
- ✅ Session Persistence
- ✅ Responsive Design with Tailwind CSS
- ✅ Error Handling
- ✅ Loading States
- ✅ CSRF Protection
- ✅ Sanctum API Authentication

## Technology Stack

- **Frontend:** React 18, React Router v6, Axios, Tailwind CSS
- **Backend:** Laravel, Laravel Sanctum
- **Build Tool:** Vite
- **Database:** MySQL/SQLite
- **Authentication:** Laravel Sanctum (Token-based)

## Security Notes

- All API routes require CSRF token for state-changing operations
- Authentication uses Laravel Sanctum with bearer tokens
- Passwords are hashed with bcrypt
- Protected routes require valid authentication token
- CORS is configured for API endpoints

## Troubleshooting

### "Cannot find module 'react'"
```bash
npm install
```

### API returns 401 Unauthorized
- Ensure you're including the authorization header with the token
- Check that the token hasn't expired
- Verify the token format is: `Authorization: Bearer {token}`

### CORS Errors
- Ensure `config/cors.php` is properly configured
- Check that the frontend URL is allowed in CORS configuration
- Verify the API endpoint URL in `resources/js/api.js`

### Vite not starting
```bash
npm run dev
```

Make sure port 5173 is not in use. You can specify a different port:
```bash
npm run dev -- --port 3000
```

## Development Tips

1. **Hot Module Replacement (HMR):** Changes to React components will automatically refresh the browser
2. **API Debugging:** Check Network tab in browser DevTools to inspect API calls
3. **State Management:** Use React Context API via `useAuth()` hook for authentication state
4. **Styling:** Tailwind CSS classes are available for all styling needs

## Next Steps

Consider adding:
- Password reset functionality
- Email verification
- Role-based access control
- User permissions
- Two-factor authentication
- Social authentication (OAuth)
