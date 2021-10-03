import { createSelector, createSlice } from '@reduxjs/toolkit'
import { axios } from '../axios'
import { parseISO } from 'date-fns'
import { StoreDispatch } from '../store'

export type HealthData = {
  [key: string]: any,
}

export type HealthState = {
  loading: boolean,
  saving: boolean,
  removing: { [date: string]: true },
  data: HealthData[],
  from: string | null,
  to: string | null,
  errors: StateError[],
}

export type Aggregates = {
  min: number | null,
  max: number | null,
  dataPoints: Array<{ x: Date, y: number }>,
  runningAverage: Array<{ x: Date, y: number }>,
}

export type StateError = {
  key: string,
  message: string,
}

const INITIAL_STATE: HealthState = {
  loading: false,
  saving: false,
  removing: {},
  data: [],
  from: null,
  to: null,
  errors: [],
}

const INITIAL_AGGREGATES: Aggregates = {
  min: null,
  max: null,
  dataPoints: [],
  runningAverage: [],
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

interface GetHealthResponse {
  entries: object[],
  from: string
  to: string
}

export function load(from?: string, to?: string) {
  return async (dispatch: StoreDispatch) => {
    dispatch(actions.loading())

    try {
      const query = new URLSearchParams()
      if (from) query.append('from', from)
      if (to) query.append('to', to)
      const response = await axios.get<GetHealthResponse>(`/api/health?${ query.toString() }`)
      dispatch(actions.loadComplete({
        data: response.data.entries.reverse(),
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
  return async (dispatch: StoreDispatch) => {
    dispatch(actions.clear())
  }
}

export function save(data: HealthData) {
  return async (dispatch: StoreDispatch) => {
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

export function remove(key: string) {
  return async (dispatch: StoreDispatch) => {
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

function asStateError(err: Error | unknown): StateError {
  return {
    key: String(Math.floor(Math.random() * 1e5)),
    message: (err instanceof Error) ? err.message : 'Unknown error',
  }
}

const dataSelector = (state: HealthState) => state.data

export const selectData = createSelector(
  dataSelector,
  data => data
    .map(entry => ({
      key: entry.date,
      date: parseISO(entry.date),
      data: entry,
    })),
)

export const selectWeightGraphData = createSelector(
  selectData,
  () => 'weight',
  () => 'averageWeight',
  (data, field, averageField) => {
    return data.reduce((aggregates, entry) => {
      const min = aggregates.min === null ? entry.data[field] : Math.min(aggregates.min, entry.data[field])
      const max = aggregates.max === null ? entry.data[field] : Math.max(aggregates.max, entry.data[field])

      return {
        min, max,
        dataPoints: aggregates.dataPoints.concat([{ x: entry.date, y: entry.data[field] }]),
        runningAverage: aggregates.runningAverage.concat([{ x: entry.date, y: entry.data[averageField] }]),
      }
    }, INITIAL_AGGREGATES)
  },
)
