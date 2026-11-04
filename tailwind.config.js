/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        journal: {
          bg: '#344260',
          darkBg: '#2a354d',
          pageLight: '#fcfbfa',
          paperCream: '#f7f4ee',
          paperWarm: '#f2ece4',
          accent: '#c05634',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        handwriting: ['Caveat', 'cursive'],
        script: ['"Homemade Apple"', 'cursive'],
        editorial: ['"Playfair Display"', 'serif'],
        casual: ['"Nanum Pen Script"', 'cursive']
      },
      boxShadow: {
        'book-ground': '0 35px 60px -15px rgba(10, 16, 30, 0.65), 0 15px 25px -10px rgba(0, 0, 0, 0.4)',
        'page-stack': '-10px 10px 25px rgba(0,0,0,0.25), 10px 10px 25px rgba(0,0,0,0.25)',
        'page-depth': '0 10px 30px rgba(0,0,0,0.2), inset 0 0 15px rgba(0,0,0,0.05)',
      }
    },
  },
  plugins: [],
}

