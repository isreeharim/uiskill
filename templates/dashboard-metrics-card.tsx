import * as React from "react"
import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react"

export interface MetricCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  period?: string
  sparklineData?: number[]
}

/**
 * High-Converting SaaS Metric Summary Card
 * Modeled after Untitled UI & AlignUI design system standards.
 */
export function DashboardMetricsCard({
  title,
  value,
  change,
  trend,
  period = "vs. last month",
  sparklineData = [12, 18, 14, 25, 22, 38, 42],
}: MetricCardProps) {
  const isUp = trend === "up"

  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{title}</h3>
        <button
          type="button"
          aria-label="More options"
          className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <span className="text-3xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            {value}
          </span>
          <div className="mt-3 flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold ${
                isUp
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                  : "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400"
              }`}
            >
              {isUp ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {change}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">{period}</span>
          </div>
        </div>

        {/* Minimal inline SVG Sparkline */}
        <div className="h-10 w-24">
          <svg className="h-full w-full overflow-visible" viewBox="0 0 100 40">
            <polyline
              fill="none"
              stroke={isUp ? "#10b981" : "#f43f5e"}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={sparklineData
                .map((d, i) => `${(i / (sparklineData.length - 1)) * 100},${40 - (d / 50) * 35}`)
                .join(" ")}
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
