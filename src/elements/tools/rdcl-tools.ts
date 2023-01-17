import { css, html, LitElement } from 'lit'
import { CustomElementAttributes } from '../types/CustomElementAttributes'

export class RdclTools extends LitElement {
  static get styles() {
    // language=CSS
    return css`
      :host {
        display: block;
        list-style-type: disc;
        margin-block-start: 0;
        margin-block-end: 0.75rem;
        margin-inline-start: 0;
        margin-inline-end: 0;
        padding-inline-start: 2.5rem;
      }
    `
  }

  render() {
    return html` <slot></slot> `
  }
}

customElements.define('rdcl-tools', RdclTools)

interface RdclToolsAttributes extends CustomElementAttributes<RdclTools> {}

declare global {
  interface HTMLElementTagNameMap {
    'rdcl-tools': RdclTools
  }

  namespace JSX {
    interface IntrinsicElements {
      'rdcl-tools': RdclToolsAttributes
    }
  }
}
