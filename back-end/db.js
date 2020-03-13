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
