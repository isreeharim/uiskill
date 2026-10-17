/**
 * Robust clipboard copy utility.
 * Attempts navigator.clipboard.writeText first, then falls back to execCommand for HTTP/iframes.
 * Returns true if copied successfully, false if denied or unsupported.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === "undefined") return false

  // Modern Async Clipboard API
  if (navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      // Fall through to legacy fallback
    }
  }

  // Fallback for sandboxed iframes or non-HTTPS origins
  try {
    if (!document?.body) return false
    const textArea = document.createElement("textarea")
    textArea.value = text
    textArea.style.position = "fixed"
    textArea.style.left = "-999999px"
    textArea.style.top = "-999999px"
    textArea.setAttribute("readonly", "")
    document.body.appendChild(textArea)
    textArea.select()
    const success = document.execCommand("copy")
    document.body.removeChild(textArea)
    return Boolean(success)
  } catch {
    return false
  }
}
