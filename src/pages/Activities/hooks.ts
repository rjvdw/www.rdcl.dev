import { useCallback } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useAsyncLoad } from '../../util/useAsyncLoad'
import { useActivitiesApi } from './api'

export const useActivities = () => {
  const api = useActivitiesApi()
  const [params] = useSearchParams()
  const past = params.has('past')
  const { data, loading, errors } = useAsyncLoad(
    past ? api.getPast : api.getUpcoming
  )

  return {
    activities: data || [],
    past,
    loading,
    errors,
  }
}

export const useActivity = () => {
  const api = useActivitiesApi()
  const { activityId } = useParams()
  const action = useCallback(
    (init?: RequestInit) => {
      if (!activityId) {
        throw new Error('no activity id provided')
      }

      return api.get(activityId, init)
    },
    [activityId, api]
  )

  const { data, setData, loading, errors } = useAsyncLoad(action)

  return {
    activity: data,
    setActivity: setData,
    loading,
    errors,
  }
}
