import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNotify } from '../../components/Notifications'
import { errorAsString } from '../../util/errors'
import { useAsyncLoad } from '../../util/useAsyncLoad'
import { useHealthApi } from './api'
import { HealthRecord } from './types'

export const useHealthSettings = () => {
  const api = useHealthApi()
  const action = useCallback(() => api.getSettings(), [api])
  const { data, loading, error, refresh } = useAsyncLoad(action)

  return { settings: data, loading, error, refresh }
}

export const useHealthRecords = (from?: string, to?: string) => {
  const api = useHealthApi()
  const action = useCallback(() => api.list(from, to), [api, from, to])
  const {
    data,
    loading: loadingInitial,
    error: errorInitialLoad,
    refresh,
  } = useAsyncLoad(action)

  const { loadingMore, errorLoadingMore, loadMore, moreRecords } = useLoadMore(
    data?.records,
    from
  )

  const loading = useMemo(
    () => loadingInitial || loadingMore,
    [loadingInitial, loadingMore]
  )
  const error = useMemo(
    () => errorInitialLoad || errorLoadingMore,
    [errorInitialLoad, errorLoadingMore]
  )

  const sortedData = useMemo(() => {
    const records = moreRecords || []
    // sort from newest to oldest
    records.sort((a, b) => -a.date.localeCompare(b.date))
    return records
  }, [moreRecords])

  return {
    records: sortedData,
    count: data?.count,
    loading,
    error,
    refresh,
    loadMore,
  }
}

const useLoadMore = (records?: HealthRecord[], from?: string) => {
  const api = useHealthApi()
  const [loadingMore, setLoadingMore] = useState<boolean>(false)
  const [errorLoadingMore, setErrorLoadingMore] = useState<string>()
  const [moreRecords, setMoreRecords] = useState<HealthRecord[]>(records ?? [])

  useEffect(() => {
    setMoreRecords(records ?? [])
  }, [records])

  const loadMore = useCallback(async () => {
    if (moreRecords.length === 0) {
      setErrorLoadingMore('Initial load not available')
      return
    }

    try {
      setLoadingMore(true)

      const to = getNextTo(moreRecords)
      const response = await api.list(from, to)
      setMoreRecords((current) => current.concat(response.records))

      setErrorLoadingMore(undefined)
    } catch (err) {
      setErrorLoadingMore(errorAsString(err))
    } finally {
      setLoadingMore(false)
    }
  }, [api, from, moreRecords])

  return {
    loadingMore,
    errorLoadingMore,
    moreRecords,
    loadMore,
  }
}

export const useDeleteRecord = (refresh: () => void) => {
  const api = useHealthApi()
  const notify = useNotify()

  return async (record: HealthRecord) => {
    try {
      await api.delete(record.date)
      await refresh()
    } catch (err) {
      notify.error(`Deleting record for ${record.date} failed: ${err}`)
    }
  }
}

function getNextTo(records: HealthRecord[]): string {
  const date = records.map((r) => r.date).sort()[0]
  const d = new Date(date)
  d.setDate(d.getDate() - 1)
  const iso = d.toISOString()
  return iso.substring(0, iso.indexOf('T'))
}
