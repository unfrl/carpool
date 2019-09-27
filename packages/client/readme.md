# Carpool API Client

This is the API client that is auto-generated from the server project using Autorest/Swagger.

**Note** for now, to regenerate the client, you'll need to run `yarn build:client` from the server project. To ensure the core project knows that the code has changed, you'll first need to increment the client's version number in its package.json file. After, make sure to run `yarn build` from the client project - this ensures that project is successfully compiled into its `dist` directory, which is defined as the main target in its package.json.

**TODO:** obvious enhancement is to convert the above into a single build/publish step.
