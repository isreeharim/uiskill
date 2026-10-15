"use client"

import * as React from "react"
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react"

export function DaisyStatsKPI() {
  const [activeRange, setActiveRange] = React.useState<"7d" | "30d" | "90d">("30d")

  return (
    <div className="mx-auto w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between mb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            DaisyUI Analytics Engine
          </span>
          <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">Monthly Performance Stats</h3>
        </div>
        <div className="flex items-center gap-1 rounded-xl bg-zinc-100 p-1 dark:bg-zinc-900 text-xs">
          {(["7d", "30d", "90d"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setActiveRange(r)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
                activeRange === r
                  ? "bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Total Revenue */}
        <div className="rounded-2xl border border-zinc-100 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 font-medium">Total Volume</span>
            <div className="rounded-lg bg-emerald-500/10 p-1.5 text-emerald-600 dark:text-emerald-400">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-zinc-950 dark:text-zinc-50">$89,420</p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <TrendingUp className="h-3.5 w-3.5" />
            <span>+24.8% from previous period</span>
          </div>
        </div>

        {/* Active Subscribers */}
        <div className="rounded-2xl border border-zinc-100 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 font-medium">Active Accounts</span>
            <div className="rounded-lg bg-blue-500/10 p-1.5 text-blue-600 dark:text-blue-400">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-2 text-2xl font-black text-zinc-950 dark:text-zinc-50">4,280</p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-semibold">
            <Activity className="h-3.5 w-3.5" />
            <span>88% retention rate</span>
          </div>
        </div>
      </div>

      {/* Radial Bar Metric */}
      <div className="mt-4 flex items-center justify-between rounded-2xl border border-dashed border-zinc-200 p-3.5 dark:border-zinc-800 text-xs">
        <div>
          <span className="font-bold text-zinc-900 dark:text-zinc-100">Server Capacity</span>
          <p className="text-[11px] text-zinc-500">Global edge cluster utilization</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-24 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
            <div className="h-full w-3/4 rounded-full bg-emerald-500" />
          </div>
          <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">76%</span>
        </div>
      </div>
    </div>
  )
}
export default DaisyStatsKPI
