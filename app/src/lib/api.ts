import { API_URL } from '$env/static/private'

export async function callApi(path: string, init?: RequestInit): Promise<Response> {
  return fetch(API_URL + path, init)
}
