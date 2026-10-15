import React from "react"
import { CheckCircle2, X } from "lucide-react"

interface ToastProps {
  message: string | null
  submessage?: string
  onClose: () => void
}

export function Toast({ message, submessage, onClose }: ToastProps) {
  if (!message) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 flex items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-white/95 p-3.5 sm:px-5 sm:py-3.5 shadow-2xl backdrop-blur-md animate-in slide-in-from-top-2 fade-in dark:border-zinc-800 dark:bg-zinc-900/95">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
            {message}
          </p>
          {submessage && (
            <p className="text-[11px] text-zinc-500 truncate">{submessage}</p>
          )}
        </div>
      </div>
      <button
        onClick={onClose}
        aria-label="Dismiss toast"
        className="ml-2 shrink-0 rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
