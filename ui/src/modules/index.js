import { combineReducers } from 'redux'
import { auth } from './auth'
import { botw } from './botw'
import { health } from './health'
import { routes } from './routes'
import { screen } from './screen'
import { sidemenu } from './sidemenu'

export const reducer = combineReducers({
  auth,
  botw,
  health,
  routes,
  screen,
  sidemenu,
})
