import { Activity } from './types'

const ENDPOINT = `${process.env.REACT_APP_API_URL}/activity`

export async function getUpcomingActivities(): Promise<Activity[]> {
  const response = await callApi('GET')
  const body = await response.json()

  return body.activities
}

export async function getPastActivities(): Promise<Activity[]> {
  const response = await callApi('GET', true)
  const body = await response.json()

  return body.activities
}

export async function getActivity(id: string): Promise<Activity> {
  const response = await callApi('GET', id)
  return response.json()
}

export async function createActivity(activity: Activity): Promise<void> {
  await callApi('POST', activity)
}

export async function updateActivity(
  id: string,
  activity: Activity
): Promise<Activity> {
  const response = await callApi('PUT', id, activity)

  return await response.json()
}

export async function deleteActivity(id: string): Promise<void> {
  await callApi('DELETE', id)
}

async function callApi(method: string): Promise<Response>
async function callApi(method: string, past: true): Promise<Response>
async function callApi(method: string, id: string): Promise<Response>
async function callApi(method: string, activity: Activity): Promise<Response>
async function callApi(
  method: string,
  id: string,
  activity: Activity
): Promise<Response>
async function callApi(
  method: string,
  id?: true | string | Activity,
  activity?: Activity
): Promise<Response> {
  // process arguments
  let url
  if (id && typeof id === 'string') {
    url = `${ENDPOINT}/${id}`
  } else if (id === true) {
    url = `${ENDPOINT}?past=true`
  } else {
    url = ENDPOINT
    activity = id as Activity
  }

  // create request init config
  const headers: Record<string, string> = {
    Authorization: `Bearer ${localStorage.jwt}`,
  }
  const config: RequestInit = {
    method,
    headers,
  }

  if (activity) {
    const body = new URLSearchParams()
    Object.entries(activity).forEach(([key, value]) => {
      if (key === 'labels') {
        for (const label of value as string[]) {
          body.append(key, label)
        }
      } else {
        body.set(key, `${value}`)
      }
    })
    headers['Content-Type'] = 'application/x-www-form-urlencoded'
    config.body = body.toString()
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
