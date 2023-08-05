import { FunctionComponent } from 'preact'
import classNames from 'classnames'

type MenuItemProps = {
  href: string
  route: string
  icon: string
  children: string
}

export const MenuItem: FunctionComponent<MenuItemProps> = ({
  href,
  route,
  icon,
  children: text,
}) => (
  <div
    class={classNames('menu-item', {
      'menu-item--active': route === 'home',
    })}
  >
    <a href={href} title={text}>
      <img src={icon} class="icon" alt="" role="presentation" />
      <span class="content">{text}</span>
    </a>
  </div>
)
