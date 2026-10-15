"use client"

import * as React from "react"
import { Search, FileText, Settings, User, CreditCard, Sparkles } from "lucide-react"

interface CommandAction {
  id: string
  label: string
  group: string
  icon: React.ComponentType<{ className?: string }>
  shortcut?: string
  perform?: () => void
}

export function CommandPalette({
  isOpen,
  onClose,
  inline = false,
}: {
  isOpen: boolean
  onClose: () => void
  inline?: boolean
}) {
  const [query, setQuery] = React.useState("")
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const actions: CommandAction[] = [
    { id: "1", label: "Create New Project", group: "Suggestions", icon: Sparkles, shortcut: "⌘N", perform: () => {} },
    { id: "2", label: "View Audit Logs", group: "Suggestions", icon: FileText, perform: () => {} },
    { id: "3", label: "Account Profile", group: "Settings", icon: User, perform: () => {} },
    { id: "4", label: "Manage Billing", group: "Settings", icon: CreditCard, shortcut: "⌘B", perform: () => {} },
    { id: "5", label: "System Preferences", group: "Settings", icon: Settings, perform: () => {} },
  ]

  const filtered = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  )

  // Reset or clamp selectedIndex when query changes
  React.useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  React.useEffect(() => {
    if (!isOpen || inline) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        if (isOpen) onClose()
        return
      }

      if (e.key === "Escape") {
        e.preventDefault()
        onClose()
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        setSelectedIndex((prev) => (filtered.length > 0 ? (prev + 1) % filtered.length : 0))
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        setSelectedIndex((prev) => (filtered.length > 0 ? (prev - 1 + filtered.length) % filtered.length : 0))
      } else if (e.key === "Enter") {
        e.preventDefault()
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].perform?.()
          onClose()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose, filtered, selectedIndex, inline])

  if (!isOpen) return null

  if (inline) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
        className="w-full max-w-sm mx-auto overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-md dark:border-zinc-800 dark:bg-zinc-950 text-left font-sans"
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-zinc-200 px-3 py-2 dark:border-zinc-800">
          <Search className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
          <input
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Command search input"
            className="w-full bg-transparent px-2 text-xs text-zinc-900 placeholder-zinc-400 outline-none dark:text-zinc-100"
          />
          <kbd className="hidden rounded-md border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 text-[10px] text-zinc-500 sm:inline-block dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            ⌘K
          </kbd>
        </div>

        {/* Action List */}
        <div
          role="listbox"
          aria-label="Available commands"
          className="max-h-36 overflow-y-auto p-1.5 space-y-0.5"
        >
          {filtered.length === 0 ? (
            <div className="py-4 text-center text-xs text-zinc-500">No results found for "{query}".</div>
          ) : (
            filtered.slice(0, 3).map((action, idx) => {
              const Icon = action.icon
              const isSelected = idx === selectedIndex
              return (
                <div
                  key={action.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    action.perform()
                    onClose()
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between rounded-xl px-2.5 py-1.5 text-xs cursor-pointer transition ${
                    isSelected
                      ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 font-medium"
                      : "text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5 text-zinc-400" />
                    <span>{action.label}</span>
                  </div>
                  {action.shortcut && (
                    <kbd className="text-[10px] text-zinc-400 font-mono">{action.shortcut}</kbd>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[15vh] bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950"
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-zinc-200 px-4 dark:border-zinc-800">
          <Search className="h-4 w-4 text-zinc-400 shrink-0" />
          <input
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Command search input"
            className="w-full bg-transparent px-3 py-3.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none dark:text-zinc-100"
          />
          <kbd className="hidden rounded-md border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-500 sm:inline-block dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            ESC
          </kbd>
        </div>

        {/* Action List */}
        <div
          role="listbox"
          aria-label="Available commands"
          className="max-h-80 overflow-y-auto p-2"
        >
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-sm text-zinc-500">No results found for "{query}".</div>
          ) : (
            filtered.map((action, idx) => {
              const Icon = action.icon
              const isSelected = idx === selectedIndex
              return (
                <div
                  key={action.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    action.perform()
                    onClose()
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm cursor-pointer transition ${
                    isSelected
                      ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 font-medium"
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
