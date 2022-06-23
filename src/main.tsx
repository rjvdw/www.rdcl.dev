import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { App } from './components/App'
import './identity-provider'
import './axios'
import './elements'
import './styles/main.sass'
import { updateScreenType } from './slices/screen'
import { store } from './store'

export class RdclDev extends HTMLElement {
  connectedCallback() {
    const root = createRoot(this)
    root.render(
      <Provider store={ store }>
        <BrowserRouter>
          <React.StrictMode>
            <App/>
          </React.StrictMode>
        </BrowserRouter>
      </Provider>,
    )
  }
}
window.customElements.define('rdcl-dev', RdclDev)

window.addEventListener('resize', () => {
  store.dispatch(updateScreenType())
}, {
  passive: true,
})
