import type { APIRoute } from 'astro'
import { checkJwtOrRedirect } from '$lib/auth/util'
import { updateAuthenticator } from '$lib/auth/profileApi'

export const POST: APIRoute = async ({ locals, params, redirect, request, url }) => {
  const jwt = checkJwtOrRedirect({ locals, url, redirect })
  if (jwt instanceof Response) {
    return jwt
  }

  const { id } = params
  const data = await request.formData()
  const name = (data.get('name') || undefined) as string | undefined

  await updateAuthenticator(jwt, id!, name)

  return redirect('/profile')
}
