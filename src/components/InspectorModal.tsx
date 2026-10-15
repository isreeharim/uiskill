import React, { useState, useEffect } from "react"
import {
  X,
  Smartphone,
  Tablet,
  Monitor,
  Copy,
  Check,
  Download,
  Terminal,
  Eye,
  Code2,
  FileText,
  Sun,
  Moon,
  Sparkles,
  ExternalLink
} from "lucide-react"
import { ComponentItem } from "../data/components-data"
import { CodeViewer } from "./CodeViewer"

interface InspectorModalProps {
  item: ComponentItem | null
  onClose: () => void
  onTriggerToast: (msg: string, sub?: string) => void
}

type ViewportSize = "desktop" | "tablet" | "mobile"
type ActiveTab = "preview" | "code" | "docs"

export function InspectorModal({ item, onClose, onTriggerToast }: InspectorModalProps) {
  if (!item) return null

  const [activeTab, setActiveTab] = useState<ActiveTab>("preview")
  const [viewport, setViewport] = useState<ViewportSize>("desktop")
  const [previewDark, setPreviewDark] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)
  const [copiedCli, setCopiedCli] = useState(false)

  // Escape key listener & body scroll lock
  useEffect(() => {
    document.body.style.overflow = "hidden"
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])

  const Component = item.previewComponent

  const handleCopyCode = () => {
    navigator.clipboard.writeText(item.code)
    setCopiedCode(true)
    onTriggerToast(`Copied ${item.name} TSX code!`, "Ready to paste into your components folder")
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const handleCopyCli = () => {
    navigator.clipboard.writeText(item.installCommand)
    setCopiedCli(true)
    onTriggerToast(`Copied install command!`, item.installCommand)
    setTimeout(() => setCopiedCli(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([item.code], { type: "text/typescript;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = item.fileName.split("/").pop() || "Component.tsx"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    onTriggerToast(`Downloaded ${item.fileName}!`, "File saved to your computer")
  }

  const getViewportWidthClass = () => {
    switch (viewport) {
      case "mobile":
        return "max-w-[390px] border-x border-zinc-300 dark:border-zinc-700 shadow-2xl rounded-3xl overflow-hidden my-4"
      case "tablet":
        return "max-w-[768px] border-x border-zinc-300 dark:border-zinc-700 shadow-xl rounded-2xl overflow-hidden my-4"
      case "desktop":
      default:
        return "w-full"
    }
  }

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col h-full max-h-[92vh] w-full max-w-6xl rounded-3xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden"
      >
        {/* Top Header: Row 1 = Title & Pinned Close Button */}
        <div className="shrink-0 border-b border-zinc-200 p-4 sm:px-6 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                  {item.category}
                </span>
                <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[10px] sm:text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  {item.system}
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 truncate mt-1">
                {item.name}
              </h2>
            </div>

            <button
              onClick={onClose}
              aria-label="Close inspector"
              className="shrink-0 rounded-xl border border-zinc-200 p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Row 2: Center Tabs & Action Buttons */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-900">
            {/* Center Tabs */}
            <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-zinc-900">
              <button
                onClick={() => setActiveTab("preview")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeTab === "preview"
                    ? "bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-zinc-50"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                <Eye className="h-3.5 w-3.5" />
                <span>Preview</span>
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeTab === "code"
                    ? "bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-zinc-50"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>Source Code</span>
              </button>
              <button
                onClick={() => setActiveTab("docs")}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  activeTab === "docs"
                    ? "bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-zinc-50"
                    : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Integration</span>
              </button>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={handleCopyCli}
                title={`Copy install: ${item.installCommand}`}
                className="hidden md:flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition"
              >
                <Terminal className="h-3.5 w-3.5 text-blue-500" />
                <span className="font-mono text-[11px]">{item.installCommand}</span>
                {copiedCli ? <Check className="h-3 w-3 text-emerald-500" /> : null}
              </button>

              <button
                onClick={handleDownload}
                title="Download component .tsx"
                className="flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition"
              >
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Download</span>
              </button>

              <button
                onClick={handleCopyCode}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                  copiedCode
                    ? "bg-emerald-600 text-white"
                    : "bg-blue-600 text-white hover:bg-blue-500 shadow-sm shadow-blue-500/20 active:scale-95"
                }`}
              >
                {copiedCode ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sub-toolbar for Preview mode (Viewports & Canvas Theme) */}
        {activeTab === "preview" && (
          <div className="shrink-0 flex items-center justify-between border-b border-zinc-200 bg-zinc-50/70 px-4 sm:px-6 py-2 dark:border-zinc-800/80 dark:bg-zinc-900/40 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-[11px] font-semibold text-zinc-400 mr-1 sm:mr-2 uppercase tracking-wider">
                Viewport:
              </span>
              <button
                onClick={() => setViewport("desktop")}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                  viewport === "desktop"
                    ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100 font-semibold"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
                }`}
              >
                <Monitor className="h-3.5 w-3.5" />
                <span>Desktop</span>
              </button>
              <button
                onClick={() => setViewport("tablet")}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                  viewport === "tablet"
                    ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100 font-semibold"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
                }`}
              >
                <Tablet className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Tablet (768px)</span>
                <span className="sm:hidden">Tablet</span>
              </button>
              <button
                onClick={() => setViewport("mobile")}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                  viewport === "mobile"
                    ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-800 dark:text-zinc-100 font-semibold"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Mobile (390px)</span>
                <span className="sm:hidden">Mobile</span>
              </button>
            </div>

            <div className="flex items-center gap-2 shrink-0 ml-4">
              <button
                onClick={() => setPreviewDark(!previewDark)}
                className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition"
              >
                {previewDark ? <Sun className="h-3.5 w-3.5 text-amber-400" /> : <Moon className="h-3.5 w-3.5" />}
                <span className="hidden sm:inline">{previewDark ? "Light Canvas" : "Dark Canvas"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-zinc-100/50 dark:bg-zinc-950/60">
          {activeTab === "preview" && (
            <div className="flex min-h-full items-center justify-center">
              <div
                className={`transition-all duration-300 mx-auto ${getViewportWidthClass()} ${
                  previewDark ? "dark bg-zinc-950 text-zinc-50" : "bg-white text-zinc-900"
                } rounded-2xl p-4 sm:p-8 shadow-sm border border-zinc-200/80 dark:border-zinc-800/80 overflow-x-auto`}
              >
                <Component />
              </div>
            </div>
          )}

          {activeTab === "code" && (
            <div className="max-w-5xl mx-auto">
              <CodeViewer
                code={item.code}
                fileName={item.fileName}
                onCopy={() => onTriggerToast(`Copied ${item.fileName}!`, "Full TSX code copied")}
              />
            </div>
          )}

          {activeTab === "docs" && (
            <div className="max-w-3xl mx-auto space-y-6 py-4">
              {/* Architecture & Stack Notes */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm mb-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Design System Paradigm: {item.system}</span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-5 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Target File Destination
                  </h4>
                  <div className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 font-mono text-xs text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
                    <span>{item.fileName}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(item.fileName)
                        onTriggerToast("Copied file path!")
                      }}
                      className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                      Copy Path
                    </button>
                  </div>
                </div>
              </div>

              {/* Install instructions */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                  1. Install Required Dependencies
                </h3>
                <div className="flex items-center justify-between rounded-xl bg-zinc-950 p-4 font-mono text-xs text-zinc-200">
                  <span>{item.installCommand}</span>
                  <button
                    onClick={handleCopyCli}
                    className="rounded-lg bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300 hover:bg-zinc-700 hover:text-white transition"
                  >
                    Copy
                  </button>
                </div>
              </div>

              {/* React Server Components notes */}
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
                <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                  2. Next.js / React Server Components Compliance
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed mb-3">
                  This component uses interactive React hooks (<code>useState</code>, <code>useEffect</code>). Always ensure the top of your file includes the directive:
                </p>
                <pre className="rounded-xl bg-zinc-950 p-3 font-mono text-xs text-blue-400">
                  "use client"
                </pre>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-zinc-400">Tagged:</span>
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1 font-mono text-[11px] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
