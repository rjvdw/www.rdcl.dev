import { combineReducers } from 'redux'
import { screen } from './screen'
import { sidemenu } from './sidemenu'

export const reducer = combineReducers({
  screen,
  sidemenu,
})
