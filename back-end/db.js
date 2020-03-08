'use strict'

const { promisify } = require('util')
const r = require('rethinkdb')

exports.connect = async (options, callback) => {
  let connection

  try {
    connection = await promisify(r.connect.bind(r))({
      host: process.env.RETHINKDB_HOST,
      port: process.env.RETHINKDB_PORT,
      user: process.env.RETHINKDB_USER,
      password: process.env.RETHINKDB_PASSWORD,
      ...options,
    })

    await callback({
      async run(query) {
        return await promisify(query.run.bind(query))(connection)
      },
    })
  } finally {
    if (connection) {
      connection.close()
    }
  }
}
