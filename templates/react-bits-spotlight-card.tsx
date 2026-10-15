"use client"

import * as React from "react"
import { Sparkles, ArrowRight } from "lucide-react"

export function ReactBitsSpotlightCard() {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = React.useState(false)
  const cardRef = React.useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative mx-auto w-full max-w-sm overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-950 transition-all duration-200"
    >
      {/* Radial Spotlight Overlay */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px opacity-100 transition duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 80%)`,
          }}
        />
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/30">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-400">
            React Bits Spotlight
          </span>
        </div>

        <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">
          Dynamic Radial Spotlight
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          Illuminates background tokens tracking user cursor coordinates dynamically with zero canvas stutter.
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-4 text-xs font-semibold text-blue-600 dark:text-blue-400">
          <span>Interact With Cursor</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  )
}
export default ReactBitsSpotlightCard
