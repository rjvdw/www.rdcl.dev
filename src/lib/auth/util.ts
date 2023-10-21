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
