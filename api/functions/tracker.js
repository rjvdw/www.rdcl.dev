'use strict'

const bodyParser = require('body-parser')
const { App, ex, range, beforeAfterWhere } = require('../util')
const { auth } = require('../auth-middleware')
const { validator, validateBody, validateRequestParam } = require('../validator')
const { query: q } = require('faunadb')
const db = require('../db')
const { subDays, formatISO } = require('date-fns')

const app = new App('tracker')
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
    //.noOtherFields()
  ))

const whereIsDateTerm = el => typeof el === 'string' && el.match(/^\d{4}-\d{2}-\d{2}$/)

app.router.get('/', auth(), range(), ex(async (req, res) => {
  const owner = req.user.sub
  const { from, to } = req.range
  const { leading } = req.query

  let leadingEntries = undefined
  if (leading) {
    const leadingFrom = formatISO(
      subDays(Date.parse(from), leading),
      { representation: 'date' }
    )
    const leadingTo = formatISO(
      subDays(Date.parse(from), 1),
      { representation: 'date' }
    )

    const { data } = await db.query(
      q.Call(
        q.Function('GetTrackingDataForUser'),
        owner, leadingFrom, leadingTo
      )
    )

    leadingEntries = data
  }

  const { data: entries, ...result } = await db.query(
    q.Call(
      q.Function('GetTrackingDataForUser'),
      owner, from, to
    )
  )
  const { before, after } = beforeAfterWhere(result, whereIsDateTerm)

  res.status(200).json({ from, to, before, after, entries, leading: leadingEntries })
}))

app.router.get('/:date', auth(), dateParamValidator, ex(async (req, res) => {
  const owner = req.user.sub
  const { date } = req.params
  const { data: entries } = await db.query(
    q.Call(
      q.Function('GetTrackingDataForUserAndDate'),
      owner, date
    )
  )

  if (entries.length === 0) {
    res.status(404).json({ reason: 'not found' })
  } else {
    res.status(200).json(entries[0])
  }
}))

app.router.post('/', auth(), entryValidator, ex(async (req, res) => {
  const owner = req.user.sub
  const { date, ...data } = req.body
  const { data: entry } = await db.query(
    q.Create(
      q.Collection('tracking'),
      { data: { owner, date, ...data } },
    )
  )

  res.set('location', `/api/tracker/${ entry.date }`)
  res.status(200).json(entry)
}))

app.router.delete('/:date', auth(), dateParamValidator, ex(async (req, res) => {
  const owner = req.user.sub
  const { date } = req.params
  await db.query(
    q.Call(
      q.Function('DeleteTrackingDataForUserAndDate'),
      owner, date
    )
  )

  res.status(204).json({})
}))

exports.handler = app.getHandler()
