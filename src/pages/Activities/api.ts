import { useMemo } from 'react'
import { useApi } from '../../util/http'
import { Activity } from './types'

export function useActivitiesApi() {
  const api = useApi()

  return useMemo(
    () => ({
      async getUpcoming(init?: RequestInit): Promise<Activity[]> {
        const response = await api.get('/activity', init)
        const body = await response.json()

        return body.activities
      },

      async getPast(init?: RequestInit): Promise<Activity[]> {
        const response = await api.get(`/activity?past=true`, init)
        const body = await response.json()

        return body.activities
      },

      async get(id: string, init?: RequestInit): Promise<Activity> {
        const response = await api.get(`/activity/${id}`, init)
        return response.json()
      },

      async create(activity: Activity, init?: RequestInit): Promise<void> {
        await api.post('/activity', activity, 'form', init)
      },

      async update(
        id: string,
        activity: Activity,
        init?: RequestInit
      ): Promise<Activity> {
        const response = await api.put(
          `/activity/${id}`,
          activity,
          'form',
          init
        )
        return response.json()
      },

      async delete(id: string, init?: RequestInit): Promise<void> {
        await api.delete(`/activity/${id}`, init)
      },
    }),
    [api]
  )
}
