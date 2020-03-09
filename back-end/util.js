'use strict'

const express = require('express')
const morgan = require('morgan')
const serverless = require('serverless-http')

exports.App = class App {
  constructor(name) {
    const app = express()
    app.disable('x-powered-by')
    app.use(morgan('tiny'))

    const router = express.Router()

    Object.defineProperties(this, {
      name: readonly(name, { enumerable: true }),
      app: readonly(app),
      router: readonly(router),
    })
  }

  use(...args) {
    this.app.use(...args)
  }

  getHandler() {
    this.app.use(`/.netlify/functions/${ this.name }`, this.router)

    return serverless(this.app)
  }
}

exports.validator = () => {
  const errors = []
  const validator = {
    test(p) {
      return {
        message(msg) {
          if (typeof p === 'function') {
            if (!p()) {
              errors.push(msg)
            }
          } else if (!p) {
            errors.push(msg)
          }

          return validator
        },
      }
    },

    value(field, value, cb) {
      const present = value !== null && value !== undefined

      cb({
        required() {
          if (!present || value === '') {
            errors.push(`${ field } is required`)
          }

          return this
        },
        validDate() {
          if (present) {
            let valid = false
            if (typeof value === 'string') {
              const parsed = Date.parse(value)
              valid = parsed !== null && (new Date(parsed)).toISOString().startsWith(value)
            }

            if (!valid) {
              errors.push(`${ field } is not a valid date`)
            }
          }

          return this
        },
        numeric() {
          if (present && typeof value !== 'number') {
            errors.push(`${ field } is not numeric`)
          }

          return this
        },
      })

      return this
    },

    obj(obj, objName, cb) {
      const unchecked = new Set(Object.keys(obj))

      cb({
        present() {
          if (!obj) {
            errors.push(`${ objName } is absent`)
          }

          return this
        },
        field(name, cb) {
          unchecked.delete(name)

          validator.value(`${ objName }.${ name }`, obj ? obj[name] : undefined, cb)

          return this
        },
        noOtherFields() {
          if (unchecked.size) {
            errors.push(`${ objName } has undesired fields: ${ Array.from(unchecked.values()) }`)
          }
        },
      })

      return this
    },

    validate() {
      return [...errors]
    },
  }

  return validator
}

function readonly(value, opts = {}) {
  return {
    ...opts,
    value,
  }
}
