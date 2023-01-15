import React, { FunctionComponent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActiveRoute } from '../../components/ActiveRoute'
import { Label } from '../../components/Label'
import { RequireLogin } from '../../components/RequireLogin'
import { Title } from '../../components/Title'
import { initializeLabels, LabelConfig, selectLabelsState } from '../../slices/labels'
import { StoreDispatch } from '../../store'
import { useLabelState } from './hooks'

export const Labels = () => {
  const dispatch = useDispatch<StoreDispatch>()

  useEffect(() => {
    dispatch(initializeLabels())
  }, [dispatch])

  return (
    <>
      <RequireLogin/>
      <Title>labels</Title>
      <ActiveRoute>labels</ActiveRoute>

      <h1>Labels</h1>

      <Overview/>
    </>
  )
}

const Overview = () => {
  const state = useSelector(selectLabelsState)

  if (state.state === 'initial' || state.state === 'loading') {
    return <p>Loading...</p>
  }

  if (state.state === 'error') {
    return <p className="error-message">{ state.message }</p>
  }

  return <Editor labels={ state.labels }/>
}

const Editor: FunctionComponent<{ labels: Record<string, LabelConfig> }> = (
  { labels: defaultLabels },
) => {
  const {
    labels,
    labelsMap,
    error,
    addLabel,
    deleteLabel,
    updateLabel,
    updateField,
    save,
    reset,
  } = useLabelState(defaultLabels)

  return <>
    { labels.length === 0 ? (
      <p>No labels configured</p>
    ) : (
      <table className="labels__overview">
        <thead>
          <tr>
            <th>Label</th>
            <th>Color</th>
            <th>Text</th>
            <th>Preview</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          { labels.map(([key, { label, config }]) => (
            <tr key={ key }>
              <td>
                <input
                  type="text"
                  value={ label }
                  required
                  onChange={ event => updateLabel(key, event.target.value) }
                />
              </td>
              <td>
                <div className="labels__color-input">
                  <input
                    type="text"
                    value={ config.color ?? '' }
                    onChange={ event => updateField(key, 'color', event.target.value) }
                  />
                  <ColorPreview color={ config.color }/>
                </div>
              </td>
              <td>
                <div className="labels__color-input">
                  <input
                    type="text"
                    value={ config.textColor ?? '' }
                    onChange={ event => updateField(key, 'textColor', event.target.value) }
                  />
                  <ColorPreview color={ config.textColor }/>
                </div>
              </td>
              <td>
                <Label labels={ labelsMap }>{ label }</Label>
              </td>
              <td>
                <button onClick={ () => deleteLabel(key) }>Delete</button>
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    ) }

    <div className="labels__controls">
      <button onClick={ addLabel }>Add</button>
      <button onClick={ save }>Save</button>
      <button onClick={ reset }>Reset</button>
    </div>

    { error && <p className="error-message">{ error }</p> }
  </>
}

const ColorPreview: FunctionComponent<{ color?: string }> = ({ color }) => (
  <span className="labels__color-preview" style={ { backgroundColor: color } }>&nbsp;</span>
)
