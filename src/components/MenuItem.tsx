import { FunctionComponent } from 'preact'
import classNames from 'classnames'
import { IconComponent } from './Icon'
import { useRoutingContext } from './Routing.tsx'

type MenuItemProps = {
  href: string
  route: string
  icon: IconComponent
  children: string
}

export const MenuItem: FunctionComponent<MenuItemProps> = ({
  href,
  route,
  icon: Icon,
  children: text,
}) => {
  const { activeRoute } = useRoutingContext()

  return (
    <div
      class={classNames('menu-item', {
        'menu-item--active': route === activeRoute,
      })}
    >
      <a href={href} title={text}>
        <Icon class="icon" alt="" role="presentation" />
        <span class="content">{text}</span>
      </a>
    </div>
  )
}
