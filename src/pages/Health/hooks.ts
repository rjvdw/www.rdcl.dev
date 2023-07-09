import { useCallback, useEffect, useMemo, useState } from 'react'
import { useNotify } from '../../components/Notifications'
import { errorAsString } from '../../util/errors'
import { useAsyncLoad } from '../../util/useAsyncLoad'
import { useHealthApi } from './api'
import { HealthRecord } from './types'

export const useHealthSettings = () => {
  const api = useHealthApi()
  const action = useCallback(
    (init?: RequestInit) => api.getSettings(init),
    [api],
  )
  const { data, loading, errors, refresh } = useAsyncLoad(action)

  return { settings: data, loading, errors, refresh }
}

export const useHealthRecords = (from?: string, to?: string) => {
  const api = useHealthApi()
  const action = useCallback(
    (init?: RequestInit) => api.list(from, to, init),
    [api, from, to],
  )
  const {
    data,
    loading: loadingInitial,
    errors: errorsInitialLoad,
    refresh,
  } = useAsyncLoad(action)

  const { loadingMore, errorsLoadingMore, loadMore, moreRecords } = useLoadMore(
    data?.records,
    from,
  )

  const loading = useMemo(
    () => loadingInitial || loadingMore,
    [loadingInitial, loadingMore],
  )
  const errors = useMemo(
    () => errorsInitialLoad.concat(errorsLoadingMore),
    [errorsInitialLoad, errorsLoadingMore],
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
    errors,
    refresh,
    loadMore,
  }
}

const useLoadMore = (records?: HealthRecord[], from?: string) => {
  const api = useHealthApi()
  const [loadingMore, setLoadingMore] = useState<number>(0)
  const [errorsLoadingMore, setErrorsLoadingMore] = useState<string[]>([])
  const [moreRecords, setMoreRecords] = useState<HealthRecord[]>(records ?? [])

  useEffect(() => {
    setMoreRecords(records ?? [])
  }, [records])

  const loadMore = useCallback(
    async (init?: RequestInit) => {
      if (moreRecords.length === 0) {
        setErrorsLoadingMore((errs) =>
          errs.concat(['Initial load not available']),
        )
        return
      }

      try {
        setLoadingMore((nr) => nr + 1)

        const to = getNextTo(moreRecords)
        const response = await api.list(from, to, init)
        setMoreRecords((current) => current.concat(response.records))

        setErrorsLoadingMore([])
      } catch (err) {
        setErrorsLoadingMore((errs) => errs.concat(errorAsString(err)))
      } finally {
        setLoadingMore((nr) => nr - 1)
      }
    },
    [api, from, moreRecords],
  )

  return {
    loadingMore: loadingMore > 0,
    errorsLoadingMore,
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
