# Deep Dive: Creative, Motion & Pure CSS (21st.dev, HeroUI & DaisyUI)

When interfaces need to delight, evoke emotion, or render with maximum speed and zero JavaScript overhead, these three libraries offer unmatched capabilities.

---

## 1. 21st.dev ("The npm for Design Engineers")

21st.dev is the premier open-source registry and design engineering hub for modern micro-interactions, canvas shaders, interactive bento grids, and animated cards.

### Spotlight Glow Card (21st.dev Pattern)
```tsx
"use client"

import React, { useRef, useState } from "react"

export function SpotlightCard({
  title,
  description,
  badge,
}: {
  title: string
  description: string
  badge: string
}) {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl"
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />
      <div className="relative z-10">
        <span className="inline-block rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400 border border-blue-500/20">
          {badge}
        </span>
        <h3 className="mt-4 text-xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
```

---

## 2. HeroUI (formerly NextUI)

HeroUI merges the speed of Tailwind CSS with the accessible keyboard navigation of **React Aria** and the composable slot management of **Tailwind Variants (`tv()`)**.

### Setup
```bash
npm install @heroui/react framer-motion
```

### HeroUI Card with Glassmorphic Overlay & Avatar
```tsx
"use client"

import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@heroui/react"
import { useState } from "react"

export function HeroUserCard() {
  const [isFollowed, setIsFollowed] = useState(false)

  return (
    <Card className="max-w-[340px] bg-background/60 backdrop-blur-md border border-white/10 shadow-lg">
      <CardHeader className="justify-between">
        <div className="flex gap-3">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src="https://heroui.com/avatars/avatar-1.png"
            color="primary"
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">Alex Morgan</h4>
            <h5 className="text-small tracking-tight text-default-400">@alexm</h5>
          </div>
        </div>
        <Button
          className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
          color="primary"
          radius="full"
          size="sm"
          variant={isFollowed ? "bordered" : "solid"}
          onPress={() => setIsFollowed(!isFollowed)}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </Button>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>Frontend engineer passionate about design systems, fluid animations, and React Server Components.</p>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">142</p>
          <p className="text-default-400 text-small">Following</p>
        </div>
        <div className="flex gap-1">
          <p className="font-semibold text-default-400 text-small">9.4k</p>
          <p className="text-default-400 text-small">Followers</p>
        </div>
      </CardFooter>
    </Card>
  )
}
```

---

## 3. DaisyUI

DaisyUI provides purely semantic Tailwind CSS classes with zero runtime JavaScript required for core UI. It is the fastest way to prototype and ships with over 30 instant themes.

### Setup (`tailwind.config.js`)
```javascript
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake", "cyberpunk", "dracula", "dim"],
    darkTheme: "dark",
  },
}
```

### DaisyUI Pure CSS Modal (No JavaScript Required!)
```html
<!-- The button to open modal -->
<label for="daisy-modal" class="btn btn-primary">Open Modal</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="daisy-modal" class="modal-toggle" />
<div class="modal" role="dialog">
  <div class="modal-box">
    <h3 class="font-bold text-lg">Pure CSS Modal</h3>
    <p class="py-4">This modal opens and closes without a single byte of JavaScript!</p>
    <div class="modal-action">
      <label for="daisy-modal" class="btn">Close</label>
    </div>
  </div>
  <label class="modal-backdrop" for="daisy-modal">Close</label>
</div>
```

### DaisyUI Stat Metric Widget
```tsx
export function DaisyStats() {
  return (
    <div className="stats shadow bg-base-200">
      <div className="stat">
        <div className="stat-figure text-primary">
          <svg className="inline-block w-8 h-8 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="stat-title">Monthly Downloads</div>
        <div className="stat-value text-primary">2.4M</div>
        <div className="stat-desc">21% more than last month</div>
      </div>
      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg className="inline-block w-8 h-8 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
        </div>
        <div className="stat-title">New Users</div>
        <div className="stat-value text-secondary">4,200</div>
        <div className="stat-desc">↗︎ 400 (22%)</div>
      </div>
    </div>
  )
}
```
