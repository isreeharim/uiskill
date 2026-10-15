"use client"

import * as React from "react"
import { Sparkles, ArrowRight, Check } from "lucide-react"

export function TwentyFirstGlowingButton() {
  const [clicked, setClicked] = React.useState(false)

  const handleClick = () => {
    setClicked(true)
    setTimeout(() => setClicked(false), 2000)
  }

  return (
    <div className="mx-auto w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-950 text-center font-sans">
      <div className="mb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
          21st.dev Interactive Motion
        </span>
        <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">Glowing Accent Button</h3>
        <p className="mt-1 text-xs text-zinc-500">Hardware-accelerated CSS animated gradient border</p>
      </div>

      <div className="my-6 flex justify-center">
        <button
          onClick={handleClick}
          className="relative inline-flex items-center justify-center p-0.5 overflow-hidden rounded-2xl font-bold text-xs group active:scale-95 transition"
        >
          {/* Animated gradient ring */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 group-hover:from-purple-500 group-hover:to-blue-500 animate-pulse" />
          <span className="relative flex items-center gap-2 px-6 py-3 transition-all ease-out bg-zinc-950 rounded-[14px] text-white group-hover:bg-opacity-90">
            {clicked ? <Check className="h-4 w-4 text-emerald-400" /> : <Sparkles className="h-4 w-4 text-purple-400" />}
            <span>{clicked ? "Triggered Action!" : "Deploy Instant Replica"}</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </button>
      </div>

      <p className="text-[11px] text-zinc-400">Click to preview micro-interaction feedback</p>
    </div>
  )
}
export default TwentyFirstGlowingButton
