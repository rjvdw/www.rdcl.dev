'use strict'

const querystring = require('querystring')
const axios = require('axios').default

const CLIENT_ID = process.env.ID_CLIENT_ID
const REALM = process.env.ID_REALM

exports.authenticate = data => axios({
  url: REALM,
  method: 'post',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  validateStatus: () => true, // we just pass the response code along, no need to throw
  data: querystring.encode({
    client_id: CLIENT_ID,
    scope: 'openid',
    ...data,
  }),
})
