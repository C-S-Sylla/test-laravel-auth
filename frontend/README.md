# Frontend - React Application

This is a standalone React application built with Vite.

## Structure

```
frontend/
├── src/
│   ├── pages/           # Page components
│   ├── components/      # Reusable components
│   ├── context/         # React Context (Auth)
│   ├── hooks/           # Custom hooks
│   ├── api.js           # API client
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Tailwind styles
├── index.html           # HTML entry point
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS config
├── postcss.config.js    # PostCSS config
└── package.json         # Dependencies
```

## Setup

```bash
cd frontend
npm install
```

## Development

```bash
npm run dev
```

Access at: http://localhost:5173

## Build

```bash
npm run build
```

## API Configuration

The app communicates with the backend API at `http://localhost:8000/api`.

Update in `src/api.js` if needed.
