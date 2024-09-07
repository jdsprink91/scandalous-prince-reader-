import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import catKing from "../assets/noun-cat-king-5675713.svg";

@customElement("sp-header")
export class SpHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    div {
      display: flex;
      align-items: center;
    }

    p {
      font-size: 2rem;
      font-weight: 600;
      margin-left: 1rem;
    }

    nav {
      margin-left: 1rem;
    }

    nav > * + * {
      margin-left: 0.5rem;
    }
  `;

  @property({ type: String })
  pathname: string = "";

  private getClass(url: string) {
    if (this.pathname === url) {
      return "active";
    }

    return "";
  }

  render() {
    return html`
      <div>
        <img src=${catKing} height="100" width="100" />
        <p>Scandalous Prince Reader</p>
        <nav>
          <a href="/feed" class=${this.getClass("/feed")}>Feed</a>
          <a href="/add" class=${this.getClass("/add")}>Add</a>
          <a href="/about" class=${this.getClass("/about")}>About</a>
        </nav>
      </div>
    `;
  }
}
