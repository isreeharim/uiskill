import { useState } from "react"
import {
  Layout,
  BarChart3,
  Sparkles,
  Lock,
  Layers,
  Palette,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  Compass,
  ShieldCheck,
  Bug,
  Cpu,
  Edit3,
  Table2,
  Bell,
  PanelLeftClose,
  PanelLeft,
  Search,
  X
} from "lucide-react"
import { ComponentItem } from "../data/components-data"
import { AgentSkillItem } from "../data/skills-data"

export interface SidebarProps {
  activeTab: "components" | "skills"
  categories: string[]
  selectedCategory: string
  onSelectCategory: (cat: string) => void
  selectedItemId: string
  onSelectItem: (id: string) => void
  components: ComponentItem[]
  skills: AgentSkillItem[]
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

const UI_CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  All: Layout,
  "SaaS Dashboards": BarChart3,
  "Marketing & Bento": Sparkles,
  "Auth & Flow": Lock,
  "Overlays & Actions": Layers,
  Theming: Palette,
  "Creative & Motion": Compass,
  "Forms & Inputs": Edit3,
  "Data & Tables": Table2,
  "Feedback & Status": Bell,
}

const SKILL_CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  All: Layout,
  "UI, Design & Motion": Sparkles,
  "Architecture & Code Review": ShieldCheck,
  "Debugging & Performance": Bug,
  "Testing & QA Automation": CheckCircle2,
  "Product & Planning": Compass,
  "Workflows & Agent Ops": Cpu,
}

