/* eslint-disable */
'use strict'

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'import'],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 0,
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc' },
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
  overrides: [
    {
      files: ['src/elements/**/*.ts'],
      rules: {
        '@typescript-eslint/no-empty-interface': 0,
        '@typescript-eslint/no-namespace': 0,
      },
    },
  ],
}
