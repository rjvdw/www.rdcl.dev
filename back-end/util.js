'use strict'

const express = require('express')
const morgan = require('morgan')
const serverless = require('serverless-http')

exports.App = class App {
  constructor(name) {
    const app = express()
    const router = express.Router()

    app.use(`/.netlify/functions/${ name }`, router)
    app.use(morgan('combined'))

    const handler = serverless(app)

    Object.defineProperties(this, {
      name: readonly(name, { enumerable: true }),
      app: readonly(app),
      router: readonly(router),
      handler: readonly(handler),
    })
  }
}

function readonly(value, opts = {}) {
  return {
    ...opts,
    value,
  }
}
