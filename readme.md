# Carpool

This is the monorepo for the server and web carpool projects. It is setup using yarn workspaces.

# Setup

1. Ensure Node.js, Docker, and yarn are installed.
2. From root project directory, run `yarn install`. This will install the dependencies of all projects.

# Server dev

To run the server services and API in dev mode, from the server directory run `yarn start:dev`. This will start the DB/adminer in containers and run the API in watch mode (process restarts when files are changed).

# Web dev

To start the core and web projects in watch mode, from the root project directory run `yarn start:all`.

# Notes

-   The `client` project contains the auto-generated API client. Do not modify any code inside the lib directory -- files in this directory are overwritten each time the client is generate.
-   The `core` project is the centralized application logic for the web (and eventually mobile) apps. It contains state management (mobx stores), biz/app logic, and exposes the models/endpoints of the API client.
