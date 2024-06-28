/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        primary : '#C53F3F',
        lightBg : '#F5F5F5',
        lightText : '#374151',
        lightItems : 'white',
        darkBg : '#14202B',
        darkText : 'white',
        darkItems : '#263238'
      },
      backgroundImage: {
        'hero': "url('/Ping.png')",
        'pong': "url('/wallpaperflare.png')",
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

