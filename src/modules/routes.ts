import { createSlice } from '@reduxjs/toolkit'
import { history } from '../history'
import { StoreState } from '../store'

type RoutesState = {
  pathname: string,
  activeRoute: string,
}

const INITIAL_STATE: RoutesState = {
  pathname: history.location.pathname,
  activeRoute: getActiveRoute(history.location),
}

const { actions, reducer } = createSlice({
  name: 'routes',
  initialState: INITIAL_STATE,
  reducers: {
    navigate(state, { payload: { pathname, activeRoute } }) {
      return {
        ...state,
        pathname,
        activeRoute,
      }
    },
  },
})

export const routes = reducer

export function navigate(location: { pathname: string }) {
  return actions.navigate({
    pathname: location.pathname,
    activeRoute: getActiveRoute(location),
  })
}

export const selectActiveRoute = (state: StoreState) => state.routes.activeRoute

function getActiveRoute(location: { pathname: string }) {
  if (location.pathname.startsWith('/tools')) {
    return 'tools'
  }

  if (location.pathname.startsWith('/health')) {
    return 'health'
  }

  if (location.pathname === '/') {
    return 'home'
  }

  return ''
}
