'use strict'

const RE_TIMESTAMP = /^\d+-\d{1,2}-\d{1,2}/
const RE_DATE = /^\d+-\d{1,2}-\d{1,2}$/
const RE_UUID = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

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
        validTimestamp() {
          if (present) {
            if (typeof value !== 'string' || !RE_TIMESTAMP.test(value) || Date.parse(value) === null) {
              errors.push(`${ field } is not a valid timestamp`)
            }
          }

          return this
        },
        validDate() {
          if (present) {
            if (typeof value !== 'string' || !RE_DATE.test(value) || Date.parse(value) === null) {
              errors.push(`${ field } is not a valid date`)
            }
          }

          return this
        },
        validUuid() {
          if (present && (typeof value !== 'string' || !RE_UUID.test(value))) {
            errors.push(`${ field } is not a valid uuid`)
          }

          return this
        },
        isNumber() {
          if (present && typeof value !== 'number') {
            errors.push(`${ field } is not a number`)
          }

          return this
        },
        isNumeric() {
          if (!present) return this
          if (typeof value === 'number') return this
          if (typeof value === 'string') {
            if (!Number.isNaN(Number(value))) {
              return this
            }
          }

          errors.push(`${ field } is not numeric`)
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

exports.validateBody = (getValidator) => (req, res, next) => {
  const validationResults = getValidator(req.body).validate()
  if (validationResults.length > 0) {
    res.status(400).json({ reason: 'invalid request', errors: validationResults })
  } else {
    next()
  }
}

exports.validateRequestParam = (getValidator) => (req, res, next) => {
  const validationResults = getValidator(req.params).validate()
  if (validationResults.length > 0) {
    res.status(400).json({ reason: 'invalid request', errors: validationResults })
  } else {
    next()
  }
}
