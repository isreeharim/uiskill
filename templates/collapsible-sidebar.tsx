"use client"

import * as React from "react"
import { Home, BarChart2, Users, Settings, Bell, ChevronDown, ChevronRight, PanelLeftClose, PanelLeftOpen, Zap } from "lucide-react"

interface NavItem {
  label: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  badge?: number
  children?: Omit<NavItem, "icon" | "children">[]
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: Home, href: "/" },
  {
    label: "Analytics",
    icon: BarChart2,
    href: "/analytics",
    children: [
      { label: "Overview", href: "/analytics/overview" },
      { label: "Reports", href: "/analytics/reports" },
      { label: "Realtime", href: "/analytics/realtime" },
    ],
  },
  { label: "Team", icon: Users, href: "/team", badge: 3 },
  { label: "Settings", icon: Settings, href: "/settings" },
]

function NavLink({
  item,
  collapsed,
  depth = 0,
}: {
  item: NavItem
  collapsed: boolean
  depth?: number
}) {
  const [open, setOpen] = React.useState(false)
  const hasChildren = item.children && item.children.length > 0
  const Icon = item.icon

  return (
    <div>
      <button
        onClick={() => hasChildren && setOpen(!open)}
        title={collapsed ? item.label : undefined}
        className={`group w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150
          text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900
          dark:text-zinc-400 dark:hover:bg-zinc-800/70 dark:hover:text-zinc-100
          ${depth > 0 ? "ml-6 pl-4 text-xs" : ""}`}
      >
        {Icon && !depth && <Icon className="h-4 w-4 shrink-0" />}
        {!collapsed && (
          <>
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <span className="ml-auto rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
                {item.badge}
              </span>
            )}
            {hasChildren && (
              <span className="ml-auto text-zinc-400">
                {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
              </span>
            )}
          </>
        )}
      </button>

      {hasChildren && open && !collapsed && (
        <div className="mt-0.5 space-y-0.5">
          {item.children!.map((child) => (
            <a
              key={child.href}
              href={child.href}
              onClick={(e) => e.preventDefault()}
              className="flex w-full items-center gap-2 rounded-lg py-2 pl-10 pr-3 text-xs font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800/70 dark:hover:text-zinc-200 transition"
            >
              {child.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export function CollapsibleSidebar() {
  const [collapsed, setCollapsed] = React.useState(false)

  return (
    <div
      className={`relative flex h-full min-h-[480px] flex-col border-r border-zinc-200 bg-white transition-all duration-300 dark:border-zinc-800 dark:bg-zinc-950
        ${collapsed ? "w-16" : "w-64"}`}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-zinc-200 px-4 dark:border-zinc-800 shrink-0">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/30">
          <Zap className="h-4 w-4" />
        </div>
        {!collapsed && (
          <span className="font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">Acme Inc.</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {NAV_ITEMS.map((item) => (
          <NavLink key={item.href} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-zinc-200 p-3 dark:border-zinc-800 shrink-0">
        {!collapsed && (
          <div className="mb-3 flex items-center gap-3 rounded-xl p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition cursor-pointer">
            <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 ring-2 ring-white dark:ring-zinc-900" />
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-zinc-900 dark:text-zinc-100">Sreehari</p>
              <p className="truncate text-xs text-zinc-400">admin@acme.com</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center gap-2 rounded-xl p-2 text-xs text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </div>
  )
}
