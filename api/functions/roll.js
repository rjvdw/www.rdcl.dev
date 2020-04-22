'use strict'

const { App, ex } = require('../util')

const app = new App('roll')

const RE = /^(\d{1,2})d(\d{1,2})$/

const validator = (req, res, next) => {
  const { spec } = req.params

  const dice = spec.split(',').map(s => [s, s.match(RE)])

  if (dice.length > 100) {
    res.status(400).json({
      reason: 'too many dice',
    })
    return
  }

  const invalidDice = dice.filter(([, match]) => !match)

  if (invalidDice.length > 0) {
    res.status(400).json({
      reason: 'invalid dice',
      invalid: invalidDice.map(([dice]) => dice),
    })
    return
  }

  req.dice = dice.flatMap(processMatch)
  next()
}

app.router.get('/:spec', validator, ex(async (req, res) => {
  const { dice } = req
  const [rolls, total] = dice.reduce(([rolls, total], value) => {
    const roll = rollDie(value)
    return [
      [...rolls, roll],
      total + roll,
    ]
  }, [[], 0])

  if (req.accepts('text/html')) {
    const html = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Result: ${ total }</title>
        <meta property="og:title" content="Result: ${ total }">
        <meta property="og:type" content="website">
        <meta property="og:description" content="Rolling ${ req.params.spec } resulted in [${ rolls.join(', ') }] with a total of ${ total }">
        <style>
          html { font-size: 16px; font-family: sans-serif; text-rendering: optimizeLegibility }
          table { border-spacing: 0; border-collapse: collapse }
          thead > tr:last-child > th, thead > tr:last-child > td { border-bottom: medium double #333 }
          tfoot > tr:first-child > th, tfoot > tr:first-child > td { border-top: medium double #333 }
          th, td { border: thin solid #333; padding: .25rem .5rem; text-align: center }
        </style>
      </head>
      <body>
        <h1>Result: ${ total }</h1>
        <table>
        <thead>
          <tr><th>Dice<th>Roll
        </thead>
        <tbody>
          ${ dice.map((dice, idx) => `
            <tr><td>${ dice }<td>${ rolls[idx] }
          `).join('') }
        </tbody>
        <tfoot>
          <tr><th>Total<td>${ total }
        </tfoot>
        </table>
      </body>
      </html>
    `.replace(/\s+/g, ' ')
    res.status(200).send(html)
  } else if (req.accepts('application/json')) {
    res.status(200).json({ dice, rolls, total })
  } else {
    res.status(200).send(`Rolled ${ dice.length } dice, with results ${ rolls.join(', ') } (total: ${ total })`)
  }
}))

exports.handler = app.getHandler()

function processMatch([, match]) {
  const nr = parseInt(match[1])
  const size = parseInt(match[2])

  return new Array(nr).fill(size)
}

function rollDie(value) {
  return Math.ceil(Math.random() * value)
}
