import { createSlice } from '@reduxjs/toolkit'
import { StoreDispatch, StoreGetState, StoreState } from '../store'

type SideMenuState = {
  collapsed: boolean,
  open: boolean,
}

const INITIAL_STATE: SideMenuState = {
  collapsed: window.localStorage.getItem('side-menu-collapsed') === '1',
  open: false,
}

const { actions, reducer } = createSlice({
  name: 'side-menu',
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

export const sideMenu = reducer
export const { open, close } = actions

export function toggle() {
  return (dispatch: StoreDispatch, getState: StoreGetState) => {
    const state = getState().sideMenu

    if (state.collapsed) {
      window.localStorage.removeItem('side-menu-collapsed')
      dispatch(actions.expand())
    } else {
      window.localStorage.setItem('side-menu-collapsed', '1')
      dispatch(actions.collapse())
    }
  }
}

export const selectIsCollapsed = (state: StoreState) => state.sideMenu.collapsed
export const selectIsOpen = (state: StoreState) => state.sideMenu.open
