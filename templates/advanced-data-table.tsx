"use client"

import * as React from "react"
import { Search, ChevronDown, ChevronUp, ChevronsUpDown, Filter } from "lucide-react"

export interface TableItem {
  id: string
  name: string
  email: string
  role: "Owner" | "Admin" | "Member"
  status: "Active" | "Invited" | "Suspended"
  spent: string
}

const SAMPLE_DATA: TableItem[] = [
  { id: "1", name: "Sarah Chen", email: "sarah@acme.com", role: "Owner", status: "Active", spent: "$12,450" },
  { id: "2", name: "David Miller", email: "david@acme.com", role: "Admin", status: "Active", spent: "$8,200" },
  { id: "3", name: "Elena Rostova", email: "elena@acme.com", role: "Member", status: "Invited", spent: "$1,340" },
  { id: "4", name: "Marcus Johnson", email: "marcus@acme.com", role: "Member", status: "Suspended", spent: "$4,500" },
  { id: "5", name: "Aria Thorne", email: "aria@acme.com", role: "Admin", status: "Active", spent: "$19,800" },
]

export function AdvancedDataTable() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [sortField, setSortField] = React.useState<keyof TableItem>("name")
  const [sortAsc, setSortAsc] = React.useState(true)

  const handleSort = (field: keyof TableItem) => {
    if (sortField === field) {
      setSortAsc(!sortAsc)
    } else {
      setSortField(field)
      setSortAsc(true)
    }
  }

  const filtered = SAMPLE_DATA.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    const valA = a[sortField]
    const valB = b[sortField]
    return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA)
  })

  return (
    <div className="w-full rounded-2xl border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-950">
      {/* Search & Actions Header */}
      <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between border-b border-zinc-200 dark:border-zinc-800">
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-zinc-200 bg-zinc-50/50 pl-9 pr-4 py-2 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 px-3.5 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 transition"
        >
          <Filter className="h-4 w-4 text-zinc-400" />
          Filters
        </button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400">
          <thead className="border-b border-zinc-200 bg-zinc-50/50 text-xs font-semibold text-zinc-500 uppercase tracking-wider dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
            <tr>
              <th className="py-3.5 px-6 cursor-pointer" onClick={() => handleSort("name")}>
                <div className="flex items-center gap-1.5">
                  Member
                  <ChevronsUpDown className="h-3.5 w-3.5 text-zinc-400" />
                </div>
              </th>
              <th className="py-3.5 px-6">Role</th>
              <th className="py-3.5 px-6">Status</th>
              <th className="py-3.5 px-6 cursor-pointer" onClick={() => handleSort("spent")}>
                <div className="flex items-center gap-1.5">
                  Total Spent
                  <ChevronsUpDown className="h-3.5 w-3.5 text-zinc-400" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {filtered.map((row) => (
              <tr key={row.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/40 transition">
                <td className="py-4 px-6">
                  <div className="font-medium text-zinc-950 dark:text-zinc-100">{row.name}</div>
                  <div className="text-xs text-zinc-400">{row.email}</div>
                </td>
                <td className="py-4 px-6 text-zinc-700 dark:text-zinc-300">{row.role}</td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                      row.status === "Active"
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400"
                        : row.status === "Invited"
                        ? "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400"
                        : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="py-4 px-6 font-medium text-zinc-900 dark:text-zinc-100">{row.spent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
