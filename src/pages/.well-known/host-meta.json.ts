import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  return new Response(DATA, {
    headers: {
      'Content-Type': 'application/xrd+json; charset=utf-8',
    },
  })
}

const DATA = JSON.stringify({
  subject: 'https://www.rdcl.dev',
  links: [
    {
      rel: 'lrdd',
      template: 'https://www.rdcl.dev/.well-known/webfinger?resource={uri}',
    },
  ],
})
