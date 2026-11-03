/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#173B35',
          dark: '#0F2622',
          light: '#23524B',
          soft: '#2F675E',
        },
        cream: {
          DEFAULT: '#F5EFE4',
          light: '#FAF6F0',
          dark: '#E7DEC9',
          muted: '#DFCFA8',
        },
        terracotta: {
          DEFAULT: '#C7794A',
          hover: '#B56738',
          light: '#F8EFE9',
          dark: '#A0572C',
        },
        gold: {
          DEFAULT: '#D5B46A',
          hover: '#C29F52',
          light: '#FCF8ED',
          dark: '#A68636',
        },
        dark: {
          DEFAULT: '#263B36',
          muted: '#526964',
          soft: '#3C524C',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'warm': '0 10px 30px -10px rgba(23, 59, 53, 0.08), 0 4px 6px -2px rgba(23, 59, 53, 0.04)',
        'warm-lg': '0 20px 40px -15px rgba(23, 59, 53, 0.12), 0 8px 16px -4px rgba(23, 59, 53, 0.06)',
        'terracotta': '0 10px 25px -5px rgba(199, 121, 74, 0.35)',
        'gold': '0 10px 25px -5px rgba(213, 180, 106, 0.35)',
      },
    },
  },
  plugins: [],
}
