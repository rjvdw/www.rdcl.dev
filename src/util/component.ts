import { EventHandler, ReactNode, SyntheticEvent } from 'react'

/**
 * Convenience method for preventing the default on an event handler.
 */
export function preventDefault<T extends SyntheticEvent>(
  handler: EventHandler<T>
): EventHandler<T> {
  return (event) => {
    event.preventDefault()
    handler(event)
  }
}

/**
 * Type that indicates it's either a value, or a function which returns a value (of a given type).
 */
export type Fnc<T> = T | (() => T)

/**
 * Convenience method for using conditionals in JSX.
 */
export function conditionally(
  condition: Fnc<boolean>,
  ifTrue: Fnc<ReactNode>,
  ifFalse: Fnc<ReactNode> = null
): ReactNode {
  if ((typeof condition === 'function' && condition()) || condition) {
    if (typeof ifTrue === 'function') {
      return ifTrue()
    } else {
      return ifTrue
    }
  } else {
    if (typeof ifFalse === 'function') {
      return ifFalse()
    } else {
      return ifFalse
    }
  }
}
