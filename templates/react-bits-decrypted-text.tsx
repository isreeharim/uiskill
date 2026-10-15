"use client"

import * as React from "react"
import { Terminal, RefreshCw } from "lucide-react"

export function ReactBitsDecryptedText() {
  const originalText = "NEURAL CODING AGENT"
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
  const [displayText, setDisplayText] = React.useState(originalText)
  const [isScrambling, setIsScrambling] = React.useState(false)

  const scramble = () => {
    if (isScrambling) return
    setIsScrambling(true)
    let iteration = 0

    const interval = setInterval(() => {
      setDisplayText((_) =>
        originalText
          .split("")
          .map((letter, index) => {
            if (letter === " ") return " "
            if (index < iteration) {
              return originalText[index]
            }
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join("")
      )

      if (iteration >= originalText.length) {
        clearInterval(interval)
        setIsScrambling(false)
      }

      iteration += 1 / 3
    }, 30)
  }

  return (
    <div className="mx-auto w-full max-w-sm rounded-3xl border border-zinc-200 bg-zinc-950 p-6 shadow-xl text-center text-white font-mono">
      <div className="flex items-center justify-between text-xs text-zinc-400 mb-4">
        <span className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
          <Terminal className="h-3 w-3" />
          React Bits Cipher
        </span>
        <span className="text-[10px] text-zinc-500">David Haz Style</span>
      </div>

      <div
        onMouseEnter={scramble}
        onClick={scramble}
        className="my-6 cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-emerald-500/50 hover:bg-zinc-900"
      >
        <span className="text-xl font-black tracking-widest text-emerald-400 select-none">
          {displayText}
        </span>
      </div>

      <button
        onClick={scramble}
        className="flex items-center justify-center gap-1.5 text-xs text-zinc-400 hover:text-emerald-400 mx-auto transition"
      >
        <RefreshCw className={`h-3.5 w-3.5 ${isScrambling ? "animate-spin" : ""}`} />
        <span>Hover or click to decrypt</span>
      </button>
    </div>
  )
}
export default ReactBitsDecryptedText
