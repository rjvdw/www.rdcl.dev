import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { notifications as notificationsReducer } from './slices/notifications'
import { routes as routesReducer } from './slices/routes'
import { screen as screenReducer } from './slices/screen'
import { sideMenu as sideMenuReducer } from './slices/side-menu'

const reducer = combineReducers({
  notifications: notificationsReducer,
  routes: routesReducer,
  screen: screenReducer,
  sideMenu: sideMenuReducer,
})

export const store = configureStore({
  reducer,
})

export type StoreDispatch = typeof store.dispatch
export type StoreGetState = typeof store.getState
export type StoreState = ReturnType<typeof reducer>
