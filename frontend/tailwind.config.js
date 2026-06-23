/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: '#020205',
          dark: '#050a14',
          blue: '#00f2ff', // Cyan néon
          pink: '#ff0055', // Rose néon
          border: '#1a2639',
        }
      },
      boxShadow: {
        'neon-blue': '0 0 10px #00f2ff, 0 0 20px #00f2ff33',
        'neon-pink': '0 0 10px #ff0055, 0 0 20px #ff005533',
      }
    },
  },
  plugins: [],
}