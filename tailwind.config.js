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
        'shark': {
          '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#5d5d5d',
          '700': '#4f4f4f',
          '800': '#454545',
          '900': '#3d3d3d',
          '950': '#212121',
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

