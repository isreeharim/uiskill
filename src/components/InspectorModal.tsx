import { useState, useEffect } from "react"
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
  Sparkles
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

async function copyText(text: string): Promise<boolean> {
  if (!navigator.clipboard?.writeText) return false
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

export function InspectorModal({ item, onClose, onTriggerToast }: InspectorModalProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("preview")
  const [viewport, setViewport] = useState<ViewportSize>("desktop")
  const [previewDark, setPreviewDark] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)
  const [copiedCli, setCopiedCli] = useState(false)

  useEffect(() => {
    if (!item) return

    document.body.style.overflow = "hidden"
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [item, onClose])

  if (!item) return null

  const Component = item.previewComponent

  const handleCopyCode = async () => {
    const copied = await copyText(item.code)
    if (!copied) {
      onTriggerToast("Could not copy code", "Clipboard access was unavailable. Copy the code manually instead.")
      return
    }
    setCopiedCode(true)
    onTriggerToast(`Copied ${item.name} TSX code!`, "Ready to paste into your components folder")
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const handleCopyCli = async () => {
    const copied = await copyText(item.installCommand)
    if (!copied) {
      onTriggerToast("Could not copy install command", "Clipboard access was unavailable.")
      return
    }
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
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/40 dark:bg-black/60 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col h-full max-h-[92vh] w-full max-w-6xl rounded-2xl border border-black/[0.1] dark:border-white/[0.12] bg-white dark:bg-[#161617] shadow-2xl overflow-hidden"
      >
        <div className="shrink-0 border-b border-black/[0.06] dark:border-white/[0.06] p-4 sm:px-6 bg-white dark:bg-[#161617]">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-[#0071E3]/10 px-2 py-0.5 text-[10px] sm:text-xs font-medium text-[#0071E3] dark:bg-[#2997FF]/15 dark:text-[#2997FF] border border-[#0071E3]/20 dark:border-[#2997FF]/30">
                  {item.category}
                </span>
                <span className="rounded-md bg-black/[0.04] px-2 py-0.5 text-[10px] sm:text-xs font-mono text-[#86868B] dark:bg-white/[0.06] dark:text-[#86868B] border border-black/[0.06] dark:border-white/[0.08]">
                  {item.system}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-semibold tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7] truncate mt-1">
                {item.name}
              </h2>
            </div>

            <button
              onClick={onClose}
              aria-label="Close inspector"
              className="shrink-0 w-7 h-7 rounded-full bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/[0.1] dark:hover:bg-white/[0.14] text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] flex items-center justify-center transition-all active:scale-[0.95]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-black/[0.04] dark:border-white/[0.04]">
            {/* macOS Segmented Tab Switcher */}
            <div className="flex items-center rounded-lg bg-black/[0.05] dark:bg-white/[0.08] p-0.5 border border-black/[0.04] dark:border-white/[0.06]">
              <button
                onClick={() => setActiveTab("preview")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition active:scale-[0.98] ${
                  activeTab === "preview"
                    ? "bg-white text-[#1D1D1F] shadow-xs dark:bg-[#2C2C2E] dark:text-[#F5F5F7]"
                    : "text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]"
                }`}
              >
                <Eye className="h-3.5 w-3.5" />
                <span>Preview</span>
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition active:scale-[0.98] ${
                  activeTab === "code"
                    ? "bg-white text-[#1D1D1F] shadow-xs dark:bg-[#2C2C2E] dark:text-[#F5F5F7]"
                    : "text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]"
                }`}
              >
                <Code2 className="h-3.5 w-3.5" />
                <span>Source Code</span>
              </button>
              <button
                onClick={() => setActiveTab("docs")}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition active:scale-[0.98] ${
                  activeTab === "docs"
                    ? "bg-white text-[#1D1D1F] shadow-xs dark:bg-[#2C2C2E] dark:text-[#F5F5F7]"
                    : "text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]"
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Integration</span>
              </button>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={handleCopyCli}
                title={`Copy install: ${item.installCommand}`}
                className="hidden md:flex items-center gap-1.5 rounded-lg border border-black/[0.08] bg-black/[0.02] dark:border-white/[0.08] dark:bg-white/[0.03] px-2.5 py-1.5 text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition active:scale-[0.97]"
              >
                <Terminal className="h-3.5 w-3.5 text-[#0071E3] dark:text-[#2997FF]" />
                <span className="font-mono text-[11px]">{item.installCommand}</span>
                {copiedCli ? <Check className="h-3 w-3 text-emerald-500" /> : null}
              </button>

              <button
                onClick={handleDownload}
                title="Download component .tsx"
                className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] bg-black/[0.02] dark:border-white/[0.08] dark:bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition active:scale-[0.97]"
              >
                <Download className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Download</span>
              </button>

              <button
                onClick={handleCopyCode}
                className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold transition active:scale-[0.97] ${
                  copiedCode
                    ? "bg-emerald-600 text-white"
                    : "bg-[#0071E3] text-white hover:bg-[#0077ED] dark:bg-[#2997FF] dark:text-black dark:hover:bg-[#47A6FF]"
                }`}
              >
                {copiedCode ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedCode ? "Copied" : "Copy Code"}</span>
              </button>
            </div>
          </div>
        </div>

        {activeTab === "preview" && (
          <div className="shrink-0 flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.06] bg-[#F5F5F7]/80 px-4 sm:px-6 py-2 dark:bg-[#161617]/50 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-[11px] font-semibold text-[#86868B] mr-1 sm:mr-2 uppercase tracking-wider">Viewport:</span>
              <div className="flex items-center rounded-lg bg-black/[0.05] dark:bg-white/[0.08] p-0.5 border border-black/[0.04] dark:border-white/[0.06]">
                <button
                  onClick={() => setViewport("desktop")}
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                    viewport === "desktop"
                      ? "bg-white text-[#1D1D1F] shadow-xs dark:bg-[#2C2C2E] dark:text-[#F5F5F7] font-semibold"
                      : "text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]"
                  }`}
                >
                  <Monitor className="h-3.5 w-3.5" />
                  <span>Desktop</span>
                </button>
                <button
                  onClick={() => setViewport("tablet")}
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                    viewport === "tablet"
                      ? "bg-white text-[#1D1D1F] shadow-xs dark:bg-[#2C2C2E] dark:text-[#F5F5F7] font-semibold"
                      : "text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]"
                  }`}
                >
                  <Tablet className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Tablet (768px)</span>
                  <span className="sm:hidden">Tablet</span>
                </button>
                <button
                  onClick={() => setViewport("mobile")}
                  className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                    viewport === "mobile"
                      ? "bg-white text-[#1D1D1F] shadow-xs dark:bg-[#2C2C2E] dark:text-[#F5F5F7] font-semibold"
                      : "text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]"
                  }`}
                >
                  <Smartphone className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Mobile (390px)</span>
                  <span className="sm:hidden">Mobile</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 ml-4">
              <button
                onClick={() => setPreviewDark(!previewDark)}
                className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] bg-black/[0.02] dark:border-white/[0.08] dark:bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition active:scale-[0.97]"
              >
                {previewDark ? <Sun className="h-3.5 w-3.5 text-amber-500" /> : <Moon className="h-3.5 w-3.5 text-[#86868B]" />}
                <span className="hidden sm:inline">{previewDark ? "Light Canvas" : "Dark Canvas"}</span>
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F5F5F7]/50 dark:bg-[#000000]/60">
          {activeTab === "preview" && (
            <div className="flex min-h-full items-center justify-center">
              <div className={`transition-all duration-300 mx-auto ${getViewportWidthClass()} ${previewDark ? "dark bg-[#161617] text-[#F5F5F7]" : "bg-white text-[#1D1D1F]"} rounded-2xl p-4 sm:p-8 shadow-sm border border-black/[0.08] dark:border-white/[0.08] overflow-x-auto`}>
                <Component />
              </div>
            </div>
          )}

          {activeTab === "code" && (
            <div className="max-w-5xl mx-auto">
              <CodeViewer code={item.code} fileName={item.fileName} onCopy={() => onTriggerToast(`Copied ${item.fileName}!`, "Full TSX code copied")} />
            </div>
          )}

          {activeTab === "docs" && (
            <div className="max-w-3xl mx-auto space-y-6 py-4">
              <div className="rounded-2xl border border-black/[0.08] bg-white p-6 dark:border-white/[0.08] dark:bg-[#161617]">
                <div className="flex items-center gap-2 text-[#0071E3] dark:text-[#2997FF] font-semibold text-sm mb-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Design Paradigm: {item.system}</span>
                </div>
                <p className="text-sm text-[#86868B] leading-relaxed">{item.description}</p>

                <div className="mt-5 space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#86868B]">Target File Destination</h4>
                  <div className="flex items-center justify-between rounded-xl border border-black/[0.08] bg-black/[0.02] px-4 py-2.5 font-mono text-xs text-[#1D1D1F] dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-[#F5F5F7]">
                    <span>{item.fileName}</span>
                    <button
                      onClick={async () => {
                        const copied = await copyText(item.fileName)
                        if (copied) onTriggerToast("Copied file path!")
                        else onTriggerToast("Could not copy file path", "Clipboard access was unavailable.")
                      }}
                      className="text-[#0071E3] hover:underline dark:text-[#2997FF]"
                    >
                      Copy Path
                    </button>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-black/[0.08] bg-white p-6 dark:border-white/[0.08] dark:bg-[#161617]">
                <h3 className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-3">1. Install Required Dependencies</h3>
                <div className="flex items-center justify-between rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] p-4 font-mono text-xs text-[#1D1D1F] dark:text-[#F5F5F7]">
                  <span>{item.installCommand}</span>
                  <button onClick={handleCopyCli} className="rounded-lg border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#161617] px-2.5 py-1 text-xs text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition active:scale-[0.97]">Copy</button>
                </div>
              </div>

              <div className="rounded-2xl border border-black/[0.08] bg-white p-6 dark:border-white/[0.08] dark:bg-[#161617]">
                <h3 className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mb-2">2. Next.js / React Server Components Compliance</h3>
                <p className="text-xs text-[#86868B] leading-relaxed mb-3">
                  This component uses interactive React hooks (<code>useState</code>, <code>useEffect</code>). Always ensure the top of your file includes the directive:
                </p>
                <pre className="rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] p-3 font-mono text-xs text-[#0071E3] dark:text-[#2997FF]">"use client"</pre>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-[#86868B]">Tagged:</span>
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-lg border border-black/[0.08] bg-black/[0.02] px-2.5 py-1 font-mono text-[11px] text-[#86868B] dark:border-white/[0.08] dark:bg-white/[0.03]">
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
