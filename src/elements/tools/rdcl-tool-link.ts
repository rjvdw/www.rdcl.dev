import { css, html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('rdcl-tool-link')
export class RdclToolLink extends LitElement {
  static get styles() {
    // language=CSS
    return css`
      :host {
        display: list-item;
        margin-bottom: .75rem;
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
