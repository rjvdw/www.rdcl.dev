'use strict'

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  ignorePatterns: ['vite.config.ts'],
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname,
  },
  rules: {
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc' },
      },
    ],
  },
}
