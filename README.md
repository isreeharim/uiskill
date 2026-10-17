# 🎨 Skill UI

<div align="center">

**The Universal UI Architecture & Component Engineering Skill for AI Agents & Humans**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Standard: AgentSkills](https://img.shields.io/badge/Standard-AgentSkills-purple.svg)](https://agentskills.io)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/isreeharim/uiskill)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](package.json)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](package.json)

*Synthesizing 25+ elite UI frameworks, 21 production templates, and 31 specialized AI coding agent skills.*

[Quick Start](#-quick-start) • [Component Templates](#-21-production-component-templates) • [31 Skills Monorepo](#-the-31-specialized-ui-skills-monorepo) • [Supported Systems](#-25-supported-ui-systems) • [Documentation](#-documentation--references)

</div>

---

## ⚡ Highlights

- **🤖 AI-Native**: Conforms 100% to the open **[AgentSkills specification](https://agentskills.io)** (compatible with Claude Code, Antigravity, Cursor, Windsurf, Copilot, and Codex).
- **📦 21 Production Templates**: Canonical, copy-paste TypeScript components with responsive layouts, dark/light mode, and zero commercial paywalls.
- **🛡️ 100% Free & Legal Stack**: Zero-cost, MIT-licensed alternatives to expensive UI kits ($149+ Untitled UI Pro, $15+/mo MUI X).
- **🗂️ 31 Specialized Agent Skills**: Modular sub-skills covering motion, Apple HIG mobile design, token systems, and design QA.
- **💻 Live Interactive Studio**: Built-in Vite web app to test components, toggle viewports (desktop/tablet/mobile), and copy code in 1 click.
- **🧭 Stack Recommender CLI**: Interactive evaluator matching project requirements to the ideal UI library.

---

## 🚀 Quick Start

### Run the Live Component Studio
```bash
# Clone the repository
git clone https://github.com/isreeharim/uiskill.git
cd uiskill

# Install dependencies and start the preview studio
npm install
npm run dev
```
Open **`http://localhost:3000`** in your browser to explore all 21 interactive templates.

---

## 🤖 Install into Your AI Coding Agent

### 1. Anthropic Claude Code
Clone directly into your project's skills directory:
```bash
git clone https://github.com/isreeharim/uiskill.git .claude/skills/skill-ui
```

### 2. Google Antigravity / Gemini CLI
```bash
# Project level:
git clone https://github.com/isreeharim/uiskill.git .gemini/skills/skill-ui

# Global user level:
git clone https://github.com/isreeharim/uiskill.git ~/.gemini/config/skills/skill-ui
```

### 3. Cursor & Windsurf
Add to your `.cursorrules` or `.windsurfrules`:
```markdown
When building, designing, or choosing UI components, follow the principles and patterns specified in `skill-ui/SKILL.md`.
```

---

## 🧩 21 Production Component Templates

All templates reside in [`templates/`](templates/) and are ready to copy-paste into any React + Tailwind project:

| Category | Component File | Description & Origin |
|---|---|---|
| **Analytics & Data** | [`tremor-analytics-dashboard.tsx`](templates/tremor-analytics-dashboard.tsx) | Executive KPI cards & 30-day SLA uptime tracker (Tremor) |
| | [`virtualized-infinite-list.tsx`](templates/virtualized-infinite-list.tsx) | 5,000+ item telemetry stream at 60 FPS (React Virtualized) |
| | [`advanced-data-table.tsx`](templates/advanced-data-table.tsx) | Sortable, filterable, paginated data grid (@tanstack/react-table) |
| | [`dashboard-metrics-card.tsx`](templates/dashboard-metrics-card.tsx) | SaaS metric card with sparklines & trend delta (Untitled UI) |
| **Navigation & Search** | [`collapsible-sidebar.tsx`](templates/collapsible-sidebar.tsx) | Navigation sidebar with collapse state & badges |
| | [`command-palette.tsx`](templates/command-palette.tsx) | Accessible ⌘K spotlight search modal (cmdk / shadcn) |
| **Auth & User Flow** | [`auth-card.tsx`](templates/auth-card.tsx) | Complete authentication card with OAuth social login |
| | [`onboarding-wizard.tsx`](templates/onboarding-wizard.tsx) | 3-step setup wizard with animated progress indicators |
| | [`pricing-plan-selector.tsx`](templates/pricing-plan-selector.tsx) | Monthly/annual SaaS billing comparison matrix |
| | [`empty-state.tsx`](templates/empty-state.tsx) | High-conversion empty states with dual action CTAs |
| **Feedback & Overlays**| [`animated-modal-dialog.tsx`](templates/animated-modal-dialog.tsx) | Spring-animated dialog with backdrop blur & focus traps |
| | [`notification-center.tsx`](templates/notification-center.tsx) | Notification tray with unread counters & mark-as-read |
| | [`daisy-theme-switcher.tsx`](templates/daisy-theme-switcher.tsx) | Pure CSS multi-theme dropdown switcher (DaisyUI) |
| **Cross-Platform** | [`universal-cross-platform-card.tsx`](templates/universal-cross-platform-card.tsx) | Platform-adaptive card for Web, iOS & Android |
| **Creative & Motion** | [`react-bits-shiny-text.tsx`](templates/react-bits-shiny-text.tsx) | Light-beam typography sweep effect (React Bits) |
| | [`react-bits-true-focus.tsx`](templates/react-bits-true-focus.tsx) | Word-focus dynamic bounding frame (React Bits) |
| | [`react-bits-tilted-card.tsx`](templates/react-bits-tilted-card.tsx) | 3D perspective mouse-tracking tilt card (React Bits) |
| | [`react-bits-star-border.tsx`](templates/react-bits-star-border.tsx) | Rotating conic gradient perimeter beam button (React Bits) |
| | [`react-bits-magnet.tsx`](templates/react-bits-magnet.tsx) | Cursor proximity attraction physics wrapper (React Bits) |
| | [`react-bits-squares-background.tsx`](templates/react-bits-squares-background.tsx) | Interactive drifting canvas grid background (React Bits) |
| | [`interactive-bento-grid.tsx`](templates/interactive-bento-grid.tsx) | Modern feature spotlight bento grid (21st.dev) |

---

## 🗂️ The 31 Specialized UI Skills Monorepo

The [`skills/`](skills/README.md) directory contains 31 standalone, specification-compliant AI agent skills categorized across 5 core domains:

```
skills/
├── Component Systems (5)  → react-bits, ui-styling, rayden-code, ask-sonner, pick-ui-library
├── Motion & Animation (6) → animate, animation-vocabulary, find-animation-opportunities,
│                            improve-animations, review-animations, emil-design-eng
├── Mobile & Native (4)    → mobile-app-ui-design, appllama-app-design-skill, appllama-usage, apple-design
├── Tokens & Brand (7)     → design-system, design, design-html, brand, banner-design, slides, rayden-use
└── Design QA & UX (9)     → ui-ux-pro-max, uxui-principles, frontend-design, uizze-ui-research,
                             design-review, design-consultation, design-shotgun, plan-design-review, prototype
```

👉 **[View the full 31 skills documentation & individual installation commands in `skills/README.md`](skills/README.md)**

---

## 🌐 25+ Supported UI Systems

This skill synthesizes architectural rules and production patterns across modern frontend ecosystems:

| Ecosystem | Paradigm | Best Used For |
|---|---|---|
| **shadcn/ui** | Copy-paste primitives (Radix + Tailwind) | Zero lock-in, full ownership web apps |
| **Untitled UI** | Figma-to-code SaaS design system | B2B dashboards, metrics, billing |
| **MUI (Material UI)** | Enterprise Material Design | Large corporate backoffices, MUI X DataGrid |
| **Tremor** | Tailwind-first analytics | Fast executive dashboards, KPI cards, charts |
| **Adobe React Spectrum & Aria** | 3-layer universal accessibility | WCAG AAA accessibility, multi-device, RTL |
| **Uber Base Web** | Styletron design system with overrides | High-density logistics & operations portals |
| **Microsoft Fluent UI (v9)** | Microsoft 365 design system | Office, Teams, Azure add-ins, Windows contrast |
| **Chakra UI (v3) / Ark UI** | Zag.js state-machine components | Composable interfaces with snippet CLI |
| **React Native for Web** | Universal cross-platform primitives | Unified codebases for Web, iOS & Android |
| **React Virtualized / Window** | High-speed DOM node recycling | Rendering 10,000 to 1,000,000+ row datasets |
| **React Bits** | 200+ creative animated components | Dynamic typography, 3D cards, canvas FX |
| **Reshaped** | Token-first design system (`--rs-`) | Strict Figma token synchronization |
| **AlignUI** | Luxury SaaS UI kit (OKLCH palettes) | High-end modern web applications |
| **Base UI** | MUI's unstyled headless primitives | 100% custom styling freedom & ARIA safety |
| **Tailark** | Pre-built marketing & hero blocks | Landing pages and pricing funnels |
| **HeroUI (NextUI)** | Tailwind Variants animated library | Consumer apps, Web3, glassmorphism |
| **Mantine UI** | 100+ components & 50+ hooks | Full-stack React with built-in forms & modals |
| **DaisyUI** | Pure CSS semantic Tailwind plugin | 0 kB JS runtime, rapid MVPs |
| **Ant Design & Mobile** | Enterprise & mobile fintech kit | Data-dense consoles and touch micro-apps |
| **React-Bootstrap** | Bootstrap 5 rebuilt for React | Modernizing legacy corporate Bootstrap apps |
| **21st.dev** | Micro-interactions registry | Modern spotlights, bento grids, badges |
| **Semantic UI React** | Declarative human-friendly syntax | Shorthand prop composition |
| **Awesome React Components** | Curated directory of 40+ top tools | Specialized editors, pickers, schedulers |

---

## 📖 Documentation & References

Deep technical guides located in [`references/`](references/):

- [`01-decision-framework.md`](references/01-decision-framework.md) — Comprehensive comparison matrix & selection decision tree
- [`02-shadcn-and-base-ui.md`](references/02-shadcn-and-base-ui.md) — Headless, copy-paste, Radix & Base UI primitives
- [`03-enterprise-powerhouses.md`](references/03-enterprise-powerhouses.md) — MUI DataGrid, Ant Design tables, Mantine forms
- [`04-saas-design-systems.md`](references/04-saas-design-systems.md) — Untitled UI, AlignUI, Reshaped, Tailark patterns
- [`05-creative-and-motion.md`](references/05-creative-and-motion.md) — 21st.dev, HeroUI, DaisyUI micro-interactions
- [`06-component-crosswalk.md`](references/06-component-crosswalk.md) — 25+ component syntax mapping across libraries
- [`07-theming-tokens-and-dark-mode.md`](references/07-theming-tokens-and-dark-mode.md) — CSS variables, OKLCH, theme algorithms
- [`08-accessibility-and-rsc.md`](references/08-accessibility-and-rsc.md) — WAI-ARIA, keyboard navigation, RSC boundaries
- [`09-licensing-and-free-tier-guide.md`](references/09-licensing-and-free-tier-guide.md) — The "No-Problem" 100% free & legal UI matrix & replacements
- [`10-react-bits-catalog.md`](references/10-react-bits-catalog.md) — React Bits 200+ animated components & typography
- [`11-enterprise-giants-and-ecosystem.md`](references/11-enterprise-giants-and-ecosystem.md) — Base Web, Fluent UI, React Spectrum, Tremor, Virtualization
- [`12-awesome-react-components-directory.md`](references/12-awesome-react-components-directory.md) — Curated directory across 13 engineering disciplines

---

## ⚡ CLI Stack Evaluator

Evaluate your requirements and get instant stack recommendations:

```bash
# Interactive mode:
node scripts/ui-picker.js

# CLI flags:
node scripts/ui-picker.js --priority analytics     # Tremor
node scripts/ui-picker.js --priority a11y          # Adobe React Spectrum / React Aria
node scripts/ui-picker.js --priority universal     # React Native for Web
node scripts/ui-picker.js --priority virtualized   # React Virtualized
node scripts/ui-picker.js --priority ownership     # shadcn/ui
```

---

## 🧪 Specification Validation

Run the built-in validator to confirm 100% AgentSkills specification compliance:

```bash
node scripts/validate-skill.js
```

---

## 📄 License

MIT License. Free to use in personal, open-source, or commercial software engineering workflows.
