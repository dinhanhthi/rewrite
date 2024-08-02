import browser from 'webextension-polyfill'

// Update the extension if a new version is available
browser.runtime.onUpdateAvailable.addListener(() => {
  browser.runtime.reload()
})

// After installing the extension
browser.runtime.onInstalled.addListener(async _obj => {
  // Reload all Notion tabs to apply the content script
  reloadAllNotionTabs().catch(e => {
    console.error(`>>>>An error occurred while reloading tabs: ${e.message}`)
  })
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
