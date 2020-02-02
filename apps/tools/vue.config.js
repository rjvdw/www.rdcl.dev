'use strict'

module.exports = {
  publicPath: '/tools/',
  devServer: {
    proxy: {
      '^/.netlify': { target: 'http://localhost:8888' },
    },
  },
}
