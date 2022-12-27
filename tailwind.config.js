/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#1D2023',
        secondBackground: 'rgba(20,22,24,0.5)',
        textPrime: '#eeeeee',
        textOpacity: 'rgb(238, 238, 238, 0.4);',
        secondPrime: '#d6d6d6',
        mainGreen: '#C6FF00',
        secondGreen: '#b2e600',
        totalBlack: '#0b0c0e',
        blackMenu: 'rgb(24, 27, 29)',
        myRed: 'rgba(239, 68, 68, 0.2)',
        myGreen: 'rgba(34, 197, 94, 0.2)',
        whiteOpacity: '#ffffff0a',
        errorRed: '#d30000'

      },
      keyframes: {
        toRight: {
          '100%': { transform: 'translateX(0px)', opacity: '1' },
          '80%': { transform: 'translateX(18px)', opacity: '1' },
          '0%': { transform: 'translateX(-100px)', opacity: '0' },
        }
      },
      animation: {
        'spin-slow': 'toRight .5s ease-in-out  1',
      },
      boxShadow: {
        'block': '0px 3px 5px 0px #ffffff2e',
        'redShadow': '0px 0px 11px 0px #d30000',
        'greenShadow': '0px 0px 11px 0px #44ff6c',
        'whiteShadow': '0px 0px 11px 0px #ffffff',
      }
    },
  },
  plugins: [],
}
