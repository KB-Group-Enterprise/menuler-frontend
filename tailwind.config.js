const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        main: colors.slate,
      },
      textColor: ({ theme }) => ({
        main: {
          DEFAULT: theme('colors.main.700'),
          ...theme('colors.main'),
        },
      }),
      backgroundColor: ({ theme }) => ({
        main: {
          DEFAULT: theme('colors.main.50'),
          ...theme('colors.main'),
        },
      }),
      padding: ({ theme }) => ({
        screen: theme('spacing.4'),
      }),
      screens: ({ theme }) => ({
        max2xl: { max: '1535px' },
        maxxl: { max: '1279px' },
        maxlg: { max: '1023px' },
        maxmd: { max: '767px' },
        maxsm: { max: '639px' },
        sm: { min: '340px' },
        smmax: { max: '340px' },
        ...theme.screens,
      }),
      keyframes: {
        shaked: {
          '0%': { transform: 'translateY(0)' },
          '10%': { transform: 'translateY(0)' },
          '30%': { transform: 'translateY(5px)' },
          '50%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        shaked: 'shaked 1s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tw-elements/dist/plugin')],
};
