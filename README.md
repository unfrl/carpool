# Carpool

This is the monorepo for the server and web carpool projects. It is setup using yarn workspaces.

# Setup

1. Ensure Node.js, Docker, and yarn are installed.
    - At the moment only node v10.16.3 (the current lts) is supported
2. From root project directory, run `yarn install`. This will install the dependencies of all projects.
3. To run server services/services and the core/web projects in dev mode, run `yarn start:all` after dependencies are installed.

**Note:** on first run, you'll want to run `cd packages/client && yarn build` before running `yarn start:all`. Since they're run concurrently, the client won't be compiled before the core package is started up resulting in reference errors.

# Notes

-   The `client` project contains the auto-generated API client. Do not modify any code inside the lib directory -- files in this directory are overwritten each time the client is generated.
-   The `core` project is the centralized application logic for the web (and eventually mobile) apps. It contains state management (mobx stores), biz/app logic, and exposes the models/endpoints of the API client.
-   There is a server specific [README.md](./packages/server/README.md)
