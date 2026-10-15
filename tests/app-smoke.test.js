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
