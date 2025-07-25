/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'or-sm': '600px',
        'or-ch': '900px',
        'or-ch-v' : { 'raw': '(orientation:portrait) and (min-width:900px)' },
      },
    },
  },
  plugins: []
}

