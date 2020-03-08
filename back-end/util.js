'use strict'

const express = require('express')
const morgan = require('morgan')
const serverless = require('serverless-http')

exports.App = class App {
  constructor(name) {
    const app = express()
    const router = express.Router()

    Object.defineProperties(this, {
      name: readonly(name, { enumerable: true }),
      app: readonly(app),
      router: readonly(router),
    })
  }

  use(...args) {
    this.app.use(...args)
  }

  getHandler() {
    this.app.use(`/.netlify/functions/${ this.name }`, this.router)
    this.app.use(morgan('combined'))

    return serverless(this.app)
  }
}

function readonly(value, opts = {}) {
  return {
    ...opts,
    value,
  }
}
