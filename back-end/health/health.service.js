'use strict'

const db = require('../db')
const { EntryAlreadyExists } = require('../errors')

const MAX_RESULTS = 500

exports.index = (owner, from, to) => db.connect((client) => client.db()
  .collection('health_data_by_timestamp')
  .find({
    _id: {
      $gte: { owner, timestamp: from.toISOString() },
      $lte: { owner, timestamp: to.toISOString() },
    },
  })
  .sort({ _id: 1 })
  .limit(MAX_RESULTS)
  .toArray()
)

exports.create = (owner, timestamp, data) => db.connect(async (client) => {
  try {
    const result = await client.db()
      .collection('health_data_by_timestamp')
      .insertOne({
        _id: { owner, timestamp: timestamp.toISOString() },
        ...data,
      })

    return result.insertedId
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      throw new EntryAlreadyExists()
    } else {
      throw err
    }
  }
})
