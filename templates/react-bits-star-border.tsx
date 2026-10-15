"use client"

import React from "react"

export interface StarBorderProps {
  children?: React.ReactNode
  color?: string
  speed?: string
  className?: string
  onClick?: () => void
}

/**
 * StarBorder Component from React Bits (David Haz / reactbits.dev)
 * Dynamic gradient beam rotating along perimeter border, ideal for high-converting CTAs.
 */
export const StarBorder: React.FC<StarBorderProps> = ({
  children = "Deploy Application",
  color = "#3b82f6",
  speed = "5s",
  className = "",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-2xl p-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500/50 active:scale-95 transition-transform ${className}`}
    >
      <div
        className="absolute inset-[-150%] animate-[spin_5s_linear_infinite]"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg 330deg, ${color} 360deg)`,
          animationDuration: speed,
        }}
      />
      <div className="relative z-10 flex h-full w-full items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white shadow-xl hover:bg-zinc-900 transition-colors">
        {children}
      </div>
    </button>
  )
}
