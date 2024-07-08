# <img width="165" height="40" src="src/static/assets/logo.png" width="425"/>

Type your phrases and get back a better version.

## Tech Stack

- Extension: [React](https://reactjs.org/) + [ESLint](https://eslint.org/) + [Prettier](https://eslint.org/) + Webpack.
- Playground: React and [Vite](https://vitejs.dev/).
- Backend: [Check this repo](https://github.com/dinhanhthi/rewrite-server).
- Icons: [Lucide](https://lucide.dev/), [Icônes](https://icones.js.org/).
- AI Services: [OpenAI](https://openai.com/), [Claude](https://claude.ai/), [Mistral](https://mistral.ai/), [Google Gemini](https://gemini.google.com/).
- Translation: [DeepL](https://deepl.com/).

## Dev

```bash
# install
yarn

# dev (package is built to dist/)
# On chrome, activate "Developer mode", then "Load unpacked", then open dist/ folder
yarn watch

# build
# (package is built to dist-propd/, .zip file is saved in prod-packages/)
yarn build

# playground (http://localhost:5173/)
yarn playground

# update version (update version in package.json and manifest.json)
yarn update-version 0.0.1
```

## Playground

This mode runs a React app that uses the same components as the content script and popup extension. Please note that in playground mode we cannot use the api `browser` from `webextension-polyfill`. Therefore we need to use 2 different files with names like `XXXBrowser.*` and `XXXPlayground.*` (for example, `helpersBrowser.ts` and `helpersPlayground`). The former is used in extension and the latter in playground mode.

> **Remark**: For the playground, the files are referenced by the source directory, not the compiled directory. Conversely, for the production, the files are referenced by the compiled directory, not the source directory.

You can test each component (isolatedly from the main app) by adding it to the `src/playground/App.tsx` file.
