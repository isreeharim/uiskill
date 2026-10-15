"use client"

import * as React from "react"
import { Play, Pause, SkipForward, Sparkles } from "lucide-react"

export function TwentyFirstDynamicIsland() {
  const [expanded, setExpanded] = React.useState(false)
  const [isPlaying, setIsPlaying] = React.useState(true)

  return (
    <div className="mx-auto w-full max-w-sm rounded-3xl border border-zinc-200 bg-zinc-950 p-6 shadow-xl text-center text-white min-h-[220px] flex flex-col justify-between items-center">
      <div className="w-full flex items-center justify-between text-xs text-zinc-400 mb-2">
        <span className="font-bold text-[10px] uppercase tracking-wider text-purple-400">
          21st.dev Dynamic Island
        </span>
        <span>Click pill to toggle</span>
      </div>

      {/* Dynamic Island Capsule */}
      <div
        onClick={() => setExpanded(!expanded)}
        className={`cursor-pointer rounded-full bg-zinc-900 border border-zinc-800 transition-all duration-300 flex items-center shadow-2xl ${
          expanded
            ? "w-72 px-4 py-3 justify-between"
            : "w-44 px-3 py-1.5 justify-between hover:w-48"
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center shrink-0">
            <Sparkles className="h-3 w-3 text-white" />
          </div>
          <div className="text-left truncate">
            <p className="text-xs font-bold leading-none truncate">Midnight City</p>
            {expanded && <p className="text-[10px] text-zinc-400 mt-0.5">M83 • Hurry Up, We're Dreaming</p>}
          </div>
        </div>

        {/* Dynamic Controls */}
        <div className="flex items-center gap-2">
          {expanded ? (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsPlaying(!isPlaying)
                }}
                className="h-7 w-7 rounded-full bg-white text-zinc-950 flex items-center justify-center transition active:scale-90"
              >
                {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3 fill-current ml-0.5" />}
              </button>
              <button
                onClick={(e) => e.stopPropagation()}
                className="text-zinc-400 hover:text-white"
              >
                <SkipForward className="h-3.5 w-3.5" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-1">
              <span className="h-2 w-0.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="h-3 w-0.5 rounded-full bg-emerald-400 animate-pulse delay-75" />
              <span className="h-1.5 w-0.5 rounded-full bg-emerald-400 animate-pulse delay-150" />
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-zinc-500 mt-4">
        Expandable micro-interaction container modeled after iOS and modern hardware interfaces.
      </p>
    </div>
  )
}
export default TwentyFirstDynamicIsland
