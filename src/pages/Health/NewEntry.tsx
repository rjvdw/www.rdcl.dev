import React, { FunctionComponent, useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { save } from './api'
import { HealthRecord } from './types'

type NewEntryProps = {
  onSave(): void | Promise<void>
}

export const NewEntry: FunctionComponent<NewEntryProps> = ({ onSave }) => {
  const id = useId()
  const { register, handleSubmit, reset } = useForm<HealthRecord>()
  const [saving, setSaving] = useState<boolean>(false)

  const submitHandler = handleSubmit(async (record) => {
    setSaving(true)
    try {
      await save(record.date, record.data)
      reset()
      await onSave()
    } finally {
      setSaving(false)
    }
  })

  return (
    <form onSubmit={submitHandler}>
      <rdcl-input-grid suffix>
        <label data-start={1} htmlFor={`${id}:date`}>
          Date
        </label>
        <input
          type="date"
          id={`${id}:date`}
          defaultValue={today()}
          {...register('date')}
        />

        <label data-start={1} htmlFor={`${id}:data.weight`}>
          Weight
        </label>
        <input
          type="number"
          id={`${id}:data.weight`}
          step={0.1}
          {...register('data.weight', {
            valueAsNumber: true,
          })}
        />
        <label htmlFor={`${id}:data.weight`}>kg</label>

        <label data-start={1} htmlFor={`${id}:data.bodyFat`}>
          Body Fat
        </label>
        <input
          type="number"
          id={`${id}:data.bodyFat`}
          step={0.1}
          {...register('data.bodyFat', {
            valueAsNumber: true,
          })}
        />
        <label htmlFor={`${id}:data.bodyFat`}>%</label>

        <button data-start={2} disabled={saving}>
          Save
        </button>
      </rdcl-input-grid>
    </form>
  )
}

function today(): string {
  return new Date().toISOString().replace(/T.*/, '')
}
