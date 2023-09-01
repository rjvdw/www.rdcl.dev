export function generateCredential(): Credential {
  const authenticatorResponse: AuthenticatorAssertionResponse = {
    clientDataJSON: new ArrayBuffer(0),
    authenticatorData: new ArrayBuffer(0),
    signature: new ArrayBuffer(0),
    userHandle: new ArrayBuffer(0),
  }

  const credential: PublicKeyCredential = {
    type: 'public-key',
    id: 'id-123',
    rawId: new ArrayBuffer(0),
    response: authenticatorResponse,
    authenticatorAttachment: '',
    getClientExtensionResults(): AuthenticationExtensionsClientOutputs {
      return {}
    },
  }

  return credential
}

export function mockCredentialsContainer(
  navigator: Navigator,
  credentials: Partial<CredentialsContainer>,
) {
  Object.defineProperty(navigator, 'credentials', {
    value: credentials,
  })
}
