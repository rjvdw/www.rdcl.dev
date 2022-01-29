import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { history } from './history'
import { App } from './components/App'
import './elements'
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
}, {
  passive: true,
})

document.body.addEventListener('click', event => {
  if (event.defaultPrevented) {
    return
  }

  if (event.ctrlKey || event.shiftKey || event.metaKey || event.button === 1) {
    // user is trying to open a new tab, don't interfere
    return
  }

  const element = event.composedPath().find(el => (el as HTMLAnchorElement).href) as HTMLAnchorElement

  if (element && !element.dataset.noHistory && element.origin === window.location.origin) {
    event.preventDefault()
    history.push(element.pathname)
  }
})

history.listen(({ location }) => {
  store.dispatch(navigate(location))
})
