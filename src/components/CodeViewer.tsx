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
    <div className="relative flex flex-col rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-[#161617] text-[#F5F5F7] overflow-hidden shadow-xl">
      <div className="flex items-center justify-between border-b border-white/[0.08] bg-[#1D1D1F] px-4 py-3">
        <div className="flex items-center gap-2">
          <FileCode className="h-4 w-4 text-[#2997FF]" />
          <span className="font-mono text-xs font-medium text-[#F5F5F7]">{fileName}</span>
          <span className="rounded-md bg-white/[0.08] px-2 py-0.5 text-[10px] font-mono text-[#86868B]">
            {lines.length} lines • {(new TextEncoder().encode(code).length / 1024).toFixed(1)} KB
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            title="Download .tsx file"
            className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-1.5 text-xs font-medium text-[#F5F5F7] hover:bg-white/[0.08] transition active:scale-[0.97]"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Download</span>
          </button>
          <button
            onClick={handleCopy}
            title="Copy component code"
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition active:scale-[0.97] ${
              copied
                ? "bg-emerald-600 text-white"
                : "bg-[#0071E3] text-white hover:bg-[#0077ED] dark:bg-[#2997FF] dark:text-black dark:hover:bg-[#47A6FF]"
            }`}
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? "Copied!" : "Copy Code"}</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto p-4 max-h-[600px] font-mono text-xs leading-relaxed selection:bg-[#2997FF]/30">
        <pre className="table w-full">
          {lines.map((line, i) => (
            <div key={i} className="table-row hover:bg-white/[0.02]">
              <span className="table-cell select-none pr-4 text-right text-[#86868B]/60 text-[11px] w-10">{i + 1}</span>
              <span className="table-cell whitespace-pre text-[#F5F5F7]">{line || " "}</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}
