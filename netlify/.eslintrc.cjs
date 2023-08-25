'use strict'

const root = require('../.eslintrc.cjs')

module.exports = {
  root: true,
  env: { node: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:import/recommended', 'prettier'],
  rules: root.rules,
}
