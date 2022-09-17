import { FunctionComponent, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveRoute } from '../slices/routes'
import { StoreDispatch } from '../store'

type ActiveRouteProps = {
  children?: string,
}

export const ActiveRoute: FunctionComponent<ActiveRouteProps> = ({ children: route = '' }) => {
  const dispatch = useDispatch<StoreDispatch>()
  useEffect(() => {
    dispatch(setActiveRoute(route))
  })

  return null
}
