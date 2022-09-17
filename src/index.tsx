import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { App } from './components/App'
import './elements'
import './styles/main.sass'
import { updateScreenType } from './slices/screen'
import { store } from './store'

// eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)

window.addEventListener('resize', () => {
  store.dispatch(updateScreenType())
}, {
  passive: true,
})
