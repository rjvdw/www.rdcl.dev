'use strict'

const formatISO = require('date-fns/formatISO')
const { withDb } = require('../db')
const { EntryAlreadyExists } = require('../errors')

const MAX_RESULTS = 500

exports.index = (owner, from, to) => withDb(async (db) => {
  // language=PostgreSQL
  const result = await db.q`
    select date, data
    from health_data
    where
      owner = ${ owner } and
      date between ${ from } and ${ to }
    order by date
    limit ${ MAX_RESULTS }
  `

  return result.rows.map(mapRow)
})

exports.save = (owner, date, data) => withDb(async (db) => {
  // language=PostgreSQL
  const result = await db.q`
    insert into health_data (owner, date, data)
    values (${ owner }, ${ date }, ${ data })
    on conflict (owner, date) do update
      set data = ${ data }
    returning date, data
  `

  return result.rows.map(mapRow)[0]
})

exports.delete = (owner, date) => withDb(async (db) => {
  // language=PostgreSQL
  await db.q`
    delete from health_data
    where
      owner = ${ owner } and
      date = ${ date }
  `
})

function mapRow(row) {
  return {
    date: formatISO(row.date, { representation: 'date' }),
    ...row.data,
  }
}
