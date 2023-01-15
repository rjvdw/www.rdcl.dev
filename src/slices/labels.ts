import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StoreState, StoreThunk } from '../store'

export type LabelConfig = {
  color?: string
  textColor?: string
}

type LabelsInitialState = {
  state: 'initial'
}

type LabelsLoadingState = {
  state: 'loading'
}

type LabelsLoadedState = {
  state: 'loaded'
  labels: Record<string, LabelConfig>
}

type LabelsErrorState = {
  state: 'error'
  message: string
}

export type LabelsState =
  | LabelsInitialState
  | LabelsLoadingState
  | LabelsLoadedState
  | LabelsErrorState

const INITIAL_STATE: LabelsState = {
  state: 'initial',
}

const { reducer, actions } = createSlice({
  name: 'labels',
  initialState: INITIAL_STATE as LabelsState,
  reducers: {
    setLoading() {
      return { state: 'loading' }
    },
    setLoaded(_state, { payload: labels }: PayloadAction<Record<string, LabelConfig>>) {
      return { state: 'loaded', labels }
    },
    setError(_state, { payload: message }: PayloadAction<string>) {
      return { state: 'error', message }
    },
  },
})

export const labels = reducer

const ENDPOINT = `${ process.env.REACT_APP_API_URL }/label`

type LabelsResponse = {
  labels: Record<string, LabelConfig>
}

export const initializeLabels = (): StoreThunk =>
  async (dispatch, getState) => {
    const { state } = getState().labels

    if (state === 'initial') {
      await dispatch(loadLabels())
    }
  }

export const loadLabels = (): StoreThunk =>
  async (dispatch) => {
    dispatch(actions.setLoading())

    try {
      const response = await fetch(ENDPOINT, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${ localStorage.jwt }`,
        },
      })

      if (!response.ok) {
        dispatch(actions.setError(`Labels could not be loaded: ${ response.status } ${ response.statusText }`))
        return
      }

      const { labels } = (await response.json()) as LabelsResponse

      dispatch(actions.setLoaded(labels))
    } catch (err) {
      let message: string
      if (err instanceof Error) {
        message = err.message
      } else {
        message = String(err)
      }
      dispatch(actions.setError(message))
    }
  }

export const saveLabels = (labels: Record<string, LabelConfig>): StoreThunk =>
  async (dispatch) => {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ localStorage.jwt }`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(labels, (key, value) => {
        // ensure undefined values do end up in the request
        return value === undefined ? null : value
      }),
    })

    if (!response.ok) {
      throw new Error(`Saving labels failed: ${ response.status } ${ response.statusText }`)
    }

    await dispatch(loadLabels())
  }

export const selectLabelsState = (state: StoreState) => state.labels

export const selectLabels = createSelector(
  selectLabelsState,
  (labels): Record<string, LabelConfig> =>
    labels.state === 'loaded'
      ? labels.labels
      : {},
)
