"use client"

import * as React from "react"
import { Grid, List, Table2 } from "lucide-react"

export function ChakraSegmentedControl() {
  const [selected, setSelected] = React.useState<"grid" | "list" | "table">("grid")

  const options = [
    { id: "grid", label: "Grid View", icon: Grid },
    { id: "list", label: "List View", icon: List },
    { id: "table", label: "Table View", icon: Table2 },
  ] as const

  return (
    <div className="mx-auto w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-950 text-center font-sans">
      <div className="mb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
          Chakra UI v3 / Ark UI
        </span>
        <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">Segmented Control</h3>
        <p className="text-xs text-zinc-500">Zag.js machine-driven state transition</p>
      </div>

      {/* Segmented Pill Container */}
      <div className="relative flex rounded-2xl bg-zinc-100 p-1 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800">
        {options.map((opt) => {
          const isSelected = selected === opt.id
          const Icon = opt.icon
          return (
            <button
              key={opt.id}
              onClick={() => setSelected(opt.id)}
              className={`relative flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition-all duration-200 ${
                isSelected
                  ? "bg-white text-teal-700 shadow-sm dark:bg-zinc-800 dark:text-teal-300 font-bold"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{opt.label}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-4 rounded-xl border border-dashed border-zinc-200 p-3 dark:border-zinc-800 text-xs text-zinc-500">
        Active Layout: <strong className="font-mono text-teal-600 dark:text-teal-400 uppercase">{selected}</strong>
      </div>
    </div>
  )
}
export default ChakraSegmentedControl
