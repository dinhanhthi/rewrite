/*
 * Helpers used only for the playground
 */

export async function handleSaveName(name: string) {
  await new Promise(resolve => setTimeout(resolve, 2000))
  console.log('handleSaveName in playground with name: ', name)
}

export function openOptionsPage() {
  console.log('openOptionsPage in playground')
}

declare const __APP_VERSION__: string
export const version = `v${__APP_VERSION__}`

export const optionsUrl = 'chrome-extension://capceecppbdobbbpplenjecbplbocpmh/options.html'