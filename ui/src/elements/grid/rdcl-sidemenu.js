import { LitElement, html, customElement, css, unsafeCSS, property } from 'lit-element'
import toggleIcon from './toggle-sidemenu.svg'

@customElement('rdcl-sidemenu')
export class RdclSidemenu extends LitElement {
  @property({ type: Boolean, reflect: true }) collapsed = false

  static get styles() {
    // language=CSS
    return css`
      :host {
        display: flex;
        flex-direction: column;
        width: 15rem;
        transition: width 400ms ease-in-out;
        overflow: hidden;
      }

      :host([collapsed]) {
        width: 3rem;
      }

      .toggle {
        display: flex;
        background: var(--grid-sidemenu-toggle-background);
        color: var(--grid-sidemenu-toggle-foreground);
        height: 3rem;
        font-size: inherit;
        border: none;
        border-top: var(--grid-border);
        margin: auto 0 0;
        padding: .5rem;
        cursor: pointer;
        outline: none;
        overflow: hidden;
      }

      .toggle:focus {
        outline: thin dashed #333;
        outline-offset: -.25rem;
      }

      .toggle > span {
        display: inline-block;
        margin: auto;
        transition: transform 400ms linear;
        background-image: url('${ unsafeCSS(toggleIcon) }');
        width: 2rem;
        height: 2rem;
      }

      :host([collapsed]) .toggle > span {
        transform: rotate(180deg);
      }

      ::slotted(*) {
        background: var(--grid-sidemenu-item-background);
        color: var(--grid-sidemenu-item-foreground);
        border-bottom: var(--grid-border);
      }
    `
  }

  render() {
    return html`
      <slot></slot>

      <button class="toggle" @click="${ this.toggle }" role="presentation">
        <span></span>
      </button>
    `
  }

  toggle() {
    this.dispatchEvent(new CustomEvent('sidemenu-toggle', {
      bubbles: true,
      cancelable: true,
      composed: true,
    }))
  }
}
