import React, { useState } from "react"
import { Copy, Check, Maximize2, Terminal, Code2, Sparkles } from "lucide-react"
import { ComponentItem } from "../data/components-data"

interface ComponentCardProps {
  item: ComponentItem
  onInspect: (item: ComponentItem) => void
  onTriggerToast: (msg: string, sub?: string) => void
}

export function ComponentCard({ item, onInspect, onTriggerToast }: ComponentCardProps) {
  const [copiedCode, setCopiedCode] = useState(false)
  const [copiedCli, setCopiedCli] = useState(false)
  const Component = item.previewComponent

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(item.code)
    setCopiedCode(true)
    onTriggerToast(`Copied ${item.name} TSX code!`, "Ready to paste into your React project")
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const handleCopyCli = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(item.installCommand)
    setCopiedCli(true)
    onTriggerToast(`Copied install command!`, item.installCommand)
    setTimeout(() => setCopiedCli(false), 2000)
  }

  return (
    <div className="group relative flex flex-col rounded-3xl border border-zinc-200/80 bg-white shadow-xs transition-all duration-300 hover:border-zinc-300 hover:shadow-xl dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700 overflow-hidden">
      {/* Card Header */}
      <div className="flex items-start justify-between border-b border-zinc-100 p-5 dark:border-zinc-800/60">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
              {item.category}
            </span>
            <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-400">
              {item.system}
            </span>
          </div>
          <h3 className="text-base font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
            {item.name}
          </h3>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-1.5 shrink-0 ml-3">
          <button
            onClick={handleCopyCli}
            title={`Copy install command: ${item.installCommand}`}
            className="rounded-xl border border-zinc-200 bg-zinc-50 p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition"
          >
            {copiedCli ? <Check className="h-4 w-4 text-emerald-500" /> : <Terminal className="h-4 w-4" />}
          </button>
          <button
            onClick={handleCopyCode}
            title="Copy component TSX source"
            className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition ${
              copiedCode
                ? "bg-emerald-600 text-white"
                : "bg-blue-600 text-white hover:bg-blue-500 shadow-sm"
            }`}
          >
            {copiedCode ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span className="hidden sm:inline">{copiedCode ? "Copied" : "Copy TSX"}</span>
          </button>
          <button
            onClick={() => onInspect(item)}
            title="Inspect in full view"
            className="rounded-xl border border-zinc-200 bg-white p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Live Preview Stage */}
      <div
        onClick={(e) => {
          const target = e.target as HTMLElement
          if (target.closest("button, input, a, select, textarea, [role='button'], [role='switch'], [role='option'], th, td, label")) {
            return
          }
          onInspect(item)
        }}
        className="relative flex-1 min-h-[260px] max-h-[380px] overflow-auto p-4 bg-grid-pattern bg-zinc-50/50 dark:bg-zinc-900/30 transition-colors group-hover:bg-zinc-50/80 dark:group-hover:bg-zinc-900/50"
      >
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full scale-[0.95] origin-top transition-transform group-hover:scale-[0.98]">
            <Component />
          </div>
        </div>

        {/* Hover inspect banner - non-blocking */}
        <div className="absolute inset-x-0 bottom-0 py-2 bg-gradient-to-t from-zinc-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-zinc-900 shadow-md backdrop-blur-sm dark:bg-zinc-900/90 dark:text-zinc-100">
            Click card to inspect code & viewports ➔
          </span>
        </div>
      </div>

      {/* Card Footer */}
      <div className="flex items-center justify-between border-t border-zinc-100 px-5 py-3 text-[11px] text-zinc-400 dark:border-zinc-800/60 dark:text-zinc-500">
        <div className="flex flex-wrap items-center gap-1.5">
          {item.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="font-mono text-[10px] text-zinc-400">
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono">{item.fileName.split("/").pop()}</span>
        </div>
      </div>
    </div>
  )
}
