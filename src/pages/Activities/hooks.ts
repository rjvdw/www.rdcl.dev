import { useCallback } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useAsyncLoad } from '../../util/useAsyncLoad'
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
