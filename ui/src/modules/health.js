import { createSelector, createSlice } from '@reduxjs/toolkit'
import { axios } from '../axios'
import { differenceInDays, parseISO } from 'date-fns'

const INITIAL_STATE = {
  loading: false,
  saving: false,
  removing: {},
  data: [],
  from: null,
  to: null,
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
    loadComplete(state, { payload: { data, from, to } }) {
      return {
        ...state,
        loading: false,
        data,
        from,
        to,
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
    removing(state, { payload: { date, removing } }) {
      return {
        ...state,
        removing: removing
          ? { ...state.removing, [date]: true }
          : Object.fromEntries(
            Object.entries(state.removing)
              .filter(([key]) => key !== date)
          ),
      }
    },
    removeFailed(state, { payload: { date, error } }) {
      return {
        ...state,
        removing: Object.fromEntries(
          Object.entries(state.removing)
            .filter(([key]) => key !== date)
        ),
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
      const response = await axios.get(`/api/health?${ query.toString() }`)
      dispatch(actions.loadComplete({
        data: response.data.entries,
        from: response.data.from,
        to: response.data.to,
      }))
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

export function save(data) {
  return async dispatch => {
    dispatch(actions.saving(true))

    try {
      await axios.post('/api/health', data)
      dispatch(actions.saving(false))
    } catch (err) {
      console.error(err)
      dispatch(actions.saveFailed(asStateError(err)))
    }
  }
}

export function remove(key) {
  return async dispatch => {
    dispatch(actions.removing({ date: key, removing: true }))

    try {
      await axios.delete(`/api/health/${ key }`)
      dispatch(actions.removing({ date: key, removing: false }))
    } catch (err) {
      console.error(err)
      dispatch(actions.removeFailed({ date: key, error: asStateError(err) }))
    }
  }
}

function asStateError(err) {
  return {
    key: String(Math.floor(Math.random() * 1e5)),
    message: err.message,
  }
}

const dataSelector = state => state.data

export const selectData = createSelector(
  dataSelector,
  data => data
    .map(entry => ({
      ...entry,
      key: entry.date,
      date: parseISO(entry.date),
    }))
    .map((entry, idx, arr) => ({
      ...entry,
      slidingAverage: computeSlidingAverage(arr, idx, 7),
    })),
)

function computeSlidingAverage(data, idx, windowSize) {
  if (idx + 1 < windowSize) return null // insufficient data
  let sum = 0
  let count = 0
  for (let i = idx - windowSize + 1; i <= idx; i += 1) {
    if (differenceInDays(data[idx].date, data[i].date) < windowSize) {
      sum += data[i].weight
      count += 1
    }
  }

  if (count > 0) {
    return sum / count
  } else {
    return null
  }
}

export const selectWeightGraphData = createSelector(
  selectData,
  () => 'weight',
  (data, field) => {
    const window = 7
    let lastEntries = []
    return data.reduce((aggregates, entry, idx) => {
      const min = aggregates.min === null ? entry[field] : Math.min(aggregates.min, entry[field])
      const max = aggregates.max === null ? entry[field] : Math.max(aggregates.max, entry[field])

      lastEntries = [entry].concat(lastEntries)
        .filter(e => differenceInDays(entry.date, e.date) < window)

      const avg = (lastEntries.length > 0 && idx < (window - 1))
        ? undefined
        : lastEntries.reduce((avg, e) => avg + e[field], 0) / lastEntries.length

      return {
        min, max,
        dataPoints: aggregates.dataPoints.concat([{ x: entry.date, y: entry[field] }]),
        runningAverage: aggregates.runningAverage.concat([{ x: entry.date, y: avg }]),
      }
    }, { min: null, max: null, dataPoints: [], runningAverage: [] })
  },
)
