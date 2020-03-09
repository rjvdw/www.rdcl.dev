'use strict'

const r = require('rethinkdb')
const bodyParser = require('body-parser')
const ms = require('ms')
const db = require('../db')
const { auth } = require('../middleware/auth')
const { App, validator } = require('../util')

const DEFAULT_DURATION = ms('30 days')
const MAX_RESULTS = 500
const DB_NAME = 'rdcl_health'

const app = new App('health')
app.use(bodyParser.json())
app.use(auth())

app.router.get('/', async (req, res) => {
  const to = +req.params.to || Date.now()
  const from = +req.params.from || (to - DEFAULT_DURATION)
  const owner = req.jwt.sub

  const validationResults = validator()
    .test(from < to).message(`invalid range: ${ from } - ${ to }`)
    .validate()

  if (validationResults.length > 0) {
    res.status(400).json({ reason: 'invalid request', errors: validationResults })
    return
  }

  try {
    await connect(async (conn) => {
      const entries = await conn.run(
        table('days')
          .between(from, to)
          .filter({ owner })
          .limit(MAX_RESULTS)
      )

      res.status(200).json({ entries })
    })
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
    await connect(async (conn) => {
      const { timestamp, ...data } = req.body

      await conn.run(
        table('days').insert([
          // FIXME: day rather than timestamp
          { timestamp, owner, data },
        ])
      )

      res.set('Location', `/.netlify/functions/health/${ timestamp }`)
      res.status(201).end()
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ reason: 'unexpected error' })
  }
})

exports.handler = app.getHandler()

function connect(cb) {
  return db.connect({ db: DB_NAME }, cb)
}

function table(name) {
  return r.db(DB_NAME).table(name)
}
