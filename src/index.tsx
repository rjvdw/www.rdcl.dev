import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { updateScreenType } from './slices/screen'
import { store } from './store'
import './elements'
import './styles/main.sass'

const container = document.getElementById('root')!
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)

window.addEventListener(
  'resize',
  () => {
    store.dispatch(updateScreenType())
  },
  {
    passive: true,
  },
)
