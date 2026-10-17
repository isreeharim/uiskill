#!/usr/bin/env node

/**
 * UI Stack Recommender CLI - Part of the Skill UI repository
 * Evaluates requirements and recommends the optimal UI component stack across 12 modern systems.
 */

const readline = require("readline")

const LIBRARIES = {
  shadcn: {
    name: "shadcn/ui",
    url: "https://ui.shadcn.com",
    paradigm: "Copy-paste unstyled primitives + Tailwind CSS",
    setup: "npm install shadcn",
    bestFor: "Full ownership, Next.js / Vite apps, standard SaaS backends",
  },
  untitledui: {
    name: "Untitled UI (React)",
    url: "https://untitledui.com/react",
    paradigm: "Figma-to-code enterprise B2B SaaS system",
    setup: "npm install @untitledui/icons-react lucide-react",
    bestFor: "High-end B2B dashboards, metrics, billing tables, Figma design sync",
  },
  mui: {
    name: "MUI Material UI",
    url: "https://mui.com/material-ui/all-components",
    paradigm: "Enterprise Google Material Design standard with MUI X",
    setup: "npm install @mui/material @emotion/react @emotion/styled @mui/x-data-grid",
    bestFor: "Large-scale enterprise tools, virtualized data grids, banking portals",
  },
  reshaped: {
    name: "Reshaped",
    url: "https://reshaped.so",
    paradigm: "Token-first CSS variable design system (--rs-)",
    setup: "npm install reshaped",
    bestFor: "Multi-brand design systems, token parity with Figma, zero runtime CSS",
  },
  alignui: {
    name: "AlignUI",
    url: "https://alignui.com",
    paradigm: "Modern luxury SaaS kit for React + Tailwind",
    setup: "npm install @alignui/core @alignui/react @remixicon/react",
    bestFor: "Modern SaaS web apps, OKLCH color spaces, compound components",
  },
  baseui: {
    name: "Base UI",
    url: "https://base-ui.com",
    paradigm: "MUI's unstyled headless primitives",
    setup: "npm install @base-ui/react",
    bestFor: "Custom in-house design systems with 100% style freedom and bulletproof A11y",
  },
  tailark: {
    name: "Tailark",
    url: "https://tailark.com",
    paradigm: "Pre-built marketing sections on shadcn/ui",
    setup: "Explore tailark.com blocks and copy into your shadcn components",
    bestFor: "Landing pages, marketing funnels, pricing matrices, auth screens",
  },
  heroui: {
    name: "HeroUI (NextUI)",
    url: "https://heroui.com",
    paradigm: "Tailwind Variants + React Aria animated components",
    setup: "npm install @heroui/react framer-motion",
    bestFor: "Consumer apps, Web3 interfaces, dark-mode glassmorphic portals",
  },
  mantine: {
    name: "Mantine UI",
    url: "https://mantine.dev",
    paradigm: "Full-stack React suite (100+ components, 50+ hooks)",
    setup: "npm install @mantine/core @mantine/hooks @mantine/form",
    bestFor: "Full-stack React developers wanting forms, hooks, and modals in one unified suite",
  },
  daisyui: {
    name: "DaisyUI",
    url: "https://daisyui.com",
    paradigm: "Pure CSS semantic Tailwind classes with 30+ themes",
    setup: "npm install -D daisyui@latest",
    bestFor: "Zero JS runtime overhead, rapid MVPs, multi-framework teams",
  },
  antd: {
    name: "Ant Design",
    url: "https://ant.design",
    paradigm: "Enterprise data-dense backoffice design language",
    setup: "npm install antd @ant-design/icons",
    bestFor: "Dense enterprise admin consoles, multi-level cascaders, ERP tools",
  },
  twntyfirst: {
    name: "21st.dev",
    url: "https://21st.dev",
    paradigm: "The npm for design engineers (animated micro-interactions)",
    setup: "npm install 21st",
    bestFor: "Spotlight cards, animated borders, bento grids, interactive eye-candy",
  },
  reactbits: {
    name: "React Bits",
    url: "https://reactbits.dev",
    paradigm: "200+ animated, interactive components & text effects (David Haz)",
    setup: "npm install framer-motion clsx tailwind-merge",
    bestFor: "Animated typography (ShinyText, TrueFocus), 3D cards (TiltedCard), and canvas backgrounds (Squares)",
  },
  tremor: {
    name: "Tremor",
    url: "https://tremor.so",
    paradigm: "Modern Tailwind-first analytics & executive KPI dashboards",
    setup: "npm install @tremor/react",
    bestFor: "Executive SaaS metrics, financial charts, uptime trackers, and KPI cards",
  },
  reactaria: {
    name: "Adobe React Spectrum / React Aria",
    url: "https://react-spectrum.adobe.com",
    paradigm: "World-class 3-layer universal accessibility engine",
    setup: "npm install @adobe/react-spectrum OR npm install react-aria-components",
    bestFor: "Strict WCAG AAA accessibility, multi-device touch/mouse/keyboard adaptation, RTL",
  },
  baseweb: {
    name: "Uber Base Web",
    url: "https://baseweb.design",
    paradigm: "Uber's Styletron design system with slot overrides",
    setup: "npm install baseui styletron-engine-atomic styletron-react",
    bestFor: "Operations backoffices, logistics, fleet management, and deep subcomponent overrides",
  },
  fluent: {
    name: "Microsoft Fluent UI (v9)",
    url: "https://fluent2.microsoft.design",
    paradigm: "Microsoft 365, Teams, and Azure design language",
    setup: "npm install @fluentui/react-components @fluentui/react-icons",
    bestFor: "Microsoft 365 add-ins, Teams apps, Azure enterprise portals, Windows high-contrast",
  },
  chakra: {
    name: "Chakra UI (v3) / Ark UI",
    url: "https://chakra-ui.com",
    paradigm: "Zag.js state machine powered composable component system",
    setup: "npm install @chakra-ui/react @emotion/react",
    bestFor: "Rapid composable interfaces, state machine stability, and snippet CLI",
  },
  reactnativeweb: {
    name: "React Native for Web",
    url: "https://necolas.github.io/react-native-web",
    paradigm: "Universal cross-platform primitives for Web, iOS, and Android",
    setup: "npm install react-native-web react-dom",
    bestFor: "Unified multi-platform codebases (Twitter/X Web standard), universal UI",
  },
  virtualized: {
    name: "React Virtualized / react-window",
    url: "https://github.com/bvaughn/react-virtualized",
    paradigm: "High-performance windowing and DOM node recycling",
    setup: "npm install react-window react-virtualized-auto-sizer",
    bestFor: "Rendering 10,000 to 1,000,000+ row datasets and infinite feeds at 60 FPS",
  },
}

