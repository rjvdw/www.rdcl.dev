'use strict'

const formatISO = require('date-fns/formatISO')
const { q } = require('../db')

const MAX_RESULTS = 500

// language=PostgreSQL
exports.index = (owner, from, to) => q`
  select date, data
  from health_data
  where
    owner = ${ owner } and
    date between ${ from } and ${ to }
  order by date
  limit ${ MAX_RESULTS }
`.select(mapRow)

// language=PostgreSQL
exports.save = (owner, date, data) => q`
  insert into health_data (owner, date, data)
  values (${ owner }, ${ date }, ${ data })
  on conflict (owner, date) do update
    set data = ${ data }
  returning date, data
`.selectOne(mapRow)

// language=PostgreSQL
exports.delete = (owner, date) => q`
  delete from health_data
  where
    owner = ${ owner } and
    date = ${ date }
`.execute()

function mapRow(row) {
  return {
    date: formatISO(row.date, { representation: 'date' }),
    ...row.data,
  }
}
