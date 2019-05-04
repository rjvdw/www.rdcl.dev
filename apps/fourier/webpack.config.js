'use strict'

const factory = require('../../webpack-config-factory')

module.exports = factory(__dirname, '/fourier/', {
  useDevServer: true,
  useSass: true,
  useIndexHtml: true,
})
