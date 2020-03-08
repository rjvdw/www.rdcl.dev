import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { App } from './components/App'
import './elements/grid'
import './styles/main.sass'
import { updateScreenType } from './modules/screen'
import { navigate } from './modules/routes'

ReactDOM.render(
  <Provider store={ store }>
    <App/>
  </Provider>,
  document.getElementById('root'),
)

window.addEventListener('resize', () => {
  store.dispatch(updateScreenType())
})

document.body.addEventListener('click', event => {
  if (event.ctrlKey || event.shiftKey || event.metaKey || event.button === 1) {
    // user is trying to open a new tab, don't interfere
    return
  }

  const element = event.path.find(el => el.href)

  if (element && element.origin === location.origin) {
    event.preventDefault()
    history.pushState(null, null, element.href)
    store.dispatch(navigate(element))
  }
})

window.addEventListener('popstate', () => {
  store.dispatch(navigate(location))
})
