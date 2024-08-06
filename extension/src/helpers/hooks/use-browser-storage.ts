import { useEffect, useState } from 'react'
import browser from 'webextension-polyfill'

/**
 * This hook is used only in the extension mode, for the playground mode, we use a different
 * method: use-local-storage.ts
 */
const useChromeStorageLocal = <T>(
  key: string,
  initialValue: T
): [T, (value: T) => void, () => void] => {
  const [storedValue, setStoredValue] = useState(initialValue)

  useEffect(() => {
    const getStoredValue = async () => {
      const result = await browser.storage.local.get(key)
      if (result[key] !== undefined) {
        setStoredValue(result[key])
      }
    }

    getStoredValue()
  }, [key])

  const setValue = async (value: T) => {
    setStoredValue(value)
    await browser.storage.local.set({ [key]: value })
  }

  const removeValue = async () => {
    setStoredValue(initialValue)
    await browser.storage.local.remove(key)
  }

  return [storedValue, setValue, removeValue]
}

export default useChromeStorageLocal
