import { FunctionComponent } from 'preact'
import Icon from '../Icon'
import { IconButton } from '../IconButton'

export type AppHeaderProps = {
  onShowSideMenu(): void
}

export const AppHeader: FunctionComponent<AppHeaderProps> = ({
  onShowSideMenu,
  children,
}) => (
  <header class="app-header">
    <IconButton
      icon={Icon.ShowSideMenu}
      class="show-side-menu"
      label="Show side menu"
      onClick={onShowSideMenu}
    />
    {children}
  </header>
)
