import React from "react"

// Import existing 21 components
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
import { TremorAnalyticsDashboard } from "../../templates/tremor-analytics-dashboard"
import { VirtualizedInfiniteList } from "../../templates/virtualized-infinite-list"
import { UniversalCrossPlatformCard } from "../../templates/universal-cross-platform-card"

// Import 32 new components across all 21+ libraries
import { HeroUIUserProfile } from "../../templates/heroui-user-profile"
import { HeroUIGlowAccordion } from "../../templates/heroui-glow-accordion"
import { DaisyStatsKPI } from "../../templates/daisy-stats-kpi"
import { DaisyMockupBrowser } from "../../templates/daisy-mockup-browser"
import { DaisyChatBubble } from "../../templates/daisy-chat-bubble"
import { MUIActivityTimeline } from "../../templates/mui-activity-timeline"
import { MUISpeedDial } from "../../templates/mui-speed-dial"
import { AntdTransferSelector } from "../../templates/antd-transfer-selector"
import { AntdStatusResult } from "../../templates/antd-status-result"
import { BaseWebDensityTable } from "../../templates/baseweb-density-table"
import { BaseWebNotificationBanner } from "../../templates/baseweb-notification-banner"
import { FluentPersonaBadge } from "../../templates/fluent-persona-badge"
import { FluentAccordionMenu } from "../../templates/fluent-accordion-menu"
import { AriaComboBoxAutocomplete } from "../../templates/aria-combobox-autocomplete"
import { AriaDateRangePicker } from "../../templates/aria-date-range-picker"
import { ChakraSegmentedControl } from "../../templates/chakra-segmented-control"
import { ChakraPinInputOTP } from "../../templates/chakra-pin-input-otp"
import { TwentyFirstDynamicIsland } from "../../templates/twentyfirst-dynamic-island"
import { TwentyFirstShineBorder } from "../../templates/twentyfirst-shine-border"
import { TwentyFirstGlowingButton } from "../../templates/twentyfirst-glowing-button"
import { ReactBitsDecryptedText } from "../../templates/react-bits-decrypted-text"
import { ReactBitsSpotlightCard } from "../../templates/react-bits-spotlight-card"
import { ReactBitsPixelCard } from "../../templates/react-bits-pixel-card"
import { ShadcnDrawerSheet } from "../../templates/shadcn-drawer-sheet"
import { ShadcnCalendarPicker } from "../../templates/shadcn-calendar-picker"
import { UntitledUIFeatureComparison } from "../../templates/untitledui-feature-comparison"
import { UntitledUIBillingSummary } from "../../templates/untitledui-billing-summary"
import { AlignUIFilterBar } from "../../templates/alignui-filter-bar"
import { AwesomeFileDropzone } from "../../templates/awesome-file-dropzone"
import { AwesomeRatingStars } from "../../templates/awesome-rating-stars"
import { AwesomeTagInput } from "../../templates/awesome-tag-input"
import { ReshapedTokenSlider } from "../../templates/reshaped-token-slider"

// Raw code strings
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
import rawTremorDashboard from "../../templates/tremor-analytics-dashboard.tsx?raw"
import rawVirtualizedList from "../../templates/virtualized-infinite-list.tsx?raw"
import rawUniversalCard from "../../templates/universal-cross-platform-card.tsx?raw"

import rawHeroUIProfile from "../../templates/heroui-user-profile.tsx?raw"
import rawHeroUIAccordion from "../../templates/heroui-glow-accordion.tsx?raw"
import rawDaisyStats from "../../templates/daisy-stats-kpi.tsx?raw"
import rawDaisyMockup from "../../templates/daisy-mockup-browser.tsx?raw"
import rawDaisyChat from "../../templates/daisy-chat-bubble.tsx?raw"
import rawMUITimeline from "../../templates/mui-activity-timeline.tsx?raw"
import rawMUISpeedDial from "../../templates/mui-speed-dial.tsx?raw"
import rawAntdTransfer from "../../templates/antd-transfer-selector.tsx?raw"
import rawAntdResult from "../../templates/antd-status-result.tsx?raw"
import rawBaseWebTable from "../../templates/baseweb-density-table.tsx?raw"
import rawBaseWebBanner from "../../templates/baseweb-notification-banner.tsx?raw"
import rawFluentPersona from "../../templates/fluent-persona-badge.tsx?raw"
import rawFluentMenu from "../../templates/fluent-accordion-menu.tsx?raw"
import rawAriaComboBox from "../../templates/aria-combobox-autocomplete.tsx?raw"
import rawAriaDatePicker from "../../templates/aria-date-range-picker.tsx?raw"
import rawChakraSegmented from "../../templates/chakra-segmented-control.tsx?raw"
import rawChakraPinInput from "../../templates/chakra-pin-input-otp.tsx?raw"
import rawTwentyFirstIsland from "../../templates/twentyfirst-dynamic-island.tsx?raw"
import rawTwentyFirstShine from "../../templates/twentyfirst-shine-border.tsx?raw"
import rawTwentyFirstButton from "../../templates/twentyfirst-glowing-button.tsx?raw"
import rawReactBitsDecrypted from "../../templates/react-bits-decrypted-text.tsx?raw"
import rawReactBitsSpotlight from "../../templates/react-bits-spotlight-card.tsx?raw"
import rawReactBitsPixel from "../../templates/react-bits-pixel-card.tsx?raw"
import rawShadcnDrawer from "../../templates/shadcn-drawer-sheet.tsx?raw"
import rawShadcnCalendar from "../../templates/shadcn-calendar-picker.tsx?raw"
import rawUntitledUIComparison from "../../templates/untitledui-feature-comparison.tsx?raw"
import rawUntitledUIBilling from "../../templates/untitledui-billing-summary.tsx?raw"
import rawAlignUIFilter from "../../templates/alignui-filter-bar.tsx?raw"
import rawAwesomeDropzone from "../../templates/awesome-file-dropzone.tsx?raw"
import rawAwesomeRating from "../../templates/awesome-rating-stars.tsx?raw"
import rawAwesomeTag from "../../templates/awesome-tag-input.tsx?raw"
import rawReshapedSlider from "../../templates/reshaped-token-slider.tsx?raw"

