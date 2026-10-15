"use client"

import React, { useEffect, useRef, useState } from "react"

export interface TrueFocusProps {
  sentence?: string
  manualMode?: boolean
  blurAmount?: number
  borderColor?: string
  glowColor?: string
  animationDuration?: number
  pauseBetweenAnimations?: number
}

/**
 * TrueFocus Component from React Bits (David Haz / reactbits.dev)
 * Focus framing border with smooth word-by-word morphing or hover-driven focus.
 */
export const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = "True Focus Interactive",
  manualMode = false,
  blurAmount = 4,
  borderColor = "#3b82f6",
  glowColor = "rgba(59, 130, 246, 0.35)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
}) => {
  const words = sentence.split(" ")
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 })

  useEffect(() => {
    if (!wordRefs.current[currentIndex] || !containerRef.current) return
    const wordRect = wordRefs.current[currentIndex]!.getBoundingClientRect()
    const containerRect = containerRef.current.getBoundingClientRect()
    setFocusRect({
      x: wordRect.left - containerRect.left,
      y: wordRect.top - containerRect.top,
      width: wordRect.width,
      height: wordRect.height,
    })
  }, [currentIndex, words.length])

  useEffect(() => {
    if (manualMode) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, (animationDuration + pauseBetweenAnimations) * 1000)
    return () => clearInterval(interval)
  }, [manualMode, words.length, animationDuration, pauseBetweenAnimations])

  return (
    <div ref={containerRef} className="relative flex flex-wrap gap-3 items-center justify-center p-6">
      {words.map((word, index) => {
        const isCurrent = index === currentIndex
        return (
          <span
            key={index}
            ref={(el) => {
              wordRefs.current[index] = el
            }}
            onMouseEnter={() => {
              if (manualMode) setCurrentIndex(index)
            }}
            className="cursor-pointer text-2xl font-bold transition-all duration-300 select-none text-zinc-900 dark:text-zinc-100"
            style={{
              filter: isCurrent ? "none" : `blur(${blurAmount}px)`,
              opacity: isCurrent ? 1 : 0.35,
            }}
          >
            {word}
          </span>
        )
      })}

      <div
        className="pointer-events-none absolute border-2 rounded-lg transition-all ease-out"
        style={{
          transform: `translate(${focusRect.x - 6}px, ${focusRect.y - 4}px)`,
          width: `${focusRect.width + 12}px`,
          height: `${focusRect.height + 8}px`,
          borderColor,
          boxShadow: `0 0 16px ${glowColor}`,
          transitionDuration: `${animationDuration}s`,
          opacity: focusRect.width > 0 ? 1 : 0,
        }}
      />
    </div>
  )
}
