import { useState } from "react"
import { Copy, Check, Download, FileCode } from "lucide-react"

interface CodeViewerProps {
  code: string
  fileName: string
  onCopy?: () => void
}

async function copyText(text: string): Promise<boolean> {
  if (!navigator.clipboard?.writeText) return false
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

export function CodeViewer({ code, fileName, onCopy }: CodeViewerProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const didCopy = await copyText(code)
    if (!didCopy) return
    setCopied(true)
    onCopy?.()
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([code], { type: "text/typescript;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = fileName.split("/").pop() || "Component.tsx"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const lines = code.split("\n")

  return (
    <div className="relative flex flex-col rounded-2xl border border-zinc-200 bg-zinc-950 text-zinc-100 overflow-hidden shadow-xl dark:border-zinc-800">
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/90 px-4 py-3">
        <div className="flex items-center gap-2">
          <FileCode className="h-4 w-4 text-blue-400" />
          <span className="font-mono text-xs font-medium text-zinc-300">{fileName}</span>
          <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[10px] text-zinc-400">
            {lines.length} lines • {(new TextEncoder().encode(code).length / 1024).toFixed(1)} KB
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            title="Download .tsx file"
            className="flex items-center gap-1.5 rounded-lg border border-zinc-700/60 bg-zinc-800/80 px-2.5 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-700 hover:text-white transition"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>
          <button
            onClick={handleCopy}
            title="Copy component code"
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
              copied ? "bg-emerald-600 text-white" : "bg-blue-600 text-white hover:bg-blue-500 shadow-sm"
            }`}
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copied!" : "Copy Code"}</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto p-4 max-h-[600px] font-mono text-xs leading-relaxed selection:bg-blue-500/40">
        <pre className="table w-full">
          {lines.map((line, i) => (
            <div key={i} className="table-row hover:bg-zinc-900/60">
              <span className="table-cell select-none pr-4 text-right text-zinc-600 text-[11px] w-10">{i + 1}</span>
              <span className="table-cell whitespace-pre text-zinc-200">{line || " "}</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}
