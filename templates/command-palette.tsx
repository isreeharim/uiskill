"use client"

import * as React from "react"
import { Search, FileText, Settings, User, CreditCard, Sparkles, X } from "lucide-react"

interface CommandAction {
  id: string
  label: string
  group: string
  icon: React.ComponentType<{ className?: string }>
  shortcut?: string
  perform: () => void
}

export function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [query, setQuery] = React.useState("")
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const actions: CommandAction[] = [
    { id: "1", label: "Create New Project", group: "Suggestions", icon: Sparkles, shortcut: "⌘N", perform: () => alert("New Project") },
    { id: "2", label: "View Audit Logs", group: "Suggestions", icon: FileText, perform: () => alert("Logs") },
    { id: "3", label: "Account Profile", group: "Settings", icon: User, perform: () => alert("Profile") },
    { id: "4", label: "Manage Billing", group: "Settings", icon: CreditCard, shortcut: "⌘B", perform: () => alert("Billing") },
    { id: "5", label: "System Preferences", group: "Settings", icon: Settings, perform: () => alert("Settings") },
  ]

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  )

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        isOpen ? onClose() : null
      }
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[15vh] bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-zinc-200 px-4 dark:border-zinc-800">
          <Search className="h-4 w-4 text-zinc-400 shrink-0" />
          <input
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            autoFocus
            className="w-full bg-transparent px-3 py-3.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none dark:text-zinc-100"
          />
          <kbd className="hidden rounded-md border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-500 sm:inline-block dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            ESC
          </kbd>
        </div>

        {/* Action List */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-zinc-500">No results found.</div>
          ) : (
            filtered.map((action, idx) => {
              const Icon = action.icon
              const isSelected = idx === selectedIndex
              return (
                <div
                  key={action.id}
                  onClick={() => {
                    action.perform()
                    onClose()
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm cursor-pointer transition ${
                    isSelected
                      ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100"
                      : "text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-zinc-400" />
                    <span>{action.label}</span>
                  </div>
                  {action.shortcut && (
                    <kbd className="text-xs text-zinc-400 font-mono">{action.shortcut}</kbd>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
