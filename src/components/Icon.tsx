import { FunctionComponent, SVGProps } from 'react'
import { ReactComponent as Activities } from '../icons/activities.svg'
import { ReactComponent as CopyToClipboard } from '../icons/copy-to-clipboard.svg'
import { ReactComponent as Health } from '../icons/health.svg'
import { ReactComponent as Home } from '../icons/home.svg'
import { ReactComponent as Labels } from '../icons/labels.svg'
import { ReactComponent as Logout } from '../icons/logout.svg'
import { ReactComponent as Profile } from '../icons/profile.svg'
import { ReactComponent as Tools } from '../icons/tools.svg'

/**
 * Additional properties that exist on SVG elements but are not recognized.
 */
interface Props extends SVGProps<SVGSVGElement> {
  title?: string
  slot?: string
}

type ReactSvgComponent = FunctionComponent<Props>

export const Icon = {
  Profile: Profile as ReactSvgComponent,
  Home: Home as ReactSvgComponent,
  Tools: Tools as ReactSvgComponent,
  Health: Health as ReactSvgComponent,
  Activities: Activities as ReactSvgComponent,
  Labels: Labels as ReactSvgComponent,
  Logout: Logout as ReactSvgComponent,
  CopyToClipboard: CopyToClipboard as ReactSvgComponent,
}
