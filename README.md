# React Starter FlowX Container App

Starter template for React app with FlowX Renderer SDK.

## Prerequisites

- Node.js min version 24 - [Download Node.js](https://nodejs.org/en/download)
- React 18

## Getting Started

- Get npm registry auth details from FlowX (.npmrc)

Create a `.npmrc` file and update the placeholder tokens with the ones provided by FlowX.

```
//<AUTH_REPO>:_auth="<AUTH_TOKEN>"
email=<AUTH_EMAIL>
registry=https://<AUTH_REPO>
always-auth=true
strict-ssl=true
```

- Add environment endpoints

In `src/environments/environment.ts` file, update the `flowx` object with the values provided by FlowX.

```ts
export const environment = {
  ...
  baseUrl: '<BASE_URL>',
  staticAssetsPath: '<STATIC_ASSETS_PATH>',
  orgCode: '<ORG_CODE>',
  ...
  keycloak: {
    issuer: '<KEYCLOAK_URL>',
    ...
    clientId: '<KEYCLOAK_CLIENT>',
  }
};

```

- Add the FlowX Renderer SDK package versions in accordance with the FlowX platform version

In `package.json` file, update the FlowX package versions in accordance with the FlowX platform version.

```json
"dependencies": {
  ...
  "@flowx/react-sdk": "<version>",
  "@flowx/core-sdk": "<version>",
  "@flowx/react-theme": "<version>",
  "@flowx/core-theme": "<version>",
  "@flowx/react-ui-toolkit": "<version>",
  ...
}
```

## Running the app

- Install dependencies

```
npm install
```

- Configure the details of the running process

In `src/process.tsx` file, update the process details parameters:

```ts
  processName = 'PROCESS_NAME';
  themeId = 'THEME_ID';
  projectInfo = {projectId: 'PROJECT_ID'}
  workspaceId = 'WORKSPACE_ID';
``` 

- Start the Vite Development server:

```
npm run dev
```

### Prerequisites & Documentation

[Using the React Renderer](https://docs.flowx.ai/docs/platform-deep-dive/core-components/renderer-sdks/react-renderer)
