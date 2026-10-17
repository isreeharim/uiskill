/**
 * Safe localStorage wrapper that catches QuotaExceededError and SecurityError (e.g. Safari private browsing, sandboxed iframes).
 */

function getStorage(): Storage | null {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      return window.localStorage
    }
    if (typeof globalThis !== "undefined" && (globalThis as any).localStorage) {
      return (globalThis as any).localStorage
    }
  } catch {
    return null
  }
  return null
}

export function safeGetItem(key: string, fallback: string | null = null): string | null {
  try {
    const storage = getStorage()
    if (!storage) return fallback
    return storage.getItem(key) ?? fallback
  } catch {
    return fallback
  }
}

export function safeSetItem(key: string, value: string): boolean {
  try {
    const storage = getStorage()
    if (!storage) return false
    storage.setItem(key, value)
    return true
  } catch {
    // Fail silently when storage is blocked or quota exceeded
    return false
  }
}

export function safeRemoveItem(key: string): boolean {
  try {
    const storage = getStorage()
    if (!storage) return false
    storage.removeItem(key)
    return true
  } catch {
    return false
  }
}