function parseArgs() {
  const args = process.argv.slice(2)
  const params = {}
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith("--")) {
      const key = args[i].replace(/^--/, "")
      const val = args[i + 1] && !args[i + 1].startsWith("--") ? args[i + 1] : true
      params[key] = val
    }
  }
  return params
}

function evaluateRecommendation(answers) {
  const { projectType, priority, styling } = answers

  if (projectType === "marketing") {
    if (priority === "zero-js") {
      return { primary: LIBRARIES.daisyui, secondary: LIBRARIES.tailark }
    }
    if (priority === "creative" || priority === "motion" || priority === "fx") {
      return { primary: LIBRARIES.reactbits, secondary: LIBRARIES.twntyfirst }
    }
    return { primary: LIBRARIES.tailark, secondary: LIBRARIES.shadcn }
  }

  if (projectType === "mobile" || priority === "universal" || priority === "cross-platform") {
    return { primary: LIBRARIES.reactnativeweb, secondary: LIBRARIES.shadcn }
  }

  if (projectType === "analytics" || priority === "analytics" || priority === "kpi" || priority === "charts") {
    return { primary: LIBRARIES.tremor, secondary: LIBRARIES.untitledui }
  }

  if (priority === "a11y" || priority === "accessibility" || priority === "wcag") {
    return { primary: LIBRARIES.reactaria, secondary: LIBRARIES.baseui }
  }

  if (priority === "virtualized" || priority === "infinite" || priority === "big-data") {
    return { primary: LIBRARIES.virtualized, secondary: LIBRARIES.mui }
  }

  if (priority === "microsoft" || priority === "fluent" || priority === "teams") {
    return { primary: LIBRARIES.fluent, secondary: LIBRARIES.mui }
  }

  if (priority === "uber" || priority === "overrides" || priority === "logistics") {
    return { primary: LIBRARIES.baseweb, secondary: LIBRARIES.antd }
  }

  if (priority === "chakra" || priority === "composable") {
    return { primary: LIBRARIES.chakra, secondary: LIBRARIES.mantine }
  }

  if (projectType === "enterprise") {
    if (priority === "datagrid") {
      return { primary: LIBRARIES.mui, secondary: LIBRARIES.virtualized }
    }
    if (priority === "all-in-one") {
      return { primary: LIBRARIES.mantine, secondary: LIBRARIES.antd }
    }
    if (priority === "density") {
      return { primary: LIBRARIES.antd, secondary: LIBRARIES.baseweb }
    }
    if (styling === "tailwind") {
      return { primary: LIBRARIES.shadcn, secondary: LIBRARIES.untitledui }
    }
    return { primary: LIBRARIES.antd, secondary: LIBRARIES.mui }
  }

  // Default: SaaS / Web App
  if (priority === "reactbits" || priority === "fx" || priority === "typography") {
    return { primary: LIBRARIES.reactbits, secondary: LIBRARIES.shadcn }
  }
  if (priority === "creative" || priority === "motion") {
    return { primary: LIBRARIES.heroui, secondary: LIBRARIES.reactbits }
  }
  if (priority === "tokens" || priority === "figma-sync") {
    return { primary: LIBRARIES.reshaped, secondary: LIBRARIES.untitledui }
  }
  if (priority === "unstyled") {
    return { primary: LIBRARIES.baseui, secondary: LIBRARIES.reactaria }
  }
  if (priority === "high-end-saas") {
    return { primary: LIBRARIES.alignui, secondary: LIBRARIES.untitledui }
  }

  return { primary: LIBRARIES.shadcn, secondary: LIBRARIES.untitledui }
}

