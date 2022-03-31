module.exports = {
  mode: 'jit',
  corePlugins: {
    preflight: false,
  },
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {},
  variants: {},
  plugins: [],
  future: {},
};
