# Gallery - a PWA image gallery made with Nuxt 3 :tada:

https://user-images.githubusercontent.com/47639656/219707847-9f3e63ca-af86-4d0a-9f0a-dcf2c9ccf1da.mp4

## :sparkles: Features

-   Self-hosted (just copy your images to src/public/images)
-   Can be hosted on any static site hosting with Nuxt generate
-   WASD / Arrow key / touch navigation
-   Support of different aspect ratios
-   [PWA functionality]() provided by [@kevinmarrec/nuxt-pwa](https://github.com/kevinmarrec/nuxt-pwa-module)
-   Image optimisation, provided by [@nuxt/image-edge](https://github.com/nuxt/image)
-   Tailwind CSS for styling
-   ESLint + Prettier for code format and styling
-   Vitest + Vue test utils + Nuxt Devtools + Playwright for tests

All your images are automatically imported from the `src/public/images` folder!
Alt image descriptions are generated from the filenames.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fc1llo%2Fgallery)

## :camera_flash: Image credits

-   https://unsplash.com/photos/PNKwdJ8WetM Atacama Desert Chile
-   https://unsplash.com/photos/9DgwO_ihqL0 Hallstätter See
-   https://unsplash.com/photos/OtXJhYjbKeg Wadi Rum Village, Giordania
-   https://unsplash.com/photos/ylFewI4W6UQ Finding nemo
-   https://unsplash.com/photos/ln5drpv_ImI purple night sky
-   https://unsplash.com/photos/c6av7odz1yI Ebeltoft, Denmark

## :oncoming_police_car: Roadmap:

-   [x] Initial release
-   [ ] Add authentication support
-   [ ] Full SSG support for the ipx provider

## :rocket: Quick Start

These instructions will help you set up a production deployment as fast as possible.

1. Clone the repo or use the Vercel deploy button below to do it automatically.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fc1llo%2Fgallery)

2. Delete all images in `src/public/images` and replace with your own.

3. Commit & push changes to see your brand new image gallery in action!

## Local Development

_Note_ this project uses `pnpm` as the package manager. Replace with `npm run` or `yarn` if needed.

Get started

```
git clone https://github.com/c1llo/gallery.git
```

```
cd gallery
```

```
pnpm install
```

Development mode

```
pnpm dev
```
## :spider_web: PWA functionality

Read how to configure here: [@kevinmarrec/nuxt-pwa](https://github.com/kevinmarrec/nuxt-pwa-module)

By default it is enabled if the `NODE_ENV` environment variable is not equal to `development`.

When enabled, any cached (already opened) content/pages will be available offline. A future goal
is to have full precaching with workbox of all assets on install to enable it to work fully offline.

It is possible to add custom service workers with the module.

## :parachute: Supported  production deployment methods

-   With Docker [see Dockerfile](Dockerfile) (deploy to any PaaS that supports Docker or self-host). DigitalOcean app platform is recommended.
-   With Vercel: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fc1llo%2Fgallery)

**Note** to host with Docker you will need to change the image provider to the self-hosted [`ipx`](https://v1.image.nuxtjs.org/providers/ipx) provider within the Nuxt config:

```
//nuxt.config.ts

image: {
    provider: "ipx",
    ...
},

```

See instructions for deploying on Vercel [here](https://nitro.unjs.io/deploy/providers/vercel).
It works out of the box and by default the vercel provider is used by `@nuxt/image-edge` for image optimisation.


## Important directories

-   `src`
    -   `src/components`
    -   `src/composables`
    -   `src/pages`
    -   `src/public/images` stores all the original image files
    -   `src/types`
-   `test`
    -   `test/e2e` stores all Playwright E2E tests

## Running the tests

Vitest + Playwright

Unit tests:

`pnpm test:unit`

E2E tests (this may require other Playwright dependencies to be installed):

`pnpm test:e2e`

## Commands Index:

[see package.json](package.json)

Here is a brief explanation of each command:

-   `build`: This script command builds the Nuxt.js application in a production environment.

-   `dev`: This script command starts a development server and watches for changes in the application.

-   `generate`: This script command generates the static version of the Nuxt.js application.

-   `preview`: This script command previews the application.

-   `postinstall`: This script command runs the `nuxt prepare` command after the project dependencies have been installed.

-   `images`: This script command generates the Nuxt.js application and copies the generated images to the `src/public` directory.

-   `lint`: This script command runs the ESLint linter on the project's TypeScript, JavaScript, and Vue.js files.

-   `lint:fix`: This script command runs the ESLint linter and automatically fixes any linting errors found in the project's TypeScript, JavaScript, and Vue.js files.

-   `prettier`: This script command checks the code format of the project's source files using Prettier.

-   `prettier:fix`: This script command checks the code format of the project's source files using Prettier and automatically fixes any formatting issues.

-   `test:unit`: This script command runs the unit tests for the project using Vitest.

-   `test:e2e`: This script command runs the end-to-end tests for the project using Playwright.

-   `test:coverage`: This script command runs the code coverage tests for the project using Vitest.

-   `prepare`: This script command installs the Husky library, which is used for Git hooks in the project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
