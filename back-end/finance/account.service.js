'use strict'

const { v1: uuid } = require('uuid')
const { q } = require('../db')

// language=PostgreSQL
exports.index = (owner) => q`
  select id, description
  from financial_accounts
  where owner = ${ owner }
  order by id
`.select()

// language=PostgreSQL
exports.get = (owner, id) => q`
  select id, description
  from financial_accounts
  where owner = ${ owner } and id = ${ id }
  limit 1
`.selectOne()

// language=PostgreSQL
exports.create = (owner, description) => q`
  insert into financial_accounts (owner, id, description)
  values (${ owner }, ${ uuid() }, ${ description })
  returning id, description
`.selectOne()
