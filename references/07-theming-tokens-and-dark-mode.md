# Theming, Design Tokens & Dark Mode: The Complete Guide

A resilient design system relies on a consistent 3-layer token architecture that guarantees contrast accessibility, seamless dark mode transitions, and multi-brand capability.

---

## 1. The Three-Layer Token Architecture

```
┌────────────────────────────────────────────────────────┐
│ 1. PRIMITIVE / REFERENCE TOKENS (Raw values)           │
│    --blue-500: #3b82f6;  --slate-900: #0f172a;          │
├────────────────────────────────────────────────────────┤
│ 2. SEMANTIC / SYSTEM TOKENS (Intent & context)         │
│    --color-bg-canvas: var(--slate-900);                │
│    --color-action-primary: var(--blue-500);            │
├────────────────────────────────────────────────────────┤
│ 3. COMPONENT TOKENS (Component-specific bindings)      │
│    --btn-primary-bg: var(--color-action-primary);      │
└────────────────────────────────────────────────────────┘
```

---

## 2. Tailwind CSS & shadcn/ui Token Standard

Modern setups use CSS variables with OKLCH or HSL color channels for dynamic alpha opacity.

### CSS Variables Definition (`src/app/globals.css`)
```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 48%;
  }
}
```

### Tailwind v4 `@theme` Configuration
In Tailwind CSS v4, tokens can be directly registered in CSS without a JavaScript config file:

```css
@theme {
  --color-brand-primary: oklch(0.62 0.22 260);
  --color-brand-surface: oklch(0.98 0.01 260);
  --radius-card: 1rem;
}
```

---

## 3. Dark Mode without Hydration Flickering

Using `next-themes` prevents theme flash on initial render:

```tsx
// src/components/theme-provider.tsx
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

```tsx
// src/app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

---

## 4. Multi-Brand Token Systems: Reshaped `--rs-` Tokens

Reshaped uses scoped custom properties that map 1:1 with Figma variables:

```css
:root {
  --rs-color-background-primary: #ffffff;
  --rs-color-foreground-primary: #18181b;
  --rs-shadow-raised: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --rs-radius-small: 6px;
  --rs-radius-medium: 10px;
}

[data-rs-color-mode="dark"] {
  --rs-color-background-primary: #09090b;
  --rs-color-foreground-primary: #fafafa;
}
```
