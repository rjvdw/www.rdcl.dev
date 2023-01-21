import { format, formatISO, parseISO } from 'date-fns'
import React, { FunctionComponent, useEffect, useId, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNotify } from '../../components/Notifications'
import { TagInput } from '../../components/TagInput'
import { selectLabels } from '../../slices/labels'
import { Activity } from './types'

type ActivityFormProps = {
  activity?: Activity
  onSubmit: (activity: Activity) => void | Promise<void>
}

export const ActivityForm: FunctionComponent<ActivityFormProps> = ({
  onSubmit,
  activity,
}) => {
  const id = useId()
  const { register, handleSubmit, watch, setValue } = useForm<Activity>()
  const [endIsKnown, setEndIsKnown] = useState<boolean>(
    !activity || Boolean(activity.ends)
  )
  const [error, setError] = useState<string>()
  const notify = useNotify()
  const labels = useSelector(selectLabels)

  useEffect(() => {
    if (!endIsKnown) {
      setValue('ends', '')
    }
  }, [endIsKnown, setValue])

  const toggleEndIsKnown = () => setEndIsKnown((v) => !v)
  const allDay = watch('allDay', activity?.allDay ?? false)
  const starts = watch('starts', activity?.starts)

  const submitHandler = handleSubmit(async (activity: Activity) => {
    try {
      await onSubmit(activity)
      notify(`Activity "${activity.title}" was successfully saved`)
    } catch (err) {
      console.error(err)
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError(`${err}`)
      }
    }
  })

  return (
    <form onSubmit={submitHandler}>
      <input
        type="hidden"
        value={activity?.timezone ?? 'Europe/Amsterdam'}
        {...register('timezone')}
      />

      <rdcl-input-grid>
        <label htmlFor={`${id}:title`} className="required">
          Title
        </label>
        <input
          id={`${id}:title`}
          type="text"
          defaultValue={activity?.title}
          required
          {...register('title', {
            required: true,
          })}
        />

        <label htmlFor={`${id}:labels`}>Labels</label>
        <TagInput
          id={`${id}:labels`}
          type="text"
          tags={activity?.labels ?? []}
          suggested={Object.keys(labels)}
          {...register('labels', {
            setValueAs: (value: string): string[] =>
              value.split(/\s*,\s*/g).filter(Boolean),
          })}
        />

        <label htmlFor={`${id}:description`}>Description</label>
        <textarea
          id={`${id}:description`}
          rows={5}
          defaultValue={activity?.description}
          {...register('description')}
        />

        <label htmlFor={`${id}:notes`}>Notes</label>
        <textarea
          id={`${id}:notes`}
          rows={5}
          defaultValue={activity?.notes}
          {...register('notes')}
        />

        <label htmlFor={`${id}:url`}>URL</label>
        <input
          id={`${id}:url`}
          type="url"
          defaultValue={activity?.url}
          {...register('url')}
        />

        <label htmlFor={`${id}:location`} className="required">
          Location
        </label>
        <input
          id={`${id}:location`}
          type="text"
          defaultValue={activity?.location}
          required
          {...register('location', {
            required: true,
          })}
        />

        <label htmlFor={`${id}:starts`} className="required">
          Starts
        </label>
        <input
          id={`${id}:starts`}
          type={allDay ? 'date' : 'datetime-local'}
          defaultValue={getDefaultValueForIsoDate(activity, 'starts')}
          required
          {...register('starts', {
            required: true,
            setValueAs: setValueAsIsoDate,
          })}
        />

        {endIsKnown && (
          <>
            <label htmlFor={`${id}:ends`}>Ends</label>
            <input
              id={`${id}:ends`}
              type={allDay ? 'date' : 'datetime-local'}
              defaultValue={getDefaultValueForIsoDate(activity, 'ends')}
              min={formatDateForInput(starts, allDay)}
              {...register('ends', {
                setValueAs: setValueAsIsoDate,
              })}
            />
          </>
        )}

        <div data-start={2} className="activities__date-controls">
          <label>
            <input
              type="checkbox"
              defaultChecked={activity?.allDay}
              {...register('allDay')}
            />
            All day event?
          </label>

          <label>
            <input
              type="checkbox"
              checked={endIsKnown}
              onChange={() => toggleEndIsKnown()}
            />
            Has end date?
          </label>
        </div>

        <button data-start={2}>Save</button>

        {error && (
          <p data-start={2} className="error-message">
            Event could not be saved: <em>{error}</em>
          </p>
        )}
      </rdcl-input-grid>
    </form>
  )
}

function getDefaultValueForIsoDate(
  activity: Activity | undefined,
  key: 'starts' | 'ends'
): string | undefined {
  if (!activity) {
    return undefined
  }

  return formatDateForInput(activity[key], activity.allDay)
}

function formatDateForInput(
  value: string | undefined,
  allDay: boolean
): string | undefined {
  if (!value) {
    return undefined
  }

  try {
    const date = parseISO(value)
    return format(date, allDay ? 'yyyy-MM-dd' : "yyyy-MM-dd'T'HH:mm:ss")
  } catch (err) {
    console.error('error parsing date "%s": %s', value, err)
    return value
  }
}

function setValueAsIsoDate(
  value: string | null | undefined
): string | null | undefined {
  if (!value) {
    return value
  }

  try {
    const date = parseISO(value)
    return formatISO(date)
  } catch (err) {
    console.error('error parsing date "%s": %s', value, err)
    return ''
  }
}
