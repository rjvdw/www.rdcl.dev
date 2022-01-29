export {}

declare global {
  interface Window {
    _axios: any,
    _auth: any,
  }

  namespace JSX {
    interface IntrinsicElements {
      // FIXME: Proper types
      'rdcl-grid': any,
      'rdcl-page-header': any,
      'rdcl-sidemenu': any,
      'rdcl-sidemenu-item': any,
      'rdcl-input-grid': any,
      'rdcl-combi-input': any,
      'rdcl-tools': any,
      'rdcl-tool-link': any,
      'rdcl-spinner': any,
    }
  }
}
