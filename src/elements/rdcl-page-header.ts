import { css, html, LitElement } from 'lit'
import { ScreenType } from '../slices/screen'
import { CustomElementAttributes } from './types/CustomElementAttributes'

export class RdclPageHeader extends LitElement {
  screentype?: ScreenType

  constructor() {
    super()
    this.screentype = undefined
  }

  static get properties() {
    return {
      screentype: { type: String },
    }
  }

  static get styles() {
    // language=CSS
    return css`
      :host {
        display: flex;
        color: #fff;
        font-family: var(--headers-font-family);
        font-size: 2rem;
        align-items: center;
        padding-left: 4rem;
        height: 5rem;
        justify-content: start;
        position: relative;
      }

      :host([screentype='mobile']) {
        padding-left: 0;
        height: 3rem;
        justify-content: center;
      }

      .mobile-menu {
        display: block;
        border: none;
        font-size: inherit;
        margin: auto;
        cursor: pointer;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0.5rem;
        fill: #fff;
        width: 2rem;
        background-color: transparent;
      }
    `
  }

  render() {
    return html`
      <slot></slot>

      ${this.screentype === 'mobile'
        ? html`
            <svg
              @click=${this.openMobileMenu}
              class="mobile-menu"
              role="button"
              tabindex="0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                id="menu"
                d="M17,4V5a1,1,0,0,1-1,1H4A1,1,0,0,1,3,5V4A1,1,0,0,1,4,3H16A1,1,0,0,1,17,4ZM16,8H4A1,1,0,0,0,3,9v1a1,1,0,0,0,1,1H16a1,1,0,0,0,1-1V9A1,1,0,0,0,16,8Zm0,5H4a1,1,0,0,0-1,1v1a1,1,0,0,0,1,1H16a1,1,0,0,0,1-1V14A1,1,0,0,0,16,13Z"
              />
            </svg>
          `
        : ''}
    `
  }

  openMobileMenu() {
    this.dispatchEvent(
      new CustomEvent('mobile-menu-open', {
        bubbles: true,
        cancelable: true,
        composed: true,
      }),
    )
  }
}

customElements.define('rdcl-page-header', RdclPageHeader)

interface RdclPageHeaderAttributes
  extends CustomElementAttributes<RdclPageHeader> {
  screentype: ScreenType
}

declare global {
  interface HTMLElementTagNameMap {
    'rdcl-page-header': RdclPageHeader
  }

  namespace JSX {
    interface IntrinsicElements {
      'rdcl-page-header': RdclPageHeaderAttributes
    }
  }
}
