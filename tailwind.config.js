const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  corePlugins: {
    preflight: false,
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        xl: '40px',
        '2xl': '128px',
      },
    },
    fontFamily: {
      display: ['var(--font-display)', ...defaultTheme.fontFamily.sans],
      body: ['var(--font-body)', ...defaultTheme.fontFamily.sans],
    },

    extend: {},
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
  future: {},
};
