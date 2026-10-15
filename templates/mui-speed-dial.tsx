"use client"

import * as React from "react"
import { Plus, Copy, Share2, Edit3, Trash2 } from "lucide-react"

export function MUISpeedDial() {
  const [open, setOpen] = React.useState(false)
  const [lastAction, setLastAction] = React.useState<string>("Click + to expand speed dial")

  const actions = [
    { name: "Copy Link", icon: Copy, color: "text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/50" },
    { name: "Share Report", icon: Share2, color: "text-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/50" },
    { name: "Edit Template", icon: Edit3, color: "text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/50" },
    { name: "Archive Item", icon: Trash2, color: "text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50" },
  ]

  const handleAction = (name: string) => {
    setLastAction(`Triggered: ${name}`)
    setOpen(false)
  }

  return (
    <div className="mx-auto w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-950 flex flex-col items-center justify-between min-h-[260px] relative">
      <div className="text-center">
        <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
          MUI Speed Dial Pattern
        </span>
        <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">Quick Action Trigger</h3>
        <p className="mt-1 text-xs text-zinc-500 font-mono">{lastAction}</p>
      </div>

      {/* Floating Speed Dial Anchor */}
      <div className="relative flex flex-col items-center mt-6">
        {/* Child Actions */}
        {open && (
          <div className="flex flex-col items-center gap-2 mb-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
            {actions.map((act) => {
              const Icon = act.icon
              return (
                <button
                  key={act.name}
                  onClick={() => handleAction(act.name)}
                  className={`flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold shadow-md dark:border-zinc-700 dark:bg-zinc-900 transition-all active:scale-95 ${act.color}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{act.name}</span>
                </button>
              )
            })}
          </div>
        )}

        {/* Master FAB Button */}
        <button
          onClick={() => setOpen(!open)}
          className={`flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl shadow-blue-500/30 transition-all duration-300 hover:bg-blue-500 active:scale-90 ${
            open ? "rotate-45 bg-rose-600 hover:bg-rose-500 shadow-rose-500/30" : ""
          }`}
          aria-label="Speed dial action menu"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
}
export default MUISpeedDial
