import React, { useState } from "react"
import {
  Layers,
  Search,
  Sparkles,
  Compass,
  Moon,
  Sun,
  Terminal,
  Check,
  LayoutGrid,
  Maximize2,
  Menu,
  X
} from "lucide-react"

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  )
}

interface HeaderProps {
  searchQuery: string
  setSearchQuery: (q: string) => void
  isDark: boolean
  toggleTheme: () => void
  onOpenRecommender: () => void
  onOpenCrosswalk: () => void
  viewMode: "grid" | "inspector"
  setViewMode: (m: "grid" | "inspector") => void
  onTriggerToast: (msg: string, sub?: string) => void
  onToggleMobileSidebar?: () => void
}

export function Header({
  searchQuery,
  setSearchQuery,
  isDark,
  toggleTheme,
  onOpenRecommender,
  onOpenCrosswalk,
  viewMode,
  setViewMode,
  onTriggerToast,
  onToggleMobileSidebar,
}: HeaderProps) {
  const [copiedCli, setCopiedCli] = useState(false)

  const handleCopyCli = () => {
    navigator.clipboard.writeText("npx skill-ui")
    setCopiedCli(true)
    onTriggerToast("Copied CLI command!", "Run `npx skill-ui` in terminal to launch recommender")
    setTimeout(() => setCopiedCli(false), 2000)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80 transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6">
        {/* Brand / Logo & Mobile Menu Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {onToggleMobileSidebar && (
            <button
              onClick={onToggleMobileSidebar}
              aria-label="Open categories navigation"
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition"
            >
              <Menu className="h-4 w-4" />
            </button>
          )}

          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 shadow-md sm:shadow-lg shadow-blue-500/20 text-white">
            <Layers className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-extrabold text-sm sm:text-lg tracking-tight text-zinc-950 dark:text-zinc-50">
                Skill UI
              </span>
              <span className="hidden sm:inline-flex items-center rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] sm:text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                Studio
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-zinc-500">
              Interactive Component Engine for 12 Modern UI Systems
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-xs sm:max-w-sm mx-2 sm:mx-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search templates..."
            aria-label="Search component templates"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50/80 pl-8 pr-7 py-1.5 sm:py-2 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-100 dark:focus:bg-zinc-900"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              aria-label="Clear search query"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        {/* Actions & Utilities */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Stack Recommender Button */}
          <button
            onClick={onOpenRecommender}
            title="Launch 3-step UI Stack Recommender"
            className="hidden lg:inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm hover:from-blue-500 hover:to-indigo-500 transition active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Stack Picker</span>
          </button>

          {/* 12-System Crosswalk Button */}
          <button
            onClick={onOpenCrosswalk}
            title="Open 12-System Syntax Crosswalk"
            className="hidden md:inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800 transition"
          >
            <Compass className="h-3.5 w-3.5 text-zinc-400" />
            <span>Crosswalk</span>
          </button>

          {/* Quick CLI Copy */}
          <button
            onClick={handleCopyCli}
            title="Copy CLI command (npx skill-ui)"
            className="hidden xl:inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50 px-2.5 py-2 font-mono text-xs text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition"
          >
            <Terminal className="h-3.5 w-3.5 text-blue-500" />
            <span>npx skill-ui</span>
            {copiedCli ? <Check className="h-3 w-3 text-emerald-500" /> : null}
          </button>

          {/* Theme Switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition"
          >
            {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* GitHub Repo */}
          <a
            href="https://github.com/isreeharim/uiskill"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
            title="View project on GitHub"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  )
}
