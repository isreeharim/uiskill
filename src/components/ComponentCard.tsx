import React, { useState, useRef } from "react"
import {
  Copy,
  Check,
  Maximize2,
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

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(item.code)
    setCopiedCode(true)
    onTriggerToast(`Copied ${item.name} TSX code!`, "Ready to paste into your React project")
    setTimeout(() => setCopiedCode(false), 2000)
  }

  return (
    <div
      onClick={() => onInspect(item)}
      className="group relative flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-black/[0.08] bg-white hover:border-black/[0.16] hover:bg-black/[0.01] dark:border-white/[0.08] dark:bg-[#161617] dark:hover:border-white/[0.16] dark:hover:bg-white/[0.02] transition-all duration-150 cursor-pointer"
    >
      {/* Left: Name, Framework, Category, & Description */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="h-8 w-8 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] flex items-center justify-center shrink-0 text-[#1D1D1F] dark:text-[#F5F5F7] group-hover:scale-105 transition-transform duration-150">
          <Layers className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-xs text-[#1D1D1F] dark:text-[#F5F5F7] truncate group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF] transition-colors">
              {item.name}
            </span>
            <span className="font-mono text-[10px] rounded-md px-1.5 py-0.5 bg-black/[0.04] text-[#86868B] dark:bg-white/[0.06] dark:text-[#86868B] border border-black/[0.06] dark:border-white/[0.08] shrink-0">
              {item.system}
            </span>
            <span className="rounded-md px-1.5 py-0.5 text-[10px] font-medium bg-[#0071E3]/10 text-[#0071E3] dark:bg-[#2997FF]/15 dark:text-[#2997FF] border border-[#0071E3]/20 dark:border-[#2997FF]/30 shrink-0">
              {item.category}
            </span>
          </div>
          <p className="mt-0.5 text-[11px] text-[#86868B] truncate max-w-xl">
            {item.description}
          </p>
        </div>
      </div>

      {/* Middle: File Name */}
      <div className="hidden md:flex items-center gap-1.5 text-[11px] font-mono text-[#86868B] shrink-0">
        <FileCode2 className="h-3.5 w-3.5" />
        <span>{item.fileName}</span>
      </div>

      {/* Right: Quick Action Buttons */}
      <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={handleCopyCode}
          title="Copy component TSX source"
          className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition active:scale-[0.97] ${
            copiedCode
              ? "bg-emerald-600 text-white"
              : "bg-[#1D1D1F] text-white hover:bg-black dark:bg-[#F5F5F7] dark:text-[#1D1D1F] dark:hover:bg-white"
          }`}
        >
          {copiedCode ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          <span>{copiedCode ? "Copied" : "Copy TSX"}</span>
        </button>

        <button
          onClick={() => onInspect(item)}
          title="Inspect component in sandbox"
          className="rounded-lg border border-black/[0.08] bg-black/[0.02] p-1.5 text-[#86868B] hover:text-[#1D1D1F] hover:bg-black/[0.05] dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-[#86868B] dark:hover:text-[#F5F5F7] dark:hover:bg-white/[0.08] transition active:scale-[0.97]"
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
      className="apple-card group relative flex flex-col rounded-2xl border border-black/[0.08] bg-white dark:border-white/[0.08] dark:bg-[#161617] overflow-hidden"
    >
      {/* Card Header */}
      <div className="flex items-start justify-between border-b border-black/[0.06] p-4 dark:border-white/[0.06]">
        <div className="min-w-0 flex-1 mr-2">
          {/* Badges */}
          <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
            <span className="font-mono text-[10px] font-medium rounded-md px-2 py-0.5 bg-black/[0.04] text-[#86868B] dark:bg-white/[0.06] dark:text-[#86868B] border border-black/[0.06] dark:border-white/[0.08]">
              {item.system}
            </span>
            <span className="rounded-md px-2 py-0.5 text-[10px] font-medium bg-[#0071E3]/10 text-[#0071E3] dark:bg-[#2997FF]/15 dark:text-[#2997FF] border border-[#0071E3]/20 dark:border-[#2997FF]/30">
              {item.category}
            </span>
          </div>

          {/* Title & Description */}
          <h3 className="text-sm font-semibold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7] truncate">
            {item.name}
          </h3>
          <p className="mt-0.5 text-xs text-[#86868B] line-clamp-1 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Quick actions */}
        <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={handleCopyCode}
            title="Copy component TSX source"
            className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition active:scale-[0.97] ${
              copiedCode
                ? "bg-emerald-600 text-white"
                : "bg-[#1D1D1F] text-white hover:bg-black dark:bg-[#F5F5F7] dark:text-[#1D1D1F] dark:hover:bg-white shadow-xs"
            }`}
          >
            {copiedCode ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span className="text-[11px]">{copiedCode ? "Copied" : "Copy TSX"}</span>
          </button>

          <button
            onClick={() => onInspect(item)}
            title="Inspect in full view"
            aria-label="Inspect component"
            className="rounded-lg border border-black/[0.08] bg-black/[0.02] p-2 text-[#86868B] hover:text-[#1D1D1F] hover:bg-black/[0.05] dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-[#86868B] dark:hover:text-[#F5F5F7] dark:hover:bg-white/[0.08] transition active:scale-[0.97]"
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
      <div className="relative h-[260px] sm:h-[280px] w-full overflow-hidden bg-[#F5F5F7]/70 dark:bg-[#000000]/40 border-b border-black/[0.06] dark:border-white/[0.06] select-none">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

        {/* Live Stage Viewport */}
        <div
          className={`w-full h-full flex items-center justify-center p-4 transition-all duration-200 ${
            isInteractive ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div className="w-full flex items-center justify-center scale-[0.95] origin-center">
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
              <span>Interactive</span>
              <Lock className="h-2.5 w-2.5 ml-0.5 text-emerald-600 dark:text-emerald-400" />
            </button>
          ) : (
            <button
              onClick={() => setIsInteractive(true)}
              title="Click to interact with inputs, sliders, and buttons inside preview"
              className="flex items-center gap-1 rounded-full bg-white/90 border border-black/[0.08] px-2 py-0.5 text-[10px] font-medium text-[#1D1D1F] dark:bg-[#161617]/90 dark:border-white/[0.1] dark:text-[#F5F5F7] backdrop-blur-md opacity-80 group-hover:opacity-100 hover:bg-white dark:hover:bg-[#161617] transition active:scale-[0.97]"
            >
              <MousePointer2 className="h-2.5 w-2.5 text-[#0071E3] dark:text-[#2997FF]" />
              <span>Interact</span>
            </button>
          )}
        </div>

        {/* Bottom Hover Bar: Click to Inspect */}
        {!isInteractive && (
          <div
            onClick={() => onInspect(item)}
            className="absolute inset-x-0 bottom-0 py-2 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-pointer"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-medium text-[#1D1D1F] shadow-sm backdrop-blur-md dark:bg-[#161617]/95 dark:text-[#F5F5F7] border border-black/[0.08] dark:border-white/[0.1] transition active:scale-[0.97]">
              <Maximize2 className="h-3 w-3 text-[#0071E3] dark:text-[#2997FF]" />
              <span>Click card to open full Sandbox</span>
            </span>
          </div>
        )}
      </div>

      {/* Card Footer: Metadata & Direct Inspect Link */}
      <div className="flex items-center justify-between px-4 py-2.5 text-[11px] text-[#86868B] bg-white dark:bg-[#161617]">
        <div className="flex items-center gap-1.5 font-mono text-[10px]">
          <FileCode2 className="h-3 w-3 text-[#86868B]" />
          <span className="text-[#86868B]">{item.fileName}</span>
        </div>

        <div className="flex items-center gap-2">
          {item.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="font-mono text-[10px] text-[#86868B]">
              #{tag}
            </span>
          ))}
          <button
            onClick={() => onInspect(item)}
            className="text-[11px] font-medium text-[#0071E3] hover:underline dark:text-[#2997FF] ml-1 transition"
          >
            Inspect ➔
          </button>
        </div>
      </div>
    </div>
  )
}
