# Extension

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

This mode runs a React app utilizing the same components as the content script and popup extension. However, please note that in playground mode, we cannot use the API `browser` from `webextension-polyfill`. Consequently, we need to maintain two separate files: `XXXBrowser.*` and `XXXPlayground.*` (eg., `helpersBrowser.ts` and `helpersPlayground`). The former is used in the extension, while the latter is used in playground mode.

> [!IMPORTANT]
> In playground mode, the files are referenced from the source directory, whereas in production mode, the files are referenced from the compiled directory.

You can test each component (isolatedly from the main app) by adding it to the `src/playground/App.tsx` file.
