"use client"

import * as React from "react"
import { Palette, ChevronDown, Check } from "lucide-react"

const DAISY_THEMES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
]

export function DaisyThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = React.useState("light")
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const saved = localStorage.getItem("daisy-theme") || "light"
    setCurrentTheme(saved)
    document.documentElement.setAttribute("data-theme", saved)
  }, [])

  // Close on outside click
  React.useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  const handleSelect = (theme: string) => {
    setCurrentTheme(theme)
    localStorage.setItem("daisy-theme", theme)
    document.documentElement.setAttribute("data-theme", theme)
    setIsOpen(false)
  }

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold capitalize text-zinc-800 shadow-xs hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition"
      >
        <Palette className="h-4 w-4 text-purple-500" />
        <span>Theme: {currentTheme}</span>
        <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-50 w-56 rounded-2xl border border-zinc-200 bg-white p-2 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 animate-in slide-in-from-top-2 fade-in duration-150">
          <div className="px-2 py-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
            30+ DaisyUI Themes
          </div>
          <ul className="max-h-64 overflow-y-auto space-y-0.5 pr-1">
            {DAISY_THEMES.map((theme) => {
              const isSelected = currentTheme === theme
              return (
                <li key={theme}>
                  <button
                    onClick={() => handleSelect(theme)}
                    className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs capitalize transition ${
                      isSelected
                        ? "bg-purple-50 font-bold text-purple-700 dark:bg-purple-950/60 dark:text-purple-300"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-200"
                    }`}
                  >
                    <span>{theme}</span>
                    {isSelected && <Check className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
