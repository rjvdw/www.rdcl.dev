import { HealthData, HealthRecord } from './types'

const ENDPOINT = `${process.env.REACT_APP_API_URL}/health`

type ListResponseBody = {
  health: Array<{
    date: string
    data: string
  }>
  count: number
}

export async function list(
  from?: string,
  to?: string
): Promise<{ records: HealthRecord[]; count: number }> {
  const response = await callApi('GET', from, to)
  const body = (await response.json()) as ListResponseBody

  const records = body.health.map((record) => ({
    date: record.date,
    data: JSON.parse(record.data) as HealthData,
  }))

  return { records, count: body.count }
}

export async function save(date: string, data: HealthData) {
  await callApi('PUT', date, data)
}

export async function remove(date: string) {
  await callApi('DELETE', date)
}

async function callApi(
  method: 'GET',
  from?: string,
  to?: string
): Promise<Response>
async function callApi(
  method: 'PUT',
  date: string,
  data: HealthData
): Promise<Response>
async function callApi(method: 'DELETE', date: string): Promise<Response>
async function callApi(
  method: string,
  dateOrFrom?: string,
  dataOrTo?: HealthData | string
): Promise<Response> {
  let url: string
  let data: string | undefined
  if (method === 'GET') {
    const from = dateOrFrom
    const to = dataOrTo as string | undefined
    const getUrl = new URL(ENDPOINT)

    if (from) {
      getUrl.searchParams.set('from', from)
    }
    if (to) {
      getUrl.searchParams.set('to', to)
    }

    url = getUrl.toString()
    data = undefined
  } else {
    url = `${ENDPOINT}/${dateOrFrom}`
    data = dataOrTo ? JSON.stringify(dataOrTo) : undefined
  }

  // create request init config
  const headers: Record<string, string> = {
    Authorization: `Bearer ${localStorage.jwt}`,
  }
  const config: RequestInit = {
    method,
    headers,
  }

  if (data) {
    headers['Content-Type'] = 'application/json'
    config.body = data
  }

  // perform the actual request
  const response = await fetch(url, config)

  if (!response.ok) {
    throw new Error(
      `Call to API failed with error: ${response.status} ${response.statusText}`
    )
  }

  return response
}
