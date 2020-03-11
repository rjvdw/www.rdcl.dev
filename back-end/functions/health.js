'use strict'

const bodyParser = require('body-parser')
const ms = require('ms')
const db = require('../db')
const healthService = require('../health/health.service')
const { EntryAlreadyExists } = require('../errors')
const { auth } = require('../auth/auth.middleware')
const { App, validator } = require('../util')

const DEFAULT_DURATION = ms('30 days')

const app = new App('health')
app.use(bodyParser.json())
app.use(auth())

app.router.get('/', async (req, res) => {
  const owner = req.jwt.sub

  const v = validator()
    .value('from', req.query.from, field => field
      .validTimestamp()
    )
    .value('to', req.query.to, field => field
      .validTimestamp()
    )

  const to = req.query.to ? new Date(Date.parse(req.query.to)) : new Date()
  const from = req.query.from ? new Date(Date.parse(req.query.from)) : new Date(to.getTime() - DEFAULT_DURATION)

  const validationResults = v
    .test(from < to).message(`invalid range: ${ from } - ${ to }`)
    .validate()

  if (validationResults.length > 0) {
    res.status(400).json({ reason: 'invalid request', errors: validationResults })
    return
  }

  try {
    const entries = await healthService.index(owner, from, to)
    res.status(200).json({ entries })
  } catch (err) {
    console.error(err)
    res.status(500).json({ reason: 'unexpected error' })
  }
})

app.router.post('/', async (req, res) => {
  const owner = req.jwt.sub

  const validationResults = validator()
    .obj(req.body, 'request body', obj => obj
      .present()
      .field('timestamp', field => field
        .required()
        .validTimestamp()
      )
      .field('weight', field => field
        .numeric()
      )
      .noOtherFields()
    )
    .validate()

  if (validationResults.length > 0) {
    res.status(400).json({ reason: 'invalid request', errors: validationResults })
    return
  }

  try {
    const { timestamp, ...data } = req.body
    await healthService.create(owner, new Date(Date.parse(timestamp)), data)

    res.set('location', '/.netlify/functions/health')
    res.status(201).end()
  } catch (err) {
    if (err instanceof EntryAlreadyExists) {
      res.status(409).json({ reason: `record for ${ req.body.timestamp } already exists` })
    } else {
      console.error(err)
      res.status(500).json({ reason: 'unexpected error' })
    }
  }
})

exports.handler = app.getHandler()
