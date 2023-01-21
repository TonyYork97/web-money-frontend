/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#1D2023',
        backgroundLight: '#ffffff',
        secondBackground: 'rgba(20,22,24,0.5)',
        ShadowblockLight: '#f2f3f4',
        textPrime: '#fbffeb',
        textOpacity: 'rgba(238, 238, 238, 0.5)',
        textOpacitySecond: 'rgba(0, 0, 0, 0.67)',
        secondPrime: '#d6d6d6',
        mainGreen: ' #C6FF00',
        secondGreen: '#b2e600',
        totalBlack: '#0b0c0e',
        blackMenu: 'rgb(24, 27, 29)',
        myRed: 'rgba(239, 68, 68, 0.2)',
        myGreen: 'rgba(34, 197, 94, 0.2)',
        whiteOpacity: '#ffffff0a',
        errorRed: '#d30000',
        bggTop: '#f1f1f2',
        bggBottom: '#a2a2a2',
        newBlack: '#151719',
        darkBlack: '#292929',
        bggGreen: '#a8d800',
        darkRed: '#d30000',
        mainYellow: '#f1ff00'
      },
      keyframes: {
        toRight: {
          '100%': { transform: 'translateX(0px)', opacity: '1' },
          '80%': { transform: 'translateX(18px)', opacity: '1' },
          '0%': { transform: 'translateX(-100px)', opacity: '0' },
        }
      },
      animation: {
        'spin-slow': 'toRight .5s ease-in-out 1',
      },
      boxShadow: {
        'block': '0px 3px 5px 0px #ffffff2e',
        'blockLight': '0px 3px 5px 0px #767676',
        'redShadow': '0px 0px 11px 0px #d30000',
        'greenShadow': '0px 0px 11px 0px #44ff6c',
        'whiteShadow': '0px 0px 11px 0px #ffffff',
        'blackShadow': '0px 0px 11px 0px #292929',
      }
    },
  },
  plugins: [],
}

// main green #C6FF00 5b7600
