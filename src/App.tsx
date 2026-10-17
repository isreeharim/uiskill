import { useState, useEffect, useMemo } from "react"
import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { StudioCommandBar, FRAMEWORK_CHIPS } from "./components/StudioCommandBar"
import { ComponentCard } from "./components/ComponentCard"
import { SkillCard } from "./components/SkillCard"
import { InspectorModal } from "./components/InspectorModal"
import { SkillInspectorModal } from "./components/SkillInspectorModal"
import { Toast } from "./components/Toast"
import { COMPONENTS_DATA, ComponentItem } from "./data/components-data"
import { AGENT_SKILLS_DATA, AgentSkillItem } from "./data/skills-data"
import {
  Layers,
  Search,
  X,
  RotateCcw
} from "lucide-react"

export function App() {
  const [studioTab, setStudioTab] = useState<"components" | "skills">("components")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [selectedFramework, setSelectedFramework] = useState<string>("All")
  const [skillSourceFilter, setSkillSourceFilter] = useState<string>("All")
  const [selectedItemId, setSelectedItemId] = useState<string>("dashboard-metrics-card")
  const [inspectedComponent, setInspectedComponent] = useState<ComponentItem | null>(null)
  const [inspectedSkill, setInspectedSkill] = useState<AgentSkillItem | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false)
  const [isDark, setIsDark] = useState<boolean>(true)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [toast, setToast] = useState<{ message: string; sub?: string } | null>(null)

  // Initialize theme, view preferences, and guarantee initial scroll at top
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })

    const savedTheme = localStorage.getItem("skill-ui-theme")
    if (savedTheme === "light") {
      setIsDark(false)
      document.documentElement.classList.remove("dark")
    } else {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }

    const savedViewMode = localStorage.getItem("skill-ui-viewmode") as "grid" | "list" | null
    if (savedViewMode === "grid" || savedViewMode === "list") {
      setViewMode(savedViewMode)
    }

    const savedSidebarCollapsed = localStorage.getItem("skill-ui-sidebar-collapsed")
    if (savedSidebarCollapsed === "true") {
      setIsSidebarCollapsed(true)
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

  const handleSetViewMode = (mode: "grid" | "list") => {
    setViewMode(mode)
    localStorage.setItem("skill-ui-viewmode", mode)
  }

  const handleToggleSidebarCollapse = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev
      localStorage.setItem("skill-ui-sidebar-collapsed", String(next))
      return next
    })
  }

  const triggerToast = (message: string, sub?: string) => {
    setToast({ message, sub })
  }

  const handleTabChange = (tab: "components" | "skills") => {
    setStudioTab(tab)
    setSelectedCategory("All")
    setSelectedFramework("All")
    setSkillSourceFilter("All")
    if (tab === "components") {
      setSelectedItemId("dashboard-metrics-card")
    } else {
      setSelectedItemId(AGENT_SKILLS_DATA[0]?.id || "")
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  }

  const handleResetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setSelectedFramework("All")
    setSkillSourceFilter("All")
  }

  // Keyboard shortcuts (Cmd+K for palette, Cmd+B for sidebar toggle)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        const palette = COMPONENTS_DATA.find((c) => c.id === "command-palette")
        if (palette) setInspectedComponent(palette)
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault()
        handleToggleSidebarCollapse()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const UI_CATEGORIES = [
    "All",
    "SaaS Dashboards",
    "Marketing & Bento",
    "Auth & Flow",
    "Overlays & Actions",
    "Theming",
    "Creative & Motion",
    "Forms & Inputs",
    "Data & Tables",
    "Feedback & Status",
  ]

  const SKILL_CATEGORIES = [
    "All",
    "UI, Design & Motion",
    "Architecture & Code Review",
    "Debugging & Performance",
    "Testing & QA Automation",
    "Product & Planning",
    "Workflows & Agent Ops",
  ]

  const activeCategories = studioTab === "components" ? UI_CATEGORIES : SKILL_CATEGORIES

  // Precomputed Framework counts for chips
  const frameworkCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const chip of FRAMEWORK_CHIPS) {
      if (chip.id === "All") {
        counts[chip.id] = COMPONENTS_DATA.length
      } else {
        counts[chip.id] = COMPONENTS_DATA.filter((c) =>
          c.system.toLowerCase().includes(chip.id.toLowerCase())
        ).length
      }
    }
    return counts
  }, [])

  // Precomputed Source counts for skills
  const sourceCounts = useMemo(() => {
    return {
      All: AGENT_SKILLS_DATA.length,
      User: AGENT_SKILLS_DATA.filter((s) => s.sourceType === "User").length,
      Builtin: AGENT_SKILLS_DATA.filter((s) => s.sourceType === "Builtin").length,
      Plugin: AGENT_SKILLS_DATA.filter((s) => s.sourceType === "Plugin").length,
    }
  }, [])


  // Filtered components list (Category + Framework Chip + Search query)
  const filteredComponents = useMemo(() => {
    return COMPONENTS_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory

      const matchesFramework =
        selectedFramework === "All" ||
        item.system.toLowerCase().includes(selectedFramework.toLowerCase())

      const query = searchQuery.toLowerCase().trim()
      const matchesQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.system.toLowerCase().includes(query) ||
        item.tags.some((t) => t.toLowerCase().includes(query)) ||
        item.fileName.toLowerCase().includes(query)

      return matchesCategory && matchesFramework && matchesQuery
    })
  }, [selectedCategory, selectedFramework, searchQuery])

  // Filtered skills list (Category + Source Chip + Search query)
  const filteredSkills = useMemo(() => {
    return AGENT_SKILLS_DATA.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory

      const matchesSource =
        skillSourceFilter === "All" || item.sourceType === skillSourceFilter

      const query = searchQuery.toLowerCase().trim()
      const matchesQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.activationPrompt.toLowerCase().includes(query) ||
        item.tags.some((t) => t.toLowerCase().includes(query)) ||
        item.path.toLowerCase().includes(query)

      return matchesCategory && matchesSource && matchesQuery
    })
  }, [selectedCategory, skillSourceFilter, searchQuery])

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F7] text-[#1D1D1F] dark:bg-[#000000] dark:text-[#F5F5F7] transition-colors">
      {/* Precision 52px Sticky Top Bar */}
      <Header
        activeTab={studioTab}
        onTabChange={handleTabChange}
        componentsCount={COMPONENTS_DATA.length}
        skillsCount={AGENT_SKILLS_DATA.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isDark={isDark}
        toggleTheme={toggleTheme}
        viewMode={viewMode}
        setViewMode={handleSetViewMode}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
        isSidebarCollapsed={isSidebarCollapsed}
        onToggleSidebarCollapse={handleToggleSidebarCollapse}
      />

      {/* Sleek Horizontal Studio Command Bar with 1-Click Framework Filter Chips */}
      <StudioCommandBar
        studioTab={studioTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedFramework={selectedFramework}
        setSelectedFramework={setSelectedFramework}
        skillSourceFilter={skillSourceFilter}
        setSkillSourceFilter={setSkillSourceFilter}
        viewMode={viewMode}
        setViewMode={handleSetViewMode}
        totalCount={studioTab === "components" ? COMPONENTS_DATA.length : AGENT_SKILLS_DATA.length}
        filteredCount={studioTab === "components" ? filteredComponents.length : filteredSkills.length}
        frameworkCounts={frameworkCounts}
        sourceCounts={sourceCounts}
        onResetFilters={handleResetFilters}
      />

      {/* Main Studio Workspace */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col lg:flex-row">
        {/* Desktop Left Category Sidebar (Collapsible rail or full width) */}
        <div className="hidden lg:block shrink-0 sticky top-14 self-start max-h-[calc(100vh-3.5rem)] transition-all duration-200">
          <Sidebar
            activeTab={studioTab}
            categories={activeCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={(cat) => setSelectedCategory(cat)}
            selectedItemId={selectedItemId}
            onSelectItem={(id) => {
              setSelectedItemId(id)
              if (studioTab === "components") {
                const match = COMPONENTS_DATA.find((c) => c.id === id)
                if (match) setInspectedComponent(match)
              } else {
                const match = AGENT_SKILLS_DATA.find((s) => s.id === id)
                if (match) setInspectedSkill(match)
              }
            }}
            components={COMPONENTS_DATA}
            skills={AGENT_SKILLS_DATA}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={handleToggleSidebarCollapse}
          />
        </div>

        {/* Mobile Off-Canvas Drawer */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/40 dark:bg-black/60 backdrop-blur-xl lg:hidden animate-in fade-in"
            onClick={() => setIsMobileSidebarOpen(false)}
          >
            <div
              className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white dark:bg-[#161617] shadow-2xl overflow-y-auto p-4 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-black/[0.08] dark:border-white/[0.08] mb-3">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-[#0071E3] dark:text-[#2997FF]" />
                    <span className="font-semibold text-xs text-[#1D1D1F] dark:text-[#F5F5F7]">
                      Categories & Domains
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileSidebarOpen(false)}
                    aria-label="Close navigation drawer"
                    className="w-7 h-7 rounded-full bg-black/[0.05] dark:bg-white/[0.08] flex items-center justify-center text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] transition active:scale-[0.95]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <Sidebar
                  activeTab={studioTab}
                  categories={activeCategories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={(cat) => {
                    setSelectedCategory(cat)
                    setIsMobileSidebarOpen(false)
                  }}
                  selectedItemId={selectedItemId}
                  onSelectItem={(id) => {
                    setSelectedItemId(id)
                    if (studioTab === "components") {
                      const match = COMPONENTS_DATA.find((c) => c.id === id)
                      if (match) setInspectedComponent(match)
                    } else {
                      const match = AGENT_SKILLS_DATA.find((s) => s.id === id)
                      if (match) setInspectedSkill(match)
                    }
                    setIsMobileSidebarOpen(false)
                  }}
                  components={COMPONENTS_DATA}
                  skills={AGENT_SKILLS_DATA}
                />
              </div>
            </div>
          </div>
        )}

        {/* Right Main Studio Canvas */}
        <main className="flex-1 p-3 sm:p-5 lg:p-6 min-w-0">
          {/* Render Active Studio Mode */}
          {studioTab === "components" ? (
            /* UI Components Studio */
            filteredComponents.length === 0 ? (
              <div className="rounded-2xl border border-black/[0.08] bg-white p-10 text-center dark:border-white/[0.08] dark:bg-[#161617]">
                <Search className="mx-auto h-7 w-7 text-[#86868B]" />
                <h3 className="mt-3 text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                  No matching components found
                </h3>
                <p className="mt-1 text-xs text-[#86868B] max-w-md mx-auto">
                  No components match the active filter criteria. Try resetting framework or category filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#1D1D1F] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-black dark:bg-[#F5F5F7] dark:text-[#1D1D1F] dark:hover:bg-white transition active:scale-[0.97]"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : viewMode === "grid" ? (
              /* Grid Density View */
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {filteredComponents.map((item) => (
                  <ComponentCard
                    key={item.id}
                    item={item}
                    onInspect={(c) => setInspectedComponent(c)}
                    onTriggerToast={triggerToast}
                    viewMode="grid"
                  />
                ))}
              </div>
            ) : (
              /* List / Table Density View */
              <div className="space-y-2">
                {filteredComponents.map((item) => (
                  <ComponentCard
                    key={item.id}
                    item={item}
                    onInspect={(c) => setInspectedComponent(c)}
                    onTriggerToast={triggerToast}
                    viewMode="list"
                  />
                ))}
              </div>
            )
          ) : (
            /* Agent Skills Studio */
            filteredSkills.length === 0 ? (
              <div className="rounded-2xl border border-black/[0.08] bg-white p-10 text-center dark:border-white/[0.08] dark:bg-[#161617]">
                <Search className="mx-auto h-7 w-7 text-[#86868B]" />
                <h3 className="mt-3 text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                  No matching agent skills found
                </h3>
                <p className="mt-1 text-xs text-[#86868B] max-w-md mx-auto">
                  Try searching for keywords like "animate", "audit", "lint", "qa", "design", or "bug".
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#1D1D1F] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-black dark:bg-[#F5F5F7] dark:text-[#1D1D1F] dark:hover:bg-white transition active:scale-[0.97]"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : viewMode === "grid" ? (
              /* Grid Density View for Skills */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredSkills.map((skill) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    onInspect={(s) => setInspectedSkill(s)}
                    onTriggerToast={triggerToast}
                    viewMode="grid"
                  />
                ))}
              </div>
            ) : (
              /* List / Table Density View for Skills */
              <div className="space-y-2">
                {filteredSkills.map((skill) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    onInspect={(s) => setInspectedSkill(s)}
                    onTriggerToast={triggerToast}
                    viewMode="list"
                  />
                ))}
              </div>
            )
          )}
        </main>
      </div>

      {/* Sleek Minimalist Footer */}
      <footer className="border-t border-black/[0.08] bg-[#F5F5F7]/80 py-4 text-xs text-[#86868B] dark:border-white/[0.08] dark:bg-[#161617]/50 backdrop-blur-md transition-colors">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <p className="flex items-center gap-2">
            <img src="/logo.png" alt="uiskill" className="h-4 w-4 rounded object-contain inline-block" />
            <span className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">uiskill Studio</span>
            <span className="text-[#86868B]/40">·</span>
            <span>53 Live UI Templates</span>
            <span className="text-[#86868B]/40">·</span>
            <span>93 Certified Agent Skills</span>
          </p>
          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={() => handleTabChange("components")}
              className="hover:text-[#0071E3] dark:hover:text-[#2997FF] transition"
            >
              Templates
            </button>
            <button
              onClick={() => handleTabChange("skills")}
              className="hover:text-[#0071E3] dark:hover:text-[#2997FF] transition"
            >
              Skills
            </button>
            <a
              href="https://github.com/isreeharim/uiskill"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] transition"
            >
              GitHub
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

      <SkillInspectorModal
        skill={inspectedSkill}
        onClose={() => setInspectedSkill(null)}
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
