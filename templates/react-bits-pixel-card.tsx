"use client"

import * as React from "react"
import { Cpu } from "lucide-react"

export function ReactBitsPixelCard() {
  const pixels = Array.from({ length: 36 }, (_, i) => i)
  const [activePixels, setActivePixels] = React.useState<number[]>([4, 11, 12, 19, 25, 30])

  const handleShuffle = () => {
    const randomSet = new Set<number>()
    while (randomSet.size < 10) {
      randomSet.add(Math.floor(Math.random() * 36))
    }
    setActivePixels(Array.from(randomSet))
  }

  return (
    <div
      onMouseEnter={handleShuffle}
      className="mx-auto w-full max-w-sm rounded-3xl border border-zinc-200 bg-zinc-950 p-6 shadow-xl text-center text-white cursor-pointer group"
    >
      <div className="flex items-center justify-between text-xs text-zinc-400 mb-4">
        <span className="flex items-center gap-1.5 text-cyan-400 text-[10px] font-bold uppercase tracking-wider">
          <Cpu className="h-3 w-3" />
          Pixel Card Animation
        </span>
        <span className="text-[10px] text-zinc-500">React Bits</span>
      </div>

      {/* Pixel Grid Canvas */}
      <div className="my-3 grid grid-cols-6 gap-1.5 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800">
        {pixels.map((p) => {
          const isActive = activePixels.includes(p)
          return (
            <div
              key={p}
              className={`h-4 rounded-xs transition-colors duration-300 ${
                isActive
                  ? "bg-cyan-400 shadow-sm shadow-cyan-400/50"
                  : "bg-zinc-800 group-hover:bg-zinc-700"
              }`}
            />
          )
        })}
      </div>

      <h4 className="mt-4 text-sm font-bold text-zinc-100">Generative Pixel Matrix</h4>
      <p className="mt-1 text-xs text-zinc-400">
        Hover to trigger algorithmic pixel cellular rearrangement.
      </p>
    </div>
  )
}
export default ReactBitsPixelCard
