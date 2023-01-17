import { css, html, LitElement } from 'lit'
import { CustomElementAttributes } from '../types/CustomElementAttributes'

export class RdclSideMenuItem extends LitElement {
  href?: string

  constructor() {
    super()
    this.href = undefined
  }

  static get properties() {
    return {
      href: { type: String },
    }
  }

  static get styles() {
    // language=CSS
    return css`
      :host {
        display: block;
      }

      .link {
        border-left: var(--active-border-width) solid #0003;
        color: inherit;
        text-decoration: none;
        height: var(--base-size);
        display: grid;
        grid-template-areas: 'icon content';
        grid-template-columns:
          calc(var(--base-size) - var(--active-border-width))
          1fr;
        grid-column-gap: 0.5rem;
        white-space: nowrap;
        overflow: hidden;
        outline: none;
        transition: border-left-color 200ms ease-in-out;
      }

      .link:hover {
        border-left-color: var(--highlight-color);
      }

      .link:focus {
        outline: var(--focus-outline);
        outline-offset: var(--focus-offset);
      }

      [name='icon']::slotted(*) {
        display: block;
        margin: auto;
        width: var(--icon-size);
        height: var(--icon-size);
      }

      :host([active]:not([active='false'])) .link {
        border-left-color: var(--theme-color);
      }

      .content {
        margin: auto 0;
      }

      .link:hover .content {
        text-decoration: underline;
      }
    `
  }

  render() {
    return html`
      <a class="link" .href="${this.href}">
        <slot name="icon"></slot>
        <span class="content"><slot></slot></span>
      </a>
    `
  }
}

customElements.define('rdcl-side-menu-item', RdclSideMenuItem)

interface RdclSideMenuItemAttributes
  extends CustomElementAttributes<RdclSideMenuItem> {
  href: string
  active: boolean
}

declare global {
  interface HTMLElementTagNameMap {
    'rdcl-side-menu-item': RdclSideMenuItem
  }

  namespace JSX {
    interface IntrinsicElements {
      'rdcl-side-menu-item': RdclSideMenuItemAttributes
    }
  }
}
