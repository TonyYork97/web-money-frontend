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
        secondPrime: '#d6d6d6',
        mainGreen: '#C6FF00',
        secondGreen: '#b2e600',
        totalBlack: '#0b0c0e'
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
        'block': '0px 3px 5px 0px #ffffff2e'
      }
    },
  },
  plugins: [],
}
