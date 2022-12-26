import { Entity } from './Entity.mjs'
import { Scoreboard } from './Scoreboard.mjs'

function init() {
  document.body.innerHTML = ''

  const width = window.innerWidth
  const height = window.innerHeight
  const entities = []
  const scoreboard = new Scoreboard()

  const n = Math.round(width * height / 5000)
  for (let i = 0; i < n; i += 1) {
    const e = Entity.random(width, height)
    entities.push(e)
    e.render()
  }

  requestAnimationFrame(() => handleFrame(entities, scoreboard))
}

/**
 * @param {Entity[]} entities
 * @param {Scoreboard} scoreboard
 */
function handleFrame(entities, scoreboard) {
  for (const e of entities) {
    e.tick(scoreboard)
    for (const o of entities) {
      if (e !== o) {
        e.detectCollision(o)
      }
    }
    e.render()
  }
  scoreboard.update(entities)

  if (!gameOver(entities)) {
    requestAnimationFrame(() => handleFrame(entities, scoreboard))
  }
}

/**
 * @param {Entity[]} entities
 * @returns {boolean}
 */
function gameOver(entities) {
  const type = entities[0].type
  for (let i = 1; i < entities.length; i += 1) {
    if (entities[i].type !== type) {
      return false
    }
  }
  return true
}

init()
