import * as React from "react"
import { TrendingUp, TrendingDown, Activity, DollarSign, Users, ShoppingCart } from "lucide-react"

export interface KpiMetric {
  id: string
  name: string
  value: string
  change: string
  trend: "increase" | "decrease"
  icon: React.ComponentType<{ className?: string }>
}

const defaultMetrics: KpiMetric[] = [
  {
    id: "m1",
    name: "Total Revenue",
    value: "$128,430",
    change: "+14.2%",
    trend: "increase",
    icon: DollarSign,
  },
  {
    id: "m2",
    name: "Active Customers",
    value: "2,420",
    change: "+8.1%",
    trend: "increase",
    icon: Users,
  },
  {
    id: "m3",
    name: "Conversion Rate",
    value: "3.24%",
    change: "-0.4%",
    trend: "decrease",
    icon: ShoppingCart,
  },
  {
    id: "m4",
    name: "API Health SLA",
    value: "99.98%",
    change: "Operational",
    trend: "increase",
    icon: Activity,
  },
]

/**
 * Tremor-Style Executive Analytics & KPI Dashboard
 * Modeled after Tremor (tremorlabs/tremor-npm) analytics design language.
 */
export function TremorAnalyticsDashboard({ metrics = defaultMetrics }: { metrics?: KpiMetric[] }) {
  const [selectedRange, setSelectedRange] = React.useState<"7d" | "30d" | "90d">("30d")

  // 30 days uptime mock data (true = operational, false = degraded)
  const uptimeDays = [
    true, true, true, true, true, true, true, true, true, false,
    true, true, true, true, true, true, true, true, true, true,
    true, true, true, true, true, true, true, true, true, true,
  ]

  return (
    <div className="w-full space-y-6 rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-950/50">
      {/* Header with time range selector */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Analytics Overview
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Real-time business performance and system reliability metrics.
          </p>
        </div>

        <div className="inline-flex rounded-lg border border-zinc-200 bg-white p-1 text-xs font-medium dark:border-zinc-800 dark:bg-zinc-900">
          {(["7d", "30d", "90d"] as const).map((range) => (
            <button
              key={range}
              type="button"
              onClick={() => setSelectedRange(range)}
              className={`rounded-md px-3 py-1.5 transition ${
                selectedRange === range
                  ? "bg-zinc-900 text-white shadow-xs dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              Last {range}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon
          const isIncrease = metric.trend === "increase"

          return (
            <div
              key={metric.id}
              className="rounded-xl border border-zinc-200/80 bg-white p-5 shadow-xs transition hover:shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  {metric.name}
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  <Icon className="h-4 w-4" />
                </div>
              </div>

              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {metric.value}
                </span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                    isIncrease
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                      : "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400"
                  }`}
                >
                  {isIncrease ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {metric.change}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* System Uptime Tracker (Tremor Tracker Pattern) */}
      <div className="rounded-xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Operational Status: Global API & Edge Workers
            </span>
          </div>
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            99.98% uptime in last 30 days
          </span>
        </div>

        {/* 30-Day Activity Bar Blocks */}
        <div className="mt-4 flex gap-1">
          {uptimeDays.map((isUp, index) => (
            <div
              key={index}
              title={`Day ${index + 1}: ${isUp ? "100% Operational" : "Minor Latency Incident"}`}
              className={`h-8 flex-1 rounded-xs transition hover:opacity-80 ${
                isUp
                  ? "bg-emerald-500 dark:bg-emerald-600"
                  : "bg-amber-400 dark:bg-amber-500"
              }`}
            />
          ))}
        </div>

        <div className="mt-2 flex justify-between text-[11px] text-zinc-400">
          <span>30 days ago</span>
          <span>Today</span>
        </div>
      </div>
    </div>
  )
}
