'use strict'

const { EntryAlreadyExists, ForeignKeyViolation } = require('../errors')
const { q } = require('../db')

const MAX_RESULTS = 500

// language=PostgreSQL
exports.index = (owner, from, to) => q`
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
`.select(rowMapper)

// language=PostgreSQL
exports.create = (owner, record) => q`
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
`.selectOne(
  rowMapper,
  {
    errorMapper: {
      23503: () => new ForeignKeyViolation(`account ${ record.account } does not exist`),
      23505: () => new EntryAlreadyExists(`entry with timestamp ${ record.timestamp } already exists`),
    },
  }
)

function rowMapper({ counter_party: counterParty, ...fields }) {
  return {
    ...fields,
    counterParty,
  }
}
