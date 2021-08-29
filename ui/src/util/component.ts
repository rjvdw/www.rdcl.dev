import { EventHandler, SyntheticEvent } from 'react'

/**
 * Workaround for boolean attributes. Returns the correct values to show or not show the attribute.
 */
export function attr(b: boolean): string | undefined {
  return b ? '' : undefined
}

/**
 * Convenience method for preventing the default on an event handler.
 */
export function preventDefault<T extends SyntheticEvent>(handler: EventHandler<T>): EventHandler<T> {
  return event => {
    event.preventDefault()
    handler(event)
  }
}
