import { createSlice } from '@reduxjs/toolkit'
import { close as closeSidemenu } from './sidemenu'

const MOBILE_THRESHOLD = 640

const { actions, reducer } = createSlice({
  name: 'screen',
  initialState: {
    type: checkScreenType(),
  },
  reducers: {
    updateScreenType(state, { payload: type }) {
      return {
        ...state,
        type,
      }
    },
  },
})

export const screen = reducer

export function updateScreenType() {
  return (dispatch, getState) => {
    const state = getState().screen
    const type = checkScreenType()

    if (type !== state.type) {
      dispatch(actions.updateScreenType(type))

      if (type !== 'mobile') {
        dispatch(closeSidemenu())
      }
    }
  }
}

function checkScreenType() {
  if (window.innerWidth < MOBILE_THRESHOLD) {
    return 'mobile'
  }

  return 'desktop'
}
