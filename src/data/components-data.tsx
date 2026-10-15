import React, { useState } from "react"

// Import components directly from templates
import { DashboardMetricsCard } from "../../templates/dashboard-metrics-card"
import { PricingPlanSelector } from "../../templates/pricing-plan-selector"
import { InteractiveBentoGrid } from "../../templates/interactive-bento-grid"
import { AnimatedModalDialog } from "../../templates/animated-modal-dialog"
import { AuthCard } from "../../templates/auth-card"
import { CollapsibleSidebar } from "../../templates/collapsible-sidebar"
import { CommandPalette } from "../../templates/command-palette"
import { DaisyThemeSwitcher } from "../../templates/daisy-theme-switcher"
import { EmptyState } from "../../templates/empty-state"
import { NotificationCenter } from "../../templates/notification-center"
import { OnboardingWizard } from "../../templates/onboarding-wizard"
import { AdvancedDataTable } from "../../templates/advanced-data-table"
import { ShinyText } from "../../templates/react-bits-shiny-text"
import { TrueFocus } from "../../templates/react-bits-true-focus"
import { TiltedCard } from "../../templates/react-bits-tilted-card"
import { StarBorder } from "../../templates/react-bits-star-border"
import { Magnet } from "../../templates/react-bits-magnet"
import { Squares } from "../../templates/react-bits-squares-background"

// Import raw code strings using Vite's ?raw
import rawMetricsCard from "../../templates/dashboard-metrics-card.tsx?raw"
import rawPricingPlan from "../../templates/pricing-plan-selector.tsx?raw"
import rawBentoGrid from "../../templates/interactive-bento-grid.tsx?raw"
import rawAnimatedModal from "../../templates/animated-modal-dialog.tsx?raw"
import rawAuthCard from "../../templates/auth-card.tsx?raw"
import rawCollapsibleSidebar from "../../templates/collapsible-sidebar.tsx?raw"
import rawCommandPalette from "../../templates/command-palette.tsx?raw"
import rawDaisySwitcher from "../../templates/daisy-theme-switcher.tsx?raw"
import rawEmptyState from "../../templates/empty-state.tsx?raw"
import rawNotificationCenter from "../../templates/notification-center.tsx?raw"
import rawOnboardingWizard from "../../templates/onboarding-wizard.tsx?raw"
import rawDataTable from "../../templates/advanced-data-table.tsx?raw"
import rawShinyText from "../../templates/react-bits-shiny-text.tsx?raw"
import rawTrueFocus from "../../templates/react-bits-true-focus.tsx?raw"
import rawTiltedCard from "../../templates/react-bits-tilted-card.tsx?raw"
import rawStarBorder from "../../templates/react-bits-star-border.tsx?raw"
import rawMagnet from "../../templates/react-bits-magnet.tsx?raw"
import rawSquares from "../../templates/react-bits-squares-background.tsx?raw"

export interface ComponentItem {
  id: string
  name: string
  category: "SaaS Dashboards" | "Marketing & Bento" | "Auth & Flow" | "Overlays & Actions" | "Theming" | "Creative & Motion"
  system: string
  description: string
  tags: string[]
  fileName: string
  installCommand: string
  dependencies: string[]
  code: string
  previewComponent: React.ComponentType
}

// Wrapper for AnimatedModalDialog with interactive trigger
function AnimatedModalPreview() {
  const [isOpen, setIsOpen] = useState(false)
  const [lastAction, setLastAction] = useState<string | null>(null)

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
      <div className="max-w-md space-y-4">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Modal Dialog Demonstration</h4>
          <p className="text-xs text-zinc-500 mt-1">
            Accessible dialog with backdrop blur, smooth spring entrance, Escape key dismiss, and focus trap.
          </p>
          <div className="mt-5">
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 active:scale-95 transition"
            >
              Trigger Danger Action Modal
            </button>
          </div>
          {lastAction && (
            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-3">
              Last status: {lastAction}
            </p>
          )}
        </div>
      </div>

      <AnimatedModalDialog
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
          setLastAction("Cancelled dialog at " + new Date().toLocaleTimeString())
        }}
        onConfirm={() => {
          setIsOpen(false)
          setLastAction("Confirmed action successfully at " + new Date().toLocaleTimeString())
        }}
        title="Revoke API Production Key?"
        description="This action cannot be undone. Any active microservices using this key will immediately receive 401 Unauthorized errors."
        confirmText="Revoke Key"
        cancelText="Keep Key"
      />
    </div>
  )
}

