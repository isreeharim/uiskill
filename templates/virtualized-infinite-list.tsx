import * as React from "react"
import { Search, Zap, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react"

export interface LogItem {
  id: number
  timestamp: string
  level: "INFO" | "WARN" | "SUCCESS"
  service: string
  message: string
  latencyMs: number
}

// Generate 5,000 realistic telemetry records for instant virtualized scrolling
const sampleLogs: LogItem[] = Array.from({ length: 5000 }, (_, i) => {
  const levels: ("INFO" | "WARN" | "SUCCESS")[] = ["INFO", "SUCCESS", "INFO", "WARN", "SUCCESS"]
  const services = ["auth-service", "billing-worker", "edge-router", "database-pool", "payment-gateway"]
  const level = levels[i % levels.length]
  const service = services[i % services.length]

  return {
    id: i + 1,
    timestamp: `2026-10-15T15:${String(Math.floor(i / 60) % 60).padStart(2, "0")}:${String(i % 60).padStart(2, "0")}.${String(i % 1000).padStart(3, "0")}Z`,
    level,
    service,
    message:
      level === "SUCCESS"
        ? `Request successfully processed for tenant_${(i % 45) + 100}`
        : level === "WARN"
        ? `High memory pressure detected on container node worker-${(i % 12) + 1}`
        : `Incoming TLS connection established from edge point-of-presence`,
    latencyMs: 12 + (i % 87),
  }
})

/**
 * High-Performance Virtualized List
 * Inspired by react-virtualized & react-window (Brian Vaughn).
 * Renders only the visible window of elements for butter-smooth 60 FPS scrolling through 5,000+ records.
 */
export function VirtualizedInfiniteList() {
  const [search, setSearch] = React.useState("")
  const [scrollTop, setScrollTop] = React.useState(0)

  const itemHeight = 56
  const viewportHeight = 336 // 6 items visible at a time

  // Filter items
  const filteredLogs = React.useMemo(() => {
    if (!search.trim()) return sampleLogs
    const q = search.toLowerCase()
    return sampleLogs.filter(
      (log) =>
        log.service.toLowerCase().includes(q) ||
        log.message.toLowerCase().includes(q) ||
        log.level.toLowerCase().includes(q)
    )
  }, [search])

  // Windowing calculations
  const totalCount = filteredLogs.length
  const totalHeight = totalCount * itemHeight
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 2)
  const visibleCount = Math.ceil(viewportHeight / itemHeight) + 4
  const endIndex = Math.min(totalCount, startIndex + visibleCount)

  const visibleItems = filteredLogs.slice(startIndex, endIndex)
  const offsetY = startIndex * itemHeight

  return (
    <div className="w-full space-y-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs dark:border-zinc-800 dark:bg-zinc-950">
      {/* Header & Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              Virtualized Telemetry Stream
            </h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {totalCount.toLocaleString()} real-time items rendered with DOM node recycling (Zero Lag).
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setScrollTop(0)
            }}
            placeholder="Filter 5,000 logs..."
            className="w-full rounded-lg border border-zinc-200 bg-zinc-50 py-1.5 pl-9 pr-3 text-xs text-zinc-900 outline-none transition focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
      </div>

      {/* Virtualized Container */}
      <div
        onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
        style={{ height: viewportHeight }}
        className="relative overflow-y-auto rounded-xl border border-zinc-200 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/40"
      >
        <div style={{ height: totalHeight, position: "relative" }}>
          <div style={{ transform: `translateY(${offsetY}px)`, position: "absolute", left: 0, right: 0 }}>
            {visibleItems.map((log) => {
              const isSuccess = log.level === "SUCCESS"
              const isWarn = log.level === "WARN"

              return (
                <div
                  key={log.id}
                  style={{ height: itemHeight }}
                  className="flex items-center justify-between border-b border-zinc-200/60 px-4 text-xs transition hover:bg-zinc-100/60 dark:border-zinc-800/60 dark:hover:bg-zinc-800/50"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="font-mono text-[11px] text-zinc-400">
                      #{log.id.toString().padStart(4, "0")}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                        isSuccess
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                          : isWarn
                          ? "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400"
                          : "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400"
                      }`}
                    >
                      {isSuccess ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : isWarn ? (
                        <AlertTriangle className="h-3 w-3" />
                      ) : (
                        <ShieldCheck className="h-3 w-3" />
                      )}
                      {log.level}
                    </span>

                    <span className="font-mono text-zinc-500 dark:text-zinc-400">
                      [{log.service}]
                    </span>

                    <span className="truncate text-zinc-800 dark:text-zinc-200">
                      {log.message}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono text-[11px] text-zinc-400">
                      {log.latencyMs}ms
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
