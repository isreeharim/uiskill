"use client"

import * as React from "react"
import { Bell, X, CheckCheck, AlertCircle, Info, CheckCircle, Clock } from "lucide-react"

type NotifType = "info" | "success" | "warning" | "error"

interface Notification {
  id: string
  type: NotifType
  title: string
  message: string
  time: string
  read: boolean
  avatar?: string
}

const SAMPLE: Notification[] = [
  { id: "1", type: "success", title: "Deployment complete", message: "Your app was deployed to production successfully.", time: "2m ago", read: false },
  { id: "2", type: "info", title: "Team invitation", message: "Alex Morgan invited you to join the design team.", time: "1h ago", read: false },
  { id: "3", type: "warning", title: "Usage limit approaching", message: "You've used 84% of your monthly API quota.", time: "3h ago", read: false },
  { id: "4", type: "error", title: "Payment failed", message: "Your card ending in 4242 was declined. Please update billing.", time: "1d ago", read: true },
  { id: "5", type: "info", title: "Weekly report ready", message: "Your analytics report for Oct 8-14 is available.", time: "2d ago", read: true },
]

const ICONS: Record<NotifType, React.ComponentType<{ className?: string }>> = {
  info: Info,
  success: CheckCircle,
  warning: AlertCircle,
  error: AlertCircle,
}

const COLORS: Record<NotifType, string> = {
  info:    "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400",
  success: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400",
  warning: "bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-500",
  error:   "bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400",
}

export function NotificationCenter() {
  const [open, setOpen] = React.useState(false)
  const [notifs, setNotifs] = React.useState(SAMPLE)
  const unread = notifs.filter((n) => !n.read).length

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })))
  const dismiss = (id: string) => setNotifs((prev) => prev.filter((n) => n.id !== id))

  // Escape key listener
  React.useEffect(() => {
    if (!open) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [open])

  return (
    <div className="relative">
      {/* Bell Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 shadow-xs hover:bg-zinc-50 hover:text-zinc-900 transition dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
        aria-label={`${unread} unread notifications`}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <Bell className="h-4 w-4" />
        {unread > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-11 z-40 w-[calc(100vw-2.5rem)] sm:w-96 max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 animate-in slide-in-from-top-2 fade-in duration-150">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-3.5 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Notifications</span>
                {unread > 0 && (
                  <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                    {unread} new
                  </span>
                )}
              </div>
              <button
                onClick={markAllRead}
                className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-300 transition"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Mark all read
              </button>
            </div>

            {/* List */}
            <div className="max-h-80 divide-y divide-zinc-100 overflow-y-auto dark:divide-zinc-800/70">
              {notifs.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-12 text-zinc-400">
                  <Bell className="h-8 w-8 opacity-40" />
                  <p className="text-sm">All caught up!</p>
                </div>
              ) : (
                notifs.map((n) => {
                  const Icon = ICONS[n.type]
                  return (
                    <div
                      key={n.id}
                      className={`relative flex items-start gap-3 px-5 py-3.5 transition hover:bg-zinc-50 dark:hover:bg-zinc-900 ${
                        !n.read ? "bg-blue-50/30 dark:bg-blue-950/10" : ""
                      }`}
                    >
                      {/* Icon */}
                      <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${COLORS[n.type]}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      {/* Content */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            {!n.read && (
                              <span className="h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                            )}
                            <p className={`text-sm font-semibold truncate ${!n.read ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-600 dark:text-zinc-400"}`}>
                              {n.title}
                            </p>
                          </div>
                          <button
                            onClick={() => dismiss(n.id)}
                            aria-label="Dismiss notification"
                            className="shrink-0 rounded-md p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-300 transition"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="mt-0.5 text-xs text-zinc-500 leading-relaxed">{n.message}</p>
                        <div className="mt-1.5 flex items-center gap-1 text-xs text-zinc-400">
                          <Clock className="h-3 w-3" />
                          <span>{n.time}</span>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-zinc-200 px-5 py-3 dark:border-zinc-800">
              <button
                onClick={() => alert("All notifications history page")}
                className="w-full text-center text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                View all notifications →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
