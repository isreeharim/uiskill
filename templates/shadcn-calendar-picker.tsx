"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function ShadcnCalendarPicker() {
  const [selectedDay, setSelectedDay] = React.useState<number>(15)

  return (
    <div className="mx-auto w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-950 font-sans text-center">
      <div className="mb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          shadcn/ui Date Primitives
        </span>
        <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">Interactive Calendar</h3>
        <p className="mt-1 text-xs text-zinc-500">React DayPicker wrapper with custom Tailwind classes</p>
      </div>

      <div className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
        <div className="flex items-center justify-between text-xs font-bold text-zinc-800 dark:text-zinc-200 mb-3">
          <ChevronLeft className="h-4 w-4 text-zinc-400 cursor-pointer" />
          <span>October 2026</span>
          <ChevronRight className="h-4 w-4 text-zinc-400 cursor-pointer" />
        </div>

        <div className="grid grid-cols-7 gap-1 text-[11px] text-zinc-400 mb-2">
          <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
        </div>

        <div className="grid grid-cols-7 gap-1 text-xs font-mono">
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
            const isSelected = selectedDay === day
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`h-8 w-8 rounded-xl flex items-center justify-center transition ${
                  isSelected
                    ? "bg-blue-600 text-white font-bold shadow-sm"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                }`}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mt-3 text-xs text-zinc-500">
        Selected Date: <strong className="font-mono text-blue-600 dark:text-blue-400">Oct {selectedDay}, 2026</strong>
      </div>
    </div>
  )
}
export default ShadcnCalendarPicker
