import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './modules'

export const store = configureStore({
  reducer,
})

export type StoreDispatch = typeof store.dispatch
export type StoreGetState = typeof store.getState
export type StoreState = ReturnType<typeof reducer>
