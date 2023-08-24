import { useEffect, useState } from 'preact/hooks'
import { convert, useFormHandler, UseFormHandlerReturn } from '../../util/form'
import { useApi } from '../../util/http'
import { deleteHealthData, saveHealthData, updateSettings } from './api'
import { HealthRecord } from './state'

type UseFormHandlersReturn = {
  triggerReloadHealthData: number
  triggerReloadSettings: number
  from?: Date
  to?: Date
  saveNewEntry: UseFormHandlerReturn
  saveSettings: UseFormHandlerReturn
  performSearch: UseFormHandlerReturn
  deleteRecord(this: void, record: HealthRecord): (event: Event) => void
}

export function useFormHandlers(): UseFormHandlersReturn {
  const [triggerReloadHealthData, setTriggerReloadHealthData] = useState(0)
  const [triggerReloadSettings, setTriggerReloadSettings] = useState(0)
  const initialValues = getInitialValues()
  const [from, setFrom] = useState<Date | undefined>(initialValues.from)
  const [to, setTo] = useState<Date | undefined>(initialValues.to)
  const api = useApi(true)

  useEffect(() => {
    history.replaceState({ ...history.state, from, to }, '')
  }, [from, to])

  const saveNewEntry = useFormHandler(async (event) => {
    const data = new FormData(event.target)
    const date = convert.date(data.get('date'))
    const weight = convert.number(data.get('weight'))
    const bodyFat = convert.number(data.get('body-fat'))

    if (!date) {
      throw new Error('missing required field: date')
    }

    await saveHealthData(api, date, {
      weight,
      bodyFat,
    })

    setTriggerReloadHealthData((i) => i + 1)

    event.target.reset()
  }, [])

  const saveSettings = useFormHandler(async (event) => {
    const data = new FormData(event.target)
    const height = convert.number(data.get('height'))

    await updateSettings(api, {
      height,
    })

    setTriggerReloadSettings((i) => i + 1)

    event.target.reset()
  }, [])

  const performSearch = useFormHandler((event) => {
    const data = new FormData(event.target)
    const from = convert.date(data.get('from'))
    const to = convert.date(data.get('to'))

    setFrom(from)
    setTo(to)
    setTriggerReloadHealthData((i) => i + 1)

    event.target.reset()
  }, [])

  return {
    triggerReloadHealthData,
    triggerReloadSettings,
    from,
    to,
    saveNewEntry,
    saveSettings,
    performSearch,
    deleteRecord(record) {
      return (event) => {
        event.preventDefault()
        deleteHealthData(api, record.date).then(
          () => {
            setTriggerReloadHealthData((i) => i + 1)
          },
          (err) => {
            console.error(err)
          },
        )
      }
    },
  }
}

type GetInitialValuesReturn = {
  from?: Date
  to?: Date
}

function getInitialValues(): GetInitialValuesReturn {
  const state = history.state as unknown
  const initialValues: GetInitialValuesReturn = {}

  if (state && typeof state === 'object') {
    if ('from' in state && state.from instanceof Date) {
      initialValues.from = state.from
    }

    if ('to' in state && state.to instanceof Date) {
      initialValues.to = state.to
    }
  }

  return initialValues
}
