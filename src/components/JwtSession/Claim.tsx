const JWT_CLAIMS: Record<string, string> = {
  iss: 'Issuer',
  sub: 'Subject',
  aud: 'Audience',
  exp: 'Expiry',
  nbf: 'Not Before',
  iat: 'Issued At',
  jti: 'JWT ID',
  azp: 'Authorized Party',
  upn: 'User Principal Name',
}

type ClaimProps = {
  children: string
}
export const Claim = ({ children: claim }: ClaimProps) =>
  JWT_CLAIMS[claim] ? (
    <abbr title={JWT_CLAIMS[claim]}>{claim}</abbr>
  ) : (
    <>claim</>
  )
