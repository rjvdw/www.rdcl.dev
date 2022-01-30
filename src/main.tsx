import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'
import { App } from './components/App'
import './identity-provider'
import './axios'
import './elements'
import './styles/main.sass'
import { updateScreenType } from './modules/screen'

ReactDOM.render(
  <Provider store={ store }>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)

window.addEventListener('resize', () => {
  store.dispatch(updateScreenType())
}, {
  passive: true,
})
