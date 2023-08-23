import { useRoutingContext } from './Routing'

export type ActiveRouteProps = {
  children?: string
}

export const ActiveRoute = ({ children: route }: ActiveRouteProps) => {
  const { activeRoute } = useRoutingContext()

  activeRoute.value = route || null

  return null
}
