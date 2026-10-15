"use client"

import * as React from "react"
import { Truck } from "lucide-react"

interface ShipmentRow {
  trackingId: string
  destination: string
  eta: string
  status: "In Transit" | "Delivered" | "Delayed"
  carrier: string
}

const SHIPMENTS: ShipmentRow[] = [
  { trackingId: "UBR-9041", destination: "Chicago Logistics Hub", eta: "14:20 CST", status: "In Transit", carrier: "Freight Alpha" },
  { trackingId: "UBR-8832", destination: "New York Port Pier 4", eta: "11:05 EST", status: "Delivered", carrier: "Express Express" },
  { trackingId: "UBR-7291", destination: "Dallas Metro Depot", eta: "18:45 CST", status: "Delayed", carrier: "Titan Transport" },
  { trackingId: "UBR-6510", destination: "Seattle Rail Terminal", eta: "09:30 PST", status: "In Transit", carrier: "Pacific Cargo" },
]

export function BaseWebDensityTable() {
  const [density, setDensity] = React.useState<"compact" | "spacious">("compact")

  return (
    <div className="mx-auto w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-5 shadow-md dark:border-zinc-800 dark:bg-zinc-950 font-sans">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-zinc-950 text-white p-1.5 dark:bg-zinc-100 dark:text-zinc-950">
            <Truck className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Uber Base Web Density Table
            </h3>
            <p className="text-[10px] text-zinc-400">High-throughput freight monitoring</p>
          </div>
        </div>

        <button
          onClick={() => setDensity(density === "compact" ? "spacious" : "compact")}
          className="rounded-lg border border-zinc-200 px-2 py-1 text-[11px] font-semibold text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          {density === "compact" ? "Compact View" : "Spacious View"}
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full text-left text-xs">
          <thead className="bg-zinc-100/80 dark:bg-zinc-900 text-zinc-500 font-bold uppercase text-[10px]">
            <tr>
              <th className="px-3 py-2">Tracking ID</th>
              <th className="px-3 py-2">Destination</th>
              <th className="px-3 py-2">ETA</th>
              <th className="px-3 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 font-mono text-[11px]">
            {SHIPMENTS.map((s) => (
              <tr
                key={s.trackingId}
                className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
              >
                <td className={`font-bold text-blue-600 dark:text-blue-400 ${density === "compact" ? "py-1.5 px-3" : "py-3 px-3"}`}>
                  {s.trackingId}
                </td>
                <td className={`text-zinc-700 dark:text-zinc-300 font-sans ${density === "compact" ? "py-1.5 px-3" : "py-3 px-3"}`}>
                  {s.destination}
                </td>
                <td className={`text-zinc-500 ${density === "compact" ? "py-1.5 px-3" : "py-3 px-3"}`}>
                  {s.eta}
                </td>
                <td className={density === "compact" ? "py-1.5 px-3" : "py-3 px-3"}>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      s.status === "Delivered"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                        : s.status === "Delayed"
                        ? "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400"
                        : "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400"
                    }`}
                  >
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default BaseWebDensityTable
