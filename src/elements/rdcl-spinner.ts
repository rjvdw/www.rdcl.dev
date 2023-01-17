import { css, html, LitElement } from 'lit'
import { CustomElementAttributes } from './types/CustomElementAttributes'

export class RdclSpinner extends LitElement {
  static get styles() {
    // language=CSS
    return css`
      :host {
        display: grid;
        grid-template-columns: 2rem 2rem 2rem;
        grid-template-rows: 2rem 2rem 2rem;
        grid-gap: 0.5rem;
        margin: 2rem;
        justify-content: center;
      }

      div {
        opacity: 0;
        background: #666;
      }

      div:nth-child(1) {
        animation: 2s infinite pulse;
      }

      div:nth-child(3) {
        animation: 2s 0.25s infinite pulse;
      }

      div:nth-child(5) {
        animation: 2s 0.5s infinite pulse;
      }

      div:nth-child(7) {
        animation: 2s 0.75s infinite pulse;
      }

      div:nth-child(9) {
        animation: 2s 1s infinite pulse;
      }

      @keyframes pulse {
        0% {
          opacity: 0;
        }

        25% {
          opacity: 1;
        }

        50% {
          opacity: 0;
        }
      }
    `
  }

  render() {
    return html`
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    `
  }
}

customElements.define('rdcl-spinner', RdclSpinner)

interface RdclSpinnerAttributes extends CustomElementAttributes<RdclSpinner> {}

declare global {
  interface HTMLElementTagNameMap {
    'rdcl-spinner': RdclSpinner
  }

  namespace JSX {
    interface IntrinsicElements {
      'rdcl-spinner': RdclSpinnerAttributes
    }
  }
}
