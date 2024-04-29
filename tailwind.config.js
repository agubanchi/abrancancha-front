/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Onest: ["Onest", "sans-serif"],
        Bebas:[ "Bebas Neue", "sans-serif;"]
      },
      colors: {
        acentColor: "#77da7e",
        textColor: "#1d1d1d",
      },
      backgroundImage:{"header" : "url('/bg_hero.jpg')"},
      keyframes:{
       bounce:{
        '0% 100%':{
          transform: 'translateY(-25%)',
          animation:'cubic-bezier(0.8, 0, 1, 1);'
        },
        '50%':{ transform: 'translateY(0)'},
        animation:'cubic-bezier(0, 0, 0.2, 1)'
       } 
      },

    },
  },
  plugins: [ require('tailwind-scrollbar')],
}