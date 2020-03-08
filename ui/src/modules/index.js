import { combineReducers } from 'redux'
import { routes } from './routes'
import { screen } from './screen'
import { sidemenu } from './sidemenu'

export const reducer = combineReducers({
  routes,
  screen,
  sidemenu,
})
