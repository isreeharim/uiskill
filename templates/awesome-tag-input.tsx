"use client"

import * as React from "react"
import { X } from "lucide-react"

export function AwesomeTagInput() {
  const [tags, setTags] = React.useState<string[]>(["React", "Tailwind", "Radix", "DesignTokens"])
  const [input, setInput] = React.useState("")

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      const trimmed = input.trim().replace(/^#/, "")
      if (trimmed && !tags.includes(trimmed)) {
        setTags([...tags, trimmed])
        setInput("")
      }
    } else if (e.key === "Backspace" && !input && tags.length > 0) {
      setTags(tags.slice(0, -1))
    }
  }

  const removeTag = (t: string) => {
    setTags(tags.filter((item) => item !== t))
  }

  return (
    <div className="mx-auto w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-950 font-sans">
      <div className="mb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Awesome React Components
        </span>
        <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">Chip Tag Input Editor</h3>
        <p className="mt-1 text-xs text-zinc-500">Press Enter or comma to create a new tag</p>
      </div>

      <div className="flex flex-wrap gap-1.5 rounded-2xl border border-zinc-200 bg-zinc-50/50 p-2.5 dark:border-zinc-800 dark:bg-zinc-900/40 min-h-[90px] content-start">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 rounded-xl bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/50 dark:border-blue-800/40"
          >
            <span>#{tag}</span>
            <button
              onClick={() => removeTag(tag)}
              className="text-blue-400 hover:text-blue-600 dark:hover:text-blue-200"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length < 6 ? "Add tag..." : ""}
          className="flex-1 min-w-[80px] bg-transparent text-xs text-zinc-800 outline-none placeholder-zinc-400 dark:text-zinc-200"
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-400">
        <span>Backspace removes last tag</span>
        <span className="font-mono">{tags.length} tags added</span>
      </div>
    </div>
  )
}
export default AwesomeTagInput
