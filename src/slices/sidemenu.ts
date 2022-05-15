import { createSlice } from '@reduxjs/toolkit'
import { StoreDispatch, StoreGetState, StoreState } from '../store'

type SidemenuState = {
  collapsed: boolean,
  open: boolean,
}

const INITIAL_STATE: SidemenuState = {
  collapsed: window.localStorage.getItem('sidemenu-collapsed') === '1',
  open: false,
}

const { actions, reducer } = createSlice({
  name: 'sidemenu',
  initialState: INITIAL_STATE,
  reducers: {
    collapse(state) {
      return {
        ...state,
        collapsed: true,
      }
    },

    expand(state) {
      return {
        ...state,
        collapsed: false,
      }
    },

    open(state) {
      return {
        ...state,
        open: true,
      }
    },

    close(state) {
      return {
        ...state,
        open: false,
      }
    },
  },
})

export const sidemenu = reducer
export const { open, close } = actions

export function toggle() {
  return (dispatch: StoreDispatch, getState: StoreGetState) => {
    const state = getState().sidemenu

    if (state.collapsed) {
      window.localStorage.removeItem('sidemenu-collapsed')
      dispatch(actions.expand())
    } else {
      window.localStorage.setItem('sidemenu-collapsed', '1')
      dispatch(actions.collapse())
    }
  }
}

export const selectIsCollapsed = (state: StoreState) => state.sidemenu.collapsed
export const selectIsOpen = (state: StoreState) => state.sidemenu.open
