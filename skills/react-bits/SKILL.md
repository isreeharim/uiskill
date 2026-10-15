---
name: react-bits
description: Complete guide and reference for React Bits (reactbits.dev) by David Haz. An open-source collection of 200+ animated, interactive, and customizable React + Tailwind components including text effects (ShinyText, SplitText, TrueFocus, DecryptedText), creative cards (SpotlightCard, TiltedCard, StarBorder), interactive backgrounds (Aurora, Squares, Particles, Hyperspeed), and micro-interactions.
category: frontend
risk: safe
source: https://github.com/DavidHDev/react-bits
tags: react, tailwind, framer-motion, animations, react-bits, ui-components, creative-development, micro-interactions
tools: Read, Write, Edit, Bash
---

# React Bits Skill

## Overview

[React Bits](https://reactbits.dev) (created by [David Haz](https://github.com/DavidHDev/react-bits)) is an open-source library of 200+ animated, interactive, and customizable React components. Built with React, Tailwind CSS, Framer Motion, and WebGL/Canvas, it specializes in statement pieces, micro-interactions, dynamic typography, and interactive backgrounds.

## When to Use This Skill

- When designing or redesigning landing pages, dashboards, hero sections, and auth screens with fluid motion.
- When generating React code that demands high visual polish and modern creative developer flair.
- When adding text animations (`ShinyText`, `SplitText`, `TrueFocus`, `DecryptedText`, `RotatingText`).
- When creating interactive cards (`SpotlightCard`, `TiltedCard`, `PixelCard`, `StarBorder`).
- When implementing canvas/WebGL backgrounds (`Aurora`, `Squares`, `DotField`, `Hyperspeed`, `Particles`).
- When adding cursor or click effects (`SplashCursor`, `ClickSpark`, `MagnetLines`).

---

## Core Component Catalog & Code Recipes

### 1. Text Animations

#### `ShinyText`
An animated light beam gradient that sweeps across text smoothly.
```tsx
interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number; // in seconds, default 5
  className?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = ""
}) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block text-transparent bg-clip-text bg-[linear-gradient(120deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,1)_50%,rgba(255,255,255,0.4)_100%)] bg-[length:250%_100%] ${
        !disabled ? "animate-shine" : ""
      } ${className}`}
      style={{
        animationDuration,
        backgroundImage: "linear-gradient(120deg, #94a3b8 0%, #ffffff 50%, #94a3b8 100%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
      }}
    >
      {text}
    </span>
  );
};
```

#### `TrueFocus`
An interactive focus border with animated manual/hover focus framing.
```tsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const TrueFocus = ({
  sentence = "True Focus",
  manualMode = false,
  blurAmount = 5,
  borderColor = "#3b82f6",
  glowColor = "rgba(59, 130, 246, 0.4)",
  animationDuration = 0.5,
  pauseBetweenAnimations = 1
}) => {
  const words = sentence.split(" ");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (manualMode) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, (animationDuration + pauseBetweenAnimations) * 1000);
    return () => clearInterval(interval);
  }, [manualMode, words.length, animationDuration, pauseBetweenAnimations]);

  return (
    <div className="relative flex flex-wrap gap-3 items-center justify-center">
      {words.map((word, index) => {
        const isCurrent = index === currentIndex;
        return (
          <span
            key={index}
            className="relative font-bold text-3xl md:text-5xl transition-all duration-300"
            style={{
              filter: isCurrent ? "none" : `blur(${blurAmount}px)`,
              opacity: isCurrent ? 1 : 0.4
            }}
          >
            {word}
            {isCurrent && (
              <motion.span
                layoutId="focus-box"
                className="absolute -inset-2 rounded-lg border-2 pointer-events-none"
                style={{
                  borderColor,
                  boxShadow: `0 0 15px ${glowColor}`
                }}
                transition={{ duration: animationDuration, ease: "easeInOut" }}
              />
            )}
          </span>
        );
      })}
    </div>
  );
};
```

#### `DecryptedText`
A hacker/cyberpunk decryption character scramble.
```tsx
import { useEffect, useState } from "react";

const CHARS = "ABCDEFGHJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export const DecryptedText = ({ text, speed = 40, maxIterations = 10, className = "" }) => {
  const [displayText, setDisplayText] = useState(text);

  const decrypt = () => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / maxIterations;
    }, speed);
  };

  useEffect(() => {
    decrypt();
  }, [text]);

  return (
    <span onMouseEnter={decrypt} className={`cursor-pointer ${className}`}>
      {displayText}
    </span>
  );
};
```

---

### 2. Cards & Containers

#### `SpotlightCard`
A card with a dynamic radial cursor glow following mouse movement.
```tsx
import React, { useRef, useState } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = "",
  spotlightColor = "rgba(59, 130, 246, 0.15)",
  ...props
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-8 transition-all duration-300 hover:border-slate-700 ${className}`}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
```

#### `StarBorder`
A button or card with an animated glowing star border beam traveling around its perimeter.
```tsx
import React from "react";

export const StarBorder = ({
  as: Component = "button",
  className = "",
  color = "#3b82f6",
  speed = "4s",
  children,
  ...rest
}: any) => {
  return (
    <Component
      className={`relative inline-block py-[1px] px-[1px] overflow-hidden rounded-xl group ${className}`}
      {...rest}
    >
      <div
        className="absolute w-[300%] h-[50%] opacity-70 bottom-[-11px] right-[-250%] rounded-full animate-star-movement"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 20%)`,
          animationDuration: speed,
        }}
      />
      <div
        className="absolute w-[300%] h-[50%] opacity-70 top-[-10px] left-[-250%] rounded-full animate-star-movement"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 20%)`,
          animationDuration: speed,
        }}
      />
      <div className="relative z-1 bg-slate-950 text-white font-medium px-6 py-3 rounded-xl border border-slate-800 transition-colors group-hover:bg-slate-900">
        {children}
      </div>
    </Component>
  );
};
```

---

### 3. Animated Backgrounds

#### `Squares` (Interactive Grid Background)
```tsx
import { useRef, useEffect } from "react";

export const Squares = ({
  direction = "right",
  speed = 1,
  borderColor = "#1e293b",
  squareSize = 40,
  hoverFillColor = "#334155",
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let gridOffset = { x: 0, y: 0 };

    const resize = () => {
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;

      gridOffset.x = (gridOffset.x + speed * 0.3) % squareSize;

      for (let x = -squareSize + gridOffset.x; x < canvas.width + squareSize; x += squareSize) {
        for (let y = 0; y < canvas.height + squareSize; y += squareSize) {
          ctx.strokeRect(x, y, squareSize, squareSize);
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, squareSize, borderColor]);

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} />;
};
```

---

## Design Principles for React Bits

1. **Dark Aesthetic First**: Deep navy/slate background tones (`#020617`, `#090d16`, `#0f172a`), subtle border highlights (`#1e293b`, `#334155`), and electric accent colors (`#3b82f6`, `#8b5cf6`, `#06b6d4`, `#10b981`).
2. **Layered Depth**:
   - Level 0: Animated background (`Squares`, `Aurora`, `DotField`).
   - Level 1: `SpotlightCard` with cursor-reactive illumination.
   - Level 2: `ShinyText` or `DecryptedText` for impactful typography.
   - Level 3: `StarBorder` interactive triggers & buttons.
3. **Restraint & Performance**: Use CSS animations and `requestAnimationFrame` for high frame-rate rendering without CPU bottlenecks.
