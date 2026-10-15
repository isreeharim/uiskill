"use client"

import * as React from "react"
import { ChevronDown, Sparkles, ShieldCheck, Zap } from "lucide-react"

interface AccordionItem {
  id: string
  title: string
  subtitle: string
  icon: React.ComponentType<{ className?: string }>
  content: string
}

const ITEMS: AccordionItem[] = [
  {
    id: "1",
    title: "Tailwind Variants Engine",
    subtitle: "HeroUI TV compound variants with slots",
    icon: Sparkles,
    content: "HeroUI uses Tailwind Variants (tv) to manage complex component state, slot overrides, and compound props with complete type safety and zero bundle bloat.",
  },
  {
    id: "2",
    title: "React Aria Primitives Underneath",
    subtitle: "Built on Adobe's accessible foundations",
    icon: ShieldCheck,
    content: "Full keyboard navigation, focus management, screen reader announcements, and touch ergonomics handled natively by Adobe React Aria hooks.",
  },
  {
    id: "3",
    title: "Sleek Glassmorphic Theming",
    subtitle: "OKLCH tokens with backdrop blur",
    icon: Zap,
    content: "Includes light, dark, and custom themes with automatic contrast ratio verification and GPU-accelerated CSS filter effects.",
  },
]

export function HeroUIGlowAccordion() {
  const [openId, setOpenId] = React.useState<string>("1")

  return (
    <div className="mx-auto w-full max-w-md space-y-3">
      {ITEMS.map((item) => {
        const isOpen = openId === item.id
        const Icon = item.icon
        return (
          <div
            key={item.id}
            className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
              isOpen
                ? "border-purple-500/50 bg-purple-500/5 shadow-lg shadow-purple-500/10 dark:border-purple-500/40 dark:bg-purple-950/20"
                : "border-zinc-200 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
            }`}
          >
            <button
              onClick={() => setOpenId(isOpen ? "" : item.id)}
              className="flex w-full items-center justify-between p-4 text-left"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
                    isOpen
                      ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
                      : "bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{item.title}</h4>
                  <p className="text-[11px] text-zinc-500">{item.subtitle}</p>
                </div>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-zinc-400 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-purple-600 dark:text-purple-400" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="border-t border-purple-500/10 px-4 pb-4 pt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 animate-in fade-in slide-in-from-top-1">
                {item.content}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
export default HeroUIGlowAccordion
