'use strict'

const { Client } = require('faunadb')

module.exports = new Client({
  secret: process.env.FAUNA_DB_SECRET,
  domain: 'db.eu.fauna.com',
  port: 443,
  scheme: 'https',
})
