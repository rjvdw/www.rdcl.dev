'use strict'

const { withDb } = require('../db')
const { v1: uuid } = require('uuid')

exports.index = (owner) => withDb(async (db) => {
  // language=PostgreSQL
  const result = await db.q`
    select
      id,
      description
    from financial_accounts
    where
      owner = ${ owner }
    order by id
  `

  return result.rows
})

exports.get = (owner, id) => withDb(async (db) => {
  // language=PostgreSQL
  const result = await db.q`
    select
      id,
      description
    from financial_accounts
    where
      owner = ${ owner } and
      id = ${ id }
    limit 1
  `

  return result.rows[0]
})

exports.create = (owner, description) => withDb(async (db) => {
  const id = uuid()

  // language=PostgreSQL
  await db.q`
    insert into financial_accounts (owner, id, description)
    values (${ owner }, ${ id }, ${ description })
  `

  return { id, description }
})
