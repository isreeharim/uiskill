"use client"

import * as React from "react"
import { AlertCircle, X, ArrowRight } from "lucide-react"

export function BaseWebNotificationBanner() {
  const [dismissed, setDismissed] = React.useState(false)

  if (dismissed) {
    return (
      <div className="mx-auto w-full max-w-lg p-6 text-center">
        <button
          onClick={() => setDismissed(false)}
          className="rounded-xl border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
        >
          Restore Uber Base Web Banner
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-950 dark:border-amber-500/20 dark:bg-amber-950/20 dark:text-amber-200 shadow-sm animate-in fade-in">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-amber-500/20 p-2 text-amber-600 dark:text-amber-400 shrink-0">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold">Planned Maintenance Window</h4>
            <p className="mt-1 text-xs opacity-90 leading-relaxed">
              API gateway v2 cluster failover scheduled for Sunday at 02:00 UTC. Secondary failover routes are active.
            </p>
            <div className="mt-3 flex items-center gap-3">
              <button className="flex items-center gap-1 text-xs font-bold text-amber-700 dark:text-amber-300 hover:underline">
                <span>View Status Page</span>
                <ArrowRight className="h-3 w-3" />
              </button>
              <span className="text-xs opacity-60">• Base Web Alert Slot</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="rounded-lg p-1 text-amber-700/60 hover:bg-amber-500/20 hover:text-amber-900 dark:text-amber-400 dark:hover:text-amber-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
export default BaseWebNotificationBanner
