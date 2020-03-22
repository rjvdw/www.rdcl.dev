'use strict'

const formatISO = require('date-fns/formatISO')
const { select, selectOne, execute } = require('../db')

const MAX_RESULTS = 500

// language=PostgreSQL
exports.index = (owner, from, to) => select(mapRow)`
  select date, data
  from health_data
  where
    owner = ${ owner } and
    date between ${ from } and ${ to }
  order by date
  limit ${ MAX_RESULTS }
`

// language=PostgreSQL
exports.save = (owner, date, data) => selectOne(mapRow)`
  insert into health_data (owner, date, data)
  values (${ owner }, ${ date }, ${ data })
  on conflict (owner, date) do update
    set data = ${ data }
  returning date, data
`

// language=PostgreSQL
exports.delete = (owner, date) => execute`
  delete from health_data
  where
    owner = ${ owner } and
    date = ${ date }
`

function mapRow(row) {
  return {
    date: formatISO(row.date, { representation: 'date' }),
    ...row.data,
  }
}
