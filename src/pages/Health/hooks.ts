import { useCallback, useMemo } from 'react'
import { useNotify } from '../../components/Notifications'
import { useAsyncLoad } from '../../util/useAsyncLoad'
import { list, remove } from './api'
import { HealthRecord } from './types'

export const useHealthRecords = (from?: string, to?: string) => {
  const action = useCallback(() => list(from, to), [from, to])
  const { data, loading, error, refresh } = useAsyncLoad(action)

  const sortedData = useMemo(() => {
    const records = data || []
    // sort from newest to oldest
    records.sort((a, b) => -a.date.localeCompare(b.date))
    return records
  }, [data])

  return {
    records: sortedData,
    loading,
    error,
    refresh,
  }
}

export const useDeleteRecord = (refresh: () => void) => {
  const notify = useNotify()

  return async (record: HealthRecord) => {
    try {
      await remove(record.date)
      await refresh()
    } catch (err) {
      notify.error(`Deleting record for ${record.date} failed: ${err}`)
    }
  }
}
