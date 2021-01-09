module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  settings: {
    'import/core-modules': ['svelte'],
    'svelte/unused-export-let': 0,
    'svelte/css-unused-selector': 0,
    // svelte scss eslint error ignore
    // ex ) https://github.com/sveltejs/eslint-plugin-svelte3/tree/master/test/samples
    'svelte3/ignore-styles': (attributes) => attributes.lang && attributes.lang.includes('scss'),
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'svelte3'],
  rules: {
    camelcase: 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'no-console': 0,
    'consistent-return': 0,
  },
};
