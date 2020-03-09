'use strict'

const { promisify } = require('util')
const r = require('rethinkdb')

exports.connect = async (options, callback) => {
  let connection

  try {
    connection = await connect({
      host: process.env.RETHINKDB_HOST,
      port: process.env.RETHINKDB_PORT,
      user: process.env.RETHINKDB_USER,
      password: process.env.RETHINKDB_PASSWORD,
      ...options,
    })

    await callback({
      run(query) {
        return new Promise((resolve, reject) => {
          query.run(connection, (err, result) => {
            if (err) {
              reject(err)
            } else {
              resolve(result)
            }
          })
        })
      },
    })
  } finally {
    if (connection) {
      connection.close()
    }
  }
}

function connect(options) {
  return new Promise((resolve, reject) => {
    r.connect(options, (err, conn) => {
      if (err) {
        reject(err)
      } else {
        resolve(conn)
      }
    })
  })
}
