'use strict'

const { EntryAlreadyExists, ForeignKeyViolation } = require('../errors')
const { withDb } = require('../db')

const MAX_RESULTS = 500

exports.index = (owner, from, to) => withDb(async (db) => {
  // language=PostgreSQL
  const result = await db.q`
    select
      timestamp,
      account,
      counter_party,
      currency,
      amount,
      description,
      category
    from transactions
    where
      owner = ${ owner } and
      timestamp between ${ from } and ${ to }
    order by timestamp
    limit ${ MAX_RESULTS }
  `

  return result.rows
})

exports.create = (owner, record) => withDb(async (db) => {
  try {
    // language=PostgreSQL
    const result = await db.q`
    insert into transactions (owner, timestamp, account, counter_party, currency, amount, description, category)
    values (
      ${ owner },
      ${ record.timestamp },
      ${ record.account },
      ${ record.counterParty },
      ${ record.currency },
      ${ record.amount },
      ${ record.description },
      ${ record.category }
    )
  `

    return record
  } catch (err) {
    if (err.code === '23505') {
      throw new EntryAlreadyExists(`entry with timestamp ${ record.timestamp } already exists`)
    } else if (err.code === '23503') {
      throw new ForeignKeyViolation(`account ${ record.account } does not exist`)
    } else {
      throw err
    }
  }
})
