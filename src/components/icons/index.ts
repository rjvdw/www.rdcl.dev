import { FunctionComponent, SVGProps } from 'react'
import Home from './home.svg'
import Remove from './remove.svg'
import Tools from './tools.svg'

/**
 * Additional properties that exist on SVG elements but are not recognized.
 */
interface Props extends SVGProps<SVGSVGElement> {
  title?: string,
  slot?: string,
}

type ReactSvgComponent = FunctionComponent<Props>

export const Icon = {
  Home: Home as ReactSvgComponent,
  Tools: Tools as ReactSvgComponent,
  Remove: Remove as ReactSvgComponent,
}
