'use strict'

const { promisify } = require('util')
const jwt = require('jsonwebtoken')

const PUBLIC_KEY = process.env.ID_PUBLIC_KEY.replace(/\\n/g, '\n')

exports.auth = () => async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.replace(/^bearer /, '')
      req.jwt = await promisify(jwt.verify)(token, PUBLIC_KEY)
      next()

      return
    } catch (err) {
      if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
        res.status(401).json({ reason: err.message })
        return
      }

      console.warn(err)
    }
  }

  res.status(401).json({ reason: 'missing or invalid token' })
}
