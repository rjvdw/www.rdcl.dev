'use strict'

const r = require('rethinkdb')
const db = require('../db')
const { auth } = require('../middleware/auth')
const { App } = require('../util')

const app = new App('health')

app.use(auth())

app.router.get('/', async (req, res) => {
  try {
    await db.connect({ db: 'rdcl_health' }, async (conn) => {
      const tableList = await conn.run(r.db('rdcl_health').tableList())
      res.status(200).json({ tableList })
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ reason: 'unexpected error' })
  }
})

exports.handler = app.getHandler()
