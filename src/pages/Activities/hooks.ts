import { useCallback, useMemo } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useAsyncLoad } from '../../util/useAsyncLoad'
import { useActivitiesApi } from './api'
import { Activity } from './types'

export const useActivities = () => {
  const api = useActivitiesApi()
  const [params] = useSearchParams()
  const past = params.has('past')
  const { data, loading, errors } = useAsyncLoad(
    past ? api.getPast : api.getUpcoming
  )

  const activities = useMemo(() => data || [], [data])

  const overlappingActivities = useFindOverlappingActivities(activities)

  return {
    activities,
    overlappingActivities,
    past,
    loading,
    errors,
  }
}

const useFindOverlappingActivities = (
  activities: Activity[]
): [Activity, Activity][] => {
  return useMemo(() => {
    const overlappingActivities: [Activity, Activity][] = []

    for (let i = 0; i < activities.length - 1; i += 1) {
      for (let j = i + 1; j < activities.length; j += 1) {
        const a1 = activities[i]
        const a2 = activities[j]

        if (a1.ends) {
          const t1 = new Date(a1.ends)
          const t2 = new Date(a2.starts)

          if (a1.allDay) {
            t1.setDate(t1.getDate() + 1)
          }

          if (t1 > t2) {
            overlappingActivities.push([a1, a2])
          }
        }
      }
    }

    return overlappingActivities
  }, [activities])
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
