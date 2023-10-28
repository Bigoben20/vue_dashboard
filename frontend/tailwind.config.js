/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#00AF91",
          100: "#007965",
          200: "#F58634",
          300: "#FFCC29"
        }
      },
      animation: {
        'hue-rotate': 'hue-rotate 5s linear infinite',
      },
      keyframes: {
        'hue-rotate': {
          '0%, 100%': { filter: 'hue-rotate(197deg)' },
          '50%': { filter: 'hue-rotate(17deg)' },
        }
      }
    },
    
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
  darkMode: 'class'
}