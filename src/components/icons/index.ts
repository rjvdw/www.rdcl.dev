// @ts-ignore
import Home from './home.svg'
// @ts-ignore
import Tools from './tools.svg'
// @ts-ignore
import Health from './health.svg'
// @ts-ignore
import Remove from './remove.svg'

// type ReactSvgComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement>>
type ReactSvgComponent = any // FIXME

export const Icon = {
  Home: Home as ReactSvgComponent,
  Tools: Tools as ReactSvgComponent,
  Health: Health as ReactSvgComponent,
  Remove: Remove as ReactSvgComponent,
}
