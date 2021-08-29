import { useEffect, useRef, useState } from 'react'
import { history } from '../history'

/**
 * @typedef {(T) => void} Consumer<T>
 */

/**
 * Returns a stateful value, and a function to update it, using the history state.
 *
 * @template T
 * @param {string} key
 * @param {T} initialState
 * @return {[T, Consumer<T>]}
 */
export function useHistoryState(key, initialState) {
  const historyState = history.location.state || {}
  const [state, setState] = useState(historyState[key] || initialState)
  return [
    state,
    value => {
      history.replace(undefined, { ...historyState, [key]: value })
      setState(value)
    },
  ]
}

/**
 * Returns a ref with autofocus.
 *
 * @template {HTMLOrSVGElement} T
 * @param {T} initialValue
 * @return {React.MutableRefObject<T>}
 */
export function useAutoFocusRef(initialValue = null) {
  const field = useRef(initialValue)
  useEffect(() => {
    field.current.focus()
  }, [])
  return field
}
