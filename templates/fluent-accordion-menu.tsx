"use client"

import * as React from "react"
import { ChevronRight, FileCode, HardDrive, Settings, ShieldAlert, Database } from "lucide-react"

interface NavFolder {
  id: string
  name: string
  icon: React.ComponentType<{ className?: string }>
  children: string[]
}

const FOLDERS: NavFolder[] = [
  {
    id: "cloud",
    name: "Azure Infrastructure",
    icon: HardDrive,
    children: ["Virtual Networks", "App Services", "Key Vault Secrets"],
  },
  {
    id: "data",
    name: "Cosmos Databases",
    icon: Database,
    children: ["Analytics Container", "Session Storage", "Throughput Scaler"],
  },
  {
    id: "security",
    name: "Entra ID Policies",
    icon: ShieldAlert,
    children: ["Conditional Access", "Role Assignments", "MFA Enforcement"],
  },
]

export function FluentAccordionMenu() {
  const [openFolders, setOpenFolders] = React.useState<string[]>(["cloud"])
  const [selectedLeaf, setSelectedLeaf] = React.useState<string>("App Services")

  const toggleFolder = (id: string) => {
    setOpenFolders((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  return (
    <div className="mx-auto w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-5 shadow-md dark:border-zinc-800 dark:bg-zinc-950 font-sans">
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Fluent 365 Tree Hierarchy
          </span>
          <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Enterprise Cloud Explorer</h3>
        </div>
        <Settings className="h-4 w-4 text-zinc-400" />
      </div>

      <div className="space-y-1">
        {FOLDERS.map((folder) => {
          const isOpen = openFolders.includes(folder.id)
          const Icon = folder.icon
          return (
            <div key={folder.id}>
              <button
                onClick={() => toggleFolder(folder.id)}
                className="w-full flex items-center justify-between rounded-xl px-2.5 py-1.5 text-xs text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-900 transition"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-blue-500" />
                  <span className="font-semibold">{folder.name}</span>
                </div>
                <ChevronRight
                  className={`h-3.5 w-3.5 text-zinc-400 transition-transform ${
                    isOpen ? "rotate-90 text-blue-500" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="pl-6 pt-1 space-y-0.5">
                  {folder.children.map((child) => {
                    const isSelected = selectedLeaf === child
                    return (
                      <button
                        key={child}
                        onClick={() => setSelectedLeaf(child)}
                        className={`w-full text-left rounded-lg px-2.5 py-1 text-xs transition flex items-center gap-2 ${
                          isSelected
                            ? "bg-blue-50 font-bold text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                            : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
                        }`}
                      >
                        <FileCode className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                        <span className="truncate">{child}</span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default FluentAccordionMenu
