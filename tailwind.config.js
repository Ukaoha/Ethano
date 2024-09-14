/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode by adding 'class' strategy

  theme: {
    extend: {
      colors: {
        primary: '#36AAD9',
        secondary: '#717276',
        black: ' #090707',
       primarydark: '#545455',
       secondarydark:' #C3C3C70F',
       primarylight: '#F1F2F2',
       primarydeam: '#545455',
       primarylig: ' #C2EBFF'

       
      },
    },
  },
  plugins: [],
}