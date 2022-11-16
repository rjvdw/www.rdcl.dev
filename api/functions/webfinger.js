/* eslint-disable */
'use strict'

const data = require('../data/webfinger')

exports.handler = async (event) => {
  const { resource } = event.queryStringParameters
  const { rel } = event.multiValueQueryStringParameters

  if (data[resource]) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data[resource],
        links: data[resource].links.filter(relFilter(rel)),
      }),
    }
  } else {
    return {
      statusCode: 404,
      body: '',
    }
  }
}

const relFilter = rel => link =>
  rel === undefined || rel.indexOf(link.rel) !== -1
