# Accessibility (WAI-ARIA) & React Server Components (RSC) Guardrails

Building production-grade UI requires adherence to accessibility standards and proper React Server Component boundaries.

---

## 1. WAI-ARIA Keyboard Navigation & Focus Standards

Every interactive widget must comply with standard keyboard patterns:

| Component Type | Required Keys | Critical ARIA Attributes |
|---|---|---|
| **Modal / Dialog** | `Escape` (dismiss), `Tab` (trapped cycle) | `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-describedby` |
| **Dropdown / Menu** | `ArrowDown`/`ArrowUp` (nav), `Enter`/`Space` (select), `Escape` (close) | `role="menu"`, `role="menuitem"`, `aria-expanded`, `aria-haspopup="true"` |
| **Tabs** | `ArrowLeft`/`ArrowRight` (switch), `Home`/`End` (extremes) | `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected`, `aria-controls` |
| **Accordion** | `Enter`/`Space` (toggle), `ArrowDown`/`ArrowUp` | `role="button"`, `aria-expanded`, `aria-controls` |
| **Combobox / Select**| `ArrowDown`/`ArrowUp`, `Enter`, `Escape` | `role="combobox"`, `aria-autocomplete`, `aria-expanded`, `aria-activedescendant` |

### Accessible Focus Trap Pattern
When an overlay or modal opens:
1. Capture currently focused element (`document.activeElement`) to restore focus upon closing.
2. Direct focus to the first focusable element inside the modal.
3. Prevent `Tab` from escaping the container boundaries.
4. Listen to `Escape` key event globally to trigger exit.

---

## 2. React Server Components (RSC) Architecture

In modern Next.js (App Router) and React 19 frameworks, components are Server Components by default.

```
┌────────────────────────────────────────────────────────┐
│ SERVER COMPONENTS (Default)                            │
│ - Fetch data directly via async/await                  │
│ - Keep secrets & API keys secure on server             │
│ - Reduce client JavaScript bundle size                 │
│ - Render static HTML, Cards, Page Layouts, Metrics    │
└──────────────────────────┬─────────────────────────────┘
                           │ passes props
┌──────────────────────────▼─────────────────────────────┐
│ CLIENT COMPONENTS ("use client")                       │
│ - Event listeners (onClick, onChange, onKeyDown)       │
│ - React State & Lifecycle (useState, useEffect)        │
│ - Browser APIs (window, localStorage, portals)         │
│ - Interactive UI (Modals, Dropdowns, Sliders, Forms)  │
└────────────────────────────────────────────────────────┘
```

### Golden Rule: Push `"use client"` to the Leaf Nodes
Do NOT mark an entire page or data-fetching container with `"use client"`. Wrap only the interactive leaf element:

```tsx
// ❌ ANTI-PATTERN: Whole page marked as client component
"use client"
export default async function DashboardPage() {
  const data = await getMetrics() // Fails or forces client-side fetch!
  return <div>...</div>
}

// ✅ BEST PRACTICE: Server container with client interactivity leaf
// src/app/dashboard/page.tsx (Server Component)
import { getMetrics } from "@/lib/api"
import { MetricStatCard } from "@/components/metric-stat-card"
import { InteractiveFilterDrawer } from "@/components/filter-drawer" // "use client" leaf

export default async function DashboardPage() {
  const metrics = await getMetrics()

  return (
    <main className="p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <InteractiveFilterDrawer />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {metrics.map((m) => (
          <MetricStatCard key={m.id} {...m} />
        ))}
      </div>
    </main>
  )
}
```

---

## 3. Hydration Protection Hook (`useMounted`)

To eliminate hydration mismatches when reading client-only values (`localStorage`, window dimensions, media queries):

```tsx
"use client"

import { useSyncExternalStore } from "react"

const emptySubscribe = () => () => {}

export function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}
```
