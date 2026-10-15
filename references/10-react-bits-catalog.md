# React Bits: Animated, Interactive & Creative UI Components

[React Bits](https://reactbits.dev) (created by [David Haz](https://github.com/DavidHDev/react-bits)) is an open-source collection of 200+ animated, interactive, and customizable React components. Built with **React**, **Tailwind CSS**, and **Framer Motion**, it is the premier creative developer library for statement hero sections, micro-interactions, animated typography, and interactive canvas backgrounds.

---

## 1. Architectural Signature & Core Philosophy

| Dimension | Details |
|---|---|
| **Repository** | [github.com/DavidHDev/react-bits](https://github.com/DavidHDev/react-bits) |
| **Official Docs** | [reactbits.dev](https://reactbits.dev) |
| **Creator** | David Haz |
| **License** | **MIT License** (100% Free & Commercial-Safe, "No Problem") |
| **Paradigm** | Copy-paste unbundled components + Tailwind + Framer Motion |
| **Primary Strength** | Text animations, interactive cards, micro-interactions, canvas/WebGL backgrounds |
| **Compatibility** | Next.js (App Router / Pages), Vite, Remix, Astro, Gatsby |
| **Dependencies** | `framer-motion`, `clsx`, `tailwind-merge`, (optional `three` for 3D shaders) |

---

## 2. Prerequisites & Installation

React Bits uses standard Tailwind utility classes and Framer Motion for spring physics:

```bash
npm install framer-motion clsx tailwind-merge lucide-react
```

### Essential Tailwind Keyframes (`tailwind.config.ts` or `src/index.css`)
```css
@keyframes shine {
  0% { background-position: 100% }
  100% { background-position: -100% }
}

@keyframes star-border {
  100% { transform: rotate(360deg) }
}

.animate-shine {
  animation: shine 5s linear infinite;
}
```

---

## 3. Complete Component Catalog

React Bits is organized into 4 distinct creative categories:

```
┌────────────────────────────────────────────────────────┐
│                   REACT BITS CATALOG                   │
├────────────────────────────────────────────────────────┤
│ 1. TEXT ANIMATIONS                                     │
│    - ShinyText          - TrueFocus                    │
│    - SplitText          - BlurText                     │
│    - DecryptedText      - RotatingText                 │
│    - VariableProximity  - Waves                        │
├────────────────────────────────────────────────────────┤
│ 2. COMPONENTS & CREATIVE CARDS                         │
│    - SpotlightCard      - TiltedCard                   │
│    - StarBorder         - PixelCard                    │
│    - GlareCard          - ElasticSlider                │
│    - Stack              - FlowingMenu                  │
├────────────────────────────────────────────────────────┤
│ 3. ANIMATIONS & MICRO-INTERACTIONS                     │
│    - Magnet             - BlobCursor                   │
│    - SplashCursor       - ClickSpark                   │
│    - FollowCursor       - FadeContent                  │
├────────────────────────────────────────────────────────┤
│ 4. INTERACTIVE BACKGROUNDS                             │
│    - Aurora             - Squares                      │
│    - Particles          - Hyperspeed                   │
│    - DotGrid            - Iridescence                  │
│    - GridDistortion     - Balatro                      │
└────────────────────────────────────────────────────────┘
```

---

## 4. Canonical Code Recipes

### Recipe A: `ShinyText` (Dynamic Light-Sweep Heading)
Sweeps a gradient light beam across typography without heavy re-renders.

```tsx
"use client"

import React from "react"

interface ShinyTextProps {
  text: string
  disabled?: boolean
  speed?: number
  className?: string
}

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
```

### Recipe B: `TrueFocus` (Interactive Morphing Word Focus)
Draws dynamic corner brackets around words sequentially or on hover.

```tsx
"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface TrueFocusProps {
  sentence?: string
  manualMode?: boolean
  blurAmount?: number
  borderColor?: string
  glowColor?: string
  animationDuration?: number
  pauseBetweenAnimations?: number
}

export const TrueFocus: React.FC<TrueFocusProps> = ({
  sentence = "True Focus",
  manualMode = false,
  blurAmount = 5,
  borderColor = "#3b82f6",
  glowColor = "rgba(59, 130, 246, 0.4)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
}) => {
  const words = sentence.split(" ")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lastActiveIndex, setLastActiveIndex] = useState<number | null>(null)
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
    <div ref={containerRef} className="relative flex flex-wrap gap-3 items-center justify-center p-4">
      {words.map((word, index) => {
        const isCurrent = index === currentIndex
        return (
          <span
            key={index}
            ref={(el) => (wordRefs.current[index] = el)}
            onMouseEnter={() => {
              if (manualMode) {
                setLastActiveIndex(index)
                setCurrentIndex(index)
              }
            }}
            className="cursor-pointer text-2xl font-bold transition-all duration-300 select-none text-zinc-900 dark:text-zinc-100"
            style={{
              filter: manualMode
                ? isCurrent
                  ? "none"
                  : `blur(${blurAmount}px)`
                : isCurrent
                ? "none"
                : `blur(${blurAmount}px)`,
              opacity: isCurrent ? 1 : 0.4,
            }}
          >
            {word}
          </span>
        )
      })}

      <motion.div
        className="pointer-events-none absolute border-2 rounded-lg"
        animate={{
          x: focusRect.x - 6,
          y: focusRect.y - 4,
          width: focusRect.width + 12,
          height: focusRect.height + 8,
          opacity: focusRect.width > 0 ? 1 : 0,
        }}
        transition={{ duration: animationDuration, ease: "easeInOut" }}
        style={{
          borderColor,
          boxShadow: `0 0 15px ${glowColor}`,
        }}
      />
    </div>
  )
}
```

### Recipe C: `TiltedCard` (3D Interactive Tilt on Cursor Move)
Calculates rotational transforms according to mouse position inside the card bounding box.

```tsx
"use client"

import React, { useRef, useState } from "react"
import { motion, useSpring } from "framer-motion"

interface TiltedCardProps {
  children: React.ReactNode
  maxTilt?: number
  scale?: number
  className?: string
}

export const TiltedCard: React.FC<TiltedCardProps> = ({
  children,
  maxTilt = 15,
  scale = 1.03,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const springConfig = { damping: 20, stiffness: 200 }
  const rotateX = useSpring(0, springConfig)
  const rotateY = useSpring(0, springConfig)
  const currentScale = useSpring(1, springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const tiltX = ((y - centerY) / centerY) * -maxTilt
    const tiltY = ((x - centerX) / centerX) * maxTilt

    rotateX.set(tiltX)
    rotateY.set(tiltY)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    currentScale.set(scale)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    rotateX.set(0)
    rotateY.set(0)
    currentScale.set(1)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        scale: currentScale,
      }}
      className={`perspective-1000 ${className}`}
    >
      {children}
    </motion.div>
  )
}
```

### Recipe D: `StarBorder` (Rotating Gradient Halo Border)
A high-converting CTA card/button wrapper with rotating perimeter border beam.

```tsx
"use client"

import React from "react"

interface StarBorderProps {
  children: React.ReactNode
  color?: string
  speed?: string
  className?: string
  as?: React.ElementType
}

export const StarBorder: React.FC<StarBorderProps> = ({
  children,
  color = "#3b82f6",
  speed = "6s",
  className = "",
  as: Component = "button",
}) => {
  return (
    <Component
      className={`relative inline-block overflow-hidden rounded-2xl p-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    >
      <div
        className="absolute inset-[-100%] animate-[spin_6s_linear_infinite]"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg 340deg, ${color} 360deg)`,
          animationDuration: speed,
        }}
      />
      <div className="relative z-10 rounded-2xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-900">
        {children}
      </div>
    </Component>
  )
}
```

### Recipe E: `Magnet` (Cursor Attraction Physics)
Pulls an element toward the cursor within a configured bounding distance.

```tsx
"use client"

import React, { useRef, useState } from "react"
import { motion, useSpring } from "framer-motion"

interface MagnetProps {
  children: React.ReactNode
  padding?: number
  disabled?: boolean
  magnetStrength?: number
  className?: string
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled || !ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2

    const distX = Math.abs(centerX - e.clientX)
    const distY = Math.abs(centerY - e.clientY)

    if (distX < width / 2 + padding && distY < height / 2 + padding) {
      x.set((e.clientX - centerX) / magnetStrength)
      y.set((e.clientY - centerY) / magnetStrength)
    } else {
      x.set(0)
      y.set(0)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  )
}
```

---

## 5. Pairing React Bits with Other Systems

| Combined Stack | Best Use Case |
|---|---|
| **React Bits + shadcn/ui** | Professional SaaS dashboard with eye-catching interactive headers & tilted cards |
| **React Bits + Tailark** | High-converting marketing landing pages with rotating StarBorders & ShinyText CTAs |
| **React Bits + Untitled UI** | Clean B2B product tours with interactive TrueFocus words & Magnet buttons |
| **React Bits + DaisyUI** | Rapid MVP with 0 kB JS base classes + lightweight text animations |
