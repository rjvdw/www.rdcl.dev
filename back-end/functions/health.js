'use strict'

const bodyParser = require('body-parser')
const ms = require('ms')
const db = require('../db')
const healthService = require('../health/health.service')
const { auth } = require('../auth/auth.middleware')
const { App, validator } = require('../util')

const DEFAULT_DURATION = ms('30 days')
const MAX_RESULTS = 500

const app = new App('health')
app.use(bodyParser.json())
app.use(auth())

app.router.get('/', async (req, res) => {
  const owner = req.jwt.sub

  const v = validator()
    .value('from', req.params.from, field => field
      .validDate()
    )
    .value('to', req.params.to, field => field
      .validDate()
    )

  const toDate = req.params.to ? Date.parse(req.params.to) : today()
  const to = formatAsDate(toDate)
  const from = formatAsDate(req.params.from ? Date.parse(req.params.from) : new Date(toDate.getTime() - DEFAULT_DURATION))

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
      .field('date', field => field
        .required()
        .validDate()
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
    const { date, ...data } = req.body
    await healthService.create(owner, date, data)

    res.set('location', `/.netlify/functions/health/${ date }`)
    res.status(201).end()
  } catch (err) {
    if (err instanceof db.DuplicateEntryError) {
      res.status(409).json({ reason: err.message })
    } else if (err instanceof db.QueryError) {
      console.error(err)
      res.status(500).json({ reason: err.message })
    } else {
      console.error(err)
      res.status(500).json({ reason: 'unexpected error' })
    }
  }
})

exports.handler = app.getHandler()

function today() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

function formatAsDate(date) {
  const [formatted] = date.toISOString().split('T', 1)
  return formatted
}
