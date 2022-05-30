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
    'react-hooks',
    'editorconfig',
    '@typescript-eslint',
    'import',
  ],
  rules: {
    'comma-dangle': ['warn', 'always-multiline'],
    'object-curly-spacing': ['warn', 'always'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'editorconfig/indent': ['error', {
      SwitchCase: 1,
    }],
    'import/order': ['error', {
      alphabetize: { order: 'asc' },
    }],
    'react/jsx-curly-spacing': ['warn', {
      when: 'always',
      children: { when: 'always' },
      attributes: { when: 'always' },
    }],
    'react/jsx-tag-spacing': ['warn', {
      beforeSelfClosing: 'never',
    }],
    '@typescript-eslint/no-inferrable-types': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
}
