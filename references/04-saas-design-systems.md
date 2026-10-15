# Deep Dive: SaaS Design Systems (Untitled UI, AlignUI, Reshaped & Tailark)

Modern SaaS products win on craft, typography, layout density, and design consistency. These four systems specialize in high-converting SaaS aesthetics, Figma synchronization, and enterprise dashboard architecture.

---

## 1. Untitled UI React

Untitled UI is the most widely adopted enterprise SaaS design system in Figma and React. It provides pixel-perfect components specifically tuned for B2B dashboards, metrics, billing, and team permissions.

### Metric Stat Card (Untitled UI Pattern)
```tsx
import React from "react"
import { ArrowUpRight, ArrowDownRight, MoreVertical } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  period: string
  chartPreview?: React.ReactNode
}

export function UntitledMetricCard({
  title,
  value,
  change,
  trend,
  period,
  chartPreview,
}: MetricCardProps) {
  const isPositive = trend === "up"

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-xs transition-shadow hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</span>
        <button
          type="button"
          aria-label="Options"
          className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {value}
        </span>
        {chartPreview}
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium ${
            isPositive
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
              : "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400"
          }`}
        >
          {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {change}
        </span>
        <span className="text-zinc-500 dark:text-zinc-400">{period}</span>
      </div>
    </div>
  )
}
```

---

## 2. AlignUI

AlignUI bridges the gap between high-end SaaS Figma mockups and modern Next.js/Tailwind code using clean compound components, OKLCH color spaces, and Remix Icons.

### AlignUI Setup & Compound Button
```bash
# Initialize AlignUI tokens and configuration:
npx @alignui/cli tailwind
npm install @remixicon/react
```

```tsx
import * as React from "react"
import { RiAddLine } from "@remixicon/react"

interface AlignButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost"
  size?: "sm" | "md" | "lg"
  icon?: React.ReactNode
}

export function AlignButton({
  children,
  variant = "primary",
  size = "md",
  icon,
  className = "",
  ...props
}: AlignButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]"

  const variants = {
    primary:
      "bg-zinc-900 text-white hover:bg-zinc-800 focus-visible:ring-zinc-950 shadow-sm dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200",
    secondary:
      "bg-zinc-100 text-zinc-900 hover:bg-zinc-200/80 focus-visible:ring-zinc-400 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700",
    ghost:
      "text-zinc-700 hover:bg-zinc-100 focus-visible:ring-zinc-400 dark:text-zinc-300 dark:hover:bg-zinc-800",
  }

  const sizes = {
    sm: "h-8 px-3 text-xs rounded-lg gap-1.5",
    md: "h-9 px-4 text-sm rounded-lg gap-2",
    lg: "h-11 px-5 text-base rounded-xl gap-2.5",
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </button>
  )
}
```

---

## 3. Reshaped

Reshaped uses pure CSS custom properties prefixed with `--rs-` to deliver multi-brand design tokens that synchronize seamlessly with Figma variables.

### Theming Configuration (`reshaped.config.js`)
```javascript
/** @type {import('reshaped').ReshapedConfig} */
const config = {
  themes: {
    productBrand: {
      color: {
        backgroundPrimary: { hex: "#ffffff", hexDark: "#09090b" },
        foregroundPrimary: { hex: "#18181b", hexDark: "#fafafa" },
        accent: { hex: "#2563eb", hexDark: "#3b82f6" },
      },
      radius: {
        medium: { px: 8 },
        large: { px: 12 },
      },
    },
  },
}

module.exports = config
```

### Reshaped React Root & Card
```tsx
import { Reshaped, Card, Button, Text } from "reshaped"
import "reshaped/themes/slate/theme.css"

export function ReshapedApp({ children }: { children: React.ReactNode }) {
  return (
    <Reshaped theme="slate" defaultColorMode="dark">
      <Card padding={5} elevated>
        <Text variant="body-1" weight="medium">
          Token-Driven Container
        </Text>
        <Button variant="solid" color="primary" attributes={{ style: { marginTop: "16px" } }}>
          Reshaped Action
        </Button>
      </Card>
    </Reshaped>
  )
}
```

---

## 4. Tailark

Tailark accelerates SaaS launches by providing battle-tested marketing sections, hero headers, feature highlights, and pricing tables built on top of shadcn/ui.

### SaaS Pricing Matrix Block (Tailark Dusk Style)
```tsx
import { Check } from "lucide-react"

const tiers = [
  {
    name: "Starter",
    price: "$29",
    description: "Ideal for small teams launching their first AI workflow.",
    features: ["Up to 5 team members", "10,000 monthly API calls", "Community support"],
    popular: false,
  },
  {
    name: "Growth",
    price: "$99",
    description: "Designed for high-growth SaaS and agency scale.",
    features: [
      "Unlimited team members",
      "250,000 monthly API calls",
      "Priority 24/7 support",
      "Custom domain & branding",
    ],
    popular: true,
  },
]

export function TailarkPricing() {
  return (
    <section className="py-20 bg-zinc-950 text-white">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <span className="text-xs font-semibold tracking-wider text-blue-400 uppercase">
            Flexible Plans
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Predictable pricing for modern teams
          </h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border p-8 ${
                tier.popular
                  ? "border-blue-500 bg-zinc-900 shadow-2xl shadow-blue-500/10"
                  : "border-zinc-800 bg-zinc-900/50"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 right-6 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                  Most Popular
                </span>
              )}
              <h3 className="text-xl font-semibold">{tier.name}</h3>
              <p className="mt-2 text-sm text-zinc-400">{tier.description}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{tier.price}</span>
                <span className="text-zinc-400">/month</span>
              </div>

              <ul className="mt-8 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm text-zinc-300">
                    <Check className="h-4 w-4 text-blue-400 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={`mt-8 w-full rounded-xl py-2.5 font-medium transition ${
                  tier.popular
                    ? "bg-blue-600 text-white hover:bg-blue-500"
                    : "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```
