import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { StoreState, StoreThunk } from '../store'
import { errorAsString } from '../util/errors'
import { api, UnauthorizedError } from '../util/http'
import { unauthorized } from './auth'

export type LabelConfig = {
  'background-color'?: string
  color?: string
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
    setLoaded(
      _state,
      { payload: labels }: PayloadAction<Record<string, LabelConfig>>
    ) {
      return { state: 'loaded', labels }
    },
    setError(_state, { payload: message }: PayloadAction<string>) {
      return { state: 'error', message }
    },
  },
})

export const labels = reducer

type LabelsResponse = {
  labels: Record<string, string>
}

export const initializeLabels =
  (): StoreThunk => async (dispatch, getState) => {
    const { state } = getState().labels

    if (state === 'initial') {
      await dispatch(loadLabels())
    }
  }

export const loadLabels = (): StoreThunk => async (dispatch) => {
  dispatch(actions.setLoading())

  try {
    const response = await api.get('/label')
    const { labels: labelsResponse } = (await response.json()) as LabelsResponse
    const labels = Object.fromEntries(
      Object.entries(labelsResponse).map(([key, value]) => [
        key,
        JSON.parse(value),
      ])
    )

    dispatch(actions.setLoaded(labels))
  } catch (err) {
    if (err instanceof UnauthorizedError) {
      dispatch(unauthorized())
    }

    dispatch(actions.setError(errorAsString(err)))
  }
}

export const saveLabels =
  (labels: Record<string, LabelConfig>): StoreThunk =>
  async (dispatch) => {
    try {
      await api.post('/label', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          Object.fromEntries(
            Object.entries(labels).map(([key, value]) => [
              key,
              JSON.stringify(value),
            ])
          )
        ),
      })

      await dispatch(loadLabels())
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        dispatch(unauthorized())
      }
      dispatch(actions.setError(errorAsString(err)))
    }
  }

export const selectLabelsState = (state: StoreState) => state.labels

export const selectLabels = createSelector(
  selectLabelsState,
  (labels): Record<string, LabelConfig> =>
    labels.state === 'loaded' ? labels.labels : {}
)
