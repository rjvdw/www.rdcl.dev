import { createSlice } from '@reduxjs/toolkit'

export const { actions, reducer: sidemenu } = createSlice({
  name: 'sidemenu',
  initialState: {
    collapsed: window.localStorage.getItem('sidemenu-collapsed') === '1',
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
  },
})

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
