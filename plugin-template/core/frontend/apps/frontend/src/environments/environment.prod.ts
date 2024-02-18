export const environment = {
  production: true,
  plugins: [
    { repoOwner: "htl-grieskirchen-core", name: "Quote of the Day", repoName: "plugin-quote-of-today" },
    { repoOwner: "htl-grieskirchen-core", name: "Polls", repoName: "plugin-polls" },
    { repoOwner: "htl-grieskirchen-core", name: "Template", repoName: "plugin-template" },
  ],
  backendURL: document.location.origin.replace(/\/frontend\.plugin/, "/plugin.backend")
};
