"use client"

import * as React from "react"
import { ChevronRight, ChevronLeft, Check } from "lucide-react"

interface Item {
  id: string
  title: string
  role: string
}

const INITIAL_SOURCE: Item[] = [
  { id: "1", title: "API Keys Read", role: "Developer" },
  { id: "2", title: "Billing Access", role: "Finance" },
  { id: "3", title: "Audit Logs Export", role: "Security" },
  { id: "4", title: "Cluster Admin", role: "DevOps" },
]

export function AntdTransferSelector() {
  const [source, setSource] = React.useState<Item[]>(INITIAL_SOURCE)
  const [target, setTarget] = React.useState<Item[]>([])
  const [selectedSource, setSelectedSource] = React.useState<string[]>([])
  const [selectedTarget, setSelectedTarget] = React.useState<string[]>([])

  const moveToTarget = () => {
    const toMove = source.filter((i) => selectedSource.includes(i.id))
    setTarget((prev) => [...prev, ...toMove])
    setSource((prev) => prev.filter((i) => !selectedSource.includes(i.id)))
    setSelectedSource([])
  }

  const moveToSource = () => {
    const toMove = target.filter((i) => selectedTarget.includes(i.id))
    setSource((prev) => [...prev, ...toMove])
    setTarget((prev) => prev.filter((i) => !selectedTarget.includes(i.id)))
    setSelectedTarget([])
  }

  return (
    <div className="mx-auto w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Ant Design Enterprise Transfer
        </span>
        <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">Role Permissions Assignee</h3>
      </div>

      <div className="flex items-center gap-3">
        {/* Source List */}
        <div className="flex-1 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-3 h-48 overflow-y-auto bg-zinc-50/50 dark:bg-zinc-900/30">
          <p className="text-[10px] font-bold uppercase text-zinc-400 mb-2">Available ({source.length})</p>
          <div className="space-y-1">
            {source.map((item) => {
              const isChecked = selectedSource.includes(item.id)
              return (
                <button
                  key={item.id}
                  onClick={() =>
                    setSelectedSource((prev) =>
                      isChecked ? prev.filter((id) => id !== item.id) : [...prev, item.id]
                    )
                  }
                  className={`w-full text-left rounded-xl p-2 text-xs transition flex items-center justify-between ${
                    isChecked
                      ? "bg-blue-600 text-white font-medium"
                      : "hover:bg-zinc-200/60 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  <span className="truncate">{item.title}</span>
                  {isChecked && <Check className="h-3 w-3 shrink-0" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Transfer Action Controls */}
        <div className="flex flex-col gap-2 shrink-0">
          <button
            onClick={moveToTarget}
            disabled={selectedSource.length === 0}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white disabled:opacity-40 transition active:scale-95 shadow-sm"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <button
            onClick={moveToSource}
            disabled={selectedTarget.length === 0}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white disabled:opacity-40 transition active:scale-95 shadow-sm"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        {/* Target List */}
        <div className="flex-1 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-3 h-48 overflow-y-auto bg-zinc-50/50 dark:bg-zinc-900/30">
          <p className="text-[10px] font-bold uppercase text-zinc-400 mb-2">Granted ({target.length})</p>
          <div className="space-y-1">
            {target.map((item) => {
              const isChecked = selectedTarget.includes(item.id)
              return (
                <button
                  key={item.id}
                  onClick={() =>
                    setSelectedTarget((prev) =>
                      isChecked ? prev.filter((id) => id !== item.id) : [...prev, item.id]
                    )
                  }
                  className={`w-full text-left rounded-xl p-2 text-xs transition flex items-center justify-between ${
                    isChecked
                      ? "bg-blue-600 text-white font-medium"
                      : "hover:bg-zinc-200/60 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  <span className="truncate">{item.title}</span>
                  {isChecked && <Check className="h-3 w-3 shrink-0" />}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
export default AntdTransferSelector
