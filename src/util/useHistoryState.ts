import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export const useHistoryState = <T>(
  initialState: T
): [T, (value: T) => void] => {
  const location = useLocation()
  const navigate = useNavigate()
  const [state, setState] = useState<T>(location.state ?? initialState)

  useEffect(() => {
    navigate(location.pathname, {
      replace: true,
      state,
    })
  }, [state, navigate, location.pathname])

  return [state, setState]
}
