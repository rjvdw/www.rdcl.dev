'use strict'

const { v1: uuid } = require('uuid')
const { select, selectOne } = require('../db')

// language=PostgreSQL
exports.index = (owner) => select`
  select id, description
  from financial_accounts
  where owner = ${ owner }
  order by id
`

// language=PostgreSQL
exports.get = (owner, id) => selectOne`
  select id, description
  from financial_accounts
  where owner = ${ owner } and id = ${ id }
  limit 1
`

// language=PostgreSQL
exports.create = (owner, description) => selectOne`
  insert into financial_accounts (owner, id, description)
  values (${ owner }, ${ uuid() }, ${ description })
  returning id, description
`
