import { css, customElement, html, LitElement, property } from 'lit-element'

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
        grid-column: span 2;
        border: none;
        border-bottom: thin solid #333;
        margin: .5rem 0;
        overflow: initial;
      }
    `
  }

  render() {
    return html`
      <slot></slot>
    `
  }
}
