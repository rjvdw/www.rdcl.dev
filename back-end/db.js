'use strict'

const MongoClient = require('mongodb').MongoClient
const db = module.exports

db.connect = async (callback) => {
  let client
  try {
    client = await MongoClient.connect(process.env.MONGODB_CONNECTION_STRING, {
      useUnifiedTopology: true,
    })
    return await callback(client)
  } finally {
    if (client) {
      await client.close()
    }
  }
}
