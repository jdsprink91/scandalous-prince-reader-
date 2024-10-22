import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { getSPDB } from "../actions/database";
import { Task } from "@lit/task";
import { FeedTableRow } from "../types/database";
import "../components/sp-show-img";

@customElement("sp-shows-page")
export class SpShowsPage extends LitElement {
  static styles = css`
    .title-action-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    ul {
      padding-left: 0;
    }

    li {
      list-style: none;
      display: flex;
      padding-bottom: 0.5rem;
    }

    li + li {
      padding-top: 0.5rem;
      border-top: 1px solid black;
    }

    h2 {
      margin: 0;
    }

    .show-title-info-container {
      margin-left: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-grow: 1;
    }

    .actions-container {
      display: flex;
    }
  `;

  private _showsTask = new Task(this, {
    task: async () => {
      const db = await getSPDB();
      return db.getAll("feed");
    },
    args: () => [],
  });

  private _renderShows = (feeds: FeedTableRow[]) => {
    return html`
      <div class="title-action-container">
        <h1>Your Shows</h1>
        <a href="/shows/add">Add a show</a>
      </div>
      <ul>
        ${feeds.map((feed) => {
          return html`<li>
            <sp-show-img .src=${feed.image?.url}></sp-show-img>
            <div class="show-title-info-container">
              <h2>${feed.title}</h2>
              <div class="actions-container">
                <button>Delete</button>
              </div>
            </div>
          </li>`;
        })}
      </ul>
      <sp-add-feed></sp-add-feed>
    `;
  };

  render() {
    return this._showsTask.render({
      pending: () => html`<sp-loading-page></sp-loading-page>`,
      complete: this._renderShows,
    });
  }
}
