import { createSlice } from '@reduxjs/toolkit'

export const { actions, reducer: sidemenu } = createSlice({
  name: 'sidemenu',
  initialState: {
    collapsed: window.localStorage.getItem('sidemenu-collapsed') === '1',
    open: false,
  },
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

export const open = actions.open
export const close = actions.close

export function toggle() {
  return (dispatch, getState) => {
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
