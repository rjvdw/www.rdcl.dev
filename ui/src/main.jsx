import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import { axios, hasAuthData, isAuthStorageKey } from './axios'
import { store } from './store'
import { history } from './history'
import { App } from './components/App'
import './elements'
import './styles/main.sass'
import { updateScreenType } from './modules/screen'
import { navigate } from './modules/routes'
import { ensureLoggedOut } from './modules/auth'

window._axios = axios

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ history }>
      <App/>
    </Router>
  </Provider>,
  document.getElementById('root'),
)

window.addEventListener('resize', () => {
  store.dispatch(updateScreenType())
})

window.addEventListener('auth-logout', () => {
  store.dispatch(ensureLoggedOut())
})

window.addEventListener('storage', event => {
  if (isAuthStorageKey(event.key)) {
    if (!hasAuthData()) {
      store.dispatch(ensureLoggedOut())
    }
  }
})

document.body.addEventListener('click', event => {
  if (event.defaultPrevented) {
    return
  }

  if (event.ctrlKey || event.shiftKey || event.metaKey || event.button === 1) {
    // user is trying to open a new tab, don't interfere
    return
  }

  const element = event.composedPath().find(el => el.href)

  if (element && !element.dataset.noHistory && element.origin === window.location.origin) {
    event.preventDefault()
    history.push(element.pathname)
  }
})

history.listen(location => {
  store.dispatch(navigate(location))
})
