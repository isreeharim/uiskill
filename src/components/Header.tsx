import { memo } from "react"
import {
  Search,
  Sparkles,
  Moon,
  Sun,
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
  onToggleMobileSidebar?: () => void
  isSidebarCollapsed?: boolean
  onToggleSidebarCollapse?: () => void
}

export const Header = memo(function Header({
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
  onToggleMobileSidebar,
  isSidebarCollapsed = false,
  onToggleSidebarCollapse,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/[0.08] dark:border-white/[0.08] apple-glass transition-colors">
      <div className="flex h-[52px] w-full items-center justify-between gap-3 px-3 sm:px-5 lg:px-6">
        {/* Left Section: Nav trigger, Logo & macOS Segmented Switcher */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          {onToggleMobileSidebar && (
            <button
              onClick={onToggleMobileSidebar}
              aria-label="Open navigation drawer"
              className="lg:hidden flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-black/[0.08] bg-white/70 text-[#1D1D1F] hover:bg-white active:scale-95 dark:border-white/[0.1] dark:bg-white/[0.06] dark:text-[#F5F5F7] dark:hover:bg-white/[0.1] transition-all"
            >
              <Menu className="h-4 w-4" />
            </button>
          )}

          {onToggleSidebarCollapse && (
            <button
              onClick={onToggleSidebarCollapse}
              aria-label={isSidebarCollapsed ? "Expand sidebar (Cmd+B)" : "Collapse sidebar (Cmd+B)"}
              title={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.08] bg-white/60 text-[#86868B] hover:bg-white hover:text-[#1D1D1F] active:scale-95 dark:border-white/[0.1] dark:bg-white/[0.05] dark:text-[#86868B] dark:hover:bg-white/[0.1] dark:hover:text-[#F5F5F7] transition-all"
            >
              {isSidebarCollapsed ? (
                <PanelLeft className="h-4 w-4 text-[#0071E3] dark:text-[#2997FF]" />
              ) : (
                <PanelLeftClose className="h-4 w-4" />
              )}
            </button>
          )}

          {/* Apple Brand Identity */}
          <div className="flex shrink-0 items-center gap-2">
            <img
              src="/logo.png"
              alt="uiskill"
              className="h-7 w-7 rounded-[8px] object-contain border border-black/[0.08] dark:border-white/[0.1] bg-white p-0.5 shadow-xs"
            />
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-sm tracking-[-0.015em] text-[#1D1D1F] dark:text-[#F5F5F7]">
                uiskill
              </span>
              <span className="hidden sm:inline-flex items-center rounded-md border border-black/[0.08] bg-black/[0.04] px-1.5 py-0.2 text-[10px] font-mono font-medium text-[#86868B] dark:border-white/[0.1] dark:bg-white/[0.06] dark:text-neutral-400">
                v2.0
              </span>
            </div>
          </div>

          {/* macOS Inset Segmented Control */}
          <div className="hidden sm:flex items-center rounded-lg bg-black/[0.05] p-0.5 dark:bg-white/[0.08] border border-black/[0.04] dark:border-white/[0.04] text-xs">
            <button
              onClick={() => onTabChange("components")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition-all duration-150 active:scale-[0.98] ${
                activeTab === "components"
                  ? "bg-white text-[#1D1D1F] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_1px_1px_rgba(0,0,0,0.04)] dark:bg-[#2C2C2E] dark:text-[#F5F5F7]"
                  : "text-[#86868B] hover:text-[#1D1D1F] dark:text-[#86868B] dark:hover:text-[#F5F5F7]"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5 opacity-80" />
              <span>UI Templates</span>
              <span className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono font-medium ${
                activeTab === "components"
                  ? "bg-black/[0.06] text-[#1D1D1F] dark:bg-white/[0.1] dark:text-[#F5F5F7]"
                  : "bg-black/[0.04] text-[#86868B] dark:bg-white/[0.06]"
              }`}>
                {componentsCount}
              </span>
            </button>
            <button
              onClick={() => onTabChange("skills")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition-all duration-150 active:scale-[0.98] ${
                activeTab === "skills"
                  ? "bg-white text-[#1D1D1F] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_1px_1px_rgba(0,0,0,0.04)] dark:bg-[#2C2C2E] dark:text-[#F5F5F7]"
                  : "text-[#86868B] hover:text-[#1D1D1F] dark:text-[#86868B] dark:hover:text-[#F5F5F7]"
              }`}
            >
              <Sparkles className="h-3.5 w-3.5 opacity-80" />
              <span>Agent Skills</span>
              <span className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono font-medium ${
                activeTab === "skills"
                  ? "bg-black/[0.06] text-[#1D1D1F] dark:bg-white/[0.1] dark:text-[#F5F5F7]"
                  : "bg-black/[0.04] text-[#86868B] dark:bg-white/[0.06]"
              }`}>
                {skillsCount}
              </span>
            </button>
          </div>
        </div>

        {/* Center: System Search bar + Adjacent GitHub button */}
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-xs sm:max-w-sm lg:max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#86868B]" />
            <input
              type="text"
              placeholder={activeTab === "components" ? `Search ${componentsCount} templates... (⌘K)` : `Search ${skillsCount} skills... (⌘K)`}
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 w-full rounded-lg border border-transparent bg-black/[0.04] pl-8 pr-12 text-xs text-[#1D1D1F] placeholder-[#86868B] outline-none transition-all focus:border-[#0071E3] focus:bg-white focus:ring-2 focus:ring-[#0071E3]/20 dark:bg-white/[0.06] dark:text-[#F5F5F7] dark:placeholder-[#86868B] dark:focus:border-[#2997FF] dark:focus:bg-[#1C1C1E] dark:focus:ring-[#2997FF]/20"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search query"
                  className="p-0.5 text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]"
                >
                  <X className="h-3 w-3" />
                </button>
              ) : (
                <kbd className="hidden lg:inline-flex items-center rounded border border-black/[0.08] bg-black/[0.03] px-1 text-[10px] font-mono text-[#86868B] dark:border-white/[0.1] dark:bg-white/[0.06]">
                  ⌘K
                </kbd>
              )}
            </div>
          </div>

          <a
            href="https://github.com/isreeharim/uiskill"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
            title="View on GitHub"
            className="flex h-8 items-center gap-1.5 rounded-lg border border-black/[0.08] bg-white/70 px-2.5 text-xs font-medium text-[#1D1D1F] hover:bg-white active:scale-95 dark:border-white/[0.1] dark:bg-white/[0.06] dark:text-[#F5F5F7] dark:hover:bg-white/[0.1] transition-all shrink-0"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            <span className="hidden xl:inline text-[11px] font-medium">GitHub</span>
          </a>
        </div>

        {/* Right Section: Density & Theme Toggles */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          {/* View density toggle */}
          <div className="hidden sm:flex items-center rounded-lg border border-black/[0.08] bg-black/[0.04] p-0.5 dark:border-white/[0.08] dark:bg-white/[0.06]">
            <button
              onClick={() => setViewMode("grid")}
              title="Grid View (Interactive card sandbox)"
              aria-label="Grid view"
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-all duration-150 ${
                viewMode === "grid"
                  ? "bg-white text-[#1D1D1F] shadow-[0_1px_2px_rgba(0,0,0,0.06)] dark:bg-[#2C2C2E] dark:text-[#F5F5F7]"
                  : "text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span className="hidden xl:inline text-[11px]">Grid</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              title="List View (High-density scanning)"
              aria-label="List view"
              className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-all duration-150 ${
                viewMode === "list"
                  ? "bg-white text-[#1D1D1F] shadow-[0_1px_2px_rgba(0,0,0,0.06)] dark:bg-[#2C2C2E] dark:text-[#F5F5F7]"
                  : "text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]"
              }`}
            >
              <Rows3 className="h-3.5 w-3.5" />
              <span className="hidden xl:inline text-[11px]">List</span>
            </button>
          </div>

          {/* Theme switcher */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark/light theme"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.08] bg-white/70 text-[#1D1D1F] hover:bg-white active:scale-95 dark:border-white/[0.1] dark:bg-white/[0.06] dark:text-[#F5F5F7] dark:hover:bg-white/[0.1] transition-all"
          >
            {isDark ? <Sun className="h-3.5 w-3.5 text-[#FF9F0A]" /> : <Moon className="h-3.5 w-3.5 text-[#86868B]" />}
          </button>
        </div>
      </div>

      {/* Mobile-first controls: always available below the compact top row */}
      <div className="border-t border-black/[0.06] px-3 py-2 dark:border-white/[0.06] md:hidden">
        <div className="flex items-center gap-2">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#86868B]" />
            <input
              type="search"
              inputMode="search"
              enterKeyHint="search"
              placeholder={activeTab === "components" ? `Search ${componentsCount} templates` : `Search ${skillsCount} skills`}
              aria-label="Search templates and skills"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-full rounded-lg border border-black/[0.08] bg-black/[0.04] pl-9 pr-9 text-xs text-[#1D1D1F] placeholder-[#86868B] outline-none focus:border-[#0071E3] focus:bg-white dark:border-white/[0.1] dark:bg-white/[0.06] dark:text-[#F5F5F7]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search query"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <a
            href="https://github.com/isreeharim/uiskill"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
            title="View on GitHub"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-[#1D1D1F] hover:bg-black/[0.04] active:scale-95 dark:border-white/[0.1] dark:bg-[#161617] dark:text-[#F5F5F7] dark:hover:bg-white/[0.08] transition-all"
          >
            <GithubIcon className="h-4 w-4" />
          </a>
          <div className="flex shrink-0 items-center rounded-lg border border-black/[0.08] bg-black/[0.04] p-0.5 dark:border-white/[0.08] dark:bg-white/[0.06]">
            <button
              onClick={() => onTabChange("components")}
              aria-label="UI Templates"
              className={`flex h-8 w-8 items-center justify-center rounded-md transition-all ${
                activeTab === "components" ? "bg-white text-[#0071E3] shadow-xs dark:bg-[#2C2C2E] dark:text-[#2997FF]" : "text-[#86868B]"
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => onTabChange("skills")}
              aria-label="Agent Skills"
              className={`flex h-8 w-8 items-center justify-center rounded-md transition-all ${
                activeTab === "skills" ? "bg-white text-[#0071E3] shadow-xs dark:bg-[#2C2C2E] dark:text-[#2997FF]" : "text-[#86868B]"
              }`}
            >
              <Sparkles className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
})
