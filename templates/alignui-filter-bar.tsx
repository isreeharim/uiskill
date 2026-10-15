"use client"

import * as React from "react"
import { X, SlidersHorizontal } from "lucide-react"

export function AlignUIFilterBar() {
  const [selectedTags, setSelectedTags] = React.useState<string[]>(["Production", "SOC2"])

  const tags = ["Production", "Staging", "SOC2", "EU-West", "High-Priority"]

  const toggleTag = (t: string) => {
    setSelectedTags((prev) =>
      prev.includes(t) ? prev.filter((item) => item !== t) : [...prev, t]
    )
  }

  return (
    <div className="mx-auto w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-5 shadow-md dark:border-zinc-800 dark:bg-zinc-950 font-sans">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-purple-500/10 p-1.5 text-purple-600 dark:text-purple-400">
            <SlidersHorizontal className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              AlignUI Multi-Select Filter Bar
            </h3>
            <p className="text-[10px] text-zinc-400">OKLCH color space & compound pills</p>
          </div>
        </div>

        {selectedTags.length > 0 && (
          <button
            onClick={() => setSelectedTags([])}
            className="text-[10px] font-bold text-rose-500 hover:underline"
          >
            Clear ({selectedTags.length})
          </button>
        )}
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap gap-1.5 items-center">
        {tags.map((tag) => {
          const isSelected = selectedTags.includes(tag)
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition flex items-center gap-1.5 ${
                isSelected
                  ? "bg-purple-600 text-white shadow-xs"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
              }`}
            >
              <span>{tag}</span>
              {isSelected ? (
                <X className="h-3 w-3" />
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
              )}
            </button>
          )
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500">
        <span>Active Filters Applied:</span>
        <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
          {selectedTags.length === 0 ? "None" : selectedTags.join(", ")}
        </span>
      </div>
    </div>
  )
}
export default AlignUIFilterBar
