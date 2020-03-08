'use strict'

const querystring = require('querystring')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const { App } = require('../util')

const CLIENT_ID = process.env.ID_CLIENT_ID
const REALM = process.env.ID_REALM

const app = new App('auth')
app.use(bodyParser.json())

app.router.post('/login', async (req, res) => {
  try {
    const response = await fetch(
      REALM,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: querystring.encode({
          client_id: CLIENT_ID,
          grant_type: 'password',
          scope: 'openid',
          username: req.body.username,
          password: req.body.password,
          otp: req.body.otp,
        }),
      }
    )

    const body = await response.text()
    res.set('Content-Type', response.headers.get('content-type'))
    res.status(response.status).send(body)
  } catch (err) {
    console.error(err)
    res.status(500).json({ reason: 'unexpected error' })
  }
})

app.router.post('/refresh', async (req, res) => {
  try {
    const response = await fetch(
      REALM,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: querystring.encode({
          client_id: CLIENT_ID,
          grant_type: 'refresh_token',
          scope: 'openid',
          refresh_token: req.body.refreshToken,
        }),
      },
    )

    const body = await response.text()
    res.set('Content-Type', response.headers.get('content-type'))
    res.status(response.status).send(body)
  } catch (err) {
    console.error(err)
    res.status(500).json({ reason: 'unexpected error' })
  }
})

exports.handler = app.getHandler()
