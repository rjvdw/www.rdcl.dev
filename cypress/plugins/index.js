/* eslint-disable */
'use strict'

const path = require('path')
const browserify = require('@cypress/browserify-preprocessor')
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = (on, config) => {
  on('file:preprocessor', cucumber({
    ...browserify.defaultOptions,
    typescript: path.join(__dirname, '../../node_modules/typescript'),
  }))
}
