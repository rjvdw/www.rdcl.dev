export const onPreBuild = ({ netlifyConfig }) => {
  for (const header of netlifyConfig.headers) {
    if (header.values['X_CSP']) {
      if (header.values['Content-Security-Policy']) {
        console.log(
          '[CSP][%s] replace "%s" with "%s"',
          header.for,
          header.values['Content-Security-Policy'],
          header.values['X_CSP'],
        )
      } else {
        console.log('[CSP][%s] add "%s"', header.for, header.values['X_CSP'])
      }
      header.values['Content-Security-Policy'] = header.values['X_CSP']
      delete header.values['X_CSP']
    }
  }
}