// Wrapper for CommandPalette with interactive trigger
function CommandPalettePreview() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[300px]">
      <div className="max-w-md w-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center justify-center mb-4">
          <kbd className="rounded-lg border border-zinc-300 bg-zinc-100 px-3 py-1.5 font-mono text-sm font-bold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            ⌘K / Ctrl+K
          </kbd>
        </div>
        <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">Command Palette (Spotlight Search)</h4>
        <p className="text-xs text-zinc-500 mt-1">
          Instant keyboard-first navigation with action groupings, arrow key cycling, and auto-focus.
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 active:scale-95 transition"
        >
          Open Command Palette
        </button>
      </div>

      <CommandPalette isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}

// Wrapper for CollapsibleSidebar with mock layout
function CollapsibleSidebarPreview() {
  return (
    <div className="h-[480px] w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 flex dark:border-zinc-800 dark:bg-zinc-950">
      <CollapsibleSidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="rounded-xl border border-dashed border-zinc-300 p-8 text-center dark:border-zinc-800">
          <h3 className="font-semibold text-zinc-800 dark:text-zinc-200">Main Content Canvas</h3>
          <p className="text-xs text-zinc-400 mt-1">
            Toggle the collapse button at the bottom of the sidebar to see smooth responsive width transitions.
          </p>
        </div>
      </div>
    </div>
  )
}

// Wrapper for NotificationCenter
function NotificationCenterPreview() {
  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-[460px]">
      <div className="flex items-center justify-between gap-6 p-4 rounded-2xl border border-zinc-200 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
        <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">User Navigation Bar Mockup:</span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-400">Click bell icon ➔</span>
          <NotificationCenter />
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600" />
        </div>
      </div>
    </div>
  )
}

// Wrapper for DashboardMetricsCard to show multiple cards
function MetricsCardRowPreview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-4 w-full max-w-5xl mx-auto">
      <DashboardMetricsCard
        title="Monthly Recurring Revenue"
        value="$48,250"
        change="+14.2%"
        trend="up"
        period="vs. last month"
        sparklineData={[12, 18, 14, 25, 22, 38, 48]}
      />
      <DashboardMetricsCard
        title="Active Subscribers"
        value="2,840"
        change="+8.1%"
        trend="up"
        period="vs. last month"
        sparklineData={[15, 16, 20, 24, 28, 30, 35]}
      />
      <DashboardMetricsCard
        title="Customer Churn Rate"
        value="1.42%"
        change="-0.3%"
        trend="down"
        period="vs. last month"
        sparklineData={[35, 32, 28, 26, 24, 22, 18]}
      />
    </div>
  )
}

// Wrapper for EmptyState
function EmptyStatePreview() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <EmptyState
        onCreate={() => alert("Create project triggered!")}
        onImport={() => alert("Import project dialog triggered!")}
      />
    </div>
  )
}

// Wrapper for DaisyThemeSwitcher
function DaisySwitcherPreview() {
  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-[300px]">
      <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-xs dark:border-zinc-800 dark:bg-zinc-900 max-w-md w-full">
        <h4 className="font-bold text-zinc-900 dark:text-zinc-100">Semantic Theme Switcher</h4>
        <p className="text-xs text-zinc-500 mt-1 mb-6">
          Controls the <code>data-theme</code> attribute dynamically across 30+ DaisyUI preset palettes.
        </p>
        <div className="flex justify-center">
          <DaisyThemeSwitcher />
        </div>
      </div>
    </div>
  )
}

