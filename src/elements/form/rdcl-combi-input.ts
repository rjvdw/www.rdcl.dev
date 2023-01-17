import { css, html, LitElement } from 'lit'
import { CustomElementAttributes } from '../types/CustomElementAttributes'

type ModeType = 'balanced' | 'maximize first' | 'maximize last'

export class RdclCombiInput extends LitElement {
  mode?: ModeType

  static get properties() {
    return {
      mode: { type: String },
    }
  }

  static get styles() {
    // language=CSS
    return css`
      :host {
        display: grid;
        grid-template-columns: auto auto;
        grid-column-gap: 0.5rem;
        max-width: 100%;
        overflow: auto;
      }

      :host([mode='balanced']) {
        grid-template-columns: 1fr 1fr;
      }

      :host([mode='maximize first']) {
        grid-template-columns: 1fr min-content;
      }

      :host([mode='maximize last']) {
        grid-template-columns: min-content 1fr;
      }
    `
  }

  render() {
    return html` <slot></slot> `
  }
}

customElements.define('rdcl-combi-input', RdclCombiInput)

interface RdclCombiInputAttributes
  extends CustomElementAttributes<RdclCombiInput> {
  mode?: ModeType
}

declare global {
  interface HTMLElementTagNameMap {
    'rdcl-combi-input': RdclCombiInput
  }

  namespace JSX {
    interface IntrinsicElements {
      'rdcl-combi-input': RdclCombiInputAttributes
    }
  }
}
