"use client"

import React, { useState, useRef, useCallback } from "react"
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Sparkles,
  Headphones,
  Radio,
  Sliders,
  Check
} from "lucide-react"

export function IOSLiquidGlass() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(72)
  const [spatialMode, setSpatialMode] = useState<"off" | "fixed" | "tracked">("tracked")
  const [isMuted, setIsMuted] = useState(false)
  const [activePreset, setActivePreset] = useState("Vocal")
  const containerRef = useRef<HTMLDivElement>(null)
  const causticRef = useRef<HTMLDivElement>(null)
  const rafId = useRef<number | null>(null)

  // Track pointer for real-time specular light refraction with zero React re-renders
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current || !causticRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100)
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100)

    if (rafId.current) cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => {
      if (causticRef.current) {
        causticRef.current.style.background = `radial-gradient(circle 180px at ${x}% ${y}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.08) 50%, transparent 80%)`
        causticRef.current.style.opacity = "1"
      }
    })
  }, [])

  const handlePointerLeave = useCallback(() => {
    if (causticRef.current) {
      causticRef.current.style.opacity = "0.6"
    }
  }, [])

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newVol = Math.round(Math.max(0, Math.min(100, (clickX / rect.width) * 100)))
    setVolume(newVol)
    if (isMuted) setIsMuted(false)
  }

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full max-w-sm rounded-[28px] overflow-hidden p-5 select-none transition-all duration-300 ios-liquid-glass group"
      style={{
        transform: "perspective(1000px)",
      }}
    >
      {/* Specular curved glass caustic & refraction overlay that tracks cursor */}
      <div
        ref={causticRef}
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 180px at 50% 30%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.08) 50%, transparent 80%)`,
          opacity: 0.8,
        }}
      />

      {/* Iridescent Chromatic Rim Dispersion */}
      <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/30 dark:border-white/15 [mask-image:linear-gradient(to_bottom,white,transparent)]" />

      {/* Header: Status & AirPlay / Spatial Tag */}
      <div className="relative z-10 flex items-center justify-between text-xs mb-3.5">
        <div className="flex items-center gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0071E3]/15 text-[#0071E3] dark:bg-[#2997FF]/20 dark:text-[#2997FF]">
            <Headphones className="h-3 w-3" />
          </div>
          <span className="font-semibold text-[11px] tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7]">
            AirPods Max
          </span>
        </div>

        <div className="flex items-center gap-1 rounded-full bg-black/[0.05] dark:bg-white/[0.08] px-2 py-0.5 text-[10px] font-medium text-[#86868B]">
          <Radio className="h-2.5 w-2.5 text-[#0071E3] dark:text-[#2997FF] animate-pulse" />
          <span>Spatial Audio</span>
        </div>
      </div>

      {/* Centerpiece: Dynamic Track & Fluid Artwork */}
      <div className="relative z-10 flex items-center gap-3.5 p-2 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.06]">
        {/* Album Glass Tile with Liquid Caustics */}
        <div className="relative h-14 w-14 shrink-0 rounded-xl overflow-hidden shadow-md flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
          <Sparkles className="h-6 w-6 text-white/90 drop-shadow-md" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/30" />
        </div>

        {/* Track Metadata */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h4 className="font-semibold text-xs text-[#1D1D1F] dark:text-[#F5F5F7] truncate">
              Liquid Symphony No. 9
            </h4>
            <span className="rounded px-1 text-[9px] font-mono font-bold bg-[#0071E3]/10 text-[#0071E3] dark:bg-[#2997FF]/20 dark:text-[#2997FF]">
              LOSSLESS
            </span>
          </div>
          <p className="text-[11px] text-[#86868B] truncate mt-0.5">
            Apple Classical • Dolby Atmos
          </p>

          {/* Fluid Waveform Bars */}
          <div className="flex items-center gap-0.5 mt-2 h-2.5">
            {[40, 75, 90, 55, 100, 70, 85, 45, 95, 60, 80, 50].map((h, i) => (
              <span
                key={i}
                className="w-1 rounded-full bg-[#0071E3] dark:bg-[#2997FF] transition-all duration-300"
                style={{
                  height: isPlaying ? `${h}%` : "25%",
                  opacity: isPlaying ? 0.85 : 0.4,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Liquid Glass Fluid Volume Tube */}
      <div className="relative z-10 mt-3.5 space-y-1">
        <div className="flex items-center justify-between text-[10px] text-[#86868B] px-0.5">
          <span className="font-medium">Liquid Volume</span>
          <span className="font-mono">{isMuted ? "Muted" : `${volume}%`}</span>
        </div>

        <div
          onClick={handleVolumeClick}
          className="relative h-4 w-full rounded-full bg-black/[0.08] dark:bg-white/[0.1] border border-black/[0.06] dark:border-white/[0.12] overflow-hidden cursor-pointer shadow-inner group/slider"
        >
          {/* Liquid fluid reservoir */}
          <div
            className="h-full rounded-full transition-all duration-150 relative overflow-hidden bg-gradient-to-r from-[#0071E3] to-[#2997FF]"
            style={{ width: isMuted ? "0%" : `${volume}%` }}
          >
            {/* Liquid fluid surface sheen highlight */}
            <div className="absolute inset-x-0 top-0 h-1/2 bg-white/35" />
            <div className="absolute right-0 inset-y-0 w-2 bg-white/60 blur-[1px]" />
          </div>

          {/* Volume icon affordance inside slider */}
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-white/80 pointer-events-none">
            {isMuted || volume === 0 ? (
              <VolumeX className="h-2.5 w-2.5" />
            ) : (
              <Volume2 className="h-2.5 w-2.5" />
            )}
          </div>
        </div>
      </div>

      {/* Primary Liquid Playback Controls */}
      <div className="relative z-10 flex items-center justify-between mt-3.5 pt-2 border-t border-black/[0.06] dark:border-white/[0.06]">
        {/* Spatial Audio Mode Pill Selector */}
        <div className="flex items-center gap-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] p-0.5 border border-black/[0.04] dark:border-white/[0.06]">
          {(["off", "fixed", "tracked"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setSpatialMode(mode)}
              className={`capitalize px-2 py-0.5 rounded-full text-[10px] font-medium transition-all ${
                spatialMode === mode
                  ? "bg-white text-[#1D1D1F] shadow-xs dark:bg-white/20 dark:text-[#F5F5F7] font-semibold"
                  : "text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Play/Pause/Skip buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setVolume((v) => Math.max(0, v - 10))}
            aria-label="Previous track"
            className="h-7 w-7 rounded-full flex items-center justify-center text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition active:scale-90"
          >
            <SkipBack className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? "Pause playback" : "Start playback"}
            className="h-8 w-8 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center hover:bg-black dark:bg-[#F5F5F7] dark:text-[#1D1D1F] dark:hover:bg-white shadow-sm transition active:scale-95"
          >
            {isPlaying ? (
              <Pause className="h-3.5 w-3.5" />
            ) : (
              <Play className="h-3.5 w-3.5 ml-0.5 fill-current" />
            )}
          </button>

          <button
            onClick={() => setVolume((v) => Math.min(100, v + 10))}
            aria-label="Next track"
            className="h-7 w-7 rounded-full flex items-center justify-center text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition active:scale-90"
          >
            <SkipForward className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default IOSLiquidGlass
