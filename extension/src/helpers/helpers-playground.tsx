/*
 * Helpers used only for the playground
 */

export function openOptionsPage() {
  console.log('openOptionsPage in playground')
}

declare const __APP_VERSION__: string
export const version = `v${__APP_VERSION__}`

export const optionsUrl = 'chrome-extension://capceecppbdobbbpplenjecbplbocpmh/options.html'