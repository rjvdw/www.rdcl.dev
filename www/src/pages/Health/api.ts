import { Api, getBody } from '../../util/http'
import { formatDate } from './dateUtil'
import { HealthData, HealthRecord, HealthSettings } from './state'

type HealthDataRecord = {
  data: string
  date: string
}

type HealthDataResponse = {
  count: number
  health: HealthDataRecord[]
}

export async function loadHealthData(
  api: Api,
  from?: Date,
  to?: Date,
): Promise<{ count: number; records: HealthRecord[] }> {
  const searchParams = new URLSearchParams()
  if (from) searchParams.set('from', formatDate(from))
  if (to) searchParams.set('to', formatDate(to))

  const response = await api.get(`/health?${searchParams.toString()}`)
  const data = await getBody(response, isHealthDataResponse)

  return {
    count: data.count,
    records: data.health
      .map(mapHealthRecord)
      .sort((a, b) => Number(b.date) - Number(a.date)),
  }
}

function isHealthDataResponse(data: unknown): data is HealthDataResponse {
  if (!data || typeof data !== 'object') return false
  if (!('count' in data) || typeof data.count !== 'number') return false
  if (!('health' in data) || !Array.isArray(data.health)) return false

  return data.health.every((entry: unknown) => {
    if (!entry || typeof entry !== 'object') return false
    if (!('data' in entry) || typeof entry.data !== 'string') return false
    return 'date' in entry && typeof entry.date === 'string'
  })
}

function mapHealthRecord(this: void, record: HealthDataRecord): HealthRecord {
  return {
    date: new Date(Date.parse(record.date)),
    data: JSON.parse(record.data) as HealthData,
  }
}

export async function saveHealthData(api: Api, date: Date, data: HealthData) {
  await api.put(`/health/${formatDate(date)}`, JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export async function deleteHealthData(api: Api, date: Date) {
  await api.delete(`/health/${formatDate(date)}`)
}

export async function loadSettings(api: Api): Promise<HealthSettings> {
  const response = await api.get('/health/settings')
  return getBody(response, isHealthSettingsResponse)
}

function isHealthSettingsResponse(data: unknown): data is HealthSettings {
  if (!data || typeof data !== 'object') return false
  if ('height' in data && typeof data.height !== 'number') return false

  return true
}

export async function updateSettings(api: Api, settings: HealthSettings) {
  await api.post('/health/settings', JSON.stringify(settings), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
