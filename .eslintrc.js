module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugins:prettier/recommended',
    'plugins:@typescript-eslint/recommended',
    'plugins:storybook/recommended',
    'plugins:storybook/recommended',
    'plugins:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-undef': 'off',
  },
};
