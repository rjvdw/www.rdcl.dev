import { FunctionComponent, JSX } from 'preact'
import Activities from './activities.svg'
import Health from './health.svg'
import HideSideMenu from './hide-side-menu.svg'
import Home from './home.svg'
import Labels from './labels.svg'
import Logout from './logout.svg'
import Profile from './profile.svg'
import ShowSideMenu from './show-side-menu.svg'
import Tools from './tools.svg'

type IconProps = Omit<JSX.HTMLAttributes, 'src'>
export type IconComponent = FunctionComponent<IconProps>

export default asComponents({
  Activities,
  Health,
  HideSideMenu,
  Home,
  Labels,
  Logout,
  Profile,
  ShowSideMenu,
  Tools,
})

function asComponents<K extends string>(
  obj: Record<K, string>,
): Record<keyof typeof obj, IconComponent> {
  return fromEntries(
    entries(obj).map(([key, svg]) => [
      key,
      ({ alt, ...props }) => <img src={svg} alt={alt} {...props} />,
    ]),
  )
}

function entries<K extends string, V>(
  obj: Record<K, V>,
): [keyof typeof obj, V][] {
  return Object.entries(obj) as [keyof typeof obj, V][]
}

function fromEntries<K extends string, V>(entries: [K, V][]): Record<K, V> {
  return Object.fromEntries(entries) as Record<K, V>
}
