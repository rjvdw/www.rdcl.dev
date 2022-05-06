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
    'plugin:editorconfig/all',
    'plugin:@typescript-eslint/recommended',
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
  plugins: [
    'react',
    'editorconfig',
    '@typescript-eslint',
  ],
  rules: {
    'editorconfig/indent': ['error', {
      SwitchCase: 1,
    }],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    '@typescript-eslint/no-inferrable-types': 'off',
  },
}
