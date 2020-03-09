'use strict'

const bodyParser = require('body-parser')
const { authenticate } = require('../auth')
const { App } = require('../util')

const app = new App('auth')
app.use(bodyParser.json())

app.router.post('/login', async (req, res) => {
  try {
    const response = await authenticate({
      grant_type: 'password',
      username: req.body.username,
      password: req.body.password,
      otp: req.body.otp,
    })

    if (response.data.access_token) res.set('X-Access-Token', response.data.access_token)
    if (response.data.refresh_token) res.set('X-Refresh-Token', response.data.refresh_token)
    res.status(response.status).json(response.data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ reason: 'unexpected error' })
  }
})

exports.handler = app.getHandler()
