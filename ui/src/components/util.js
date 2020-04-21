import { useEffect, useRef, useState } from 'react'
import { history } from '../history'

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

export function useAutoFocusRef(initialValue = null) {
  const field = useRef(initialValue)
  useEffect(() => {
    field.current.focus()
  }, [])
  return field
}
