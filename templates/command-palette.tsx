"use client"

import { useEffect, useMemo, useState, type ComponentType } from "react"
import { Search, FileText, Settings, User, CreditCard, Sparkles } from "lucide-react"

interface CommandAction {
  id: string
  label: string
  group: string
  icon: ComponentType<{ className?: string }>
  shortcut?: string
  perform?: () => void
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
  inline?: boolean
}

const ACTIONS: CommandAction[] = [
  { id: "1", label: "Create New Project", group: "Suggestions", icon: Sparkles, shortcut: "⌘N", perform: () => {} },
  { id: "2", label: "View Audit Logs", group: "Suggestions", icon: FileText, perform: () => {} },
  { id: "3", label: "Account Profile", group: "Settings", icon: User, perform: () => {} },
  { id: "4", label: "Manage Billing", group: "Settings", icon: CreditCard, shortcut: "⌘B", perform: () => {} },
  { id: "5", label: "System Preferences", group: "Settings", icon: Settings, perform: () => {} },
]

export function CommandPalette({ isOpen, onClose, inline = false }: CommandPaletteProps) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)

  const filtered = useMemo(
    () => ACTIONS.filter((action) => action.label.toLowerCase().includes(query.toLowerCase())),
    [query],
  )

  useEffect(() => {
    setSelectedIndex(0)
  }, [query])

  useEffect(() => {
    if (!isOpen || inline) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key === "ArrowDown") {
        event.preventDefault()
        setSelectedIndex((current) => (filtered.length ? (current + 1) % filtered.length : 0))
        return
      }

      if (event.key === "ArrowUp") {
        event.preventDefault()
        setSelectedIndex((current) => (filtered.length ? (current - 1 + filtered.length) % filtered.length : 0))
        return
      }

      if (event.key === "Enter") {
        event.preventDefault()
        filtered[selectedIndex]?.perform?.()
        if (filtered[selectedIndex]) onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [filtered, inline, isOpen, onClose, selectedIndex])

  if (!isOpen) return null

  const content = (
    <div className={`overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 ${inline ? "w-full max-w-sm mx-auto shadow-md" : "w-full max-w-lg"}`}>
      <div className="relative flex items-center border-b border-zinc-200 px-4 dark:border-zinc-800">
        <Search className="h-4 w-4 text-zinc-400 shrink-0" />
        <input
          type="text"
          placeholder="Type a command or search..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Command search input"
          className="w-full bg-transparent px-3 py-3.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none dark:text-zinc-100"
        />
        <kbd className="hidden rounded-md border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 text-xs text-zinc-500 sm:inline-block dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
          {inline ? "⌘K" : "ESC"}
        </kbd>
      </div>

      <div role="listbox" aria-label="Available commands" className={`overflow-y-auto p-2 ${inline ? "max-h-48" : "max-h-80"}`}>
        {filtered.length === 0 ? (
          <div className="py-8 text-center text-sm text-zinc-500">No results found for "{query}".</div>
        ) : (
          filtered.map((action, index) => {
            const Icon = action.icon
            const selected = index === selectedIndex
            return (
              <button
                key={action.id}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  action.perform?.()
                  onClose()
                }}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${selected ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 font-medium" : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900/60"}`}
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4 text-zinc-400" />
                  <span>{action.label}</span>
                </span>
                {action.shortcut && <kbd className="text-xs text-zinc-400 font-mono">{action.shortcut}</kbd>}
              </button>
            )
          })
        )}
      </div>
    </div>
  )

  if (inline) {
    return <div className="text-left font-sans">{content}</div>
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[15vh] bg-black/60 backdrop-blur-sm animate-in fade-in duration-150"
    >
      <div onClick={(event) => event.stopPropagation()}>{content}</div>
    </div>
  )
}
