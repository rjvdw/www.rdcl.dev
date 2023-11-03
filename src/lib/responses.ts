export function unauthorized(): Response {
  return new Response('unauthorized', {
    status: 401,
    headers: {
      'Content-Type': 'plain/text',
    },
  })
}
