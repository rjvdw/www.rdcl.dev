'use strict'

const querystring = require('querystring')
const axios = require('axios').default

const CLIENT_ID = process.env.ID_CLIENT_ID
const REALM = process.env.ID_REALM

exports.authenticate = data => axios({
  url: `${ REALM }/token`,
  method: 'post',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
  },
  validateStatus: () => true, // we just pass the response code along, no need to throw
  data: querystring.encode({
    client_id: CLIENT_ID,
    scope: 'openid',
    ...data,
  }),
})

exports.revoke = (authorization, refreshToken) => axios({
  url: `${ REALM }/logout`,
  method: 'post',
  headers: {
    authorization,
    'content-type': 'application/x-www-form-urlencoded',
  },
  validateStatus: () => true, // we just pass the response code along, no need to throw
  data: querystring.encode({
    client_id: CLIENT_ID,
    scope: 'openid',
    refresh_token: refreshToken,
  }),
})
