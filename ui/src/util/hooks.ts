import { history } from '../history'
import React, { useEffect, useRef, useState } from 'react'
import { Serde } from './types'

/**
 * Returns a stateful value, and a function to update it, using the history state.
 */
export function useHistoryState<T>(key: string, initialState: T): [T, (value: T) => void] {
  const historyState = (history.location.state || {}) as { [key: string]: T | undefined }
  const [state, setState] = useState(historyState[key] || initialState)
  return [
    state,
    value => {
      // @ts-ignore
      history.replace(undefined, { ...historyState, [key]: value })
      setState(value)
    },
  ]
}

/**
 * Returns a ref with autofocus.
 */
export function useAutoFocusRef<T extends HTMLOrSVGElement>(initialValue?: T): React.RefObject<T> {
  const field = useRef(initialValue)
  useEffect(() => {
    field.current?.focus()
  }, [])
  return field as React.RefObject<T>
}

/**
 * Keeps a value synchronized with local storage.
 */
export function useLocalStorage<T>(key: string, initial: T, serde: Serde<T>): [T, (value: T) => void] {
  const getFromLocalStorage = () => localStorage[key]
    ? serde.deserialize(localStorage[key])
    : initial

  const [value, setValue] = useState<T>(getFromLocalStorage())

  useEffect(() => {
    const handler = (event: StorageEvent) =>
      event.key === key && setValue(getFromLocalStorage())

    window.addEventListener('storage', handler)
    return () => {
      window.removeEventListener('storage', handler)
    }
  })

  return [
    value,
    (newValue: T) => {
      localStorage[key] = serde.serialize(newValue)
      setValue(newValue)
    },
  ]
}
