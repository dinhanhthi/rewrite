/*
 * Helpers used only for the browser
 */

import browser from 'webextension-polyfill'

export async function getName(): Promise<string> {
  const { name } = await browser.storage.sync.get(['name'])
  return name
}

export function openOptionsPage() {
  browser.runtime.openOptionsPage()
}

const manifest = browser.runtime.getManifest()
export const version = `v${manifest.version}`

export const optionsUrl = browser.runtime.getURL('options.html')