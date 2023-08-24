import { useEffect, useState } from 'preact/hooks'
import { errorAsString } from '../../util/errors'
import { useApi } from '../../util/http'
import { loadHealthData, loadSettings } from './api'
import { HealthRecord, HealthSettings } from './state'

type UseHealthDataReturn = {
  error?: string
  loading: boolean
  count?: number
  records: HealthRecord[]
  settings: HealthSettings
}

export function useHealthData(
  triggerReloadHealthData: number,
  triggerReloadSettings: number,
  from?: Date,
  to?: Date,
): UseHealthDataReturn {
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)
  const [count, setCount] = useState<number>()
  const [records, setRecords] = useState<HealthRecord[]>([])
  const [settings, setSettings] = useState<HealthSettings>({})
  const api = useApi(true)

  useEffect(() => {
    setLoading(true)
    loadHealthData(api, from, to)
      .then(
        (response) => {
          setCount(response.count)
          setRecords(response.records)
        },
        (err) => {
          setError(errorAsString(err))
        },
      )
      .finally(() => {
        setLoading(false)
      })
  }, [from, to, triggerReloadHealthData])

  useEffect(() => {
    loadSettings(api).then(
      (response) => {
        setSettings(response)
      },
      (err) => {
        setError(errorAsString(err))
      },
    )
  }, [triggerReloadSettings])

  return {
    error,
    loading,
    count,
    records,
    settings,
  }
}
