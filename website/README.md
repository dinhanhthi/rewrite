# Website

## Getting Started

To get started, install [nvm](https://github.com/nvm-sh/nvm) and use it to install the desired version of Node.js and [Yarn](https://yarnpkg.com/).

```bash
nvm install 20 # node v20
# then install yarn
npm i --global yarn
yarn --version
```

```bash
# install
yarn

# run dev server
yarn dev
yarn dev --turbo # may not work

# build
yarn build
yarn buuld --turbo # may not work

# run production server
yarn start

# lint
yarn lint

# prettier
yarn prettier

# clean
yarn clean

# reinstall
yarn reinstall

# run test in watch mode
yarn test
```

For an example of an api request, let's make a `GET` to `http://localhost:3333/api/hello`.

## Upgrade guide

```bash
# Next.js
yarn add next@latest react@latest react-dom@latest eslint-config-next@latest

# Tailwind
yarn add -D tailwindcss@latest postcss@latest autoprefixer@latest @tailwindcss/typography@latest eslint-plugin-tailwindcss@latest prettier-plugin-tailwindcss@latest
```
