import { FunctionComponent } from 'preact'
import { useRoutingContext } from './Routing.tsx'
import { useEffect } from 'preact/hooks'

export type MetaProps = {
  activeRoute?: string
  pageTitle?: string
}

export const Meta: FunctionComponent<MetaProps> = ({
  activeRoute,
  pageTitle,
}) => {
  const { setActiveRoute } = useRoutingContext()
  setActiveRoute(activeRoute)

  useEffect(() => {
    if (pageTitle) {
      document.title = `${pageTitle} | rdcl.dev`
    } else {
      document.title = 'rdcl.dev'
    }
  }, [pageTitle])

  return null
}
