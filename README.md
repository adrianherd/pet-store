# PetStore
✨ **This workspace has been generated by [Nx, Smart Monorepos · Fast CI.](https://nx.dev)** ✨

## Requirements
To run this application, you must have the following installed:

- Docker (CLI used in serve script)
- Node

## Start the application

Run `npx nx serve pet-store` to start the development server. This commands prepares the docker container for you as such:

1. pull swaggerapi/petstore3:unstable image
2. stop named `swaggerapi-petstore3` if running
3. scrub named `swaggerapi-petstore3` of all data
4. start a fresh `swaggerapi-petstore3` image

This can be seen in the pet-store's [project.json](apps/pet-store/project.json)

## Build for production

Run `npx nx build pet-store` to build the application. The build artifacts are stored in the output directory (e.g. `dist/` or `build/`), ready to be deployed.

## Test
Run `npx nx test pet-store` to run all unit tests related to the application.

## Integration test
Run `npx nx e2e pet-store-e2e` to start a Cypress session that lets you individually run tests. Note that the name change of `pet-store-e2e` is because e2e
cypress tests are considered to be their own application in NX.

## Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)
