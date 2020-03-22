'use strict'

const formatISO = require('date-fns/formatISO')
const { withDb } = require('../db')
const { EntryAlreadyExists } = require('../errors')

const MAX_RESULTS = 500

exports.index = (owner, from, to) => withDb((db) =>
  // language=PostgreSQL
  db.select(mapRow)`
    select date, data
    from health_data
    where
      owner = ${ owner } and
      date between ${ from } and ${ to }
    order by date
    limit ${ MAX_RESULTS }
  `
)

exports.save = (owner, date, data) => withDb((db) =>
  // language=PostgreSQL
  db.selectOne(mapRow)`
    insert into health_data (owner, date, data)
    values (${ owner }, ${ date }, ${ data })
    on conflict (owner, date) do update
      set data = ${ data }
    returning date, data
  `
)

exports.delete = (owner, date) => withDb((db) =>
  // language=PostgreSQL
  db.execute`
    delete from health_data
    where
      owner = ${ owner } and
      date = ${ date }
  `
)

function mapRow(row) {
  return {
    date: formatISO(row.date, { representation: 'date' }),
    ...row.data,
  }
}
