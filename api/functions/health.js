'use strict'

const bodyParser = require('body-parser')
const healthService = require('../health/health.service')
const { auth } = require('../auth/auth.middleware')
const { App, ex, range } = require('../util')
const { validator, validateBody, validateRequestParam } = require('../validator')

const app = new App('health')
app.use(bodyParser.json())

const dateParamValidator = validateRequestParam(params => validator()
  .value('date', params.date, field => field
    .required()
    .validDate()
  )
)

const entryValidator = validateBody(body => validator()
  .obj(body, 'request body', obj => obj
    .present()
    .field('date', field => field
      .required()
      .validDate()
    )
    .field('weight', field => field
      .isNumber()
    )
    .noOtherFields()
  ))

app.router.get('/', auth(), range(), ex(async (req, res) => {
  const owner = req.jwt.sub
  const { from, to } = req.range
  const entries = await healthService.index(owner, from, to)

  res.status(200).json({ from, to, entries })
}))

app.router.get('/:owner', range(), ex(async (req, res) => {
  const { owner } = req.params
  const { from, to } = req.range
  const entries = await healthService.index(owner, from, to)

  res.status(200).json({ from, to, entries })
}))

app.router.post('/', auth(), entryValidator, ex(async (req, res) => {
  const owner = req.jwt.sub
  const { date, ...data } = req.body
  const entry = await healthService.save(owner, date, data)

  res.set('location', `/api/health/${ entry.date }`)
  res.status(200).json(entry)
}))

app.router.post('/:owner', entryValidator, ex(async (req, res) => {
  const { owner } = req.params
  const { date, ...data } = req.body
  const entry = await healthService.save(owner, date, data)

  res.set('location', `/api/health/${ entry.date }`)
  res.status(200).json(entry)
}))

app.router.delete('/:date', auth(), dateParamValidator, ex(async (req, res) => {
  const owner = req.jwt.sub
  const { date } = req.params
  await healthService.delete(owner, date)

  res.status(204).json({})
}))

app.router.delete('/:owner/:date', dateParamValidator, ex(async (req, res) => {
  const { date, owner } = req.params
  await healthService.delete(owner, date)

  res.status(204).json({})
}))

exports.handler = app.getHandler()
