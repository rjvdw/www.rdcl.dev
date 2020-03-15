import { css, customElement, html, LitElement, property } from 'lit-element'

@customElement('rdcl-combi-input')
export class RdclCombiInput extends LitElement {
  @property({ type: String }) mode

  static get styles() {
    // language=CSS
    return css`
      :host {
        display: grid;
        grid-template-columns: auto auto;
        grid-column-gap: .5rem;
      }

      :host([mode="balanced"]) {
        grid-template-columns: 1fr 1fr;
      }

      :host([mode="maximize first"]) {
        grid-template-columns: 1fr min-content;
      }

      :host([mode="maximize last"]) {
        grid-template-columns: min-content 1fr;
      }
    `
  }

  render() {
    return html`
      <slot></slot>
    `
  }
}
