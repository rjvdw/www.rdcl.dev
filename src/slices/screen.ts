import { createSlice } from '@reduxjs/toolkit'
import { StoreDispatch, StoreGetState, StoreState } from '../store'
import { close as closeSideMenu } from './side-menu'

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
        dispatch(closeSideMenu())
      }
    }
  }
}

function checkScreenType(): ScreenType {
  return window.innerWidth < MOBILE_THRESHOLD
    ? 'mobile'
    : 'desktop'
}

export const selectScreenType = (state: StoreState) => state.screen.type
