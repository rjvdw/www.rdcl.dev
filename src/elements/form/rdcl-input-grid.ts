import { css, html, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('rdcl-input-grid')
export class RdclInputGrid extends LitElement {
  @property({ type: Boolean }) suffix = false

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
