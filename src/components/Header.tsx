import { useState } from "react"
import {
  Search,
  Sparkles,
  Moon,
  Sun,
  Terminal,
  Check,
  LayoutGrid,
  Rows3,
  Menu,
  X,
  PanelLeftClose,
  PanelLeft
} from "lucide-react"

function GithubIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

export interface HeaderProps {
  activeTab: "components" | "skills"
  onTabChange: (tab: "components" | "skills") => void
  componentsCount: number
  skillsCount: number
  searchQuery: string
  setSearchQuery: (q: string) => void
  isDark: boolean
  toggleTheme: () => void
  viewMode: "grid" | "list"
  setViewMode: (m: "grid" | "list") => void
  onTriggerToast: (msg: string, sub?: string) => void
  onToggleMobileSidebar?: () => void
  isSidebarCollapsed?: boolean
  onToggleSidebarCollapse?: () => void
}

export function Header({
  activeTab,
  onTabChange,
  componentsCount,
  skillsCount,
  searchQuery,
  setSearchQuery,
  isDark,
  toggleTheme,
  viewMode,
  setViewMode,
  onTriggerToast,
  onToggleMobileSidebar,
  isSidebarCollapsed = false,
  onToggleSidebarCollapse,
}: HeaderProps) {
  const [copiedCli, setCopiedCli] = useState(false)

  const handleCopyCli = async () => {
    try {
      await navigator.clipboard.writeText("npx uiskill")
      setCopiedCli(true)
      onTriggerToast("Copied CLI command!", "Run `npx uiskill` in your terminal to launch the interactive studio")
      setTimeout(() => setCopiedCli(false), 2000)
    } catch {
      onTriggerToast("Could not copy command", "Copy `npx uiskill` manually")
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/95 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/95 transition-colors">
      <div className="mx-auto flex min-h-14 max-w-7xl items-center justify-between gap-2 px-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-1.5 sm:gap-3">
          {onToggleMobileSidebar && (
            <button
              onClick={onToggleMobileSidebar}
              aria-label="Open navigation drawer"
              className="lg:hidden flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition"
            >
              <Menu className="h-4 w-4" />
            </button>
          )}

          {onToggleSidebarCollapse && (
            <button
              onClick={onToggleSidebarCollapse}
              aria-label={isSidebarCollapsed ? "Expand sidebar (Cmd+B)" : "Collapse sidebar (Cmd+B)"}
              title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200/80 bg-zinc-50/50 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition"
            >
              {isSidebarCollapsed ? <PanelLeft className="h-4 w-4 text-blue-600 dark:text-blue-400" /> : <PanelLeftClose className="h-4 w-4" />}
            </button>
          )}

          <div className="flex shrink-0 items-center gap-2">
            <img src="/logo.png" alt="uiskill" className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg object-contain shadow-xs border border-zinc-200/80 dark:border-zinc-800/80 bg-white p-0.5" />
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-tight text-zinc-950 dark:text-zinc-50">uiskill</span>
              <span className="hidden sm:inline-flex items-center rounded-md border border-blue-500/20 bg-blue-50/60 dark:bg-blue-950/40 px-1.5 py-0.2 text-[10px] font-mono font-semibold text-blue-600 dark:text-blue-400">v2.0</span>
            </div>
          </div>

          <div className="hidden sm:flex items-center rounded-xl bg-zinc-100 p-0.5 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-xs">
            <button onClick={() => onTabChange("components")} className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-semibold transition-all ${activeTab === "components" ? "bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-zinc-50" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"}`}>
              <LayoutGrid className="h-3.5 w-3.5 text-blue-500" />
              <span>UI Templates</span>
              <span className="rounded-full bg-zinc-200/70 dark:bg-zinc-700/80 px-1.5 py-0.2 text-[10px] font-mono font-medium text-zinc-700 dark:text-zinc-300">{componentsCount}</span>
            </button>
            <button onClick={() => onTabChange("skills")} className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 font-semibold transition-all ${activeTab === "skills" ? "bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-zinc-50" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"}`}>
              <Sparkles className="h-3.5 w-3.5 text-purple-500" />
              <span>Agent Skills</span>
              <span className="rounded-full bg-purple-100 dark:bg-purple-950/80 px-1.5 py-0.2 text-[10px] font-mono font-medium text-purple-700 dark:text-purple-300">{skillsCount}</span>
            </button>
          </div>
        </div>

        <div className="hidden md:block relative flex-1 max-w-xs sm:max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
          <input type="text" placeholder={activeTab === "components" ? `Filter ${componentsCount} templates... (⌘K)` : `Filter ${skillsCount} skills... (⌘K)`} aria-label="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full rounded-lg border border-zinc-200 bg-zinc-50/80 pl-8 pr-14 py-1.5 text-xs text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-1 focus:ring-blue-500/20 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-100 dark:focus:bg-zinc-900" />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {searchQuery ? <button onClick={() => setSearchQuery("")} aria-label="Clear search query" className="p-0.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"><X className="h-3 w-3" /></button> : <kbd className="hidden lg:inline-flex items-center rounded border border-zinc-200 bg-zinc-100 px-1 text-[10px] font-mono text-zinc-500 dark:border-zinc-800 dark:bg-zinc-800 dark:text-zinc-400">⌘K</kbd>}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <div className="hidden sm:flex items-center rounded-lg border border-zinc-200 bg-zinc-100/90 p-0.5 dark:border-zinc-800 dark:bg-zinc-900">
            <button onClick={() => setViewMode("grid")} title="Grid View" aria-label="Grid view" className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition ${viewMode === "grid" ? "bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-zinc-50" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"}`}>
              <LayoutGrid className="h-3.5 w-3.5" /><span className="hidden xl:inline text-[11px]">Grid</span>
            </button>
            <button onClick={() => setViewMode("list")} title="List View" aria-label="List view" className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition ${viewMode === "list" ? "bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-zinc-50" : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"}`}>
              <Rows3 className="h-3.5 w-3.5" /><span className="hidden xl:inline text-[11px]">List</span>
            </button>
          </div>

          <button onClick={handleCopyCli} title="Copy CLI command: npx uiskill" className="hidden xl:inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-1.5 font-mono text-[11px] text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition">
            <Terminal className="h-3 w-3 text-blue-500" /><span>npx uiskill</span>{copiedCli && <Check className="h-3 w-3 text-emerald-500" />}
          </button>

          <button onClick={toggleTheme} aria-label="Toggle dark/light theme" title={isDark ? "Switch to light mode" : "Switch to dark mode"} className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition">
            {isDark ? <Sun className="h-3.5 w-3.5 text-amber-400" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
          <a href="https://github.com/isreeharim/uiskill" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository" title="View on GitHub" className="hidden xs:flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition">
            <GithubIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Mobile-first controls: always available below the compact top row */}
      <div className="border-t border-zinc-200/70 px-3 py-2 dark:border-zinc-800/70 md:hidden">
        <div className="flex items-center gap-2">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input type="search" inputMode="search" enterKeyHint="search" placeholder={activeTab === "components" ? `Search ${componentsCount} templates` : `Search ${skillsCount} skills`} aria-label="Search templates and skills" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-9 pr-9 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100" />
            {searchQuery && <button onClick={() => setSearchQuery("")} aria-label="Clear search query" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800"><X className="h-4 w-4" /></button>}
          </div>
          <div className="flex shrink-0 items-center rounded-xl border border-zinc-200 bg-zinc-100 p-0.5 dark:border-zinc-800 dark:bg-zinc-900">
            <button onClick={() => onTabChange("components")} aria-label="UI Templates" className={`flex h-9 w-9 items-center justify-center rounded-lg ${activeTab === "components" ? "bg-white text-blue-600 shadow-xs dark:bg-zinc-800 dark:text-blue-400" : "text-zinc-500 dark:text-zinc-400"}`}><LayoutGrid className="h-4 w-4" /></button>
            <button onClick={() => onTabChange("skills")} aria-label="Agent Skills" className={`flex h-9 w-9 items-center justify-center rounded-lg ${activeTab === "skills" ? "bg-white text-purple-600 shadow-xs dark:bg-zinc-800 dark:text-purple-400" : "text-zinc-500 dark:text-zinc-400"}`}><Sparkles className="h-4 w-4" /></button>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400">
          <span>{activeTab === "components" ? `${componentsCount} UI templates` : `${skillsCount} agent skills`}</span>
          <span className="font-medium">{activeTab === "components" ? "UI Templates" : "Agent Skills"}</span>
        </div>
      </div>
    </header>
  )
}
