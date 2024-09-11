/*
 * Helpers used only for the browser
 */

import browser from 'webextension-polyfill'
import { TalkToBackgroundProps } from '../content-script/rewrite-ctx'

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

export async function talkToBackground(props: TalkToBackgroundProps): Promise<any> {
  if (!props.portName) return browser.runtime.sendMessage(props.message)
  return new Promise((resolve, reject) => {
    try {
      const port = browser.runtime.connect({ name: props.portName })
      port.postMessage(props.message)
      port.onMessage.addListener(function (response) {
        // /* ###Thi */ console.log(`👉👉👉 response.data: `, response.data);
        if (response.error) reject({ message: response?.data, code: response?.code })
        else resolve(response.data)
        // port.disconnect()
      })
    } catch (error) {
      reject(error)
    }
  })
}

export async function getLocal<T>(key: string, defaultValue: T): Promise<T> {
  const { [key]: value } = await browser.storage.local.get([key])
  return value ?? defaultValue
}