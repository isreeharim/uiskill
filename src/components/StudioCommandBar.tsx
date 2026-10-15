import {
  Filter,
  X,
  LayoutGrid,
  Rows3,
  RotateCcw
} from "lucide-react"

export const FRAMEWORK_CHIPS = [
  { id: "All", label: "All Frameworks" },
  { id: "shadcn/ui", label: "shadcn/ui" },
  { id: "Untitled UI", label: "Untitled UI" },
  { id: "MUI", label: "MUI" },
  { id: "HeroUI", label: "HeroUI" },
  { id: "DaisyUI", label: "DaisyUI" },
  { id: "Ant Design", label: "Ant Design" },
  { id: "Base Web", label: "Base Web" },
  { id: "Fluent UI", label: "Fluent UI" },
  { id: "React Aria", label: "React Aria" },
  { id: "Chakra", label: "Chakra" },
  { id: "21st.dev", label: "21st.dev" },
  { id: "React Bits", label: "React Bits" },
  { id: "Tremor", label: "Tremor" },
  { id: "Reshaped", label: "Reshaped" },
  { id: "AlignUI", label: "AlignUI" },
  { id: "Tailark", label: "Tailark" },
]

export const SKILL_SOURCE_CHIPS = [
  { id: "All", label: "All Sources" },
  { id: "User", label: "User Skills" },
  { id: "Builtin", label: "Builtin Skills" },
  { id: "Plugin", label: "Plugin Skills" },
]

export interface StudioCommandBarProps {
  studioTab: "components" | "skills"
  searchQuery: string
  setSearchQuery: (q: string) => void
  selectedCategory: string
  setSelectedCategory: (cat: string) => void
  selectedFramework: string
  setSelectedFramework: (fw: string) => void
  skillSourceFilter: string
  setSkillSourceFilter: (source: string) => void
  viewMode: "grid" | "list"
  setViewMode: (vm: "grid" | "list") => void
  totalCount: number
  filteredCount: number
  frameworkCounts: Record<string, number>
  sourceCounts: Record<string, number>
  onResetFilters: () => void
}

