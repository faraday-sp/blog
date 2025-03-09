import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        main: {
          50: '#CAF9EA',
          100: '#94F3D5',
          200: '#5FECC1',
          300: '#29E6AC',
          400: '#16BE8A',
          500: '#13A376',
          600: '#108863',
          700: '#0D6D4F',
          800: '#09513B',
          900: '#063627',
          950: '#031B14',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'Arial', 'sans-serif'],
      },
      scale: {
        99: '0.99',
      },
      screens: {
        dk: { raw: '(min-width: 1920px)' },
        lp: { raw: '(max-width: 1919px) and (min-width: 1153px)' },
        mb: { raw: '(max-width: 768px)' },
        tb: { raw: '(max-width: 1152px) and (min-width: 769px)' },
      },
      zIndex: {
        '1': '1',
        '2': '2',
        '100': '100',
      },
    },
  },
}
