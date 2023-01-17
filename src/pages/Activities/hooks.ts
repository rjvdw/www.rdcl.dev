import { useCallback, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { getActivity, getPastActivities, getUpcomingActivities } from './api'

export const useActivities = () => {
  const [params] = useSearchParams()
  const past = params.has('past')
  const { data, loading, error } = useAsyncLoad(
    past ? getPastActivities : getUpcomingActivities
  )

  return {
    activities: data || [],
    past,
    loading,
    error,
  }
}

export const useActivity = () => {
  const { activityId } = useParams()
  const action = useCallback(() => {
    if (!activityId) {
      throw new Error('no activity id provided')
    }

    return getActivity(activityId)
  }, [activityId])

  const { data, setData, loading, error } = useAsyncLoad(action)

  return {
    activity: data,
    setActivity: setData,
    loading,
    error,
  }
}

type AsyncLoadResult<T> = {
  data?: T
  setData: (value: T) => void
  loading: boolean
  error?: string
}

const useAsyncLoad = <T>(action: () => Promise<T>): AsyncLoadResult<T> => {
  const [data, setData] = useState<T>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        setData(await action())
        setError(undefined)
      } catch (err) {
        console.error(err)
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError(`${err}`)
        }
      } finally {
        setLoading(false)
      }
    })()
  }, [action])

  return {
    data,
    setData,
    loading,
    error,
  }
}
