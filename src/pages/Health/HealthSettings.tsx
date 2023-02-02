import React, { FunctionComponent, useId } from 'react'
import { useForm } from 'react-hook-form'
import { Details } from '../../components/Details'
import { useNotify } from '../../components/Notifications'
import { errorAsString } from '../../util/errors'
import { useHealthApi } from './api'
import { HealthSettings as HealthSettingsType } from './types'

type HealthSettingsProps = {
  settings?: HealthSettingsType
  refresh(): void
}

export const HealthSettings: FunctionComponent<HealthSettingsProps> = ({
  settings,
  refresh,
}) => {
  const id = useId()
  const api = useHealthApi()
  const { register, handleSubmit } = useForm<HealthSettingsType>()
  const notify = useNotify()

  const onSubmit = handleSubmit(async (settings) => {
    try {
      await api.saveSettings(settings)
      refresh()
    } catch (err) {
      notify(errorAsString(err))
    }
  })

  return (
    <Details summary="Health settings">
      <form onSubmit={onSubmit}>
        <rdcl-input-grid suffix>
          <label htmlFor={`${id}:height`}>Height</label>
          <input
            id={`${id}:height`}
            defaultValue={settings?.height}
            type="number"
            min={0}
            step={1}
            {...register('height', {
              valueAsNumber: true,
            })}
          />
          <label htmlFor={`${id}:height`}>cm</label>

          <button data-start={2}>Save</button>
        </rdcl-input-grid>
      </form>
    </Details>
  )
}
