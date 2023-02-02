import { useMemo } from 'react'
import { useApi } from '../../util/http'
import { HealthData, HealthRecord, HealthSettings } from './types'

type ListResponseBody = {
  health: Array<{
    date: string
    data: string
  }>
  count: number
}

export function useHealthApi() {
  const api = useApi()

  return useMemo(
    () => ({
      async getSettings(): Promise<HealthSettings> {
        const response = await api.get('/health/settings')
        return response.json()
      },

      async saveSettings(settings: HealthSettings): Promise<void> {
        await api.post('/health/settings', settings, 'json')
      },

      async list(
        from?: string,
        to?: string
      ): Promise<{ records: HealthRecord[]; count: number }> {
        const searchParams = new URLSearchParams()
        if (from) {
          searchParams.set('from', from)
        }
        if (to) {
          searchParams.set('to', to)
        }
        const response = await api.get(`/health?${searchParams.toString()}`)
        const body = (await response.json()) as ListResponseBody

        const records = body.health.map((record) => ({
          date: record.date,
          data: JSON.parse(record.data) as HealthData,
        }))

        return { records, count: body.count }
      },

      async save(date: string, data: HealthData) {
        await api.put(`/health/${date}`, data, 'json')
      },

      async delete(date: string) {
        await api.delete(`/health/${date}`)
      },
    }),
    [api]
  )
}
