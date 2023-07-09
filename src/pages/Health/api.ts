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
      async getSettings(init?: RequestInit): Promise<HealthSettings> {
        const response = await api.get('/health/settings', init)
        return response.json()
      },

      async saveSettings(
        settings: HealthSettings,
        init?: RequestInit,
      ): Promise<void> {
        await api.post('/health/settings', settings, 'json', init)
      },

      async list(
        from?: string,
        to?: string,
        init?: RequestInit,
      ): Promise<{ records: HealthRecord[]; count: number }> {
        const searchParams = new URLSearchParams()
        if (from) {
          searchParams.set('from', from)
        }
        if (to) {
          searchParams.set('to', to)
        }
        const response = await api.get(
          `/health?${searchParams.toString()}`,
          init,
        )
        const body = (await response.json()) as ListResponseBody

        const records = body.health.map((record) => ({
          date: record.date,
          data: JSON.parse(record.data) as HealthData,
        }))

        return { records, count: body.count }
      },

      async save(date: string, data: HealthData, init?: RequestInit) {
        await api.put(`/health/${date}`, data, 'json', init)
      },

      async delete(date: string, init?: RequestInit) {
        await api.delete(`/health/${date}`, init)
      },
    }),
    [api],
  )
}
