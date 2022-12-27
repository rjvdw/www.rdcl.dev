import { Body } from './Body.mjs'

/** @type Body | null */
let anchor = null

function init() {
  const width = window.innerWidth
  const height = window.innerHeight

  const bodies = [
    new Body('sun', 100, width / 2, height / 2, 0, 0),
    new Body('venus', 1, width / 2 - 200, height / 2, 0, .5),
    new Body('earth', 1, width / 2 - 275, height / 2, 0, .6),
    new Body('moon', .1, width / 2 - 300, height / 2, 0, .78),
  ]
  anchor = bodies[0]

  document.body.addEventListener('click', (event) => {
    for (const body of bodies) {
      if (body.is(event.target)) {
        anchor = body
        break
      }
    }
  })

  requestAnimationFrame(() => handleFrame(bodies))
}

/**
 * @param {Body[]} bodies
 */
function handleFrame(bodies) {
  for (const body of bodies) {
    body.update(bodies)
  }

  const offsetX = window.innerWidth / 2 - anchor.x
  const offsetY = window.innerHeight / 2 - anchor.y

  for (const body of bodies) {
    body.center(offsetX, offsetY)
  }

  requestAnimationFrame(() => handleFrame(bodies))
}

init()
