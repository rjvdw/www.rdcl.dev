import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveRoute } from '../slices/routes'
import { StoreDispatch } from '../store'

type SetActiveRouteProps = {
  route: string,
}

export const SetActiveRoute: React.FunctionComponent<SetActiveRouteProps> = ({ route }) => {
  const dispatch = useDispatch<StoreDispatch>()
  useEffect(() => {
    dispatch(setActiveRoute(route))
  })

  return null
}
