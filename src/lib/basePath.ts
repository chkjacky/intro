// GitHub Pages serves the site under the repo name. The only place it's set:
// next.config.ts imports this too. Change it here if the repo is renamed.
export const basePath = process.env.NODE_ENV === "production" ? "/intro" : "";
