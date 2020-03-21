import { createSlice } from '@reduxjs/toolkit'
import { axios } from '../axios'
import { formatISO, parseISO } from 'date-fns'

const INITIAL_STATE = {
  loading: false,
  saving: false,
  data: [],
  errors: [],
}

const { actions, reducer } = createSlice({
  name: 'health',
  initialState: INITIAL_STATE,
  reducers: {
    clear() {
      return INITIAL_STATE
    },
    loading(state) {
      return { ...state, loading: true }
    },
    loadComplete(state, { payload: data }) {
      return {
        ...state,
        loading: false,
        data,
      }
    },
    loadFailed(state, { payload: error }) {
      return {
        ...state,
        loading: false,
        errors: [...state.errors, error],
      }
    },
    saving(state, { payload: saving }) {
      return { ...state, saving }
    },
    saveFailed(state, { payload: error }) {
      return {
        ...state,
        saving: false,
        errors: [...state.errors, error],
      }
    },
    clearErrors(state) {
      return { ...state, errors: [] }
    },
  },
})

export const health = reducer

export const { clearErrors } = actions

export function load(from, to) {
  return async dispatch => {
    dispatch(actions.loading())

    try {
      const query = new URLSearchParams()
      if (from) query.append('from', from)
      if (to) query.append('to', to)
      const response = await axios.get(`/health?${ query.toString() }`)
      dispatch(actions.loadComplete(response.data.entries))
    } catch (err) {
      console.error(err)
      dispatch(actions.loadFailed(asStateError(err)))
    }
  }
}

export function unload() {
  return async dispatch => {
    dispatch(actions.clear())
  }
}

export function save({ date, time, ...data }) {
  return async dispatch => {
    dispatch(actions.saving(true))

    try {
      await axios.post('/health', {
        timestamp: formatISO(combineDateAndTime(date, time)),
        ...data,
      })
      dispatch(actions.saving(false))
    } catch (err) {
      console.error(err)
      dispatch(actions.saveFailed(asStateError(err)))
    }
  }
}

/**
 * @param {string} dateStr
 * @param {string} timeStr
 * @returns {Date}
 */
function combineDateAndTime(dateStr, timeStr) {
  const d = parseISO(dateStr)

  const [hours, minutes, seconds] = timeStr.split(':')
  d.setHours(+hours)
  d.setMinutes(+minutes)
  if (seconds) {
    d.setSeconds(...seconds.split('.').map(Number))
  } else {
    d.setSeconds(0)
  }
  return d
}

function asStateError(err) {
  return {
    key: String(Math.floor(Math.random() * 1e5)),
    message: err.message,
  }
}
