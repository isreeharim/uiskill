"use client"

import * as React from "react"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react"

export function AriaDateRangePicker() {
  const [selectedRange, setSelectedRange] = React.useState<string>("Oct 1 - Oct 15, 2026")
  const [activePreset, setActivePreset] = React.useState<string>("This Month")

  const presets = ["Today", "Last 7 Days", "This Month", "Last Quarter"]

  const handlePreset = (preset: string) => {
    setActivePreset(preset)
    if (preset === "Today") setSelectedRange("Oct 15, 2026")
    else if (preset === "Last 7 Days") setSelectedRange("Oct 8 - Oct 15, 2026")
    else if (preset === "This Month") setSelectedRange("Oct 1 - Oct 31, 2026")
    else setSelectedRange("Jul 1 - Sep 30, 2026")
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-950 font-sans">
      <div className="mb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          React Spectrum DatePicker
        </span>
        <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">Range Calendar Selector</h3>
      </div>

      {/* Preset Pills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {presets.map((p) => (
          <button
            key={p}
            onClick={() => handlePreset(p)}
            className={`rounded-xl px-2.5 py-1 text-xs font-semibold transition ${
              activePreset === p
                ? "bg-blue-600 text-white shadow-xs"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Selected Range Display Bar */}
      <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50/80 p-3 text-xs dark:border-zinc-800 dark:bg-zinc-900/60">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-blue-500" />
          <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">{selectedRange}</span>
        </div>
        <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
          Selected
        </span>
      </div>

      {/* Calendar Grid Preview Mock */}
      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800 text-center">
        <div className="flex items-center justify-between text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-2">
          <ChevronLeft className="h-4 w-4 text-zinc-400 cursor-pointer" />
          <span>October 2026</span>
          <ChevronRight className="h-4 w-4 text-zinc-400 cursor-pointer" />
        </div>
        <div className="grid grid-cols-7 gap-1 text-[11px] text-zinc-400 mb-1">
          <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
        </div>
        <div className="grid grid-cols-7 gap-1 text-[11px] font-mono">
          <span className="p-1 text-zinc-300 dark:text-zinc-700">28</span>
          <span className="p-1 text-zinc-300 dark:text-zinc-700">29</span>
          <span className="p-1 text-zinc-300 dark:text-zinc-700">30</span>
          <span className="p-1 rounded-md bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200 font-bold">1</span>
          <span className="p-1 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">2</span>
          <span className="p-1 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">3</span>
          <span className="p-1 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">4</span>
          <span className="p-1 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">5</span>
          <span className="p-1 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">6</span>
          <span className="p-1 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">7</span>
          <span className="p-1 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">8</span>
          <span className="p-1 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">9</span>
          <span className="p-1 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">10</span>
          <span className="p-1 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">11</span>
          <span className="p-1 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">12</span>
          <span className="p-1 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">13</span>
          <span className="p-1 rounded-md bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300">14</span>
          <span className="p-1 rounded-md bg-blue-600 text-white font-bold shadow-xs">15</span>
          <span className="p-1 text-zinc-600 dark:text-zinc-400">16</span>
          <span className="p-1 text-zinc-600 dark:text-zinc-400">17</span>
          <span className="p-1 text-zinc-600 dark:text-zinc-400">18</span>
        </div>
      </div>
    </div>
  )
}
export default AriaDateRangePicker
