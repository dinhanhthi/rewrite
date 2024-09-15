import OpenAI from 'openai'
import browser from 'webextension-polyfill'
import { defaultSettings } from '../config'
import { handlePrompt } from '../helpers/helpers'
import { getLocal } from '../helpers/helpers-browser'
import { FormSettings } from '../type'

// ------------------ DEV ONLY -----------------------------------------------------------
const fakeResponse = false // default: false
const fakeTimeout = 500 // default: 500
// 👆 Despite this, "yarn build" always ignores this
// ------------------ DEV ONLY -----------------------------------------------------------

browser.runtime.onUpdateAvailable.addListener(() => {
  browser.runtime.reload()
})

browser.runtime.onInstalled.addListener(async _obj => {
  reloadAllNotionTabs()
})

async function reloadAllNotionTabs() {
  // Note: tabs.query({url}) requires "tabs" permission or "host_permissions" for the tab to match.
  return browser.tabs
    .query({ url: '*://*.notion.so/*' })
    .then(tabs => {
      if (tabs.length > 0) {
        for (const tab of tabs) {
          // ###TODO: We ignore tabs that belong to a group for now. Otherwise, there will be an
          // error: "Saved groups are not editable"
          // if (get(tab, 'groupId')) continue // ###Thi: uncomment
          browser.tabs.reload(tab.id)
        }
      }
    })
    .catch(error => {
      console.error(`An error occurred while reloading tabs: ${error.message}`)
    })
}

// Is there any request in progress on the background script?
let isProcessing = false

try {
  browser.runtime.onConnect.addListener(function (port) {
    if (!port) {
      isProcessing = false
      return
    }

    if (port.name === 'port-prompt') {
      port.onMessage.addListener(async function (message) {
        if (message.type === 'prompt') {
          if (isProcessing) {
            port.postMessage({
              error: true,
              message: '🙏 The previous request is still processing, please wait a moment.'
            })
            return
          }

          isProcessing = true
          try {
            console.log('Text to be sent: ', JSON.stringify(message.text))
            const settings = await getLocal<FormSettings>('settings', defaultSettings)
            console.log('settings: ', settings)
            if (!fakeResponse || process.env.NODE_ENV === 'production') {
              const completion = await handlePrompt(settings, message.prompt)
              try {
                if (!settings.stream) {
                  const response =
                    (completion as OpenAI.Chat.Completions.ChatCompletion).choices[0].message
                      .content ?? ''
                  port.postMessage({
                    type: message.type,
                    error: false,
                    data: response
                  })
                  port.postMessage({
                    finished: true
                  })
                } else {
                  let response = ''
                  for await (const chunk of completion as any) {
                    response += chunk.choices?.[0]?.delta?.content || ''
                    port.postMessage({
                      type: message.type,
                      error: false,
                      data: response
                    })
                  }
                  port.postMessage({
                    finished: true
                  })
                }
              } catch (err) {
                port.postMessage({
                  type: message.type,
                  error: true,
                  data: 'An error occurred while processing the request to AI service.',
                })
              }
            } else {
              await new Promise(resolve => setTimeout(resolve, fakeTimeout))
              const response = `Fake response <b>strong</b>...`
              // response = `Fake response with input data: "${message.prompt}"`
              port.postMessage({
                type: message.type,
                error: false,
                data: response
              })
            }
          } catch (err: any) {
            console.log('err in message type prompt: ', err)
            if (err.name === 'AbortError') {
              port.postMessage({
                error: true,
                message: '⏰ The request takes too long to process.'
              })
              isProcessing = false
              return
            }

            port.postMessage({
              type: message.type,
              error: true,
              data: `${err.message}`,
              code: err.code
            })
          }

          isProcessing = false
          return
        }
      })
    }
  })
} catch (e) {
  console.error(e)
}
