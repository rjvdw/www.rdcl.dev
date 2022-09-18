import { FunctionComponent, SVGProps } from 'react'
import { ReactComponent as Home } from '../icons/home.svg'
import { ReactComponent as Tools } from '../icons/tools.svg'

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
}