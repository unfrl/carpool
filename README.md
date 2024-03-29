# Carpool

This is the monorepo for the server and web carpool projects. It is setup using yarn workspaces.

# Setup

1. Ensure Node.js LTS, Docker, and yarn are installed.
2. From root project directory, run `yarn install`. This will install the dependencies of all projects.
3. To run server services/services and the core/web projects in dev mode, run `yarn start:all` after dependencies are installed. (See **Dev Services** below)

# Dev Services

When run in dev mode we start up all of the required supporting services in containers, below is a table of where to access their management UIs:

| Service            | Port(s) |
| ------------------ | ------- |
| Adminer (Postgres) | 9000    |
| Redis Commander    | 6379    |
| Maildev (Email)    | 1080    |

# Notes

-   The `sdk` project contains the auto-generated API client. Do not modify any code inside the lib directory -- files in this directory are overwritten each time the client is generated.
-   The `core` project is the centralized application logic for the web (and eventually mobile) apps. It contains state management (mobx stores), biz/app logic, and exposes the models/endpoints of the API client.
-   There is a server specific [README.md](./packages/server/README.md)
