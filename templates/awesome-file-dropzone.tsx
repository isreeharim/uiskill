"use client"

import * as React from "react"
import { UploadCloud, File, Check } from "lucide-react"

export function AwesomeFileDropzone() {
  const [files, setFiles] = React.useState<{ name: string; size: string; progress: number }[]>([
    { name: "architecture-spec-v2.pdf", size: "2.4 MB", progress: 100 },
    { name: "design-tokens.tokens.json", size: "480 KB", progress: 65 },
  ])
  const [isDragging, setIsDragging] = React.useState(false)

  const handleSimulateAdd = () => {
    setFiles((prev) => [
      ...prev,
      { name: `payload-${Date.now().toString().slice(-4)}.tsx`, size: "120 KB", progress: 100 },
    ])
  }

  return (
    <div className="mx-auto w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-950 font-sans text-center">
      <div className="mb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Awesome React Components
        </span>
        <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">File Upload Dropzone</h3>
        <p className="mt-1 text-xs text-zinc-500">Drag & drop files with upload progress feedback</p>
      </div>

      {/* Drop Zone Box */}
      <div
        onClick={handleSimulateAdd}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          handleSimulateAdd()
        }}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-6 transition-all ${
          isDragging
            ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20"
            : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/40"
        }`}
      >
        <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
          <UploadCloud className="h-5 w-5" />
        </div>
        <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
          Click or drop files here
        </p>
        <p className="text-[10px] text-zinc-400 mt-0.5">Supports PDF, TSX, JSON up to 25MB</p>
      </div>

      {/* Files List */}
      <div className="mt-4 space-y-2 text-left">
        {files.map((file, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between rounded-xl border border-zinc-100 p-2.5 text-xs dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30"
          >
            <div className="flex items-center gap-2 truncate">
              <File className="h-4 w-4 text-zinc-400 shrink-0" />
              <div className="truncate">
                <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">{file.name}</p>
                <p className="text-[10px] text-zinc-400">{file.size}</p>
              </div>
            </div>
            {file.progress === 100 ? (
              <Check className="h-4 w-4 text-emerald-500 shrink-0" />
            ) : (
              <span className="font-mono text-[10px] text-blue-500">{file.progress}%</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
export default AwesomeFileDropzone
