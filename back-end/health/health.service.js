'use strict'

const r = require('rethinkdb')
const db = require('../db')

const MAX_RESULTS = 500
const DB_NAME = 'rdcl_health'

exports.index = (owner, from, to) => db.connect(DB_NAME, async (conn) => {
  return await conn.list(
    healthDataByDay()
      .between([formatAsDate(from), owner], [formatAsDate(to), owner])
      .orderBy({ index: 'id' })
      .limit(MAX_RESULTS)
  )
})

exports.create = (owner, timestamp, data) => db.connect(DB_NAME, async (conn) => {
  const id = [formatAsDate(timestamp), owner]
  const result = await conn.run(
    healthDataByDay().insert([
      {
        id: id,
        timestamp,
        owner,
        ...data,
      },
    ])
  )

  if (result.errors) {
    if (firstError(result, fe => fe.startsWith('Duplicate primary key'))) {
      throw new db.DuplicateEntryError(id[0], result)
    } else {
      throw new db.QueryError('failed to create entry', result)
    }
  }

  return id
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

function formatAsDate(date) {
  const [formatted] = date.toISOString().split('T', 1)
  return formatted
}
