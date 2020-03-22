'use strict'

const { Client } = require('pg')

exports.withDb = async (cb) => {
  let client = null

  try {
    client = new Client({
      ssl: {
        rejectUnauthorized: false,
      },
    })
    await client.connect()

    return await cb({
      client,

      query(...args) {
        return client.query(...args)
      },

      select(mapper = identity) {
        if (arguments.length > 0 && Array.isArray(arguments[0])) {
          return this.select()(...arguments)
        }

        return async (strs, ...vals) => {
          const result = await this.q(strs, ...vals)
          return result.rows.map(mapper)
        }
      },

      selectOne(mapper = identity) {
        if (arguments.length > 0 && Array.isArray(arguments[0])) {
          return this.selectOne()(...arguments)
        }

        return async (strs, ...vals) => {
          const rows = await this.select(mapper)(strs, ...vals)
          return rows[0]
        }
      },

      execute() {
        if (arguments.length > 0 && Array.isArray(arguments[0])) {
          return this.execute()(...arguments)
        }

        return (strs, ...vals) => this.q(strs, ...vals)
      },

      q(strs, ...vals) {
        let query = strs[0]

        for (let i = 0; i < vals.length; i += 1) {
          query += '$' + (i + 1) + strs[i + 1]
        }

        return client.query(query, vals)
      },
    })
  } finally {
    if (client !== null) {
      await client.end()
    }
  }
}

function identity(row) {
  return row
}
