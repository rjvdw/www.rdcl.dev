import { createSlice } from '@reduxjs/toolkit'
import { StoreState } from '../store'

type RoutesState = {
  activeRoute: string
}

const INITIAL_STATE: RoutesState = {
  activeRoute: '',
}

const { actions, reducer } = createSlice({
  name: 'routes',
  initialState: INITIAL_STATE,
  reducers: {
    setActiveRoute(state, { payload: activeRoute }) {
      return {
        ...state,
        activeRoute,
      }
    },
  },
})

export const routes = reducer
export const { setActiveRoute } = actions
export const selectActiveRoute = (state: StoreState) => state.routes.activeRoute
