'use strict'

const bodyParser = require('body-parser')
const { auth } = require('../auth/auth.middleware')
const { App, ex, range } = require('../util')
const { validator, validateBody } = require('../validator')
const accountService = require('../finance/account.service')
const transactionService = require('../finance/transaction.service')

const app = new App('finances')
app.use(bodyParser.json())
app.use(auth())

app.router.get('/accounts', ex(async (req, res) => {
  const owner = req.jwt.sub
  const accounts = await accountService.index(owner)
  res.status(200).json({ accounts })
}))

app.router.get('/accounts/:id', ex(async (req, res) => {
  const owner = req.jwt.sub
  const account = await accountService.get(owner, req.params.id)

  if (account) {
    res.status(200).json(account)
  } else {
    res.status(404).json({ reason: `account ${ req.params.id } not found` })
  }
}))

const accountCreationValidator = validateBody(body => validator()
  .obj(body, 'request body', obj => obj
    .present()
    .field('description', field => field
      .required()
    )
    .noOtherFields()
  ))

app.router.post('/accounts', accountCreationValidator, ex(async (req, res) => {
  const owner = req.jwt.sub
  const { description } = req.body
  const entry = await accountService.create(owner, description)

  res.set('location', `/api/finances/accounts/${ entry.id }`)
  res.status(201).json(entry)
}))

app.router.get('/transactions', range(), ex(async (req, res) => {
  const owner = req.jwt.sub
  const { from, to } = req.range

  const transactions = await transactionService.index(owner, from, to)
  res.status(200).json({ transactions })
}))

const transactionCreationValidator = validateBody(body => validator()
  .obj(body, 'request body', obj => obj
    .present()
    .field('timestamp', field => field
      .required()
      .validTimestamp()
    )
    .field('account', field => field
      .required()
      .validUuid()
    )
    .field('counterParty', field => field
      .required()
    )
    .field('currency', field => field
      .required()
    )
    .field('amount', field => field
      .required()
      .isNumber()
    )
    .field('description', field => field
      .required()
    )
    .field('category', field => field)
    .noOtherFields()
  ))

app.router.post('/transactions', transactionCreationValidator, ex(async (req, res) => {
  const owner = req.jwt.sub
  const record = req.body
  const entry = await transactionService.create(owner, record)

  res.set('location', '/api/finances/transactions')
  res.status(201).json(entry)
}))

exports.handler = app.getHandler()
