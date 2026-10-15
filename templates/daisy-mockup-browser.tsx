"use client"

import * as React from "react"
import { Lock, ArrowLeft, ArrowRight, RotateCw, Sparkles, Check } from "lucide-react"

export function DaisyMockupBrowser() {
  const activeUrl = "https://studio.skill-ui.dev"
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(activeUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mx-auto w-full max-w-lg overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950">
      {/* Browser Chrome Header */}
      <div className="flex items-center gap-3 border-b border-zinc-200 bg-zinc-100/80 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/80">
        {/* Traffic Lights */}
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-rose-500/80" />
          <div className="h-3 w-3 rounded-full bg-amber-500/80" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-1 text-zinc-400">
          <button className="rounded p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800">
            <ArrowLeft className="h-3.5 w-3.5" />
          </button>
          <button className="rounded p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800">
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
          <button className="rounded p-1 hover:bg-zinc-200 dark:hover:bg-zinc-800">
            <RotateCw className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Address Bar */}
        <div className="flex flex-1 items-center justify-between rounded-xl border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          <div className="flex items-center gap-1.5 truncate">
            <Lock className="h-3 w-3 text-emerald-500 shrink-0" />
            <span className="font-mono text-[11px] truncate">{activeUrl}</span>
          </div>
          <button
            onClick={handleCopy}
            className="text-[10px] text-blue-500 hover:underline shrink-0 ml-1"
          >
            {copied ? <Check className="h-3 w-3 text-emerald-500" /> : "Copy"}
          </button>
        </div>
      </div>

      {/* Browser Viewport Content */}
      <div className="p-6 bg-grid-pattern min-h-[160px] flex flex-col items-center justify-center text-center">
        <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white mb-2 shadow-md">
          <Sparkles className="h-5 w-5" />
        </div>
        <h4 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">DaisyUI Clean Window Container</h4>
        <p className="mt-1 text-xs text-zinc-500 max-w-xs">
          Zero-runtime CSS container component modeled after semantic DaisyUI browser mockup classes.
        </p>
      </div>
    </div>
  )
}
export default DaisyMockupBrowser
