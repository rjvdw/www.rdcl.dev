'use strict'

const base = require('./webpack.base')

module.exports = {
  ...base,
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    historyApiFallback: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    proxy: {
      // TODO:
      // '/api': {
      //   // target: 'https://serverless-tutorial.aws.rdcl.dev', // TODO
      //   target: 'https://k416dn05q2.execute-api.eu-west-1.amazonaws.com',
      //   pathRewrite: { '^/api': '/dev/api' },
      //   changeOrigin: true,
      // },
    },
  },
}
