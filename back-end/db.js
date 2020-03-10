'use strict'

const r = require('rethinkdb')
const db = module.exports

db.connect = async (config, callback) => {
  let connection

  const options = typeof config === 'string'
    ? { db: config }
    : config

  try {
    connection = await connect({
      host: process.env.RETHINKDB_HOST,
      port: process.env.RETHINKDB_PORT,
      user: process.env.RETHINKDB_USER,
      password: process.env.RETHINKDB_PASSWORD,
      ...options,
    })

    return await callback({
      run(query) {
        return new Promise((resolve, reject) => {
          query.run(connection, (err, cursor) => {
            if (err) {
              reject(err)
            } else {
              resolve(cursor)
            }
          })
        })
      },

      list(query) {
        return this.run(query)
          .then(cursor => new Promise((resolve, reject) => {
            cursor.toArray((err, result) => {
              if (err) {
                reject(err)
              } else {
                resolve(result)
              }
            })
          }))
      },
    })
  } finally {
    if (connection) {
      connection.close()
    }
  }
}

db.QueryError = class QueryError extends Error {
  constructor(message, result) {
    super(message)
    this.result = result
  }
}

db.DuplicateEntryError = class DuplicateEntryError extends db.QueryError {
  constructor(id, result) {
    super(`entry with id ${ id } already exists`, result)
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
