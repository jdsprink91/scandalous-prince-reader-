// docs for router https://github.com/thepassle/app-tools/blob/master/router/README.md

import { html } from "lit";

if (!(globalThis as any).URLPattern) {
  await import("urlpattern-polyfill");
}

import { Router } from "@thepassle/app-tools/router.js";

// @ts-ignore
import { title } from "@thepassle/app-tools/router/plugins/title.js";

import "./my-element";
import "./pages/about";

const baseURL: string = (import.meta as any).env.BASE_URL;

export const router = new Router({
  routes: [
    {
      path: resolveRouterPath(),
      title: "Home",
      render: () =>
        html`<my-element>
          <h1>Scandalous Prince Reader</h1>
        </my-element>`,
    },
    {
      path: resolveRouterPath("about"),
      title: "About",
      render: () => html` <sp-about-page></sp-about-page> `,
    },
  ],
});

// This function will resolve a path with whatever Base URL was passed to the vite build process.
// Use of this function throughout the starter is not required, but highly recommended, especially if you plan to use GitHub Pages to deploy.
// If no arg is passed to this function, it will return the base URL.

export function resolveRouterPath(unresolvedPath?: string) {
  let resolvedPath = baseURL;
  if (unresolvedPath) {
    resolvedPath = resolvedPath + unresolvedPath;
  }

  return resolvedPath;
}