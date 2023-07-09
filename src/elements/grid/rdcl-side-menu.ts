import { css, html, LitElement, unsafeCSS } from 'lit'
import closeIcon from '../../icons/close-side-menu.svg'
import toggleIcon from '../../icons/toggle-side-menu.svg'
import { ScreenType } from '../../slices/screen'
import { CustomElementAttributes } from '../types/CustomElementAttributes'

export class RdclSideMenu extends LitElement {
  collapsed: boolean
  screentype?: ScreenType

  constructor() {
    super()
    this.collapsed = false
    this.screentype = undefined
  }

  static get properties() {
    return {
      collapsed: { type: Boolean },
      screentype: { type: String },
    }
  }

  static get styles() {
    // language=CSS
    return css`
      :host {
        display: grid;
        grid-template-rows: 1fr min-content;
        width: 15rem;
        transition: width 400ms ease-in-out;
        overflow-x: hidden;

        --active-border-width: 0.35rem;
        --base-size: 3rem;
        --icon-size: 2.5rem;
      }

      .slot-container {
        overflow: auto;
      }

      :host([collapsed]:not([collapsed='false'])) {
        width: var(--base-size);
      }

      :host([screentype='mobile']) {
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        width: 100vw;
        background: var(--menu-overlay-background-color);
        color: var(--menu-overlay-foreground-color);
        padding: 4rem 0.5rem 0.5rem;
        transition: left 600ms ease;
      }

      :host([screentype='mobile'][collapsed]:not([collapsed='false'])) {
        left: calc(-100vw - 1rem);
      }

      :host([screentype='mobile']) .close {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: transparent;
        color: inherit;
        font-size: inherit;
        border: none;
        margin: 0;
        padding: 0;
        outline: none;
        cursor: pointer;
      }

      :host([screentype='mobile']) .close > span {
        display: inline-block;
        margin: auto;
        background-image: url('${unsafeCSS(closeIcon)}');
        background-repeat: no-repeat;
        background-position: center center;
        width: 2rem;
        height: 2rem;
      }

      .toggle {
        display: flex;
        background: var(--grid-side-menu-toggle-background);
        color: var(--grid-side-menu-toggle-foreground);
        height: 3rem;
        font-size: inherit;
        border: none;
        border-top: var(--grid-border);
        margin: auto 0 0;
        padding: 0.5rem;
        cursor: pointer;
        outline: none;
        overflow: hidden;
      }

      .toggle:focus {
        outline: var(--focus-outline);
        outline-offset: var(--focus-offset);
      }

      .toggle > span {
        display: inline-block;
        margin: auto;
        transition: transform 400ms linear;
        background-image: url('${unsafeCSS(toggleIcon)}');
        background-repeat: no-repeat;
        background-position: center center;
        width: 2rem;
        height: 2rem;
      }

      :host([collapsed]:not([collapsed='false'])) .toggle > span {
        transform: rotate(180deg);
      }

      ::slotted(*) {
        background: var(--grid-side-menu-item-background);
        color: var(--grid-side-menu-item-foreground);
        border-bottom: var(--grid-border);
        transition: background-color 100ms ease-in;
      }

      ::slotted([active]) {
        background: var(--grid-side-menu-item-background-active);
      }

      ::slotted(:hover) {
        background: var(--grid-side-menu-item-background-active);
      }

      :host([screentype='mobile']) ::slotted(*) {
        background: var(--base-background-color);
        color: var(--base-foreground-color);
        margin-bottom: 0.5rem;
        border: thin solid #999;
        transition: border-color 200ms ease-in-out;
      }

      :host([screentype='mobile']) ::slotted(*:hover) {
        border-color: #333;
      }
    `
  }

  render() {
    return html`
      <div class="slot-container">
        <slot></slot>
      </div>

      ${this.screentype === 'mobile'
        ? html`
            <button class="close" @click="${this.close}" role="presentation">
              <span></span>
            </button>
          `
        : html`
            <button class="toggle" @click="${this.toggle}" role="presentation">
              <span></span>
            </button>
          `}
    `
  }

  toggle() {
    this.dispatchEvent(
      new CustomEvent('side-menu-toggle', {
        bubbles: true,
        cancelable: true,
        composed: true,
      }),
    )
  }

  close() {
    this.dispatchEvent(
      new CustomEvent('side-menu-close', {
        bubbles: true,
        cancelable: true,
        composed: true,
      }),
    )
  }
}

customElements.define('rdcl-side-menu', RdclSideMenu)

interface RdclSideMenuAttributes extends CustomElementAttributes<RdclSideMenu> {
  collapsed: boolean
  screentype: ScreenType
}

declare global {
  interface HTMLElementTagNameMap {
    'rdcl-side-menu': RdclSideMenu
  }

  namespace JSX {
    interface IntrinsicElements {
      'rdcl-side-menu': RdclSideMenuAttributes
    }
  }
}
