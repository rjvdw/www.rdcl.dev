import { css, customElement, html, LitElement } from 'lit-element'

@customElement('rdcl-input-grid')
export class RdclInputGrid extends LitElement {
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
    `
  }

  render() {
    return html`
      <slot></slot>
    `
  }
}
