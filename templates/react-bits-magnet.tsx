"use client"

import React, { useRef, useState } from "react"

export interface MagnetProps {
  children: React.ReactNode
  padding?: number
  disabled?: boolean
  magnetStrength?: number
  className?: string
}

/**
 * Magnet Component from React Bits (David Haz / reactbits.dev)
 * Attracts the wrapped element toward the mouse cursor with smooth physics.
 */
export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 80,
  disabled = false,
  magnetStrength = 2.5,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled || !ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2

    const distX = Math.abs(centerX - e.clientX)
    const distY = Math.abs(centerY - e.clientY)

    if (distX < width / 2 + padding && distY < height / 2 + padding) {
      setIsHovering(true)
      setPos({
        x: (e.clientX - centerX) / magnetStrength,
        y: (e.clientY - centerY) / magnetStrength,
      })
    } else {
      setIsHovering(false)
      setPos({ x: 0, y: 0 })
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setPos({ x: 0, y: 0 })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: isHovering ? "transform 0.1s ease-out" : "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </div>
  )
}
