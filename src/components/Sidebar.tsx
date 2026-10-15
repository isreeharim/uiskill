import React from "react"
import {
  Layout,
  BarChart3,
  Sparkles,
  Lock,
  Layers,
  Palette,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  Compass
} from "lucide-react"
import { ComponentItem } from "../data/components-data"

interface SidebarProps {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (cat: string) => void
  selectedComponentId: string
  onSelectComponent: (id: string) => void
  components: ComponentItem[]
  onOpenRecommender: () => void
  onOpenCrosswalk: () => void
}

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  All: Layout,
  "SaaS Dashboards": BarChart3,
  "Marketing & Bento": Sparkles,
  "Auth & Flow": Lock,
  "Overlays & Actions": Layers,
  Theming: Palette,
  "Creative & Motion": Compass,
}

export function Sidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedComponentId,
  onSelectComponent,
  components,
  onOpenRecommender,
  onOpenCrosswalk,
}: SidebarProps) {
  return (
    <aside className="w-full lg:w-72 shrink-0 border-r border-zinc-200/80 bg-zinc-50/50 p-4 dark:border-zinc-800/80 dark:bg-zinc-950/40">
      <div className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="px-3 text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
            Categories
          </h3>
          <div className="space-y-1">
            {categories.map((cat) => {
              const Icon = CATEGORY_ICONS[cat] || Layout
              const isSelected = selectedCategory === cat
              const count =
                cat === "All"
                  ? components.length
                  : components.filter((c) => c.category === cat).length

              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                      : "text-zinc-600 hover:bg-zinc-200/60 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" />
                    <span>{cat}</span>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Quick Component Jump */}
        <div>
          <h3 className="px-3 text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
            Components ({components.length})
          </h3>
          <div className="max-h-[340px] overflow-y-auto space-y-0.5 pr-1">
            {components.map((item) => {
              const isSelected = selectedComponentId === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => onSelectComponent(item.id)}
                  className={`w-full text-left flex items-center justify-between rounded-xl px-3 py-1.5 text-xs transition ${
                    isSelected
                      ? "bg-zinc-200/80 font-semibold text-zinc-950 dark:bg-zinc-800 dark:text-zinc-100"
                      : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-zinc-300"
                  }`}
                >
                  <span className="truncate">{item.name}</span>
                  {isSelected && <ChevronRight className="h-3 w-3 text-blue-500 shrink-0" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Interactive Features Quick Links */}
        <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 space-y-2">
          <button
            onClick={onOpenRecommender}
            className="w-full flex items-center gap-2.5 rounded-xl border border-blue-500/30 bg-blue-50/50 p-2.5 text-xs font-semibold text-blue-700 hover:bg-blue-100/60 dark:border-blue-900/50 dark:bg-blue-950/20 dark:text-blue-400 dark:hover:bg-blue-950/40 transition text-left"
          >
            <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <div>
              <p className="font-bold">UI Stack Recommender</p>
              <p className="text-[10px] text-zinc-500 font-normal">Find the right stack in 3 questions</p>
            </div>
          </button>

          <button
            onClick={onOpenCrosswalk}
            className="w-full flex items-center gap-2.5 rounded-xl border border-zinc-200 bg-white p-2.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800/80 transition text-left"
          >
            <Compass className="h-4 w-4 text-purple-500 shrink-0" />
            <div>
              <p className="font-semibold">12-System Crosswalk</p>
              <p className="text-[10px] text-zinc-500 font-normal">Compare syntax across libraries</p>
            </div>
          </button>
        </div>

        {/* AgentSkills Badge / Info */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-3.5 text-xs dark:border-zinc-800/80 dark:bg-zinc-900/70">
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>AgentSkills Standard</span>
          </div>
          <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
            Certified for Claude Code, Antigravity, Cursor, and Codex workflows.
          </p>
        </div>
      </div>
    </aside>
  )
}
