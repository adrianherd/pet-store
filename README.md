# PetStore

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

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

## Set up CI!

Nx comes with local caching already built-in (check your `nx.json`). On CI you might want to go a step further.

- [Set up remote caching](https://nx.dev/features/share-your-cache)
- [Set up task distribution across multiple machines](https://nx.dev/nx-cloud/features/distribute-task-execution)
- [Learn more how to setup CI](https://nx.dev/recipes/ci)

## Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)