export type ComponentCategory =
  | "SaaS Dashboards"
  | "Marketing & Bento"
  | "Auth & Flow"
  | "Overlays & Actions"
  | "Theming"
  | "Creative & Motion"
  | "Forms & Inputs"
  | "Data & Tables"
  | "Feedback & Status"

export interface ComponentItem {
  id: string
  name: string
  category: ComponentCategory
  system: string
  description: string
  tags: string[]
  fileName: string
  installCommand: string
  dependencies: string[]
  code: string
  previewComponent: React.ComponentType
}

export const COMPONENTS_DATA: ComponentItem[] = [
  // 1. Dashboard Metrics Card
  {
    id: "dashboard-metrics-card",
    name: "Dashboard Metric Card",
    category: "SaaS Dashboards",
    system: "Untitled UI / AlignUI",
    description: "High-converting KPI metric summary card with trending delta indicator, inline SVG sparkline, and contextual action menu.",
    tags: ["metric", "kpi", "dashboard", "analytics", "sparkline", "trending"],
    fileName: "dashboard-metrics-card.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["lucide-react"],
    code: rawMetricsCard,
    previewComponent: () => (
      <DashboardMetricsCard
        title="Total Active ARR"
        value="$48,250"
        change="+14.2%"
        trend="up"
        period="vs. last month"
        sparklineData={[15, 22, 19, 34, 28, 45, 52]}
      />
    ),
  },

  // 2. Pricing Plan Selector
  {
    id: "pricing-plan-selector",
    name: "Pricing Plan Selector",
    category: "Marketing & Bento",
    system: "Tailark / shadcn/ui",
    description: "Three-tier pricing table with annual/monthly billing toggle (-20% discount badge), feature checklists, and prominent featured plan.",
    tags: ["pricing", "billing", "marketing", "checkout", "subscription"],
    fileName: "pricing-plan-selector.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["lucide-react"],
    code: rawPricingPlan,
    previewComponent: PricingPlanSelector,
  },

  // 3. Interactive Bento Grid
  {
    id: "interactive-bento-grid",
    name: "Interactive Bento Grid",
    category: "Marketing & Bento",
    system: "21st.dev / shadcn/ui",
    description: "Modern Apple-style bento grid featuring feature callouts, hover micro-interactions, responsive column spans, and glowing accents.",
    tags: ["bento", "grid", "marketing", "features", "card"],
    fileName: "interactive-bento-grid.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["lucide-react"],
    code: rawBentoGrid,
    previewComponent: InteractiveBentoGrid,
  },

  // 4. Tremor Analytics Dashboard
  {
    id: "tremor-analytics-dashboard",
    name: "Tremor Analytics KPI Suite",
    category: "SaaS Dashboards",
    system: "Tremor",
    description: "Executive analytics KPI cards with animated progress bars, delta trend pills, and tabbed range filtering modeled after Tremor best practices.",
    tags: ["tremor", "charts", "analytics", "kpi", "dashboard"],
    fileName: "tremor-analytics-dashboard.tsx",
    installCommand: "npm install @tremor/react lucide-react",
    dependencies: ["lucide-react"],
    code: rawTremorDashboard,
    previewComponent: TremorAnalyticsDashboard,
  },

  // 5. Advanced Data Table
  {
    id: "advanced-data-table",
    name: "Advanced Data Table",
    category: "Data & Tables",
    system: "MUI X / TanStack Table",
    description: "Feature-packed data table with column sorting, real-time client search filtering, role and status badges, and empty search results handling.",
    tags: ["table", "datagrid", "tanstack", "mui", "sorting", "search"],
    fileName: "advanced-data-table.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["lucide-react"],
    code: rawDataTable,
    previewComponent: AdvancedDataTable,
  },

  // 6. Base Web High Density Table
  {
    id: "baseweb-density-table",
    name: "Uber Base Web Density Table",
    category: "Data & Tables",
    system: "Uber Base Web",
    description: "High-throughput logistics table featuring dense row spacing, ETA timestamps, status tags, and toggleable compact view.",
    tags: ["baseweb", "table", "logistics", "density", "uber"],
    fileName: "baseweb-density-table.tsx",
    installCommand: "npm install baseui styletron-react lucide-react",
    dependencies: ["lucide-react"],
    code: rawBaseWebTable,
    previewComponent: BaseWebDensityTable,
  },

  // 7. Virtualized Infinite List
  {
    id: "virtualized-infinite-list",
    name: "Virtualized Infinite List",
    category: "Data & Tables",
    system: "React Virtualized",
    description: "Ultra-fast DOM windowing engine rendering 100,000+ items at 60fps with zero memory leaks, search filter, and latency indicators.",
    tags: ["virtualized", "windowing", "infinite-scroll", "performance"],
    fileName: "virtualized-infinite-list.tsx",
    installCommand: "npm install react-virtualized lucide-react",
    dependencies: ["lucide-react"],
    code: rawVirtualizedList,
    previewComponent: VirtualizedInfiniteList,
  },

  // 8. Command Palette
  {
    id: "command-palette",
    name: "Universal Command Palette (⌘K)",
    category: "Overlays & Actions",
    system: "cmdk / shadcn/ui",
    description: "Global search and keyboard-driven quick action modal. Complete with ArrowUp, ArrowDown, and Enter keyboard navigation.",
    tags: ["command", "cmdk", "modal", "keyboard", "search"],
    fileName: "command-palette.tsx",
    installCommand: "npm install cmdk lucide-react",
    dependencies: ["cmdk", "lucide-react"],
    code: rawCommandPalette,
    previewComponent: () => <CommandPalette isOpen={true} inline={true} onClose={() => {}} />,
  },

  // 9. Animated Modal Dialog
  {
    id: "animated-modal-dialog",
    name: "Animated Modal Dialog",
    category: "Overlays & Actions",
    system: "Base UI / Radix",
    description: "Accessible dialog with backdrop blur, zoom-in animation, escape key listener cleanup, and ARIA dialog roles.",
    tags: ["modal", "dialog", "radix", "accessibility", "overlay"],
    fileName: "animated-modal-dialog.tsx",
    installCommand: "npm install @radix-ui/react-dialog lucide-react",
    dependencies: ["lucide-react"],
    code: rawAnimatedModal,
    previewComponent: () => (
      <div className="w-full flex items-center justify-center p-2">
        <AnimatedModalDialog
          isOpen={true}
          inline={true}
          onClose={() => {}}
          onConfirm={() => {}}
          title="Decommission Edge Node"
          description="Are you sure you want to retire cluster us-east-4? In-flight sessions will be migrated with zero downtime."
          confirmText="Confirm Decommission"
        />
      </div>
    ),
  },

  // 10. Notification Center
  {
    id: "notification-center",
    name: "Notification Center Popover",
    category: "Overlays & Actions",
    system: "AlignUI / shadcn/ui",
    description: "Interactive notification center with unread badge counter, tabbed filter (All / Unread), clear all button, and outside-click dismissal.",
    tags: ["notification", "popover", "inbox", "alerts", "dropdown"],
    fileName: "notification-center.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["lucide-react"],
    code: rawNotificationCenter,
    previewComponent: NotificationCenter,
  },

  // 11. Shadcn Drawer Sheet
  {
    id: "shadcn-drawer-sheet",
    name: "Slide-Over Drawer Sheet",
    category: "Overlays & Actions",
    system: "shadcn/ui",
    description: "Radix UI sheet container sliding in from the right viewport boundary for detail inspection and preference editing.",
    tags: ["sheet", "drawer", "shadcn", "radix", "slideover"],
    fileName: "shadcn-drawer-sheet.tsx",
    installCommand: "npm install @radix-ui/react-dialog lucide-react",
    dependencies: ["lucide-react"],
    code: rawShadcnDrawer,
    previewComponent: ShadcnDrawerSheet,
  },

  // 12. MUI Speed Dial
  {
    id: "mui-speed-dial",
    name: "MUI Speed Dial Floating Action",
    category: "Overlays & Actions",
    system: "MUI Material UI",
    description: "Floating action button with expanding radial action triggers, rotation transitions, and contextual actions.",
    tags: ["mui", "speed-dial", "fab", "actions", "material"],
    fileName: "mui-speed-dial.tsx",
    installCommand: "npm install @mui/material @emotion/react lucide-react",
    dependencies: ["lucide-react"],
    code: rawMUISpeedDial,
    previewComponent: MUISpeedDial,
  },

  // 13. Auth Card
  {
    id: "auth-card",
    name: "Authentication Card Flow",
    category: "Auth & Flow",
    system: "Tailark / Untitled UI",
    description: "Complete authentication interface supporting Login, Signup, and Password Reset with email validation and password visibility toggle.",
    tags: ["auth", "login", "signup", "forms", "security"],
    fileName: "auth-card.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["lucide-react"],
    code: rawAuthCard,
    previewComponent: AuthCard,
  },

  // 14. Onboarding Wizard
  {
    id: "onboarding-wizard",
    name: "Onboarding Stepper Wizard",
    category: "Auth & Flow",
    system: "Mantine UI / MUI",
    description: "Multi-step user onboarding flow with visual step indicator, form state persistence, validation, and completion confirmation.",
    tags: ["wizard", "stepper", "onboarding", "flow", "forms"],
    fileName: "onboarding-wizard.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["lucide-react"],
    code: rawOnboardingWizard,
    previewComponent: OnboardingWizard,
  },

  // 15. Chakra Pin Input OTP
  {
    id: "chakra-pin-input-otp",
    name: "Chakra 6-Digit MFA Input",
    category: "Auth & Flow",
    system: "Chakra UI / Ark UI",
    description: "6-slot one-time password input with auto-advance, backspace navigation, numeric validation, and completion trigger.",
    tags: ["otp", "pin", "mfa", "chakra", "auth", "security"],
    fileName: "chakra-pin-input-otp.tsx",
    installCommand: "npm install @chakra-ui/react lucide-react",
    dependencies: ["lucide-react"],
    code: rawChakraPinInput,
    previewComponent: ChakraPinInputOTP,
  },

  // 16. HeroUI User Profile Card
  {
    id: "heroui-user-profile",
    name: "HeroUI User Profile Card",
    category: "SaaS Dashboards",
    system: "HeroUI (NextUI)",
    description: "Glassmorphic profile card featuring gradient avatar rings, presence indicator, follow toggle, and stats bar.",
    tags: ["heroui", "profile", "card", "avatar", "glassmorphism"],
    fileName: "heroui-user-profile.tsx",
    installCommand: "npm install @heroui/react lucide-react",
    dependencies: ["lucide-react"],
    code: rawHeroUIProfile,
    previewComponent: HeroUIUserProfile,
  },

  // 17. Fluent Persona Badge
  {
    id: "fluent-persona-badge",
    name: "Microsoft Fluent Persona Badge",
    category: "SaaS Dashboards",
    system: "Microsoft Fluent UI",
    description: "Microsoft 365 Persona badge with presence states (Available, Busy, Away) and one-click communication shortcuts.",
    tags: ["fluent", "persona", "microsoft", "teams", "presence"],
    fileName: "fluent-persona-badge.tsx",
    installCommand: "npm install @fluentui/react-components lucide-react",
    dependencies: ["lucide-react"],
    code: rawFluentPersona,
    previewComponent: FluentPersonaBadge,
  },

  // 18. Untitled UI Billing Summary
  {
    id: "untitledui-billing-summary",
    name: "Untitled UI Billing Summary",
    category: "SaaS Dashboards",
    system: "Untitled UI",
    description: "B2B SaaS subscription card displaying active plan, masked payment card details, renewal dates, and invoice download triggers.",
    tags: ["billing", "untitledui", "saas", "subscription", "invoices"],
    fileName: "untitledui-billing-summary.tsx",
    installCommand: "npm install @untitledui/icons-react lucide-react",
    dependencies: ["lucide-react"],
    code: rawUntitledUIBilling,
    previewComponent: UntitledUIBillingSummary,
  },

  // 19. DaisyUI Stats KPI
  {
    id: "daisy-stats-kpi",
    name: "DaisyUI Stats KPI Metric",
    category: "SaaS Dashboards",
    system: "DaisyUI",
    description: "Zero-runtime CSS KPI stat cards with range filters, delta percentage chips, and capacity progress bar.",
    tags: ["daisyui", "stats", "kpi", "tailwind", "metrics"],
    fileName: "daisy-stats-kpi.tsx",
    installCommand: "npm install -D daisyui",
    dependencies: ["lucide-react"],
    code: rawDaisyStats,
    previewComponent: DaisyStatsKPI,
  },

  // 20. Collapsible Sidebar
  {
    id: "collapsible-sidebar",
    name: "Collapsible SaaS Navigation",
    category: "SaaS Dashboards",
    system: "shadcn/ui / Untitled UI",
    description: "Desktop sidebar featuring collapse/expand state toggle, active route highlight, badge counts, and user profile footer.",
    tags: ["sidebar", "navigation", "layout", "menu", "admin"],
    fileName: "collapsible-sidebar.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["lucide-react"],
    code: rawCollapsibleSidebar,
    previewComponent: CollapsibleSidebar,
  },

  // 21. Fluent Accordion Menu
  {
    id: "fluent-accordion-menu",
    name: "Microsoft Fluent Tree Navigation",
    category: "SaaS Dashboards",
    system: "Microsoft Fluent UI",
    description: "Azure-inspired hierarchical cloud resource tree navigation menu with collapsible nested directories.",
    tags: ["fluent", "tree", "navigation", "azure", "microsoft"],
    fileName: "fluent-accordion-menu.tsx",
    installCommand: "npm install @fluentui/react-components lucide-react",
    dependencies: ["lucide-react"],
    code: rawFluentMenu,
    previewComponent: FluentAccordionMenu,
  },

  // 22. Empty State
  {
    id: "empty-state",
    name: "Zero Data Empty State",
    category: "SaaS Dashboards",
    system: "Untitled UI / Mantine",
    description: "Clean empty state component featuring dashed border, illustrative icon container, action button, and clear guidance.",
    tags: ["empty", "zero-state", "dashboard", "feedback"],
    fileName: "empty-state.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["lucide-react"],
    code: rawEmptyState,
    previewComponent: EmptyState,
  },

  // 23. Universal Cross Platform Card
  {
    id: "universal-cross-platform-card",
    name: "Cross-Platform Universal Card",
    category: "SaaS Dashboards",
    system: "React Native for Web",
    description: "Write-once, run-everywhere universal card compiling seamlessly across Next.js Web and React Native iOS/Android.",
    tags: ["react-native-web", "mobile", "cross-platform", "universal"],
    fileName: "universal-cross-platform-card.tsx",
    installCommand: "npm install react-native-web lucide-react",
    dependencies: ["lucide-react"],
    code: rawUniversalCard,
    previewComponent: UniversalCrossPlatformCard,
  },

  // 24. Untitled UI Feature Comparison
  {
    id: "untitledui-feature-comparison",
    name: "Feature Comparison Matrix",
    category: "Marketing & Bento",
    system: "Untitled UI",
    description: "3-tier SaaS capability comparison matrix comparing Free, Pro, and Enterprise tiers with checkmarks and dashes.",
    tags: ["pricing", "comparison", "matrix", "untitledui", "features"],
    fileName: "untitledui-feature-comparison.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["lucide-react"],
    code: rawUntitledUIComparison,
    previewComponent: UntitledUIFeatureComparison,
  },

  // 25. DaisyUI Mockup Browser
  {
    id: "daisy-mockup-browser",
    name: "DaisyUI Browser Window Container",
    category: "Marketing & Bento",
    system: "DaisyUI",
    description: "Semantic pure-CSS mockup browser window featuring traffic light buttons, address bar, and live viewport stage.",
    tags: ["daisyui", "mockup", "browser", "window", "showcase"],
    fileName: "daisy-mockup-browser.tsx",
    installCommand: "npm install -D daisyui",
    dependencies: ["lucide-react"],
    code: rawDaisyMockup,
    previewComponent: DaisyMockupBrowser,
  },

  // 26. 21st.dev Dynamic Island
  {
    id: "twentyfirst-dynamic-island",
    name: "21st.dev Dynamic Island Capsule",
    category: "Creative & Motion",
    system: "21st.dev",
    description: "Expandable interactive floating pill with audio controls, pulse indicators, and smooth state morphing.",
    tags: ["21st-dev", "dynamic-island", "motion", "micro-interaction"],
    fileName: "twentyfirst-dynamic-island.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["lucide-react"],
    code: rawTwentyFirstIsland,
    previewComponent: TwentyFirstDynamicIsland,
  },

  // 27. 21st.dev Shine Border
  {
    id: "twentyfirst-shine-border",
    name: "21st.dev Shine Border Card",
    category: "Creative & Motion",
    system: "21st.dev",
    description: "Specular border illumination cycling continuously along card perimeter using hardware-accelerated CSS pseudo-elements.",
    tags: ["21st-dev", "shine", "border", "card", "glow"],
    fileName: "twentyfirst-shine-border.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["lucide-react"],
    code: rawTwentyFirstShine,
    previewComponent: TwentyFirstShineBorder,
  },

  // 28. 21st.dev Glowing Button
  {
    id: "twentyfirst-glowing-button",
    name: "21st.dev Glowing Accent Button",
    category: "Creative & Motion",
    system: "21st.dev",
    description: "Interactive button surrounded by an animated multi-color gradient border with click micro-interaction feedback.",
    tags: ["21st-dev", "button", "glow", "gradient", "motion"],
    fileName: "twentyfirst-glowing-button.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["lucide-react"],
    code: rawTwentyFirstButton,
    previewComponent: TwentyFirstGlowingButton,
  },

  // 29. React Bits Shiny Text
  {
    id: "react-bits-shiny-text",
    name: "Shiny Text Shimmer",
    category: "Creative & Motion",
    system: "React Bits",
    description: "Smooth continuous light reflection sweeping across typography. Created by David Haz.",
    tags: ["react-bits", "typography", "shimmer", "text", "motion"],
    fileName: "react-bits-shiny-text.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["lucide-react"],
    code: rawShinyText,
    previewComponent: () => (
      <div className="py-6 text-center">
        <ShinyText text="AI AGENT CODING ENGINE" speed={3} className="text-2xl font-black font-mono tracking-wider" />
      </div>
    ),
  },

  // 30. React Bits Decrypted Text
  {
    id: "react-bits-decrypted-text",
    name: "Decrypted Matrix Cipher Text",
    category: "Creative & Motion",
    system: "React Bits",
    description: "Matrix-style holographic cipher decrypt effect where characters scramble through random runes before resolving.",
    tags: ["react-bits", "cipher", "matrix", "text", "terminal"],
    fileName: "react-bits-decrypted-text.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["lucide-react"],
    code: rawReactBitsDecrypted,
    previewComponent: ReactBitsDecryptedText,
  },

  // 31. React Bits Spotlight Card
  {
    id: "react-bits-spotlight-card",
    name: "React Bits Spotlight Card",
    category: "Creative & Motion",
    system: "React Bits",
    description: "Mouse-tracking radial spotlight card that illuminates component borders and backgrounds on pointer move.",
    tags: ["react-bits", "spotlight", "card", "mouse-tracking"],
    fileName: "react-bits-spotlight-card.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["lucide-react"],
    code: rawReactBitsSpotlight,
    previewComponent: ReactBitsSpotlightCard,
  },

  // 32. React Bits Pixel Card
  {
    id: "react-bits-pixel-card",
    name: "React Bits Pixel Matrix Card",
    category: "Creative & Motion",
    system: "React Bits",
    description: "Generative pixel cellular grid that randomly animates on card hover, creating an 8-bit retro aesthetic.",
    tags: ["react-bits", "pixel", "canvas", "retro", "motion"],
    fileName: "react-bits-pixel-card.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["lucide-react"],
    code: rawReactBitsPixel,
    previewComponent: ReactBitsPixelCard,
  },

  // 33. React Bits True Focus
  {
    id: "react-bits-true-focus",
    name: "True Focus Word Highlighter",
    category: "Creative & Motion",
    system: "React Bits",
    description: "Word-by-word magnetic bracket highlighter that blurs inactive words while focusing on the active target.",
    tags: ["react-bits", "focus", "text", "animation", "motion"],
    fileName: "react-bits-true-focus.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["lucide-react"],
    code: rawTrueFocus,
    previewComponent: () => (
      <div className="py-6 flex justify-center">
        <TrueFocus sentence="Architect Design Ship Repeat" manualMode={false} blurAmount={3} />
      </div>
    ),
  },

  // 34. React Bits Tilted Card
  {
    id: "react-bits-tilted-card",
    name: "3D Perspective Tilted Card",
    category: "Creative & Motion",
    system: "React Bits",
    description: "Interactive 3D card tilt driven by pointer coordinates with spring easing and specular sheen overlay.",
    tags: ["react-bits", "3d", "card", "tilt", "perspective"],
    fileName: "react-bits-tilted-card.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["lucide-react"],
    code: rawTiltedCard,
    previewComponent: () => (
      <div className="py-4 flex justify-center">
        <TiltedCard maxTilt={15}>
          <div className="h-44 w-64 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 p-5 text-white shadow-xl flex flex-col justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider">3D Dynamic Tilt</span>
            <p className="text-sm font-bold">Move pointer across card surface</p>
          </div>
        </TiltedCard>
      </div>
    ),
  },

  // 35. React Bits Star Border
  {
    id: "react-bits-star-border",
    name: "Star Border Glow",
    category: "Creative & Motion",
    system: "React Bits",
    description: "Pulsing starlight gradient border cycling along button or card contours.",
    tags: ["react-bits", "star", "border", "glow", "button"],
    fileName: "react-bits-star-border.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["lucide-react"],
    code: rawStarBorder,
    previewComponent: () => (
      <div className="py-4 flex justify-center">
        <StarBorder color="#8b5cf6" speed="4s">
          <span className="font-bold text-xs tracking-wider uppercase text-purple-400">Launch Neural Architecture</span>
        </StarBorder>
      </div>
    ),
  },

  // 36. React Bits Magnet
  {
    id: "react-bits-magnet",
    name: "Magnetic Physics Button",
    category: "Creative & Motion",
    system: "React Bits",
    description: "Spring physics attraction pulling elements toward pointer position when hovering within proximity.",
    tags: ["react-bits", "magnet", "physics", "button", "micro-interaction"],
    fileName: "react-bits-magnet.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["lucide-react"],
    code: rawMagnet,
    previewComponent: () => (
      <div className="py-6 flex justify-center">
        <Magnet padding={50} magnetStrength={3}>
          <button className="rounded-2xl bg-blue-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-500">
            Magnetic Pull
          </button>
        </Magnet>
      </div>
    ),
  },

  // 37. React Bits Squares Background
  {
    id: "react-bits-squares-background",
    name: "Interactive Squares Canvas",
    category: "Theming",
    system: "React Bits",
    description: "Grid canvas with interactive square highlights responding dynamically to cursor movement.",
    tags: ["react-bits", "canvas", "grid", "background"],
    fileName: "react-bits-squares-background.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["lucide-react"],
    code: rawSquares,
    previewComponent: () => (
      <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-zinc-950">
        <Squares squareSize={28} borderColor="#27272a" hoverFillColor="#3b82f6" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="rounded-full bg-zinc-900/80 px-3 py-1 font-mono text-xs font-bold text-zinc-200 backdrop-blur-sm">
            Interactive Grid Canvas
          </span>
        </div>
      </div>
    ),
  },

  // 38. DaisyUI Theme Switcher
  {
    id: "daisy-theme-switcher",
    name: "30-Theme Daisy Switcher",
    category: "Theming",
    system: "DaisyUI",
    description: "Complete theme selector dropdown previewing DaisyUI semantic palettes: Light, Dark, Cupcake, Cyberpunk, Synthwave, Retro, and Forest.",
    tags: ["daisyui", "theme", "darkmode", "tokens", "palette"],
    fileName: "daisy-theme-switcher.tsx",
    installCommand: "npm install -D daisyui",
    dependencies: ["daisyui"],
    code: rawDaisySwitcher,
    previewComponent: DaisyThemeSwitcher,
  },

  // 39. Reshaped Token Slider
  {
    id: "reshaped-token-slider",
    name: "Reshaped Token Range Slider",
    category: "Theming",
    system: "Reshaped",
    description: "Token-governed spacing slider demonstrating live CSS variable interpolation across `--rs-space` scales.",
    tags: ["reshaped", "slider", "tokens", "css-variables"],
    fileName: "reshaped-token-slider.tsx",
    installCommand: "npm install reshaped lucide-react",
    dependencies: ["lucide-react"],
    code: rawReshapedSlider,
    previewComponent: ReshapedTokenSlider,
  },

  // 40. Aria ComboBox Autocomplete
  {
    id: "aria-combobox-autocomplete",
    name: "Adobe React Aria ComboBox",
    category: "Forms & Inputs",
    system: "Adobe React Aria",
    description: "Full WAI-ARIA 1.2 compliant combobox with fuzzy filter, keyboard navigation, popover dropdown, and clear triggers.",
    tags: ["aria", "combobox", "autocomplete", "spectrum", "accessibility"],
    fileName: "aria-combobox-autocomplete.tsx",
    installCommand: "npm install react-aria-components lucide-react",
    dependencies: ["lucide-react"],
    code: rawAriaComboBox,
    previewComponent: AriaComboBoxAutocomplete,
  },

  // 41. Aria Date Range Picker
  {
    id: "aria-date-range-picker",
    name: "React Spectrum DateRangePicker",
    category: "Forms & Inputs",
    system: "Adobe React Spectrum",
    description: "Accessible dual-month range picker with preset pills (Today, 7D, Month), keyboard date navigation, and selected range bar.",
    tags: ["datepicker", "spectrum", "calendar", "aria", "range"],
    fileName: "aria-date-range-picker.tsx",
    installCommand: "npm install @adobe/react-spectrum lucide-react",
    dependencies: ["lucide-react"],
    code: rawAriaDatePicker,
    previewComponent: AriaDateRangePicker,
  },

  // 42. Shadcn Calendar Picker
  {
    id: "shadcn-calendar-picker",
    name: "shadcn/ui Calendar Component",
    category: "Forms & Inputs",
    system: "shadcn/ui",
    description: "Compact date picker container modeled after React DayPicker with custom Tailwind utility styling and day selection.",
    tags: ["calendar", "shadcn", "datepicker", "forms"],
    fileName: "shadcn-calendar-picker.tsx",
    installCommand: "npm install react-day-picker date-fns lucide-react",
    dependencies: ["lucide-react"],
    code: rawShadcnCalendar,
    previewComponent: ShadcnCalendarPicker,
  },

  // 43. Chakra Segmented Control
  {
    id: "chakra-segmented-control",
    name: "Chakra UI Segmented Control",
    category: "Forms & Inputs",
    system: "Chakra UI / Ark UI",
    description: "State-machine driven segmented toggle pill switching between Grid, List, and Table view layouts.",
    tags: ["chakra", "segmented", "toggle", "ark-ui", "zag"],
    fileName: "chakra-segmented-control.tsx",
    installCommand: "npm install @chakra-ui/react lucide-react",
    dependencies: ["lucide-react"],
    code: rawChakraSegmented,
    previewComponent: ChakraSegmentedControl,
  },

  // 44. AlignUI Filter Bar
  {
    id: "alignui-filter-bar",
    name: "AlignUI Multi-Select Filter Bar",
    category: "Forms & Inputs",
    system: "AlignUI",
    description: "Compound chip filter bar with badge counts, active filter indicators, and one-click bulk reset.",
    tags: ["alignui", "filter", "chips", "tags", "saas"],
    fileName: "alignui-filter-bar.tsx",
    installCommand: "npx @alignui/cli tailwind && npm install lucide-react",
    dependencies: ["lucide-react"],
    code: rawAlignUIFilter,
    previewComponent: AlignUIFilterBar,
  },

  // 45. Awesome Tag Input Editor
  {
    id: "awesome-tag-input",
    name: "Awesome Tag Chip Input",
    category: "Forms & Inputs",
    system: "Awesome React Components",
    description: "Interactive chip tag input allowing creation via Enter/Comma, backspace deletion, and duplicate detection.",
    tags: ["tags", "input", "chips", "forms", "awesome-react"],
    fileName: "awesome-tag-input.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["lucide-react"],
    code: rawAwesomeTag,
    previewComponent: AwesomeTagInput,
  },

  // 46. Awesome File Dropzone
  {
    id: "awesome-file-dropzone",
    name: "Awesome File Upload Dropzone",
    category: "Forms & Inputs",
    system: "Awesome React Components",
    description: "Drag and drop file upload zone with visual drag hover states, file format validation, and progress indicators.",
    tags: ["upload", "dropzone", "file", "forms", "awesome-react"],
    fileName: "awesome-file-dropzone.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["lucide-react"],
    code: rawAwesomeDropzone,
    previewComponent: AwesomeFileDropzone,
  },

  // 47. Ant Design Transfer Selector
  {
    id: "antd-transfer-selector",
    name: "Ant Design Transfer Selector",
    category: "Forms & Inputs",
    system: "Ant Design",
    description: "Dual-column permission transfer widget moving items between Available and Granted lists with multi-selection.",
    tags: ["antd", "transfer", "selector", "permissions", "enterprise"],
    fileName: "antd-transfer-selector.tsx",
    installCommand: "npm install antd lucide-react",
    dependencies: ["lucide-react"],
    code: rawAntdTransfer,
    previewComponent: AntdTransferSelector,
  },

  // 48. MUI Activity Timeline
  {
    id: "mui-activity-timeline",
    name: "MUI Activity Audit Stream",
    category: "Feedback & Status",
    system: "MUI Material UI",
    description: "Vertical timeline stream featuring status-coded event dots, timestamps, actor labels, and card descriptions.",
    tags: ["mui", "timeline", "audit", "events", "material"],
    fileName: "mui-activity-timeline.tsx",
    installCommand: "npm install @mui/material lucide-react",
    dependencies: ["lucide-react"],
    code: rawMUITimeline,
    previewComponent: MUIActivityTimeline,
  },

  // 49. Ant Design Status Result
  {
    id: "antd-status-result",
    name: "Ant Design Status Feedback Result",
    category: "Feedback & Status",
    system: "Ant Design",
    description: "Comprehensive operation status card supporting Success, Error, and Processing states with action triggers.",
    tags: ["antd", "result", "status", "feedback", "errors"],
    fileName: "antd-status-result.tsx",
    installCommand: "npm install antd lucide-react",
    dependencies: ["lucide-react"],
    code: rawAntdResult,
    previewComponent: AntdStatusResult,
  },

  // 50. Base Web Notification Banner
  {
    id: "baseweb-notification-banner",
    name: "Uber Base Web Notice Banner",
    category: "Feedback & Status",
    system: "Uber Base Web",
    description: "Full-width urgent notification banner with icon slot, action button, and dismissal transition.",
    tags: ["baseweb", "banner", "alert", "notification", "uber"],
    fileName: "baseweb-notification-banner.tsx",
    installCommand: "npm install baseui lucide-react",
    dependencies: ["lucide-react"],
    code: rawBaseWebBanner,
    previewComponent: BaseWebNotificationBanner,
  },

  // 51. DaisyUI Chat Bubble
  {
    id: "daisy-chat-bubble",
    name: "DaisyUI Conversational Chat",
    category: "Feedback & Status",
    system: "DaisyUI",
    description: "Real-time chat feed with delivery receipts, user & bot bubbles, and interactive message dispatch input.",
    tags: ["daisyui", "chat", "bubble", "ai", "conversation"],
    fileName: "daisy-chat-bubble.tsx",
    installCommand: "npm install -D daisyui",
    dependencies: ["lucide-react"],
    code: rawDaisyChat,
    previewComponent: DaisyChatBubble,
  },

  // 52. Awesome Rating Stars
  {
    id: "awesome-rating-stars",
    name: "Awesome Rating Feedback Stars",
    category: "Feedback & Status",
    system: "Awesome React Components",
    description: "Interactive fractional rating widget with hover score tracking, gold star fill, and sentiment feedback labels.",
    tags: ["rating", "stars", "feedback", "reviews", "awesome-react"],
    fileName: "awesome-rating-stars.tsx",
    installCommand: "npm install lucide-react",
    dependencies: ["lucide-react"],
    code: rawAwesomeRating,
    previewComponent: AwesomeRatingStars,
  },

  // 53. HeroUI Glow Accordion
  {
    id: "heroui-glow-accordion",
    name: "HeroUI Glow Accordion",
    category: "Overlays & Actions",
    system: "HeroUI (NextUI)",
    description: "Compound accordion with smooth expand/collapse transitions, colored icon pill highlights, and subtle glow border.",
    tags: ["heroui", "accordion", "glow", "animated", "collapse"],
    fileName: "heroui-glow-accordion.tsx",
    installCommand: "npm install @heroui/react lucide-react",
    dependencies: ["lucide-react"],
    code: rawHeroUIAccordion,
    previewComponent: HeroUIGlowAccordion,
  },
]
