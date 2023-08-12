import { createContext, FunctionComponent } from 'preact'
import { useContext, useState } from 'preact/hooks'

export type RoutingContext = {
  activeRoute?: string
  setActiveRoute: (route?: string) => void
}

const Ctx = createContext<RoutingContext>({
  setActiveRoute() {
    throw new Error('no available routing context')
  },
})

export const Routing: FunctionComponent = ({ children }) => {
  const [activeRoute, setActiveRoute] = useState<string>()

  return (
    <Ctx.Provider value={{ activeRoute, setActiveRoute }}>
      {children}
    </Ctx.Provider>
  )
}

export const useRoutingContext = (): RoutingContext => {
  return useContext(Ctx)
}
