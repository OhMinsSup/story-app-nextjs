module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    [
      'babel-plugin-styled-components',
      { fileName: true, displayName: true, ssr: true },
    ],
  ],
};
