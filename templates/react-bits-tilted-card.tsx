"use client"

import React, { useRef, useState } from "react"

export interface TiltedCardProps {
  children?: React.ReactNode
  title?: string
  subtitle?: string
  tag?: string
  maxTilt?: number
  className?: string
}

/**
 * TiltedCard Component from React Bits (David Haz / reactbits.dev)
 * Interactive 3D perspective card with dynamic rotational tilt following the cursor.
 */
export const TiltedCard: React.FC<TiltedCardProps> = ({
  children,
  title = "Interactive 3D Card",
  subtitle = "Hover to tilt and experience smooth perspective depth calculation.",
  tag = "React Bits",
  maxTilt = 14,
  className = "",
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const tiltX = ((y - centerY) / centerY) * -maxTilt
    const tiltY = ((x - centerX) / centerX) * maxTilt

    setRotate({ x: tiltX, y: tiltY })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setRotate({ x: 0, y: 0 })
  }

  return (
    <div
      style={{ perspective: 1000 }}
      className={`inline-block w-full max-w-sm ${className}`}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
          transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
          transformStyle: "preserve-3d",
        }}
        className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-7 shadow-lg dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-2xl"
      >
        {children || (
          <div style={{ transform: "translateZ(30px)" }}>
            <span className="inline-block rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
              {tag}
            </span>
            <h3 className="mt-4 text-xl font-bold text-zinc-950 dark:text-zinc-50">{title}</h3>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{subtitle}</p>
          </div>
        )}
      </div>
    </div>
  )
}
