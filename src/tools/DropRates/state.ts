import { Reducer } from 'preact/compat'

export type State = {
  dropRate?: number
  nrAttempts?: number
}

export type Action =
  | { type: 'set-drop-rate'; value?: number }
  | { type: 'set-nr-attempts'; value?: number }
export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'set-drop-rate':
      return { ...state, dropRate: action.value }
    case 'set-nr-attempts':
      return { ...state, nrAttempts: action.value }
    default:
      return state
  }
}
