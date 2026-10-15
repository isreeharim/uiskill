"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"

interface Framework {
  id: string
  name: string
  ecosystem: string
  tag: string
}

const FRAMEWORKS: Framework[] = [
  { id: "shadcn", name: "shadcn/ui", ecosystem: "Radix + Tailwind", tag: "Headless" },
  { id: "heroui", name: "HeroUI (NextUI)", ecosystem: "Tailwind Variants", tag: "Animated" },
  { id: "mantine", name: "Mantine UI", ecosystem: "CSS Modules", tag: "Full-Stack" },
  { id: "untitledui", name: "Untitled UI React", ecosystem: "Tailwind SaaS", tag: "Enterprise" },
  { id: "reactbits", name: "React Bits", ecosystem: "Framer Motion", tag: "Creative" },
  { id: "daisyui", name: "DaisyUI", ecosystem: "Pure CSS Tailwind", tag: "Zero-JS" },
]

export function AriaComboBoxAutocomplete() {
  const [query, setQuery] = React.useState("")
  const [isOpen, setIsOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<Framework>(FRAMEWORKS[0])

  const filtered = FRAMEWORKS.filter(
    (f) =>
      f.name.toLowerCase().includes(query.toLowerCase()) ||
      f.ecosystem.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="mx-auto w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-950 font-sans">
      <div className="mb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
          Adobe React Aria 3-Layer Pattern
        </span>
        <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">Accessible ComboBox</h3>
        <p className="text-xs text-zinc-500">Keyboard navigable with WAI-ARIA 1.2 compliant combobox role</p>
      </div>

      <div className="relative">
        <label className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block">
          Choose Framework
        </label>
        <div className="relative">
          <input
            type="text"
            role="combobox"
            aria-expanded={isOpen}
            aria-autocomplete="list"
            value={query || selected.name}
            onChange={(e) => {
              setQuery(e.target.value)
              setIsOpen(true)
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Type to filter..."
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50/80 pl-3 pr-9 py-2 text-xs text-zinc-900 outline-none transition focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          />
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400"
          >
            <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Dropdown Options */}
        {isOpen && (
          <div className="absolute z-20 mt-1.5 w-full rounded-2xl border border-zinc-200 bg-white p-1.5 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 animate-in fade-in zoom-in-95 max-h-48 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="p-3 text-center text-xs text-zinc-400">No frameworks found</p>
            ) : (
              filtered.map((item) => {
                const isSelected = selected.id === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelected(item)
                      setQuery("")
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs transition text-left ${
                      isSelected
                        ? "bg-purple-50 font-bold text-purple-700 dark:bg-purple-950/60 dark:text-purple-300"
                        : "hover:bg-zinc-100 dark:hover:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300"
                    }`}
                  >
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-[10px] text-zinc-400">{item.ecosystem}</p>
                    </div>
                    {isSelected && <Check className="h-4 w-4 text-purple-600 dark:text-purple-400" />}
                  </button>
                )
              })
            )}
          </div>
        )}
      </div>

      <div className="mt-4 rounded-xl border border-dashed border-zinc-200 p-2.5 dark:border-zinc-800 text-[11px] text-zinc-500 flex items-center justify-between">
        <span>Selected Token:</span>
        <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{selected.name}</span>
      </div>
    </div>
  )
}
export default AriaComboBoxAutocomplete
