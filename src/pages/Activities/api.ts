import { useMemo } from 'react'
import { useApi } from '../../util/http'
import { Activity } from './types'

export function useActivitiesApi() {
  const api = useApi()

  return useMemo(
    () => ({
      async getUpcoming(): Promise<Activity[]> {
        const response = await api.get('/activity')
        const body = await response.json()

        return body.activities
      },

      async getPast(): Promise<Activity[]> {
        const response = await api.get(`/activity?past=true`)
        const body = await response.json()

        return body.activities
      },

      async get(id: string): Promise<Activity> {
        const response = await api.get(`/activity/${id}`)
        return response.json()
      },

      async create(activity: Activity): Promise<void> {
        await api.post('/activity', activity)
      },

      async update(id: string, activity: Activity): Promise<Activity> {
        const response = await api.put(`/activity/${id}`, activity)
        return response.json()
      },

      async delete(id: string): Promise<void> {
        await api.delete(`/activity/${id}`)
      },
    }),
    [api]
  )
}
