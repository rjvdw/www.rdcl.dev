import { css, customElement, html, LitElement } from 'lit-element'

@customElement('rdcl-tool-link')
export class RdclToolLink extends LitElement {
  static get styles() {
    // language=CSS
    return css`
      :host {
        display: list-item;
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
