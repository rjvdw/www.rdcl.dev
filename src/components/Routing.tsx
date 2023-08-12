import { signal, Signal } from '@preact/signals'
import { createContext, FunctionComponent } from 'preact'
import { useContext } from 'preact/hooks'

export type RoutingContext = {
  activeRoute: Signal<string | null>
  parent?: RoutingContext
}

const RCtx = createContext<RoutingContext>({
  activeRoute: signal(null),
})

export const Routing: FunctionComponent = ({ children }) => {
  const parent = useContext(RCtx)
  const activeRoute = signal(null)

  return (
    <RCtx.Provider value={{ activeRoute, parent }}>{children}</RCtx.Provider>
  )
}

export const useRoutingContext = () => {
  const ctx = useContext(RCtx)

  return {
    activeRoute: ctx.activeRoute,
    fullRoute: resolveFullRoute(ctx),
  }
}

function resolveFullRoute(ctx: RoutingContext): (string | null)[] {
  let current = ctx
  const route = [ctx.activeRoute.value]

  while (current.parent) {
    current = current.parent
    route.push(current.activeRoute.value)
  }

  return route
}
