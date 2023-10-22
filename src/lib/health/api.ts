import { ApiError } from '$lib/errors/ApiError'
import { UnauthorizedError } from '$lib/errors/UnauthorizedError'
import { isoDateString } from './util'

export type Settings = {
  height?: number
}

export type HealthData = {
  weight?: number
  bodyFat?: number
}

type Record = {
  date: Date
  data: {
    weight?: number
    bodyFatPercentage?: number
    bodyFatValue?: number
    bmi?: number
  }
}

export type Data = {
  count: number
  settings: Settings
  health: Record[]
}

export async function get(jwt: string, from?: Date, to?: Date): Promise<Data> {
  const healthUrl = new URL(`${import.meta.env.API_URL}/health`)
  if (from) healthUrl.searchParams.set('from', isoDateString(from))
  if (to) healthUrl.searchParams.set('to', isoDateString(to))
  const healthRequest = fetch(healthUrl, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

  const settingsUrl = `${import.meta.env.API_URL}/health/settings`
  const settingsRequest = fetch(settingsUrl, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

  const healthResponse = await healthRequest
  const settingsResponse = await settingsRequest

  if (healthResponse.status === 401 || settingsResponse.status === 401) {
    throw new UnauthorizedError(healthResponse)
  }

  if (!healthResponse.ok) {
    console.error(
      'request to "%s" failed with status %s: %s',
      healthUrl,
      healthResponse.status,
      await healthResponse.text(),
    )
    throw new ApiError('failed to retrieve health data', healthResponse)
  }

  if (!settingsResponse.ok) {
    console.error(
      'request to "%s" failed with status %s: %s',
      settingsUrl,
      settingsResponse.status,
      await settingsResponse.text(),
    )
    throw new ApiError('failed to retrieve health settings', settingsResponse)
  }

  return parseHealthDataResponse(healthResponse, settingsResponse)
}

async function parseHealthDataResponse(
  healthResponse: Response,
  settingsResponse: Response,
): Promise<Data> {
  const settingsBodyResponse = settingsResponse.json()
  const healthBodyResponse = healthResponse.json()

  const settingsBody = (await settingsBodyResponse) as unknown
  if (settingsBody === null || typeof settingsBody !== 'object') {
    console.error(settingsBody)
    throw new ApiError(
      'received an unexpected response from the upstream server',
      settingsResponse,
    )
  }

  const settings: Settings = {}
  if ('height' in settingsBody && typeof settingsBody.height === 'number') {
    settings.height = settingsBody.height
  }

  const healthBody = (await healthBodyResponse) as unknown
  if (
    healthBody === null ||
    typeof healthBody !== 'object' ||
    !('count' in healthBody) ||
    typeof healthBody.count !== 'number' ||
    !('health' in healthBody) ||
    !Array.isArray(healthBody.health)
  ) {
    console.error(healthBody)
    throw new ApiError(
      'received an unexpected response from the upstream server',
      healthResponse,
    )
  }

  const records = healthBody.health.map((record) =>
    parseHealthDataRecord(record, settings.height, healthResponse),
  )

  records.sort((a, b) => b.date.getTime() - a.date.getTime())

  return {
    count: healthBody.count,
    health: records,
    settings,
  }
}

function parseHealthDataRecord(
  record: unknown,
  height: number | undefined,
  response: Response,
): Record {
  if (
    record === null ||
    typeof record !== 'object' ||
    !('date' in record) ||
    typeof record.date !== 'string' ||
    !('data' in record) ||
    typeof record.data !== 'string'
  ) {
    console.error(record)
    throw new ApiError(
      'received an unexpected response from the upstream server',
      response,
    )
  }

  const data = JSON.parse(record.data) as unknown

  if (data === null || typeof data !== 'object') {
    console.error(data)
    throw new ApiError(
      'received unexpected data from the upstream server',
      response,
    )
  }

  const healthData: Record['data'] = {}
  if ('weight' in data && typeof data.weight === 'number') {
    healthData.weight = data.weight
    if (height) {
      const correctedHeight = (height / 100) ** 2
      healthData.bmi = data.weight / correctedHeight
    }
  }
  if ('bodyFat' in data && typeof data.bodyFat === 'number') {
    healthData.bodyFatPercentage = data.bodyFat
    if (healthData.weight !== undefined) {
      healthData.bodyFatValue = (data.bodyFat * healthData.weight) / 100
    }
  }

  return {
    date: new Date(Date.parse(record.date)),
    data: healthData,
  }
}

export async function save(jwt: string, date: string, data: HealthData) {
  const url = `${import.meta.env.API_URL}/health/${date}`
  const response = await fetch(url, {
    method: 'put',
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (response.status === 401) {
    throw new UnauthorizedError(response)
  }

  if (!response.ok) {
    console.error(
      'request to "%s" failed with status %s: %s',
      url,
      response.status,
      await response.text(),
    )
    throw new ApiError('failed to save record', response)
  }
}

export async function saveSettings(jwt: string, settings: Settings) {
  const url = `${import.meta.env.API_URL}/health/settings`
  const response = await fetch(url, {
    method: 'post',
    headers: {
      Authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(settings),
  })

  if (response.status === 401) {
    throw new UnauthorizedError(response)
  }

  if (!response.ok) {
    console.error(
      'request to "%s" failed with status %s: %s',
      url,
      response.status,
      await response.text(),
    )
    throw new ApiError('failed to save settings', response)
  }
}

export async function deleteRecord(jwt: string, date: string) {
  const url = `${import.meta.env.API_URL}/health/${date}`
  const response = await fetch(url, {
    method: 'delete',
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  })

  if (response.status === 401) {
    throw new UnauthorizedError(response)
  }

  if (!response.ok) {
    console.error(
      'request to "%s" failed with status %s: %s',
      url,
      response.status,
      await response.text(),
    )
    throw new ApiError('failed to delete record', response)
  }
}
