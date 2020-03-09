'use strict'

const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const { authenticate } = require('../auth')

const PUBLIC_KEY = process.env.ID_PUBLIC_KEY.replace(/\\n/g, '\n')

exports.auth = () => async (req, res, next) => {
  let accessToken = null
  let refreshToken = null

  if (req.headers.authorization) {
    try {
      accessToken = req.headers.authorization.replace(/^bearer /i, '')
      refreshToken = req.headers['x-refresh-token']

      req.jwt = await promisify(jwt.verify)(accessToken, PUBLIC_KEY)
      res.set('x-access-token', accessToken)
      res.set('x-refresh-token', refreshToken)
      next()

      return
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        try {
          const response = await authenticate({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
          })

          req.jwt = await promisify(jwt.verify)(response.data.access_token, PUBLIC_KEY)
          res.set('x-access-token', response.data.access_token)
          res.set('x-refresh-token', response.data.refresh_token)
          next()

          return
        } catch (refreshErr) {
          res.status(401).json({ reason: err.message })

          return
        }
      }

      if (err.name === 'JsonWebTokenError') {
        res.status(401).json({ reason: err.message })
        return
      }

      console.warn(err)
    }
  }

  res.status(401).json({ reason: 'missing or invalid token' })
}
