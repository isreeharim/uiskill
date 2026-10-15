"use client"

import React, { useRef, useEffect } from "react"

export interface SquaresProps {
  direction?: "diagonal" | "up" | "right" | "down" | "left"
  speed?: number
  borderColor?: string
  squareSize?: number
  hoverFillColor?: string
  className?: string
}

/**
 * Squares Component from React Bits (David Haz / reactbits.dev)
 * An interactive canvas background of animated animated squares that light up on hover.
 */
export const Squares: React.FC<SquaresProps> = ({
  direction = "right",
  speed = 0.5,
  borderColor = "rgba(100, 116, 139, 0.2)",
  squareSize = 40,
  hoverFillColor = "rgba(59, 130, 246, 0.15)",
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hoveredSquareRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let offset = 0

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = Math.floor((e.clientX - rect.left) / squareSize)
      const y = Math.floor((e.clientY - rect.top) / squareSize)
      hoveredSquareRef.current = { x, y }
    }

    const handleMouseLeave = () => {
      hoveredSquareRef.current = null
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      offset = (offset + speed) % squareSize

      const numCols = Math.ceil(canvas.width / squareSize) + 1
      const numRows = Math.ceil(canvas.height / squareSize) + 1

      for (let i = 0; i < numCols; i++) {
        for (let j = 0; j < numRows; j++) {
          const x = i * squareSize
          const y = j * squareSize

          if (
            hoveredSquareRef.current &&
            hoveredSquareRef.current.x === i &&
            hoveredSquareRef.current.y === j
          ) {
            ctx.fillStyle = hoverFillColor
            ctx.fillRect(x, y, squareSize, squareSize)
          }

          ctx.strokeStyle = borderColor
          ctx.lineWidth = 1
          ctx.strokeRect(x, y, squareSize, squareSize)
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", resize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [direction, speed, borderColor, squareSize, hoverFillColor])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 h-full w-full pointer-events-auto ${className}`}
    />
  )
}
