import { FunctionComponent } from 'preact'
import { MenuItem } from './MenuItem.tsx'
import icons from '../icons'

export const App: FunctionComponent = () => (
  <div class="app">
    <header class="app-header">rdcl.dev</header>

    <main class="app-main">
      <h1>Hello, World!</h1>
    </main>

    <aside class="app-side-menu">
      <nav class="app-nav">
        <MenuItem href="/" route="home" icon={icons.Home}>
          Home
        </MenuItem>
        <MenuItem href="/tools" route="tools" icon={icons.Tools}>
          Tools
        </MenuItem>
      </nav>
    </aside>
  </div>
)
