import { useCallback } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useAsyncLoad } from '../../util/useAsyncLoad'
import { useActivitiesApi } from './api'

export const useActivities = () => {
  const api = useActivitiesApi()
  const [params] = useSearchParams()
  const past = params.has('past')
  const { data, loading, error } = useAsyncLoad(
    past ? api.getPast : api.getUpcoming
  )

  return {
    activities: data || [],
    past,
    loading,
    error,
  }
}

export const useActivity = () => {
  const api = useActivitiesApi()
  const { activityId } = useParams()
  const action = useCallback(() => {
    if (!activityId) {
      throw new Error('no activity id provided')
    }

    return api.get(activityId)
  }, [activityId, api])

  const { data, setData, loading, error } = useAsyncLoad(action)

  return {
    activity: data,
    setActivity: setData,
    loading,
    error,
  }
}
