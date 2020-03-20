import { useEffect, useState } from 'react'
import { history } from '../history'

export function useTitle(...title) {
  useEffect(() => {
    document.title = [...title, 'rdcl.dev'].join(' | ')
  })
}

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
