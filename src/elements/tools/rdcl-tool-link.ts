import { css, html, LitElement } from 'lit'
import { CustomElementAttributes } from '../types/CustomElementAttributes'

export class RdclToolLink extends LitElement {
  static get styles() {
    // language=CSS
    return css`
      :host {
        display: list-item;
        margin-bottom: 0.75rem;
      }

      .link {
        margin-right: 1ex;
      }
    `
  }

  render() {
    return html`
      <span class="link"><slot name="link"></slot></span>
      <slot></slot>
    `
  }
}

customElements.define('rdcl-tool-link', RdclToolLink)

interface RdclToolLinkAttributes
  extends CustomElementAttributes<RdclToolLink> {}

declare global {
  interface HTMLElementTagNameMap {
    'rdcl-tool-link': RdclToolLink
  }

  namespace JSX {
    interface IntrinsicElements {
      'rdcl-tool-link': RdclToolLinkAttributes
    }
  }
}
