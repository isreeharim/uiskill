import { Clock } from "lucide-react"

interface TimelineEvent {
  id: string
  title: string
  description: string
  timestamp: string
  status: "success" | "warning" | "info"
  actor: string
}

const EVENTS: TimelineEvent[] = [
  {
    id: "1",
    title: "Production Deployment v2.4.0",
    description: "Automated canary release successfully rolled out across US-East cluster.",
    timestamp: "12 mins ago",
    status: "success",
    actor: "GitHub Actions",
  },
  {
    id: "2",
    title: "Database Schema Migration",
    description: "Added index on tenant_id column; 0ms downtime recorded.",
    timestamp: "45 mins ago",
    status: "info",
    actor: "Prisma CLI",
  },
  {
    id: "3",
    title: "Security Rate Limit Triggered",
    description: "Excessive auth requests blocked from IP 192.168.1.104.",
    timestamp: "2 hours ago",
    status: "warning",
    actor: "Cloudflare WAF",
  },
]

export function MUIActivityTimeline() {
  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between mb-5">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Material Design Timeline
          </span>
          <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">Audit & Event Stream</h3>
        </div>
        <Clock className="h-4 w-4 text-zinc-400" />
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:bottom-2 before:left-2.5 before:top-2 before:w-0.5 before:bg-zinc-200 dark:before:bg-zinc-800">
        {EVENTS.map((evt) => {
          const getStatusDot = (status: TimelineEvent["status"]) => {
            switch (status) {
              case "success":
                return "bg-emerald-500 ring-emerald-100 dark:ring-emerald-950"
              case "warning":
                return "bg-amber-500 ring-amber-100 dark:ring-amber-950"
              default:
                return "bg-blue-500 ring-blue-100 dark:ring-blue-950"
            }
          }

          return (
            <div key={evt.id} className="relative group">
              {/* Dot */}
              <span
                className={`absolute -left-6 top-1 h-3.5 w-3.5 rounded-full ring-4 ${getStatusDot(
                  evt.status
                )}`}
              />

              <div className="rounded-2xl border border-zinc-100 bg-zinc-50/70 p-3.5 transition hover:border-zinc-200 dark:border-zinc-800/80 dark:bg-zinc-900/50">
                <div className="flex items-center justify-between text-xs">
                  <h4 className="font-bold text-zinc-900 dark:text-zinc-100">{evt.title}</h4>
                  <span className="text-[10px] text-zinc-400 font-medium">{evt.timestamp}</span>
                </div>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {evt.description}
                </p>
                <div className="mt-2.5 flex items-center justify-between text-[10px] text-zinc-400">
                  <span className="font-mono">Actor: {evt.actor}</span>
                  <span className="capitalize font-semibold text-zinc-600 dark:text-zinc-300">
                    {evt.status}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default MUIActivityTimeline
