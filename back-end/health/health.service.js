'use strict'

const r = require('rethinkdb')
const db = require('../db')

const MAX_RESULTS = 500
const DB_NAME = 'rdcl_health'

exports.index = (owner, from, to) => db.connect(DB_NAME, async (conn) => {
  return await conn.list(
    healthDataByDay()
      .between([from, owner], [to, owner])
      .limit(MAX_RESULTS)
  )
})

exports.create = (owner, date, data) => db.connect(DB_NAME, async (conn) => {
  const result = await conn.run(
    healthDataByDay().insert([
      {
        id: [date, owner],
        date,
        owner,
        ...data,
      },
    ])
  )

  if (result.errors) {
    if (firstError(result, fe => fe.startsWith('Duplicate primary key'))) {
      throw new db.DuplicateEntryError(date, result)
    } else {
      throw new db.QueryError('failed to create entry', result)
    }
  }
})

function healthDataByDay() {
  return r.db(DB_NAME).table('health_data_by_day')
}

function firstError(result, cb) {
  if (result.first_error && typeof result.first_error === 'string') {
    return cb(result.first_error)
  }

  return false
}
