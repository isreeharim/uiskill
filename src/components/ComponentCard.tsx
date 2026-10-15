import React, { useState, useRef } from "react"
import {
  Copy,
  Check,
  Maximize2,
  Terminal,
  MousePointer2,
  Lock,
  Layers,
  FileCode2
} from "lucide-react"
import { ComponentItem } from "../data/components-data"

export interface ComponentCardProps {
  item: ComponentItem
  onInspect: (item: ComponentItem) => void
  onTriggerToast: (msg: string, sub?: string) => void
  viewMode?: "grid" | "list"
  density?: "grid" | "list"
}

/**
 * Compact high-density row view for fast scanning in List View mode
 */
export function ComponentRow({
  item,
  onInspect,
  onTriggerToast,
}: {
  item: ComponentItem
  onInspect: (item: ComponentItem) => void
  onTriggerToast: (msg: string, sub?: string) => void
}) {
  const [copiedCode, setCopiedCode] = useState(false)
  const [copiedCli, setCopiedCli] = useState(false)

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
    onTriggerToast("Copied CLI command!", item.installCommand)
    setTimeout(() => setCopiedCli(false), 2000)
  }

  return (
    <div
      onClick={() => onInspect(item)}
      className="group relative flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-zinc-200/80 bg-white hover:border-zinc-300 hover:bg-zinc-50/70 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/50 transition-all duration-150 cursor-pointer"
    >
      {/* Left: Name, Framework, Category, & Description */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform duration-150">
          <Layers className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-xs text-zinc-950 dark:text-zinc-50 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {item.name}
            </span>
            <span className="font-mono text-[10px] rounded-md px-1.5 py-0.5 bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60 shrink-0">
              {item.system}
            </span>
            <span className="rounded-md px-1.5 py-0.5 text-[10px] font-medium bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/40 shrink-0">
              {item.category}
            </span>
          </div>
          <p className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400 truncate max-w-xl">
            {item.description}
          </p>
        </div>
      </div>

      {/* Middle: File Name */}
      <div className="hidden md:flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 dark:text-zinc-500 shrink-0">
        <FileCode2 className="h-3.5 w-3.5" />
        <span>{item.fileName}</span>
      </div>

      {/* Right: Quick Action Buttons */}
      <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={handleCopyCli}
          title={`Copy install command: ${item.installCommand}`}
          className="rounded-lg border border-zinc-200 bg-zinc-50 p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition active:scale-[0.97]"
        >
          {copiedCli ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Terminal className="h-3.5 w-3.5" />}
        </button>

        <button
          onClick={handleCopyCode}
          title="Copy component TSX source"
          className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition active:scale-[0.97] ${
            copiedCode
              ? "bg-emerald-600 text-white"
              : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          }`}
        >
          {copiedCode ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          <span>{copiedCode ? "Copied" : "Copy TSX"}</span>
        </button>

        <button
          onClick={() => onInspect(item)}
          title="Inspect component in sandbox"
          className="rounded-lg border border-zinc-200 bg-white p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition active:scale-[0.97]"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

/**
 * Precision Component Card with Scroll-Safe Preview, Emil Kowalski craft, and Apple HIG polish
 */
export function ComponentCard({
  item,
  onInspect,
  onTriggerToast,
  viewMode = "grid",
  density,
}: ComponentCardProps) {
  const activeMode = density || viewMode

  // If in list mode, render the dense row view
  if (activeMode === "list") {
    return (
      <ComponentRow
        item={item}
        onInspect={onInspect}
        onTriggerToast={onTriggerToast}
      />
    )
  }

  const [copiedCode, setCopiedCode] = useState(false)
  const [copiedCli, setCopiedCli] = useState(false)
  const [isInteractive, setIsInteractive] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
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
    onTriggerToast("Copied install command!", item.installCommand)
    setTimeout(() => setCopiedCli(false), 2000)
  }

  // Deactivate interaction when mouse leaves the card to prevent stuck pointer states
  const handleMouseLeave = () => {
    if (isInteractive) {
      setIsInteractive(false)
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col rounded-2xl border border-zinc-200/80 bg-white shadow-xs transition-all duration-200 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700/80 overflow-hidden"
    >
      {/* Card Header: Linear/Raycast Precision */}
      <div className="flex items-start justify-between border-b border-zinc-100 p-4 dark:border-zinc-800/60">
        <div className="min-w-0 flex-1 mr-2">
          {/* Badges */}
          <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
            <span className="font-mono text-[10px] font-medium rounded-md px-2 py-0.5 bg-zinc-100 text-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-300 border border-zinc-200/60 dark:border-zinc-700/60">
              {item.system}
            </span>
            <span className="rounded-md px-2 py-0.5 text-[10px] font-semibold bg-blue-50/80 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/40">
              {item.category}
            </span>
          </div>

          {/* Title & Description */}
          <h3 className="text-sm font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 truncate">
            {item.name}
          </h3>
          <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleCopyCli}
            title={`Copy install command: ${item.installCommand}`}
            aria-label="Copy install CLI"
            className="rounded-lg border border-zinc-200 bg-zinc-50 p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition active:scale-[0.97]"
          >
            {copiedCli ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Terminal className="h-3.5 w-3.5" />}
          </button>

          <button
            onClick={handleCopyCode}
            title="Copy component TSX source"
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition active:scale-[0.97] ${
              copiedCode
                ? "bg-emerald-600 text-white"
                : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white shadow-xs"
            }`}
          >
            {copiedCode ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span className="text-[11px]">{copiedCode ? "Copied" : "Copy TSX"}</span>
          </button>

          <button
            onClick={() => onInspect(item)}
            title="Inspect in full view"
            aria-label="Inspect component"
            className="rounded-lg border border-zinc-200 bg-white p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition active:scale-[0.97]"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* 
        Standardized Uniform Preview Stage (h-[224px] overflow-hidden)
        Scroll-Safe Isolation:
        When !isInteractive, pointer-events are disabled on the embedded preview so users can freely scroll
        the page over tables, sliders, and nested lists without wheel-jacking!
        Clicking 'Interact' unlocks the live stage or clicking the inspect banner opens the sandbox.
      */}
      <div className="relative h-[224px] w-full overflow-hidden bg-zinc-50/50 dark:bg-zinc-900/25 border-b border-zinc-100 dark:border-zinc-800/60 select-none">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

        {/* Live Stage Viewport */}
        <div
          className={`w-full h-full flex items-center justify-center p-4 transition-all duration-200 ${
            isInteractive ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div className="w-full flex items-center justify-center scale-[0.92] origin-center">
            <Component />
          </div>
        </div>

        {/* Top-Right Stage Mode Affordance Pill */}
        <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5">
          {isInteractive ? (
            <button
              onClick={() => setIsInteractive(false)}
              title="Lock preview to allow page scrolling"
              className="flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 backdrop-blur-md hover:bg-emerald-500/20 transition active:scale-[0.97]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Interactive Active</span>
              <Lock className="h-2.5 w-2.5 ml-0.5 text-emerald-600 dark:text-emerald-400" />
            </button>
          ) : (
            <button
              onClick={() => setIsInteractive(true)}
              title="Click to interact with inputs, sliders, and buttons inside preview"
              className="flex items-center gap-1 rounded-full bg-white/90 border border-zinc-200/80 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:bg-zinc-900/90 dark:border-zinc-800 dark:text-zinc-400 backdrop-blur-md opacity-80 group-hover:opacity-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition active:scale-[0.97]"
            >
              <MousePointer2 className="h-2.5 w-2.5 text-blue-500" />
              <span>Interact</span>
            </button>
          )}
        </div>

        {/* Bottom Hover Bar: Click to Inspect */}
        {!isInteractive && (
          <div
            onClick={() => onInspect(item)}
            className="absolute inset-x-0 bottom-0 py-2 bg-gradient-to-t from-zinc-950/40 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-medium text-zinc-900 shadow-md backdrop-blur-md dark:bg-zinc-900/95 dark:text-zinc-100 border border-zinc-200/60 dark:border-zinc-800/80 transition active:scale-[0.97]">
              <Maximize2 className="h-3 w-3 text-blue-500" />
              <span>Click card to open full Sandbox</span>
            </span>
          </div>
        )}
      </div>

      {/* Card Footer: Metadata & Direct Inspect Link */}
      <div className="flex items-center justify-between px-4 py-2.5 text-[11px] text-zinc-400 dark:text-zinc-500 bg-white dark:bg-zinc-950">
        <div className="flex items-center gap-1.5 font-mono text-[10px]">
          <FileCode2 className="h-3 w-3 text-zinc-400" />
          <span className="text-zinc-500 dark:text-zinc-400">{item.fileName}</span>
        </div>

        <div className="flex items-center gap-2">
          {item.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
              #{tag}
            </span>
          ))}
          <button
            onClick={() => onInspect(item)}
            className="text-[11px] font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 ml-1 transition"
          >
            Inspect ➔
          </button>
        </div>
      </div>
    </div>
  )
}
