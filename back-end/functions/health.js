'use strict'

const bodyParser = require('body-parser')
const parseISO = require('date-fns/parseISO')
const healthService = require('../health/health.service')
const { auth } = require('../auth/auth.middleware')
const { App, ex, range } = require('../util')
const { validator, validateBody } = require('../validator')

const app = new App('health')
app.use(bodyParser.json())
app.use(auth())

app.router.get('/', range(), ex(async (req, res) => {
  const owner = req.jwt.sub
  const { from, to } = req.range
  const entries = await healthService.index(owner, from, to)

  res.status(200).json({ entries })
}))

const creationValidator = validateBody(body => validator()
  .obj(body, 'request body', obj => obj
    .present()
    .field('timestamp', field => field
      .required()
      .validTimestamp()
    )
    .field('weight', field => field
      .numeric()
    )
    .noOtherFields()
  ))

app.router.post('/', creationValidator, ex(async (req, res) => {
  const owner = req.jwt.sub
  const { timestamp, ...data } = req.body
  const entry = await healthService.create(owner, parseISO(timestamp), data)

  res.set('location', '/.netlify/functions/health')
  res.status(201).json(entry)
}))

exports.handler = app.getHandler()
