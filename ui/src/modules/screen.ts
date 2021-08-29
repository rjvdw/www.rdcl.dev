import { createSlice } from '@reduxjs/toolkit'
import { close as closeSidemenu } from './sidemenu'
import { StoreDispatch, StoreGetState } from '../store'

const MOBILE_THRESHOLD = 640

type ScreenState = {
  type: string,
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

function checkScreenType(): string {
  if (window.innerWidth < MOBILE_THRESHOLD) {
    return 'mobile'
  }

  return 'desktop'
}
