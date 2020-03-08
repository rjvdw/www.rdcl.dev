export async function fetch(url, { accessToken, refresh, ...options }) {
  const response = await doFetch(url, accessToken, options)

  if (response.status === 401) {
    const refreshed = await refresh()
    if (refreshed) {
      return await doFetch(url, refreshed, options)
    }
  }

  return response
}

function doFetch(url, accessToken, options) {
  return window.fetch(url, {
    ...options,
    headers: {
      Authorization: `bearer ${ accessToken }`,
      ...options.headers,
    },
  })
}