export function StudioCommandBar({
  studioTab,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedFramework,
  setSelectedFramework,
  skillSourceFilter,
  setSkillSourceFilter,
  viewMode,
  setViewMode,
  totalCount,
  filteredCount,
  frameworkCounts,
  sourceCounts,
  onResetFilters,
}: StudioCommandBarProps) {
  const isComponents = studioTab === "components"
  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    selectedCategory !== "All" ||
    (isComponents && selectedFramework !== "All") ||
    (!isComponents && skillSourceFilter !== "All")

  return (
    <div className="w-full border-b border-zinc-200/80 bg-white/70 dark:border-zinc-800/80 dark:bg-zinc-950/70 backdrop-blur-xs transition-colors">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 py-2.5 space-y-2">
        {/* Top Control Bar: Context breadcrumb, live search, view mode & quick actions */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs">
          {/* Left: Active Domain & Count */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 font-semibold text-zinc-900 dark:text-zinc-100">
              <span className="text-zinc-500 font-normal">
                {isComponents ? "UI Templates" : "Agent Skills"}
              </span>
              <span className="text-zinc-300 dark:text-zinc-700">/</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                {selectedCategory}
              </span>
            </div>

            <div className="inline-flex items-center rounded-full bg-zinc-100 dark:bg-zinc-800/80 px-2 py-0.5 text-[11px] font-mono text-zinc-600 dark:text-zinc-400">
              {filteredCount === totalCount ? (
                <span>{totalCount} total</span>
              ) : (
                <span>
                  <strong>{filteredCount}</strong> of {totalCount}
                </span>
              )}
            </div>
          </div>

          {/* Right: View Density & Direct Helper Actions */}
          <div className="flex items-center gap-2 ml-auto">
            {/* View density toggle */}
            <div className="flex items-center rounded-lg border border-zinc-200 bg-zinc-100/80 p-0.5 dark:border-zinc-800 dark:bg-zinc-900">
              <button
                onClick={() => setViewMode("grid")}
                title="Grid View (Interactive card sandbox)"
                aria-label="Grid view"
                className={`flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold transition ${
                  viewMode === "grid"
                    ? "bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>Grid</span>
              </button>
              <button
                onClick={() => setViewMode("list")}
                title="Table / List View (High-density scanning)"
                aria-label="List view"
                className={`flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold transition ${
                  viewMode === "list"
                    ? "bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                <Rows3 className="h-3.5 w-3.5" />
                <span>List</span>
              </button>
            </div>

          </div>
        </div>

        {/* Framework Filter Chips (UI mode) or Source Type Chips (Skills mode) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 scrollbar-none text-xs">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider shrink-0 mr-1">
            <Filter className="h-3 w-3" />
            <span>{isComponents ? "Framework" : "Source"}:</span>
          </div>

          {isComponents ? (
            /* UI Framework Filter Chips */
            FRAMEWORK_CHIPS.map((chip) => {
              const isSelected = selectedFramework === chip.id
              const count = frameworkCounts[chip.id] ?? 0
              if (chip.id !== "All" && count === 0) return null

              return (
                <button
                  key={chip.id}
                  onClick={() => setSelectedFramework(chip.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-all shrink-0 active:scale-95 ${
                    isSelected
                      ? "bg-zinc-950 text-white shadow-xs dark:bg-zinc-100 dark:text-zinc-950 font-semibold"
                      : "border border-zinc-200/90 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
                  }`}
                >
                  <span>{chip.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                      isSelected
                        ? "bg-zinc-800 text-zinc-200 dark:bg-zinc-200 dark:text-zinc-800"
                        : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                    }`}
                  >
                    {chip.id === "All" ? totalCount : count}
                  </span>
                </button>
              )
            })
          ) : (
            /* Agent Skills Source Chips */
            SKILL_SOURCE_CHIPS.map((chip) => {
              const isSelected = skillSourceFilter === chip.id
              const count = sourceCounts[chip.id] ?? 0

              return (
                <button
                  key={chip.id}
                  onClick={() => setSkillSourceFilter(chip.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium transition-all shrink-0 active:scale-95 ${
                    isSelected
                      ? "bg-purple-600 text-white shadow-xs font-semibold"
                      : "border border-zinc-200/90 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100"
                  }`}
                >
                  <span>{chip.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                      isSelected
                        ? "bg-purple-700 text-purple-100"
                        : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                    }`}
                  >
                    {chip.id === "All" ? totalCount : count}
                  </span>
                </button>
              )
            })
          )}
        </div>

        {/* Active Filters Pill Bar (Only shown when filters are engaged) */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-zinc-200/60 dark:border-zinc-800/60 text-xs">
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500 mr-1">Active filters:</span>

            {selectedCategory !== "All" && (
              <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/40">
                <span>Category: {selectedCategory}</span>
                <button
                  onClick={() => setSelectedCategory("All")}
                  aria-label="Remove category filter"
                  className="rounded hover:bg-blue-200/50 dark:hover:bg-blue-800/50 p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {isComponents && selectedFramework !== "All" && (
              <span className="inline-flex items-center gap-1 rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 border border-zinc-300/60 dark:border-zinc-700/60">
                <span>Framework: {selectedFramework}</span>
                <button
                  onClick={() => setSelectedFramework("All")}
                  aria-label="Remove framework filter"
                  className="rounded hover:bg-zinc-200 dark:hover:bg-zinc-700 p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {!isComponents && skillSourceFilter !== "All" && (
              <span className="inline-flex items-center gap-1 rounded-md bg-purple-50 px-2 py-0.5 text-[11px] font-medium text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800/40">
                <span>Source: {skillSourceFilter}</span>
                <button
                  onClick={() => setSkillSourceFilter("All")}
                  aria-label="Remove source filter"
                  className="rounded hover:bg-purple-200/50 dark:hover:bg-purple-800/50 p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {searchQuery.trim().length > 0 && (
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40">
                <span>Query: "{searchQuery}"</span>
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search query"
                  className="rounded hover:bg-amber-200/50 dark:hover:bg-amber-800/50 p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition ml-auto"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset all</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
