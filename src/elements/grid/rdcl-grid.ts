import { css, html, LitElement } from 'lit'
import { ScreenType } from '../../slices/screen'
import { CustomElementAttributes } from '../types/CustomElementAttributes'

export class RdclGrid extends LitElement {
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
        display: grid;
        grid-template-areas:
          'header          header'
          'side-menu       main';
        grid-template-columns: auto 1fr;
        grid-template-rows: auto 1fr;
      }

      [name='header']::slotted(*) {
        grid-area: header;
        background: var(--theme-color);
        border-bottom: var(--grid-border);
      }

      [name='side-menu']::slotted(*) {
        grid-area: side-menu;
        border-right: var(--grid-border);
        background: var(--grid-side-menu-background);
      }

      :not([name])::slotted(*) {
        grid-area: main;
        padding: 1rem;
      }

      :host([screentype='mobile']) {
        grid-template-areas:
          'header'
          'main';
        grid-template-columns: 1fr;
      }
    `
  }

  render() {
    return html`
      <slot name="header"></slot>
      <slot name="side-menu"></slot>
      <slot></slot>
    `
  }
}

customElements.define('rdcl-grid', RdclGrid)

interface RdclGridAttributes extends CustomElementAttributes<RdclGrid> {
  screentype: ScreenType
}

declare global {
  interface HTMLElementTagNameMap {
    'rdcl-grid': RdclGrid
  }

  namespace JSX {
    interface IntrinsicElements {
      'rdcl-grid': RdclGridAttributes
    }
  }
}
