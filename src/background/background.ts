import browser from 'webextension-polyfill'

// Update the extension if a new version is available
browser.runtime.onUpdateAvailable.addListener(() => {
  browser.runtime.reload()
})

// After installing the extension
browser.runtime.onInstalled.addListener(async _obj => {
  // Reload all Notion tabs to apply the content script
  reloadAllNotionTabs()
})

async function reloadAllNotionTabs() {
  // Note: tabs.query({url}) requires "tabs" permission or "host_permissions" for the tab to match.
  return browser.tabs.query({ url: '*://*.notion.so/*' }).then(tabs => {
    if (tabs.length > 0) {
      for (const tab of tabs) {
        browser.tabs.reload(tab.id)
      }
    }
  })
}

// ###Thi remove later
try {
  browser.runtime.onMessage.addListener(async message => {
    if (message.type === 'saveName') {
      await browser.storage.sync.set({ name: message.name })
      return true
    }
  })
} catch (e) {
  console.error(e)
}
