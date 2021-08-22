'use strict'

const { paths, base } = require('./webpack.base')

const FUNCTIONS_HOST = process.env.FUNCTIONS_HOST || 'http://localhost:8888'

module.exports = {
  ...base,
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    static: {
      directory: paths.PUBLIC,
    },
    client: {
      overlay: {
        warnings: true,
        errors: true,
      },
    },
    proxy: {
      '/roll': {
        target: FUNCTIONS_HOST,
        pathRewrite: { '^/roll': '/.netlify/functions/roll' },
      },
      '/api': {
        target: FUNCTIONS_HOST,
        pathRewrite: { '^/api': '/.netlify/functions' },
      },
    },
  },
}