export function Sidebar({
  activeTab,
  categories,
  selectedCategory,
  onSelectCategory,
  selectedItemId,
  onSelectItem,
  components,
  skills,
  isCollapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const isSkillsMode = activeTab === "skills"
  const iconsMap = isSkillsMode ? SKILL_CATEGORY_ICONS : UI_CATEGORY_ICONS
  const [jumpSearch, setJumpSearch] = useState("")
  const [isJumpListExpanded, setIsJumpListExpanded] = useState(true)

  // Filter items in jump list
  const filteredJumpItems = isSkillsMode
    ? skills.filter((s) => {
        const matchesCategory =
          selectedCategory === "All" || s.category === selectedCategory
        const matchesSearch =
          !jumpSearch ||
          s.name.toLowerCase().includes(jumpSearch.toLowerCase()) ||
          s.category.toLowerCase().includes(jumpSearch.toLowerCase())
        return matchesCategory && matchesSearch
      })
    : components.filter((c) => {
        const matchesCategory =
          selectedCategory === "All" || c.category === selectedCategory
        const matchesSearch =
          !jumpSearch ||
          c.name.toLowerCase().includes(jumpSearch.toLowerCase()) ||
          c.system.toLowerCase().includes(jumpSearch.toLowerCase())
        return matchesCategory && matchesSearch
      })

  // Collapsed desktop rail view (w-14)
  if (isCollapsed) {
    return (
      <aside className="w-14 shrink-0 border-r border-zinc-200/80 bg-zinc-50/50 py-3 flex flex-col items-center justify-between dark:border-zinc-800/80 dark:bg-zinc-950/40 select-none">
        <div className="flex flex-col items-center space-y-2 w-full px-1.5">
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              title="Expand sidebar"
              aria-label="Expand sidebar"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-200/60 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition mb-2"
            >
              <PanelLeft className="h-4 w-4" />
            </button>
          )}

          {categories.map((cat) => {
            const Icon = iconsMap[cat] || Layout
            const isSelected = selectedCategory === cat
            let count = 0
            if (isSkillsMode) {
              count =
                cat === "All"
                  ? skills.length
                  : skills.filter((s) => s.category === cat).length
            } else {
              count =
                cat === "All"
                  ? components.length
                  : components.filter((c) => c.category === cat).length
            }

            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                title={`${cat} (${count})`}
                aria-label={`${cat} category`}
                className={`relative flex h-9 w-9 items-center justify-center rounded-xl transition ${
                  isSelected
                    ? isSkillsMode
                      ? "bg-purple-600 text-white shadow-xs"
                      : "bg-blue-600 text-white shadow-xs"
                    : "text-zinc-500 hover:bg-zinc-200/60 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                }`}
              >
                <Icon className="h-4 w-4" />
              </button>
            )
          })}
        </div>
      </aside>
    )
  }

  // Expanded sidebar view (w-64 or w-72)
  return (
    <aside className="w-full lg:w-64 xl:w-72 shrink-0 border-r border-zinc-200/80 bg-zinc-50/50 p-3 sm:p-4 dark:border-zinc-800/80 dark:bg-zinc-950/40 flex flex-col justify-between overflow-y-auto max-h-[calc(100vh-3.5rem)] select-none">
      <div className="space-y-5">
        {/* Categories Section */}
        <div>
          <div className="flex items-center justify-between px-2 mb-1.5">
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              {isSkillsMode ? "Skill Domains" : "UI Categories"}
            </h3>
            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                title="Collapse sidebar"
                aria-label="Collapse sidebar"
                className="hidden lg:flex p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              >
                <PanelLeftClose className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="space-y-0.5">
            {categories.map((cat) => {
              const Icon = iconsMap[cat] || Layout
              const isSelected = selectedCategory === cat
              let count = 0
              if (isSkillsMode) {
                count =
                  cat === "All"
                    ? skills.length
                    : skills.filter((s) => s.category === cat).length
              } else {
                count =
                  cat === "All"
                    ? components.length
                    : components.filter((c) => c.category === cat).length
              }

              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                    isSelected
                      ? isSkillsMode
                        ? "bg-purple-600 text-white shadow-xs font-semibold"
                        : "bg-blue-600 text-white shadow-xs font-semibold"
                      : "text-zinc-600 hover:bg-zinc-200/60 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <Icon className="h-3.5 w-3.5 shrink-0 opacity-80" />
                    <span className="truncate">{cat}</span>
                  </div>
                  <span
                    className={`rounded-md px-1.5 py-0.2 text-[10px] font-mono shrink-0 ${
                      isSelected
                        ? "bg-white/20 text-white font-semibold"
                        : "bg-zinc-200/70 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Quick Jump List Accordion */}
        <div className="border-t border-zinc-200/60 dark:border-zinc-800/60 pt-3">
          <button
            onClick={() => setIsJumpListExpanded(!isJumpListExpanded)}
            className="w-full flex items-center justify-between px-2 mb-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition"
          >
            <span>
              {isSkillsMode
                ? `Skills Index (${skills.length})`
                : `Components Index (${components.length})`}
            </span>
            {isJumpListExpanded ? (
              <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5 text-zinc-400" />
            )}
          </button>

          {isJumpListExpanded && (
            <div className="space-y-1.5">
              {/* Quick filter in jump list */}
              <div className="relative px-1">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Filter list..."
                  value={jumpSearch}
                  onChange={(e) => setJumpSearch(e.target.value)}
                  className="w-full rounded-md border border-zinc-200/80 bg-white/70 pl-6 pr-5 py-1 text-[11px] text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-blue-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200"
                />
                {jumpSearch && (
                  <button
                    onClick={() => setJumpSearch("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                )}
              </div>

              {/* Items scroll area */}
              <div className="max-h-[220px] overflow-y-auto space-y-0.5 pr-1 text-xs">
                {filteredJumpItems.length === 0 ? (
                  <p className="px-2 py-2 text-[11px] text-zinc-400 italic">No items match</p>
                ) : (
                  filteredJumpItems.map((item) => {
                    const isSelected = selectedItemId === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={() => onSelectItem(item.id)}
                        className={`w-full text-left flex items-center justify-between rounded-md px-2 py-1 text-[11px] transition ${
                          isSelected
                            ? isSkillsMode
                              ? "bg-purple-50 text-purple-700 font-semibold dark:bg-purple-950/60 dark:text-purple-300"
                              : "bg-blue-50 text-blue-700 font-semibold dark:bg-blue-950/60 dark:text-blue-300"
                            : "text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/40 dark:hover:text-zinc-200"
                        }`}
                      >
                        <span className="truncate pr-1">{item.name}</span>
                        {isSelected && (
                          <ChevronRight
                            className={`h-3 w-3 shrink-0 ${
                              isSkillsMode ? "text-purple-500" : "text-blue-500"
                            }`}
                          />
                        )}
                      </button>
                    )
                  })
                )}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* AgentSkills Standard pill */}
      <div className="mt-4 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60">
        <div className="rounded-xl border border-zinc-200/70 bg-white/70 p-2.5 text-[11px] dark:border-zinc-800/70 dark:bg-zinc-900/50">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
            <CheckCircle2 className="h-3 w-3" />
            <span>AgentSkills Certified</span>
          </div>
          <p className="mt-0.5 text-[10px] text-zinc-500 leading-tight">
            93 tools across UI, Design, QA, Architecture & Workflows.
          </p>
        </div>
      </div>
    </aside>
  )
}
