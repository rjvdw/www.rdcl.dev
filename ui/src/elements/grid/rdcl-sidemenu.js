import { css, customElement, html, LitElement, property, unsafeCSS } from 'lit-element'
import toggleIcon from './toggle-sidemenu.svg'

@customElement('rdcl-sidemenu')
export class RdclSidemenu extends LitElement {
  @property({ type: Boolean }) collapsed = false
  @property({ type: String }) screenType

  static get styles() {
    // language=CSS
    return css`
      :host {
        display: flex;
        flex-direction: column;
        width: 15rem;
        transition: width 400ms ease-in-out;
        overflow: hidden;

        --active-border-width: .35rem;
        --base-size: 3rem;
        --icon-size: 2.5rem;
      }

      :host([collapsed]) {
        width: var(--base-size);
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
      
      :host([screen-type="mobile"]) .toggle {
        display: none;
      }

      .toggle > span {
        display: inline-block;
        margin: auto;
        transition: transform 400ms linear;
        background-image: url('${ unsafeCSS(toggleIcon) }');
        background-repeat: no-repeat;
        background-position: center center;
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
