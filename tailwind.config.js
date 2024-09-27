/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        keyframes: {
          'ease-opacity-t-b': {
            '0%': { opacity: '0', transform: 'translateY(-100%)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
        },
        animation: {
          'ease-opacity-t-b': 'ease-opacity-t-b 0.5s ease',
        },
        'coal': {
          '50': '#f6f5f5',
          '100': '#e7e6e6',
          '200': '#d2cfd0',
          '300': '#b2aeaf',
          '400': '#8b8586',
          '500': '#706a6b',
          '600': '#605a5b',
          '700': '#514d4d',
          '800': '#464445',
          '900': '#3e3b3b',
          '950': '#161515',
        },

      }

    },
  },
  plugins: [],
}

