import { createSlice } from '@reduxjs/toolkit'
import { close as closeSidemenu } from './sidemenu'
import { StoreDispatch, StoreGetState } from '../store'

export type ScreenType = 'mobile' | 'desktop'

const MOBILE_THRESHOLD = 640

type ScreenState = {
  type: ScreenType,
}

const INITIAL_STATE: ScreenState = {
  type: checkScreenType(),
}

const { actions, reducer } = createSlice({
  name: 'screen',
  initialState: INITIAL_STATE,
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
  return (dispatch: StoreDispatch, getState: StoreGetState) => {
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

function checkScreenType(): ScreenType {
  return window.innerWidth < MOBILE_THRESHOLD
    ? 'mobile'
    : 'desktop'
}
