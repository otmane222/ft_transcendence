/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primary : '#C53F3F',
        lightBg : '#F5F5FF',
        lightText : '#374151',
        lightItems : 'white',
        darkBg : '#14202B',
        darkText : 'white',
        darkItems : '#1E292F'
      },
      backgroundImage: {
        'hero': "url('/Ping.png')",
        'pong': "url('/wallpaperflare.png')",
        'pat': "url('/14.svg')",
      },
      fontFamily : {
        'kaushan' : ['"kaushan script"', "sans-serif"],
        'noto' : ['"noto color emoji"', "sans-serif"],
        'insp' : ['inspiration', "sans-serif"],
      },
    },
  },
  plugins: [],
}

