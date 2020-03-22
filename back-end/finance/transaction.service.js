'use strict'

const { EntryAlreadyExists, ForeignKeyViolation } = require('../errors')
const { withDb } = require('../db')

const MAX_RESULTS = 500

exports.index = (owner, from, to) => withDb((db) =>
  // language=PostgreSQL
  db.select(rowMapper)`
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
)

exports.create = (owner, record) => withDb(async (db) => {
  try {
    // language=PostgreSQL
    return db.selectOne(rowMapper)`
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
      returning
        timestamp,
        account,
        counter_party,
        currency,
        amount,
        description,
        category
    `
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

function rowMapper({ counter_party: counterParty, ...fields }) {
  return {
    ...fields,
    counterParty,
  }
}
