import {
  Filter,
  X,
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
    <div className="w-full border-b border-black/[0.08] dark:border-white/[0.08] bg-[#F5F5F7]/80 dark:bg-[#161617]/80 backdrop-blur-md transition-colors">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 py-2.5 space-y-2">
        {/* Breadcrumb Context & Count */}
        <div className="flex items-center justify-between gap-2.5 text-xs">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[#86868B] font-normal">
                {isComponents ? "UI Templates" : "Agent Skills"}
              </span>
              <span className="text-black/[0.2] dark:text-white/[0.2]">/</span>
              <span className="font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                {selectedCategory}
              </span>
            </div>

            <div className="inline-flex items-center rounded-full bg-black/[0.05] dark:bg-white/[0.08] px-2 py-0.5 text-[11px] font-mono text-[#86868B]">
              {filteredCount === totalCount ? (
                <span>{totalCount} total</span>
              ) : (
                <span>
                  <strong className="text-[#1D1D1F] dark:text-[#F5F5F7]">{filteredCount}</strong> of {totalCount}
                </span>
              )}
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-[#0071E3] dark:text-[#2997FF] hover:underline transition"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset filters</span>
            </button>
          )}
        </div>

        {/* Apple Segmented Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-0.5 no-scrollbar text-xs">
          <div className="flex items-center gap-1 text-[11px] font-semibold text-[#86868B] uppercase tracking-wider shrink-0 mr-1">
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
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] transition-all duration-150 shrink-0 active:scale-95 ${
                    isSelected
                      ? "bg-[#1D1D1F] text-white shadow-xs dark:bg-[#F5F5F7] dark:text-[#1D1D1F] font-semibold"
                      : "border border-black/[0.08] bg-white/80 text-[#1D1D1F] hover:bg-white dark:border-white/[0.1] dark:bg-white/[0.05] dark:text-[#F5F5F7] dark:hover:bg-white/[0.1]"
                  }`}
                >
                  <span>{chip.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                      isSelected
                        ? "bg-white/20 text-white dark:bg-black/20 dark:text-[#1D1D1F]"
                        : "bg-black/[0.05] text-[#86868B] dark:bg-white/[0.08]"
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
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] transition-all duration-150 shrink-0 active:scale-95 ${
                    isSelected
                      ? "bg-[#1D1D1F] text-white shadow-xs dark:bg-[#F5F5F7] dark:text-[#1D1D1F] font-semibold"
                      : "border border-black/[0.08] bg-white/80 text-[#1D1D1F] hover:bg-white dark:border-white/[0.1] dark:bg-white/[0.05] dark:text-[#F5F5F7] dark:hover:bg-white/[0.1]"
                  }`}
                >
                  <span>{chip.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono ${
                      isSelected
                        ? "bg-white/20 text-white dark:bg-black/20 dark:text-[#1D1D1F]"
                        : "bg-black/[0.05] text-[#86868B] dark:bg-white/[0.08]"
                    }`}
                  >
                    {chip.id === "All" ? totalCount : count}
                  </span>
                </button>
              )
            })
          )}
        </div>

        {/* Active Filters Pill Bar */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-black/[0.05] dark:border-white/[0.05] text-xs">
            <span className="text-[11px] text-[#86868B] mr-1">Active filters:</span>

            {selectedCategory !== "All" && (
              <span className="inline-flex items-center gap-1 rounded-md bg-black/[0.04] px-2 py-0.5 text-[11px] font-medium text-[#1D1D1F] dark:bg-white/[0.08] dark:text-[#F5F5F7] border border-black/[0.06] dark:border-white/[0.08]">
                <span>Category: {selectedCategory}</span>
                <button
                  onClick={() => setSelectedCategory("All")}
                  aria-label="Remove category filter"
                  className="rounded hover:bg-black/[0.1] dark:hover:bg-white/[0.1] p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {isComponents && selectedFramework !== "All" && (
              <span className="inline-flex items-center gap-1 rounded-md bg-black/[0.04] px-2 py-0.5 text-[11px] font-medium text-[#1D1D1F] dark:bg-white/[0.08] dark:text-[#F5F5F7] border border-black/[0.06] dark:border-white/[0.08]">
                <span>Framework: {selectedFramework}</span>
                <button
                  onClick={() => setSelectedFramework("All")}
                  aria-label="Remove framework filter"
                  className="rounded hover:bg-black/[0.1] dark:hover:bg-white/[0.1] p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {!isComponents && skillSourceFilter !== "All" && (
              <span className="inline-flex items-center gap-1 rounded-md bg-black/[0.04] px-2 py-0.5 text-[11px] font-medium text-[#1D1D1F] dark:bg-white/[0.08] dark:text-[#F5F5F7] border border-black/[0.06] dark:border-white/[0.08]">
                <span>Source: {skillSourceFilter}</span>
                <button
                  onClick={() => setSkillSourceFilter("All")}
                  aria-label="Remove source filter"
                  className="rounded hover:bg-black/[0.1] dark:hover:bg-white/[0.1] p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}

            {searchQuery.trim().length > 0 && (
              <span className="inline-flex items-center gap-1 rounded-md bg-black/[0.04] px-2 py-0.5 text-[11px] font-medium text-[#1D1D1F] dark:bg-white/[0.08] dark:text-[#F5F5F7] border border-black/[0.06] dark:border-white/[0.08]">
                <span>Query: "{searchQuery}"</span>
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search query"
                  className="rounded hover:bg-black/[0.1] dark:hover:bg-white/[0.1] p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
