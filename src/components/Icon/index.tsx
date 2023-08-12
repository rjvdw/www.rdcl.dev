import { FunctionComponent, JSX } from 'preact'
import CloseSideMenu from './close-side-menu.svg'
import Home from './home.svg'
import OpenSideMenu from './open-side-menu.svg'
import Tools from './tools.svg'

type IconProps = Omit<JSX.HTMLAttributes, 'src'>
export type IconComponent = FunctionComponent<IconProps>

export default asComponents({
  Home,
  Tools,
  OpenSideMenu,
  CloseSideMenu,
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
