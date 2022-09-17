import { css, html, LitElement } from 'lit'
import { CustomElementAttributes } from '../types/CustomElementAttributes'
import { FlagAttribute } from '../types/FlagAttribute'

export class RdclInputGrid extends LitElement {
  suffix: boolean

  constructor() {
    super()
    this.suffix = false
  }

  static get properties() {
    return {
      suffix: { type: Boolean },
    }
  }

  static get styles() {
    // language=CSS
    return css`
      :host {
        display: grid;
        grid-template-columns: max-content 1fr;
        grid-column-gap: 1rem;
        grid-row-gap: .5rem;
        align-items: center;
      }

      :host([suffix]) {
        grid-template-columns: max-content 1fr max-content;
      }

      ::slotted(hr) {
        border: none;
        border-bottom: thin solid #333;
        margin: .5rem 0;
        overflow: initial;
      }

      ::slotted([data-start="1"]) {
        grid-column-start: 1;
      }

      ::slotted([data-start="2"]) {
        grid-column-start: 2;
      }

      ::slotted([data-span="2"]) {
        grid-column: span 2;
      }

      ::slotted([data-span="3"]) {
        grid-column: span 3;
      }

      ::slotted([data-start="2"][data-span="2"]) {
        grid-column: 2 / span 2;
      }
    `
  }

  render() {
    return html`
      <slot></slot>
    `
  }
}

customElements.define('rdcl-input-grid', RdclInputGrid)

interface RdclInputGridAttributes extends CustomElementAttributes<RdclInputGrid> {
  suffix?: FlagAttribute
}

declare global {
  interface HTMLElementTagNameMap {
    'rdcl-input-grid': RdclInputGrid
  }

  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'rdcl-input-grid': RdclInputGridAttributes
    }
  }
}
