import { createSlice } from '@reduxjs/toolkit'
import { history } from '../history'

export const { actions, reducer: routes } = createSlice({
  name: 'routes',
  initialState: {
    pathname: history.location.pathname,
    activeRoute: getActiveRoute(history.location),
  },
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

export function navigate(location) {
  return actions.navigate({
    pathname: location.pathname,
    activeRoute: getActiveRoute(location),
  })
}

function getActiveRoute(location) {
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
