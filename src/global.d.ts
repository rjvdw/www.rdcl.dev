export {}

declare global {
  interface Window {
    axios: unknown,
    netlifyIdentity: unknown,
  }

  namespace JSX {
    interface IntrinsicElements {
      'rdcl-grid': unknown, // TODO: RdclGrid,
      'rdcl-page-header': unknown, // TODO: RdclPageHeader,
      'rdcl-side-menu': unknown, // TODO: RdclSideMenu,
      'rdcl-side-menu-item': unknown, // TODO: RdclSideMenuItem,
      'rdcl-input-grid': unknown, // TODO: RdclInputGrid,
      'rdcl-combi-input': unknown, // TODO: RdclCombiInput,
      'rdcl-tools': unknown, // TODO: RdclTools,
      'rdcl-tool-link': unknown, // TODO: RdclToolLink,
      'rdcl-spinner': unknown, // TODO: RdclSpinner,
    }
  }
}
