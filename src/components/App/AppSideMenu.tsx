import classNames from 'classnames'
import { FunctionComponent } from 'preact'
import Icon from '../Icon'
import { IconButton } from '../IconButton'

type AppSideMenuProps = {
  visible: boolean
  onHide(): void
}

export const AppSideMenu: FunctionComponent<AppSideMenuProps> = ({
  visible,
  onHide,
  children,
}) => (
  <aside
    class={classNames('app-side-menu', {
      visible,
    })}
  >
    <IconButton
      icon={Icon.HideSideMenu}
      class="hide-side-menu"
      label="Hide side menu"
      onClick={onHide}
    />
    <nav class="app-nav">{children}</nav>
  </aside>
)
