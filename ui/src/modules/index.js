import { combineReducers } from 'redux'
import { auth } from './auth'
import { health } from './health'
import { routes } from './routes'
import { screen } from './screen'
import { sidemenu } from './sidemenu'

export const reducer = combineReducers({
  auth,
  health,
  routes,
  screen,
  sidemenu,
})
