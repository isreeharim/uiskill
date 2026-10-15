"use client"

import * as React from "react"
import { Phone, Video, Mail, MessageSquare, MoreHorizontal } from "lucide-react"

type PresenceState = "Available" | "Busy" | "Away"

export function FluentPersonaBadge() {
  const [presence, setPresence] = React.useState<PresenceState>("Available")

  const getPresenceColor = (p: PresenceState) => {
    switch (p) {
      case "Available":
        return "bg-emerald-500 ring-emerald-200 dark:ring-emerald-900"
      case "Busy":
        return "bg-rose-500 ring-rose-200 dark:ring-rose-900"
      case "Away":
        return "bg-amber-500 ring-amber-200 dark:ring-amber-900"
    }
  }

  return (
    <div className="mx-auto w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-950 font-sans">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Microsoft Fluent UI Persona
        </span>
        <button className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center gap-4">
        {/* Avatar with Presence Ring */}
        <div className="relative shrink-0">
          <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-lg font-bold text-white shadow-md">
            AK
          </div>
          <span
            className={`absolute bottom-0 right-0 h-4 w-4 rounded-full ring-2 ${getPresenceColor(
              presence
            )}`}
          />
        </div>

        {/* User Details */}
        <div className="truncate">
          <h4 className="text-sm font-bold text-zinc-950 dark:text-zinc-50 truncate">Alex Kuznetsov</h4>
          <p className="text-xs text-zinc-500 truncate">Principal Solutions Architect</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-[10px] font-medium text-zinc-400">Status:</span>
            <select
              value={presence}
              onChange={(e) => setPresence(e.target.value as PresenceState)}
              className="text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-800 rounded-md px-1.5 py-0.5 text-zinc-700 dark:text-zinc-300 outline-none"
            >
              <option value="Available">Available</option>
              <option value="Busy">Busy</option>
              <option value="Away">Away</option>
            </select>
          </div>
        </div>
      </div>

      {/* Fluent Quick Communication Bar */}
      <div className="mt-5 grid grid-cols-4 gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
        <button className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition text-zinc-600 dark:text-zinc-400">
          <MessageSquare className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span className="text-[10px]">Chat</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition text-zinc-600 dark:text-zinc-400">
          <Mail className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          <span className="text-[10px]">Email</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition text-zinc-600 dark:text-zinc-400">
          <Video className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span className="text-[10px]">Teams</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition text-zinc-600 dark:text-zinc-400">
          <Phone className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <span className="text-[10px]">Call</span>
        </button>
      </div>
    </div>
  )
}
export default FluentPersonaBadge
