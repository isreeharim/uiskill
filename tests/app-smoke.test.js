import React from "react"
import { renderToString } from "react-dom/server"
import { InspectorModal } from "../src/components/InspectorModal.tsx"
import { CodeViewer } from "../src/components/CodeViewer.tsx"

const item = {
  id: "smoke-component",
  name: "Smoke Component",
  category: "Feedback & Status",
  system: "Test System",
  description: "A minimal render fixture for the component studio smoke test.",
  tags: ["test"],
  fileName: "smoke-component.tsx",
  installCommand: "npm install smoke-package",
  dependencies: [],
  code: "export function SmokeComponent() { return null }",
  previewComponent: () => React.createElement("div", null, "Preview OK"),
}

test("InspectorModal safely renders closed and open states", () => {
  const closed = renderToString(
    React.createElement(InspectorModal, {
      item: null,
      onClose: () => {},
      onTriggerToast: () => {},
    }),
  )

  expect(closed).toBe("")

  const open = renderToString(
    React.createElement(InspectorModal, {
      item,
      onClose: () => {},
      onTriggerToast: () => {},
    }),
  )

  expect(open).toContain("Smoke Component")
  expect(open).toContain("Preview OK")
})

test("CodeViewer renders the supplied source", () => {
  const html = renderToString(
    React.createElement(CodeViewer, {
      code: "export const answer = 42",
      fileName: "answer.tsx",
    }),
  )

  expect(html).toContain("answer.tsx")
  expect(html).toContain("export const answer = 42")
})

test("safeGetItem, safeSetItem, and safeRemoveItem survive blocked localStorage", async () => {
  const map = new Map()
  const mockStorage = {
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, val) => map.set(key, String(val)),
    removeItem: (key) => map.delete(key),
  }
  globalThis.window = { localStorage: mockStorage }

  const { safeGetItem, safeSetItem, safeRemoveItem } = await import("../src/utils/storage.ts")

  // Test with standard storage
  safeSetItem("test-key", "test-val")
  expect(safeGetItem("test-key")).toBe("test-val")
  safeRemoveItem("test-key")
  expect(safeGetItem("test-key")).toBeNull()

  // Simulate blocked storage (SecurityError in Safari private mode or sandboxed iframes)
  const originalWindow = globalThis.window
  try {
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      get() {
        throw new Error("SecurityError: Failed to read 'localStorage' from 'Window': Access is denied.")
      },
    })

    // Must not throw unhandled exceptions
    expect(() => safeGetItem("any-key")).not.toThrow()
    expect(safeGetItem("any-key")).toBeNull()

    expect(() => safeSetItem("any-key", "val")).not.toThrow()
    expect(() => safeRemoveItem("any-key")).not.toThrow()
  } finally {
    delete globalThis.window
  }
})

test("copyToClipboard handles errors gracefully in non-interactive environments", async () => {
  const { copyToClipboard } = await import("../src/utils/clipboard.ts")

  // In Node test environment without browser clipboard/DOM, it should return false rather than throw
  const result = await copyToClipboard("test snippet")
  expect(typeof result).toBe("boolean")
})
