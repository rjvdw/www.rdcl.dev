import { css, customElement, html, LitElement, property } from 'lit-element'

@customElement('rdcl-sidemenu-item')
export class RdclSidemenuItem extends LitElement {
  @property() icon
  @property() href
  @property() accesskey

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
        grid-template-areas: "icon content";
        grid-template-columns: calc(var(--base-size) - var(--active-border-width)) 1fr;
        grid-column-gap: .5rem;
        white-space: nowrap;
        overflow: hidden;
        outline: none;
        transition: border-left-color 200ms ease-in-out;
      }

      .link:hover {
        border-left-color: var(--highlight-color);
      }

      .link:focus {
        outline: thin dashed #333;
        outline-offset: -.25rem;
      }

      [name="icon"]::slotted(*) {
        display: block;
        margin: auto;
        width: var(--icon-size);
        height: var(--icon-size);
      }

      :host([active]) .link {
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
      <a class="link" .href="${ this.href }">
        <slot name="icon"></slot>
        <span class="content"><slot></slot></span>
      </a>
    `
  }
}
