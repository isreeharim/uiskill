"use client"

import * as React from "react"
import { X, Sliders } from "lucide-react"

export function ShadcnDrawerSheet() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [notifications, setNotifications] = React.useState(true)
  const [telemetry, setTelemetry] = React.useState(false)

  return (
    <div className="mx-auto w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-950 text-center font-sans">
      <div className="mb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          shadcn/ui Sheet Primitives
        </span>
        <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">Slide-over Side Sheet</h3>
        <p className="mt-1 text-xs text-zinc-500">Radix UI Dialog + Portal slide drawer pattern</p>
      </div>

      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200 transition active:scale-95 mx-auto"
      >
        <Sliders className="h-4 w-4" />
        <span>Open Configuration Sheet</span>
      </button>

      {/* Slide-over Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-white dark:bg-zinc-950 h-full p-6 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800 mb-6">
                <div>
                  <h4 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">Project Preferences</h4>
                  <p className="text-xs text-zinc-500">Manage agent workspace defaults</p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Live Agent Notifications</span>
                    <p className="text-[11px] text-zinc-500">Receive toasts when tasks complete</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => setNotifications(e.target.checked)}
                    className="h-4 w-4 rounded accent-blue-600"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Anonymous Telemetry</span>
                    <p className="text-[11px] text-zinc-500">Share token benchmarks with community</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={telemetry}
                    onChange={(e) => setTelemetry(e.target.checked)}
                    className="h-4 w-4 rounded accent-blue-600"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-500 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
export default ShadcnDrawerSheet
