import { createSlice } from '@reduxjs/toolkit'

export const { actions, reducer: routes } = createSlice({
  name: 'routes',
  initialState: {
    pathname: location.pathname,
    activeRoute: getActiveRoute(location),
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

  return 'home'
}
