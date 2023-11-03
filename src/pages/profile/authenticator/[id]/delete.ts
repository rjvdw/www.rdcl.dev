import type { APIRoute } from 'astro'
import { checkJwtOrRedirect } from '$lib/auth/util'
import { deleteAuthenticator } from '$lib/auth/profileApi'

export const POST: APIRoute = async ({ locals, params, redirect, url }) => {
  const jwt = checkJwtOrRedirect({ locals, url, redirect })
  if (jwt instanceof Response) {
    return jwt
  }

  const { id } = params

  await deleteAuthenticator(jwt, id!)

  return redirect('/profile')
}
