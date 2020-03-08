'use strict'

const { App } = require('../util')

const app = new App('health')

app.router.get('/', (req, res) => {
  res.send('Hello, World!')
})

exports.handler = app.handler
