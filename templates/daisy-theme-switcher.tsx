"use client"

import * as React from "react"
import { Palette } from "lucide-react"

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

  React.useEffect(() => {
    const saved = localStorage.getItem("daisy-theme") || "light"
    setCurrentTheme(saved)
    document.documentElement.setAttribute("data-theme", saved)
  }, [])

  const handleSelect = (theme: string) => {
    setCurrentTheme(theme)
    localStorage.setItem("daisy-theme", theme)
    document.documentElement.setAttribute("data-theme", theme)
  }

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-outline btn-sm gap-2 capitalize">
        <Palette className="h-4 w-4" />
        <span>Theme: {currentTheme}</span>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow-2xl bg-base-200 rounded-box w-52 max-h-80 overflow-y-auto mt-2"
      >
        {DAISY_THEMES.map((theme) => (
          <li key={theme}>
            <button
              onClick={() => handleSelect(theme)}
              className={`capitalize flex justify-between ${
                currentTheme === theme ? "active font-bold" : ""
              }`}
            >
              <span>{theme}</span>
              {currentTheme === theme && <span>✓</span>}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
