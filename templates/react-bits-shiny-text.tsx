"use client"

import React from "react"

export interface ShinyTextProps {
  text: string
  disabled?: boolean
  speed?: number
  className?: string
}

/**
 * ShinyText Component from React Bits (David Haz / reactbits.dev)
 * Sweeps a high-polish gradient light beam across typography.
 */
export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
}) => {
  return (
    <span
      className={`inline-block text-transparent bg-clip-text bg-[linear-gradient(120deg,rgba(255,255,255,0.3)_0%,rgba(255,255,255,1)_50%,rgba(255,255,255,0.3)_100%)] bg-[length:200%_100%] ${
        !disabled ? "animate-shine" : ""
      } ${className}`}
      style={{
        animationDuration: `${speed}s`,
      }}
    >
      {text}
    </span>
  )
}
