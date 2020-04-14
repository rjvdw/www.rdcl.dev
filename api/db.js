'use strict'

const { PG } = require('@rdcl/pg')

module.exports = new PG({
  ssl: {
    rejectUnauthorized: false,
  },
})
