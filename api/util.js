'use strict'

const express = require('express')
const morgan = require('morgan')
const serverless = require('serverless-http')
const ms = require('ms')
const subtract = require('date-fns/subMilliseconds')
const formatISO = require('date-fns/formatISO')
const parseISO = require('date-fns/parseISO')
const { validator } = require('./validator')
const { EntryAlreadyExists, ForeignKeyViolation } = require('./errors')

/**
 * Wrapper around express so that it can easily be exposed as a Netlify function.
 */
exports.App = class App {
  constructor(name) {
    const app = express()
    app.disable('x-powered-by')
    app.disable('etag')
    app.use(morgan('tiny'))

    const router = express.Router()

    Object.defineProperties(this, {
      name: readonly(name, { enumerable: true }),
      app: readonly(app),
      router: readonly(router),
    })
  }

  /**
   * Proxy `Router#use()` to add middleware to the app router.
   * See Router#use() documentation for details.
   *
   * If the _fn_ parameter is an express app, then it will be
   * mounted at the _route_ specified.
   */
  use(...args) {
    this.app.use(...args)
  }

  /**
   * Returns the handler that should be exposed to Netlify.
   */
  getHandler() {
    this.app.use(`/${ this.name }`, this.router)
    this.app.use(`/api/${ this.name }`, this.router)
    this.app.use(`/.netlify/functions/${ this.name }`, this.router)
    this.app.use((err, req, res, next) => {
      if (err instanceof EntryAlreadyExists) {
        res.status(409).json({ reason: err.message })
      } else if (err instanceof ForeignKeyViolation) {
        res.status(400).json({ reason: err.message })
      } else {
        console.error('ERROR', err)
        res.status(500).json({ reason: 'unexpected error' })
      }
    })

    return serverless(this.app)
  }
}

/**
 * Catches any uncaught errors.
 */
exports.ex = cb => (req, res, next) => {
  return cb(req, res, next).then(undefined, err => next(err))
}

exports.range = (options = {}) => (req, res, next) => {
  const fromKey = options.fromKey || 'from'
  const toKey = options.toKey || 'to'
  const defaultDuration = options.defaultDuration || ms('30 days')

  const v = validator()
    .value(fromKey, req.query[fromKey], field => field
      .validTimestamp()
    )
    .value(toKey, req.query[toKey], field => field
      .validTimestamp()
    )

  const to = req.query[toKey] ? parseISO(req.query[toKey]) : new Date()
  const from = req.query[fromKey] ? parseISO(req.query[fromKey]) : subtract(to, defaultDuration)

  const validationResults = v
    .test(from < to).message(`invalid range: ${ from } - ${ to }`)
    .validate()

  if (validationResults.length > 0) {
    res.status(400).json({ reason: 'invalid request', errors: validationResults })
  } else {
    req.range = {
      from: formatISO(from, { representation: 'date' }),
      to: formatISO(to, { representation: 'date' }),
    }
    next()
  }
}

function readonly(value, opts = {}) {
  return {
    ...opts,
    value,
  }
}
