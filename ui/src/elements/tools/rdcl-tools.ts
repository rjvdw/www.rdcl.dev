import { css, customElement, html, LitElement } from 'lit-element'

@customElement('rdcl-tools')
export class RdclTools extends LitElement {
  static get styles() {
    // language=CSS
    return css`
      :host {
        display: block;
        list-style-type: disc;
        margin-block-start: 0;
        margin-block-end: .75rem;
        margin-inline-start: 0;
        margin-inline-end: 0;
        padding-inline-start: 2.5rem;
      }
    `
  }

  render() {
    return html`
      <slot></slot>
    `
  }
}