// React Bits Previews
function ShinyTextPreview() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center min-h-[260px] bg-zinc-950 rounded-2xl border border-zinc-800">
      <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">React Bits Typography</span>
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
        <ShinyText text="Build Software at the Speed of Light" speed={4} />
      </h2>
      <p className="mt-3 text-sm text-zinc-400 max-w-md">
        Smooth, non-blocking light beam gradient sweeping across typography.
      </p>
    </div>
  )
}

function TrueFocusPreview() {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center min-h-[260px] rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Morphing Focus</span>
      <TrueFocus sentence="Design Engineers Build The Future" manualMode={false} />
      <p className="mt-4 text-xs text-zinc-500">
        Automatic sequential or hover-driven focus brackets with dynamic glow.
      </p>
    </div>
  )
}

function TiltedCardPreview() {
  return (
    <div className="flex items-center justify-center p-8 min-h-[300px]">
      <TiltedCard
        title="3D Tilt Physics"
        subtitle="Move your cursor across this card to experience real-time rotational perspective transforms."
        tag="React Bits 3D"
      />
    </div>
  )
}

function StarBorderPreview() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-10 text-center min-h-[260px] bg-zinc-950 rounded-2xl border border-zinc-800">
      <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">High-Converting CTA</span>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <StarBorder color="#3b82f6" speed="4s">
          <span>Deploy to Production</span>
        </StarBorder>
        <StarBorder color="#10b981" speed="6s">
          <span>Start Free Trial</span>
        </StarBorder>
      </div>
      <p className="text-xs text-zinc-400">
        Rotating conic gradient border beam wrapped in a responsive accessible button.
      </p>
    </div>
  )
}

function MagnetPreview() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center min-h-[260px] rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
      <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Cursor Attraction Physics</span>
      <Magnet padding={90} magnetStrength={2}>
        <button className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-500/20 active:scale-95 transition-transform">
          <span>Hover Near Me</span>
        </button>
      </Magnet>
      <p className="mt-5 text-xs text-zinc-500">
        Element smoothly pulls toward the mouse within the detection radius.
      </p>
    </div>
  )
}

