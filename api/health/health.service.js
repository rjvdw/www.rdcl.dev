'use strict'

const differenceInDays = require('date-fns/differenceInDays')
const formatISO = require('date-fns/formatISO')
const isAfter = require('date-fns/isAfter')
const parseISO = require('date-fns/parseISO')
const subDays = require('date-fns/subDays')
const { q } = require('../db')

const ORIGINAL_DATE_KEY = Symbol('original_date_key')
const MAX_RESULTS = 500
const SLIDING_WINDOW = 7

// language=PostgreSQL
exports.index = (owner, from, to) => {
  const fromDate = parseISO(from)
  return computeSlidingAverage(q`
    select date, data
    from health_data
    where
      owner = ${ owner } and
      date between ${ formatISO(subDays(fromDate, SLIDING_WINDOW)) } and ${ to }
    order by date desc
    limit ${ MAX_RESULTS }
  `.select(mapRow), fromDate)
}

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
    [ORIGINAL_DATE_KEY]: row.date,
    ...row.data,
  }
}

async function computeSlidingAverage(resultSet, from) {
  const window = []

  return (await resultSet).reduce((rows, row) => {
    window.push(row)
    while (window.length > 0 && differenceInDays(row[ORIGINAL_DATE_KEY], window[0][ORIGINAL_DATE_KEY]) >= SLIDING_WINDOW) {
      window.shift()
    }

    if (!isAfter(from, row[ORIGINAL_DATE_KEY])) {
      return rows.concat([{
        ...row,
        averageWeight: average(window, 'weight'),
      }])
    } else {
      return rows
    }
  }, [])
}

function average(items, key) {
  if (items.length === 0) return undefined
  return Number((items.reduce((sum, item) => sum + item[key], 0) / items.length).toFixed(3))
}
