import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveRoute } from '../modules/routes'

type SetActiveRouteProps = {
  route: string,
}

export const SetActiveRoute: React.FunctionComponent<SetActiveRouteProps> = ({ route }) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setActiveRoute(route))
  })

  return null
}
