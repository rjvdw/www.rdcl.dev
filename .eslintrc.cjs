'use strict'

module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:import/recommended', 'prettier'],
  rules: {
    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc' },
      },
    ],
  },
}
