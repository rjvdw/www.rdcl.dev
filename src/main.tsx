import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { App } from './components/App'
import { store } from './store'
import './elements'
import './styles/main.sass'
import { updateScreenType } from './modules/screen'

ReactDOM.render(
  <Provider store={ store }>
    <App/>
  </Provider>,
  document.getElementById('root'),
)

window.addEventListener('resize', () => {
  store.dispatch(updateScreenType())
})
