/* eslint-disable */
'use strict'

const { paths, base } = require('./webpack.base')

module.exports = {
  ...base,
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 8888,
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
      '/api': {
        // TODO
      },
    },
  },
}