function printResult(result) {
  console.log("\n========================================================")
  console.log("             RECOMMENDED UI STACK ARCHITECTURE          ")
  console.log("========================================================\n")
  console.log(`⭐ Primary Recommendation: ${result.primary.name}`)
  console.log(`   URL:      ${result.primary.url}`)
  console.log(`   Paradigm: ${result.primary.paradigm}`)
  console.log(`   Best For: ${result.primary.bestFor}`)
  console.log(`   Setup:    ${result.primary.setup}`)
  console.log("\n✨ Complementary Companion:")
  console.log(`   ${result.secondary.name} (${result.secondary.url})`)
  console.log(`   Why: ${result.secondary.bestFor}`)
  console.log("\n========================================================\n")
}

async function runInteractive() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  const ask = (q) => new Promise((resolve) => rl.question(q, resolve))

  console.log("\n--- UI Component Stack Selector CLI ---")
  console.log("1. What are you building?")
  console.log("   [1] SaaS Web Application / Dashboard")
  console.log("   [2] Marketing Website / Landing Page")
  console.log("   [3] Enterprise Backoffice / Heavy Data Portal")
  const typeChoice = (await ask("Select (1-3) [default: 1]: ")).trim() || "1"

  const typeMap = { "1": "saas", "2": "marketing", "3": "enterprise" }
  const projectType = typeMap[typeChoice] || "saas"

  console.log("\n2. What is your #1 top architectural priority?")
  console.log("   [1] Full code ownership & zero package lock-in (shadcn)")
  console.log("   [2] World-class B2B SaaS dashboard patterns (Untitled UI / AlignUI)")
  console.log("   [3] High-octane animations & micro-interactions (HeroUI / 21st.dev)")
  console.log("   [4] Heavy virtualized data tables & Excel-like grids (MUI / Antd)")
  console.log("   [5] Multi-brand tokens & strict Figma sync (Reshaped)")
  console.log("   [6] Unstyled headless primitives for bespoke CSS (Base UI)")
  console.log("   [7] Ultra-lean pure CSS & zero JS bundle impact (DaisyUI)")
  console.log("   [8] Creative animated typography, 3D cards & canvas backgrounds (React Bits)")
  console.log("   [9] Modern executive analytics, KPI cards & charts (Tremor)")
  console.log("   [10] Strict WCAG AAA accessibility, multi-device & RTL (React Aria / Spectrum)")
  console.log("   [11] Universal single codebase for Web, iOS & Android (React Native for Web)")
  console.log("   [12] High-performance windowing for 100,000+ row datasets (React Virtualized)")
  const prioChoice = (await ask("Select (1-12) [default: 1]: ")).trim() || "1"

  const prioMap = {
    "1": "ownership",
    "2": "high-end-saas",
    "3": "motion",
    "4": "datagrid",
    "5": "tokens",
    "6": "unstyled",
    "7": "zero-js",
    "8": "reactbits",
    "9": "analytics",
    "10": "a11y",
    "11": "universal",
    "12": "virtualized",
  }
  const priority = prioMap[prioChoice] || "ownership"

  rl.close()

  const result = evaluateRecommendation({ projectType, priority, styling: "tailwind" })
  printResult(result)
}

const args = parseArgs()
if (args.type || args.priority) {
  const result = evaluateRecommendation({
    projectType: args.type || "saas",
    priority: args.priority || "ownership",
    styling: args.styling || "tailwind",
  })
  printResult(result)
} else {
  runInteractive()
}
