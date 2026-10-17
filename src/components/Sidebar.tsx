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
      <aside className="w-14 shrink-0 border-r border-black/[0.08] bg-[#F5F5F7]/90 dark:border-white/[0.08] dark:bg-[#161617]/90 backdrop-blur-md py-3 flex flex-col items-center justify-between select-none lg:sticky lg:top-[52px] lg:h-[calc(100vh-52px)] overflow-y-auto">
        <div className="flex flex-col items-center space-y-1.5 w-full px-1.5">
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              title="Expand sidebar"
              aria-label="Expand sidebar"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[#86868B] hover:bg-black/[0.05] hover:text-[#1D1D1F] dark:hover:bg-white/[0.08] dark:hover:text-[#F5F5F7] transition active:scale-[0.97] mb-2"
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
                className={`relative flex h-9 w-9 items-center justify-center rounded-lg transition active:scale-[0.97] ${
                  isSelected
                    ? "bg-[#0071E3] text-white shadow-xs dark:bg-[#2997FF] dark:text-[#000000] font-semibold"
                    : "text-[#86868B] hover:bg-black/[0.05] hover:text-[#1D1D1F] dark:hover:bg-white/[0.08] dark:hover:text-[#F5F5F7]"
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
    <aside className="w-full lg:w-64 xl:w-72 shrink-0 border-r border-black/[0.08] bg-[#F5F5F7]/90 dark:border-white/[0.08] dark:bg-[#161617]/90 backdrop-blur-md p-3 sm:p-3.5 flex flex-col justify-between overflow-y-auto lg:sticky lg:top-[52px] lg:h-[calc(100vh-52px)] select-none">
      <div className="space-y-4">
        {/* Categories Section */}
        <div>
          <div className="flex items-center justify-between px-2 mb-1.5">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#86868B]">
              {isSkillsMode ? "Skill Domains" : "Categories"}
            </h3>
            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                title="Collapse sidebar"
                aria-label="Collapse sidebar"
                className="hidden lg:flex p-1 rounded-md text-[#86868B] hover:bg-black/[0.05] hover:text-[#1D1D1F] dark:hover:bg-white/[0.08] dark:hover:text-[#F5F5F7] transition active:scale-[0.95]"
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
                  className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition active:scale-[0.99] ${
                    isSelected
                      ? "bg-[#0071E3] text-white shadow-xs dark:bg-[#2997FF] dark:text-[#000000] font-semibold"
                      : "text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-black/[0.05] dark:hover:bg-white/[0.08]"
                  }`}
                >
                  <div className="flex items-center gap-2 truncate pr-2">
                    <Icon className={`h-3.5 w-3.5 shrink-0 ${isSelected ? "opacity-100" : "text-[#86868B]"}`} />
                    <span className="truncate">{cat}</span>
                  </div>
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] font-mono shrink-0 transition ${
                      isSelected
                        ? "bg-white/25 text-white dark:bg-black/20 dark:text-black font-semibold"
                        : "bg-black/[0.05] text-[#86868B] dark:bg-white/[0.08] dark:text-[#86868B]"
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
        <div className="border-t border-black/[0.08] dark:border-white/[0.08] pt-3">
          <button
            onClick={() => setIsJumpListExpanded(!isJumpListExpanded)}
            className="w-full flex items-center justify-between px-2 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] transition"
          >
            <span>
              {isSkillsMode
                ? `Skills Index (${skills.length})`
                : `Components Index (${components.length})`}
            </span>
            {isJumpListExpanded ? (
              <ChevronDown className="h-3.5 w-3.5 text-[#86868B]" />
            ) : (
              <ChevronRight className="h-3.5 w-3.5 text-[#86868B]" />
            )}
          </button>

          {isJumpListExpanded && (
            <div className="space-y-1.5">
              {/* Quick filter in jump list */}
              <div className="relative px-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-[#86868B]" />
                <input
                  type="text"
                  placeholder="Filter list..."
                  value={jumpSearch}
                  onChange={(e) => setJumpSearch(e.target.value)}
                  className="w-full rounded-lg border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.03] dark:bg-white/[0.05] pl-6.5 pr-6 py-1 text-[11px] text-[#1D1D1F] dark:text-[#F5F5F7] placeholder-[#86868B] outline-none transition focus:border-[#0071E3] dark:focus:border-[#2997FF]"
                />
                {jumpSearch && (
                  <button
                    onClick={() => setJumpSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                )}
              </div>

              {/* Items scroll area */}
              <div className="max-h-[220px] overflow-y-auto space-y-0.5 pr-1 text-xs">
                {filteredJumpItems.length === 0 ? (
                  <p className="px-2 py-2 text-[11px] text-[#86868B] italic">No items match</p>
                ) : (
                  filteredJumpItems.map((item) => {
                    const isSelected = selectedItemId === item.id
                    return (
                      <button
                        key={item.id}
                        onClick={() => onSelectItem(item.id)}
                        className={`w-full text-left flex items-center justify-between rounded-md px-2 py-1 text-[11px] transition active:scale-[0.99] ${
                          isSelected
                            ? "bg-[#0071E3]/10 text-[#0071E3] font-semibold dark:bg-[#2997FF]/15 dark:text-[#2997FF]"
                            : "text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                        }`}
                      >
                        <span className="truncate pr-1">{item.name}</span>
                        {isSelected && (
                          <ChevronRight className="h-3 w-3 shrink-0 text-[#0071E3] dark:text-[#2997FF]" />
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
      <div className="mt-4 pt-3 border-t border-black/[0.08] dark:border-white/[0.08]">
        <div className="rounded-xl border border-black/[0.08] bg-black/[0.02] p-2.5 text-[11px] dark:border-white/[0.08] dark:bg-white/[0.03]">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
            <span>AgentSkills Certified</span>
          </div>
          <p className="mt-0.5 text-[10px] text-[#86868B] leading-tight">
            93 tools across UI, Design, QA, Architecture & Workflows.
          </p>
        </div>
      </div>
    </aside>
  )
}
