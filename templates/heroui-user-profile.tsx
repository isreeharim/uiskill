"use client"

import * as React from "react"
import { CheckCircle2 } from "lucide-react"

export function HeroUIUserProfile() {
  const [following, setFollowing] = React.useState(false)

  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/70 p-6 shadow-xl backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/70 transition-all hover:shadow-2xl">
      {/* Top Banner / Avatar */}
      <div className="flex items-start justify-between">
        <div className="relative">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-purple-500 via-indigo-500 to-pink-500 p-0.5 shadow-lg shadow-purple-500/25">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-zinc-950 text-xl font-black text-white">
              SC
            </div>
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-950">
            <CheckCircle2 className="h-3.5 w-3.5 text-white" />
          </span>
        </div>

        <button
          onClick={() => setFollowing(!following)}
          className={`rounded-2xl px-4 py-2 text-xs font-bold transition-all active:scale-95 ${
            following
              ? "border border-zinc-200 bg-zinc-100 text-zinc-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
              : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20 hover:opacity-95"
          }`}
        >
          {following ? "Following" : "Follow"}
        </button>
      </div>

      {/* Info */}
      <div className="mt-4">
        <div className="flex items-center gap-1.5">
          <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">Sarah Chen</h3>
          <span className="rounded-full bg-purple-500/10 px-2 py-0.5 text-[10px] font-semibold text-purple-600 dark:text-purple-400">
            PRO
          </span>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">@sarahchen • Staff Design Engineer</p>
      </div>

      <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
        Crafting accessible design systems and generative UI interfaces. Contributor to HeroUI, Radix, and Tailwind.
      </p>

      {/* Metrics */}
      <div className="mt-4 flex items-center justify-between rounded-2xl bg-zinc-50 p-3 dark:bg-zinc-900/60 text-xs">
        <div>
          <span className="font-extrabold text-zinc-900 dark:text-zinc-100">14.8k</span>
          <p className="text-[10px] text-zinc-500">Followers</p>
        </div>
        <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800" />
        <div>
          <span className="font-extrabold text-zinc-900 dark:text-zinc-100">892</span>
          <p className="text-[10px] text-zinc-500">Following</p>
        </div>
        <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800" />
        <div>
          <span className="font-extrabold text-zinc-900 dark:text-zinc-100">142</span>
          <p className="text-[10px] text-zinc-500">Components</p>
        </div>
      </div>
    </div>
  )
}
export default HeroUIUserProfile
