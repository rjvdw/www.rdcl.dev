import type { CredentialRequestOptionsJSON } from '@github/webauthn-json'

export function isCredentialRequestOptionsJSON(
  data: unknown,
): data is CredentialRequestOptionsJSON {
  return (
    typeof data === 'object' &&
    data !== null &&
    'publicKey' in data &&
    isPublicKeyCredentialRequestOptionsJSON(data.publicKey)
  )
}

function isPublicKeyCredentialRequestOptionsJSON(
  data: unknown,
): data is CredentialRequestOptionsJSON['publicKey'] {
  return typeof data === 'object' && data !== null
}

type CheckJwtParameters = {
  locals: App.Locals
  url: URL
  redirect(url: string): Response
}

export function checkJwtOrRedirect({
  locals,
  url,
  redirect,
}: CheckJwtParameters): string | Response {
  const { jwt } = locals

  if (jwt) {
    return jwt
  }

  const redirectUrl = new URL(url.origin + '/login')
  const origin = url.href.replace(url.origin, '')
  redirectUrl.searchParams.set('return-to', origin)

  return redirect(redirectUrl.toString())
}
