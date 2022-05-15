import React from 'react'
import Health from './health.svg'
import Home from './home.svg'
import Remove from './remove.svg'
import Tools from './tools.svg'

/**
 * Additional properties that exist on SVG elements but are not recognized.
 */
interface Props extends React.SVGProps<SVGSVGElement> {
  title?: string,
  slot?: string,
}

type ReactSvgComponent = React.FunctionComponent<Props>

export const Icon = {
  Home: Home as ReactSvgComponent,
  Tools: Tools as ReactSvgComponent,
  Health: Health as ReactSvgComponent,
  Remove: Remove as ReactSvgComponent,
}
