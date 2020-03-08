import { css, customElement, html, LitElement, property, unsafeCSS } from 'lit-element'
import closeIcon from './icons/close-sidemenu.svg'
import toggleIcon from './icons/toggle-sidemenu.svg'

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
      
      :host([screen-type="mobile"]) {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100vw;
        background: var(--menu-overlay-background-color);
        color: var(--menu-overlay-foreground-color);
        padding: 4rem .5rem .5rem;
        transition: left 600ms ease;
      }
      
      :host([screen-type="mobile"][collapsed]) {
        left: calc(-100vw - 1rem);
      }
      
      :host([screen-type="mobile"]) .close {
        position: absolute;
        top: .5rem;
        right: .5rem;
        background: transparent;
        color: inherit;
        font-size: inherit;
        border: none;
        margin: 0;
        padding: 0;
        outline: none;
        cursor: pointer;
      }
      
      :host(:not([screen-type="mobile"])) .close {
        display: none;
      }
      
      :host([screen-type="mobile"]) .close > span {
        display: inline-block;
        margin: auto;
        background-image: url('${ unsafeCSS(closeIcon) }');
        background-repeat: no-repeat;
        background-position: center center;
        width: 2rem;
        height: 2rem;
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
      
      :host([screen-type="mobile"]) ::slotted(*) {
        background: var(--base-background-color);
        color: var(--base-foreground-color);
        margin-bottom: .5rem;
        border: thin solid #999;
        transition: border-color 200ms ease-in-out;
      }
      
      :host([screen-type="mobile"]) ::slotted(*:hover) {
        border-color: #333;
      }
    `
  }

  render() {
    return html`
      <slot></slot>

      <button class="toggle" @click="${ this.toggle }" role="presentation">
        <span></span>
      </button>
      
      <button class="close" @click="${ this.close }" role="presentation">
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

  close() {
    this.dispatchEvent(new CustomEvent('sidemenu-close', {
      bubbles: true,
      cancelable: true,
      composed: true,
    }))
  }
}
