import React, { useState, useEffect } from "react"
import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { ComponentCard } from "./components/ComponentCard"
import { InspectorModal } from "./components/InspectorModal"
import { StackRecommenderModal } from "./components/StackRecommenderModal"
import { LibraryCrosswalkModal } from "./components/LibraryCrosswalkModal"
import { Toast } from "./components/Toast"
import { COMPONENTS_DATA, ComponentItem } from "./data/components-data"
import {
  Sparkles,
  Layers,
  Search,
  CheckCircle2,
  Terminal,
  ArrowRight,
  Code2,
  Zap,
  LayoutGrid,
  Filter,
  X
} from "lucide-react"

export function App() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedComponentId, setSelectedComponentId] = useState<string>("dashboard-metrics-card")
  const [inspectedComponent, setInspectedComponent] = useState<ComponentItem | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "inspector">("grid")
  const [isDark, setIsDark] = useState<boolean>(true)
  const [isRecommenderOpen, setIsRecommenderOpen] = useState(false)
  const [isCrosswalkOpen, setIsCrosswalkOpen] = useState(false)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [toast, setToast] = useState<{ message: string; sub?: string } | null>(null)

  // Initialize theme from system or localStorage
  useEffect(() => {
    const saved = localStorage.getItem("skill-ui-theme")
    if (saved === "light") {
      setIsDark(false)
      document.documentElement.classList.remove("dark")
    } else {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev
      if (next) {
        document.documentElement.classList.add("dark")
        localStorage.setItem("skill-ui-theme", "dark")
      } else {
        document.documentElement.classList.remove("dark")
        localStorage.setItem("skill-ui-theme", "light")
      }
      return next
    })
  }

  const triggerToast = (message: string, sub?: string) => {
    setToast({ message, sub })
  }

  // Keyboard shortcut listener for global search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        const palette = COMPONENTS_DATA.find((c) => c.id === "command-palette")
        if (palette) setInspectedComponent(palette)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const categories = [
    "All",
    "SaaS Dashboards",
    "Marketing & Bento",
    "Auth & Flow",
    "Overlays & Actions",
    "Theming",
  ]

  // Filtered components list
  const filteredComponents = COMPONENTS_DATA.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory

    const query = searchQuery.toLowerCase().trim()
    if (!query) return matchesCategory

    const matchesQuery =
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.system.toLowerCase().includes(query) ||
      item.tags.some((t) => t.toLowerCase().includes(query)) ||
      item.fileName.toLowerCase().includes(query)

    return matchesCategory && matchesQuery
  })

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 transition-colors">
      {/* Top Header Bar */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onOpenRecommender={() => setIsRecommenderOpen(true)}
        onOpenCrosswalk={() => setIsCrosswalkOpen(true)}
        viewMode={viewMode}
        setViewMode={setViewMode}
        onTriggerToast={triggerToast}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
      />

      {/* Hero Announcement Banner */}
      <section className="relative overflow-hidden border-b border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-900/40">
        <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 mb-3">
                <Sparkles className="h-3.5 w-3.5" />
                <span>The Universal UI Architecture & Component Engine</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-zinc-950 dark:text-zinc-50">
                Live Interactive UI Preview & One-Click Code
              </h1>
              <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Preview live responsive components modeled after 12 industry-standard UI design systems.
                Pick whatever element you need, test it live, inspect the source, and copy production-ready TSX directly into your project.
              </p>
            </div>

            {/* Quick Actions Pills */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0 w-full md:w-auto">
              <button
                onClick={() => setIsRecommenderOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-indigo-500 transition active:scale-95"
              >
                <Sparkles className="h-4 w-4" />
                <span>Find Your Stack (3 Steps)</span>
              </button>

              <button
                onClick={() => setIsCrosswalkOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-xs font-bold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800 transition"
              >
                <Layers className="h-4 w-4 text-purple-500" />
                <span>12-System Cheatsheet</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-6 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs">
            <div className="p-2 sm:p-0 rounded-xl bg-zinc-50 sm:bg-transparent dark:bg-zinc-900/40 sm:dark:bg-transparent">
              <span className="font-extrabold text-sm text-zinc-950 dark:text-zinc-100">12 UI Ecosystems</span>
              <p className="text-zinc-500 text-[11px]">shadcn, Untitled UI, MUI, Mantine, HeroUI, DaisyUI...</p>
            </div>
            <div className="p-2 sm:p-0 rounded-xl bg-zinc-50 sm:bg-transparent dark:bg-zinc-900/40 sm:dark:bg-transparent">
              <span className="font-extrabold text-sm text-zinc-950 dark:text-zinc-100">12 Ready TSX Templates</span>
              <p className="text-zinc-500 text-[11px]">Tables, sidebars, bento grids, modals, auth</p>
            </div>
            <div className="p-2 sm:p-0 rounded-xl bg-zinc-50 sm:bg-transparent dark:bg-zinc-900/40 sm:dark:bg-transparent">
              <span className="font-extrabold text-sm text-zinc-950 dark:text-zinc-100">100% Owned Source</span>
              <p className="text-zinc-500 text-[11px]">Copy-paste directly with zero black-box lock-in</p>
            </div>
            <div className="p-2 sm:p-0 rounded-xl bg-zinc-50 sm:bg-transparent dark:bg-zinc-900/40 sm:dark:bg-transparent">
              <span className="font-extrabold text-sm text-zinc-950 dark:text-zinc-100">AgentSkills Ready</span>
              <p className="text-zinc-500 text-[11px]">Claude Code, Antigravity, Cursor, and Codex certified</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Studio Workspace */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col lg:flex-row">
        {/* Desktop Left Category Sidebar */}
        <div className="hidden lg:block">
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            selectedComponentId={selectedComponentId}
            onSelectComponent={(id) => {
              setSelectedComponentId(id)
              const match = COMPONENTS_DATA.find((c) => c.id === id)
              if (match) setInspectedComponent(match)
            }}
            components={COMPONENTS_DATA}
            onOpenRecommender={() => setIsRecommenderOpen(true)}
            onOpenCrosswalk={() => setIsCrosswalkOpen(true)}
          />
        </div>

        {/* Mobile Off-Canvas Drawer */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden animate-in fade-in"
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            <div
              className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white dark:bg-zinc-950 shadow-2xl overflow-y-auto p-4 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800 mb-4">
                  <div className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-blue-600" />
                    <span className="font-bold text-sm text-zinc-900 dark:text-zinc-100">Navigation & Categories</span>
                  </div>
                  <button
                    onClick={() => setIsMobileSidebarOpen(false)}
                    aria-label="Close navigation drawer"
                    className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <Sidebar
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={(cat) => {
                    setSelectedCategory(cat)
                    setIsMobileSidebarOpen(false)
                  }}
                  selectedComponentId={selectedComponentId}
                  onSelectComponent={(id) => {
                    setSelectedComponentId(id)
                    const match = COMPONENTS_DATA.find((c) => c.id === id)
                    if (match) setInspectedComponent(match)
                    setIsMobileSidebarOpen(false)
                  }}
                  components={COMPONENTS_DATA}
                  onOpenRecommender={() => {
                    setIsRecommenderOpen(true)
                    setIsMobileSidebarOpen(false)
                  }}
                  onOpenCrosswalk={() => {
                    setIsCrosswalkOpen(true)
                    setIsMobileSidebarOpen(false)
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Right Main Preview Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {/* Filter Status & Count */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-zinc-950 dark:text-zinc-50">
                {selectedCategory === "All" ? "All Components" : selectedCategory}
              </span>
              <span className="rounded-full bg-zinc-200 px-2.5 py-0.5 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                {filteredComponents.length} {filteredComponents.length === 1 ? "component" : "components"}
              </span>
            </div>

            {searchQuery && (
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span>Filtering by: <strong className="text-blue-600 dark:text-blue-400">"{searchQuery}"</strong></span>
                <button
                  onClick={() => setSearchQuery("")}
                  className="rounded-lg bg-zinc-200 px-2 py-0.5 text-[11px] text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>

          {/* Zero Results State */}
          {filteredComponents.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-zinc-300 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900/50">
              <Search className="mx-auto h-8 w-8 text-zinc-400" />
              <h3 className="mt-4 text-base font-bold text-zinc-950 dark:text-zinc-50">
                No matching components found
              </h3>
              <p className="mt-1 text-xs text-zinc-500">
                Try searching for "table", "bento", "auth", "modal", "sidebar", or "daisy".
              </p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                }}
                className="mt-5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            /* Component Cards Grid */
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredComponents.map((item) => (
                <ComponentCard
                  key={item.id}
                  item={item}
                  onInspect={(c) => setInspectedComponent(c)}
                  onTriggerToast={triggerToast}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-6 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            <strong>Skill UI</strong> — Universal UI Architecture & Component Skill for AI Coding Assistants.
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsRecommenderOpen(true)}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Stack Recommender
            </button>
            <button
              onClick={() => setIsCrosswalkOpen(true)}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              12 Systems Cheatsheet
            </button>
            <a
              href="https://github.com/isreeharim/uiskill"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <InspectorModal
        item={inspectedComponent}
        onClose={() => setInspectedComponent(null)}
        onTriggerToast={triggerToast}
      />

      <StackRecommenderModal
        isOpen={isRecommenderOpen}
        onClose={() => setIsRecommenderOpen(false)}
        onSelectComponentById={(id) => {
          setSelectedComponentId(id)
          const comp = COMPONENTS_DATA.find((c) => c.id === id)
          if (comp) setInspectedComponent(comp)
        }}
        onTriggerToast={triggerToast}
      />

      <LibraryCrosswalkModal
        isOpen={isCrosswalkOpen}
        onClose={() => setIsCrosswalkOpen(false)}
        onTriggerToast={triggerToast}
      />

      {/* Interactive Toast Notification */}
      <Toast
        message={toast?.message || null}
        submessage={toast?.sub}
        onClose={() => setToast(null)}
      />
    </div>
  )
}
export default App
