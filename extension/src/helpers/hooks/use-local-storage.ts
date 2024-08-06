import { useEffect, useState } from 'react'

/**
 * This hook is used only in the playground mode because in the browser, we use a different
 * method: use-browser-storage.ts
 */
const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void, () => void] => {
  const [storedValue, setStoredValue] = useState(initialValue)

  useEffect(() => {
    const item = window.localStorage.getItem(key)
    if (item) {
      setStoredValue(JSON.parse(item))
    }
  }, [key])

  const setValue = (value: T) => {
    setStoredValue(value)
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  const removeValue = () => {
    setStoredValue(initialValue)
    window.localStorage.removeItem(key)
  }

  return [storedValue, setValue, removeValue]
}

export default useLocalStorage
