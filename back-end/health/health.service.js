'use strict'

const { withDb } = require('../db')
const { EntryAlreadyExists } = require('../errors')

const MAX_RESULTS = 500

exports.index = (owner, from, to) => withDb(async (db) => {
  // language=PostgreSQL
  const result = await db.q`
    select
      timestamp,
      data
    from health_data
    where
      owner = ${ owner } and
      timestamp between ${ from } and ${ to }
    order by timestamp
    limit ${ MAX_RESULTS }
  `

  return result.rows.map(row => ({
    timestamp: row.timestamp,
    ...row.data,
  }))
})

exports.create = (owner, timestamp, data) => withDb(async (db) => {
  try {
    // language=PostgreSQL
    await db.q`
      insert into health_data (owner, timestamp, data)
      values (${ owner }, ${ timestamp }, ${ data })
    `

    return {
      timestamp,
      ...data,
    }
  } catch (err) {
    if (err.code === '23505') {
      throw new EntryAlreadyExists(`entry with timestamp ${ timestamp } already exists`)
    } else {
      throw err
    }
  }
})
