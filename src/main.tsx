import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'
import { App } from './components/App'
import './identity-provider'
import './axios'
import './elements'
import './styles/main.sass'
import { updateScreenType } from './modules/screen'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('root')!)
root.render(
  <Provider store={ store }>
    <BrowserRouter>
      <React.StrictMode>
        <App/>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
)

window.addEventListener('resize', () => {
  store.dispatch(updateScreenType())
}, {
  passive: true,
})
