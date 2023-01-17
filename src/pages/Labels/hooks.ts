import { useMemo, useReducer, useState } from 'react'
import { useDispatch } from 'react-redux'
import { LabelConfig, saveLabels } from '../../slices/labels'
import { StoreDispatch } from '../../store'

type LabelState = Array<[string, { label: string; config: LabelConfig }]>

type ResetAction = {
  type: 'reset'
}

type DeleteEntryAction = {
  type: 'delete'
  payload: string
}

type AddEntryAction = {
  type: 'add'
}

type UpdateEntryLabelAction = {
  type: 'update-label'
  payload: {
    key: string
    label: string
  }
}

type UpdateEntryFieldAction = {
  type: 'update-field'
  payload: {
    key: string
    field: keyof LabelConfig
    value: string
  }
}

type ActionType =
  | ResetAction
  | DeleteEntryAction
  | AddEntryAction
  | UpdateEntryLabelAction
  | UpdateEntryFieldAction

let GLOBAL_INDEX = 0

export const useLabelState = (initialLabels: Record<string, LabelConfig>) => {
  const [error, setError] = useState<string>()
  const reduxDispatch = useDispatch<StoreDispatch>()

  const initialState: LabelState = useMemo(() => {
    const entries = Object.entries(initialLabels).map(
      ([label, config]): [string, { label: string; config: LabelConfig }] => [
        String(++GLOBAL_INDEX),
        {
          label,
          config,
        },
      ]
    )

    entries.sort((a, b) => a[1].label.localeCompare(b[1].label))

    return entries
  }, [initialLabels])

  const reducer = (state: LabelState, action: ActionType): LabelState => {
    switch (action.type) {
      case 'reset':
        return initialState
      case 'delete':
        return state.filter(([key]) => key !== action.payload)
      case 'add':
        return state.concat([
          [String(++GLOBAL_INDEX), { label: '', config: {} }],
        ])
      case 'update-label':
        return state.map(([key, value]) => {
          if (key === action.payload.key) {
            return [key, { label: action.payload.label, config: value.config }]
          } else {
            return [key, value]
          }
        })
      case 'update-field':
        return state.map(([key, value]) => {
          if (key === action.payload.key) {
            return [
              key,
              {
                label: value.label,
                config: {
                  ...value.config,
                  [action.payload.field]: action.payload.value,
                },
              },
            ]
          } else {
            return [key, value]
          }
        })
    }

    return state
  }

  const [labels, dispatch] = useReducer(reducer, initialState)

  const labelsMap = useMemo(
    (): Record<string, LabelConfig> =>
      Object.fromEntries(
        labels.map(([, { label, config }]) => [
          label,
          {
            // ensure all keys are present, even if not defined
            color: undefined,
            textColor: undefined,
            ...config,
          },
        ])
      ),
    [labels]
  )

  return {
    labels,
    labelsMap,
    error,
    deleteLabel(key: string) {
      dispatch({ type: 'delete', payload: key })
    },
    addLabel() {
      dispatch({ type: 'add' })
    },
    updateLabel(key: string, label: string) {
      dispatch({ type: 'update-label', payload: { key, label } })
    },
    updateField(key: string, field: keyof LabelConfig, value: string) {
      dispatch({ type: 'update-field', payload: { key, field, value } })
    },
    async save() {
      try {
        await reduxDispatch(saveLabels(labelsMap))
        dispatch({ type: 'reset' })
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError(String(err))
        }
      }
    },
    reset() {
      dispatch({ type: 'reset' })
    },
  }
}
