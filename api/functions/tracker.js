'use strict'

const bodyParser = require('body-parser')
const { App, ex, range, beforeAfterWhere } = require('../util')
const { validator, validateBody, validateRequestParam } = require('../validator')
const { query: q } = require('faunadb')
const db = require('../db')

const app = new App('tracker')
app.use(bodyParser.json())

const OWNER = '14e9babf-549f-4b7a-9770-9ed6fc4d4010' // FIXME

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
    //.noOtherFields()
  ))

const whereIsDateTerm = el => typeof el === 'string' && el.match(/^\d{4}-\d{2}-\d{2}$/)

app.router.get('/', range(), ex(async (req, res) => {
  const { from, to } = req.range
  const { data: entries, ...result } = await db.query(
    q.Call(
      q.Function('GetTrackingDataForUser'),
      OWNER, from, to
    )
  )
  const { before, after } = beforeAfterWhere(result, whereIsDateTerm)

  res.status(200).json({ from, to, before, after, entries })
}))

app.router.get('/:date', dateParamValidator, ex(async (req, res) => {
  const { date } = req.params
  const { data: entries } = await db.query(
    q.Call(
      q.Function('GetTrackingDataForUserAndDate'),
      OWNER, date
    )
  )

  if (entries.length === 0) {
    res.status(404).json({ reason: 'not found' })
  } else {
    res.status(200).json(entries[0])
  }
}))

app.router.post('/', entryValidator, ex(async (req, res) => {
  const { date, ...data } = req.body
  const { data: entry } = await db.query(
    q.Create(
      q.Collection('tracking'),
      {
        data: {
          owner: OWNER,
          date,
          ...data,
        }
      }
    )
  )

  res.set('location', `/api/tracker/${ entry.date }`)
  res.status(200).json(entry)
}))

app.router.delete('/:date', dateParamValidator, ex(async (req, res) => {
  const { date } = req.params
  await db.query(
    q.Call(
      q.Function('DeleteTrackingDataForUserAndDate'),
      OWNER, date
    )
  )

  res.status(204).json({})
}))

exports.handler = app.getHandler()
