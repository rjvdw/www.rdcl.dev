import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  return new Response(DATA, {
    headers: {
      'Content-Type': 'application/xrd+xml; charset=utf-8',
    },
  })
}

const DATA = `<?xml version="1.0" encoding="UTF-8"?>
<XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0">
  <Subject>https://www.rdcl.dev</Subject>
  <Link rel="lrdd" template="https://www.rdcl.dev/.well-known/webfinger?resource={uri}"/>
</XRD>
`