export const COMPONENTS_DATA: ComponentItem[] = [
  {
    id: "dashboard-metrics-card",
    name: "Dashboard Metrics Card",
    category: "SaaS Dashboards",
    system: "Untitled UI & AlignUI",
    description: "High-converting SaaS metric summary card with inline SVG sparkline, trend badges, and menu triggers.",
    tags: ["saas", "metrics", "analytics", "sparkline", "tailwind", "responsive"],
    fileName: "components/dashboard-metrics-card.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["react", "lucide-react", "tailwindcss"],
    code: rawMetricsCard,
    previewComponent: MetricsCardRowPreview,
  },
  {
    id: "advanced-data-table",
    name: "Advanced Data Table",
    category: "SaaS Dashboards",
    system: "shadcn/ui + TanStack Table",
    description: "Data-dense table with live search filtering, multi-column sorting, pagination controls, and status badges.",
    tags: ["table", "search", "sorting", "tanstack", "pagination", "enterprise"],
    fileName: "components/advanced-data-table.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["react", "lucide-react", "tailwindcss"],
    code: rawDataTable,
    previewComponent: AdvancedDataTable,
  },
  {
    id: "pricing-plan-selector",
    name: "Pricing Plan Selector",
    category: "SaaS Dashboards",
    system: "Tailark & shadcn/ui",
    description: "SaaS pricing table with monthly/annual discount switch (-20%), popular badge highlights, and feature checklists.",
    tags: ["pricing", "billing", "plans", "marketing", "toggle"],
    fileName: "components/pricing-plan-selector.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["react", "lucide-react", "tailwindcss"],
    code: rawPricingPlan,
    previewComponent: PricingPlanSelector,
  },
  {
    id: "collapsible-sidebar",
    name: "Collapsible Sidebar",
    category: "SaaS Dashboards",
    system: "shadcn/ui Sidebar standard",
    description: "Collapsible responsive navigation drawer with nested sub-menus, unread notification counts, and user profile footer.",
    tags: ["sidebar", "navigation", "drawer", "collapse", "menu"],
    fileName: "components/collapsible-sidebar.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["react", "lucide-react", "tailwindcss"],
    code: rawCollapsibleSidebar,
    previewComponent: CollapsibleSidebarPreview,
  },
  {
    id: "interactive-bento-grid",
    name: "Interactive Bento Grid",
    category: "Marketing & Bento",
    system: "21st.dev & HeroUI",
    description: "Apple-inspired bento grid layout with asymmetric feature cards, hover lift animations, and sleek badge accents.",
    tags: ["bento", "grid", "marketing", "apple-style", "micro-interaction"],
    fileName: "components/interactive-bento-grid.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["react", "lucide-react", "tailwindcss"],
    code: rawBentoGrid,
    previewComponent: InteractiveBentoGrid,
  },
  {
    id: "empty-state",
    name: "Empty State Placeholder",
    category: "Marketing & Bento",
    system: "AlignUI & Untitled UI",
    description: "Friendly placeholder card for zero-state scenarios with dashed borders and primary/secondary call-to-actions.",
    tags: ["empty-state", "zero-data", "placeholder", "cta"],
    fileName: "components/empty-state.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["react", "lucide-react", "tailwindcss"],
    code: rawEmptyState,
    previewComponent: EmptyStatePreview,
  },
  {
    id: "auth-card",
    name: "Authentication Card",
    category: "Auth & Flow",
    system: "Tailark + shadcn/ui",
    description: "Complete auth card supporting Login, Registration, and Forgot Password with social OAuth and loading states.",
    tags: ["auth", "login", "signup", "forms", "validation", "oauth"],
    fileName: "components/auth-card.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["react", "lucide-react", "tailwindcss"],
    code: rawAuthCard,
    previewComponent: AuthCard,
  },
  {
    id: "onboarding-wizard",
    name: "Onboarding Wizard",
    category: "Auth & Flow",
    system: "Untitled UI SaaS onboarding",
    description: "Step-by-step progress wizard with animated step pills, input validation, and celebration completion screen.",
    tags: ["wizard", "onboarding", "stepper", "forms", "setup"],
    fileName: "components/onboarding-wizard.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["react", "lucide-react", "tailwindcss"],
    code: rawOnboardingWizard,
    previewComponent: OnboardingWizard,
  },
  {
    id: "animated-modal-dialog",
    name: "Animated Modal Dialog",
    category: "Overlays & Actions",
    system: "Base UI & Radix Primitives",
    description: "Accessible confirmation modal dialog featuring keyboard Escape listener, backdrop blur, and danger actions.",
    tags: ["modal", "dialog", "overlay", "accessibility", "animation"],
    fileName: "components/animated-modal-dialog.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["react", "lucide-react", "tailwindcss"],
    code: rawAnimatedModal,
    previewComponent: AnimatedModalPreview,
  },
  {
    id: "command-palette",
    name: "Command Palette (⌘K)",
    category: "Overlays & Actions",
    system: "cmdk + shadcn/ui",
    description: "Spotlight-style global command bar with keyboard shortcuts (⌘K / Ctrl+K), filtered search, and item groupings.",
    tags: ["command-palette", "spotlight", "shortcuts", "cmdk", "search"],
    fileName: "components/command-palette.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["react", "lucide-react", "tailwindcss"],
    code: rawCommandPalette,
    previewComponent: CommandPalettePreview,
  },
  {
    id: "notification-center",
    name: "Notification Center",
    category: "Overlays & Actions",
    system: "Untitled UI Notification Drawer",
    description: "Interactive notification bell with live counter badge, mark-all-as-read, type icons (info/success/warning/error), and dismiss actions.",
    tags: ["notifications", "bell", "alerts", "dropdown", "badges"],
    fileName: "components/notification-center.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["react", "lucide-react", "tailwindcss"],
    code: rawNotificationCenter,
    previewComponent: NotificationCenterPreview,
  },
  {
    id: "daisy-theme-switcher",
    name: "DaisyUI Theme Switcher",
    category: "Theming",
    system: "DaisyUI Pure CSS",
    description: "Zero-JS overhead semantic theme switcher supporting 30+ curated color palettes stored in localStorage.",
    tags: ["daisyui", "themes", "dark-mode", "css-variables", "palette"],
    fileName: "components/daisy-theme-switcher.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["react", "lucide-react"],
    code: rawDaisySwitcher,
    previewComponent: DaisySwitcherPreview,
  },
  {
    id: "react-bits-shiny-text",
    name: "Shiny Text Effect",
    category: "Creative & Motion",
    system: "React Bits (David Haz)",
    description: "An animated light beam gradient sweeping across typography, ideal for high-impact hero headings and badges.",
    tags: ["react-bits", "text-animation", "shiny-text", "framer-motion", "typography"],
    fileName: "components/react-bits-shiny-text.tsx",
    installCommand: "npm install framer-motion clsx tailwind-merge",
    dependencies: ["react", "framer-motion", "tailwindcss"],
    code: rawShinyText,
    previewComponent: ShinyTextPreview,
  },
  {
    id: "react-bits-true-focus",
    name: "True Focus Framing",
    category: "Creative & Motion",
    system: "React Bits (David Haz)",
    description: "Dynamic word-by-word morphing focus brackets with animated glowing border and manual hover trigger.",
    tags: ["react-bits", "true-focus", "typography", "focus-box", "motion"],
    fileName: "components/react-bits-true-focus.tsx",
    installCommand: "npm install framer-motion clsx tailwind-merge",
    dependencies: ["react", "framer-motion", "tailwindcss"],
    code: rawTrueFocus,
    previewComponent: TrueFocusPreview,
  },
  {
    id: "react-bits-tilted-card",
    name: "3D Tilted Perspective Card",
    category: "Creative & Motion",
    system: "React Bits (David Haz)",
    description: "Interactive 3D card that rotates along X and Y axes according to cursor position with realistic depth physics.",
    tags: ["react-bits", "3d", "tilted-card", "perspective", "cards"],
    fileName: "components/react-bits-tilted-card.tsx",
    installCommand: "npm install framer-motion clsx tailwind-merge",
    dependencies: ["react", "framer-motion", "tailwindcss"],
    code: rawTiltedCard,
    previewComponent: TiltedCardPreview,
  },
  {
    id: "react-bits-star-border",
    name: "Star Border Beam Button",
    category: "Creative & Motion",
    system: "React Bits (David Haz)",
    description: "High-converting action button with a continuous rotating conic gradient perimeter halo.",
    tags: ["react-bits", "star-border", "buttons", "cta", "border-beam"],
    fileName: "components/react-bits-star-border.tsx",
    installCommand: "npm install clsx tailwind-merge",
    dependencies: ["react", "tailwindcss"],
    code: rawStarBorder,
    previewComponent: StarBorderPreview,
  },
  {
    id: "react-bits-magnet",
    name: "Magnet Cursor Attraction",
    category: "Creative & Motion",
    system: "React Bits (David Haz)",
    description: "Magnetic physics wrapper that draws buttons or icons toward the cursor within a configurable proximity field.",
    tags: ["react-bits", "magnet", "cursor-physics", "micro-interactions"],
    fileName: "components/react-bits-magnet.tsx",
    installCommand: "npm install framer-motion clsx tailwind-merge",
    dependencies: ["react", "framer-motion", "tailwindcss"],
    code: rawMagnet,
    previewComponent: MagnetPreview,
  },
]
