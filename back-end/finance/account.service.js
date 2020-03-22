'use strict'

const { withDb } = require('../db')
const { v1: uuid } = require('uuid')

exports.index = (owner) => withDb((db) =>
  // language=PostgreSQL
  db.select`
    select id, description
    from financial_accounts
    where owner = ${ owner }
    order by id
  `
)

exports.get = (owner, id) => withDb((db) =>
  // language=PostgreSQL
  db.selectOne`
    select id, description
    from financial_accounts
    where owner = ${ owner } and id = ${ id }
    limit 1
  `
)

exports.create = (owner, description) => withDb((db) =>
  // language=PostgreSQL
  db.selectOne`
    insert into financial_accounts (owner, id, description)
    values (${ owner }, ${ uuid() }, ${ description })
    returning id, description
  `
)
