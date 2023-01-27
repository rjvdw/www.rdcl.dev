import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNotify } from '../../components/Notifications'
import { errorAsString } from '../../util/errors'
import { useAsyncLoad } from '../../util/useAsyncLoad'
import { list, remove } from './api'
import { HealthRecord } from './types'

export const useHealthRecords = (from?: string, to?: string) => {
  const action = useCallback(() => list(from, to), [from, to])
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
      const response = await list(from, to)
      setMoreRecords((current) => current.concat(response.records))

      setErrorLoadingMore(undefined)
    } catch (err) {
      setErrorLoadingMore(errorAsString(err))
    } finally {
      setLoadingMore(false)
    }
  }, [from, moreRecords])

  return {
    loadingMore,
    errorLoadingMore,
    moreRecords,
    loadMore,
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

function getNextTo(records: HealthRecord[]): string {
  const date = records.map((r) => r.date).sort()[0]
  const d = new Date(date)
  d.setDate(d.getDate() - 1)
  const iso = d.toISOString()
  return iso.substring(0, iso.indexOf('T'))
}
