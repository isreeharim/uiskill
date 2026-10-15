# 🎨 Skill UI: The Universal UI Architecture & Component Skill for AI

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Standard: AgentSkills](https://img.shields.io/badge/Standard-AgentSkills-purple.svg)](https://agentskills.io)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/isreeharim/uiskill)

> **The definitive design system and component engineering skill for AI coding agents.** Built by synthesizing architectural standards, design tokens, accessibility guardrails, and production recipes across **13 elite UI ecosystems**.

---

## 🌐 The 13 Supported UI Systems

| # | System | URL | Core Paradigm & Strength |
|---|---|---|---|
| 1 | **shadcn/ui** | [ui.shadcn.com](https://ui.shadcn.com) | Copy-paste unstyled primitives (Radix UI + Tailwind CSS), zero runtime lock-in. |
| 2 | **Untitled UI** | [untitledui.com/react](https://untitledui.com/react) | The world's #1 Figma-to-code SaaS design system: B2B dashboards, metrics, billing. |
| 3 | **MUI (Material UI)** | [mui.com/material-ui](https://mui.com/material-ui/all-components) | Google Material Design standard with enterprise-grade **MUI X DataGrid**. |
| 4 | **Reshaped** | [reshaped.so](https://reshaped.so) | Token-first, Figma-synchronized design system with `--rs-` CSS custom properties. |
| 5 | **AlignUI** | [alignui.com](https://alignui.com) | Luxury SaaS UI kit for React + Tailwind with OKLCH palettes and Remix Icons. |
| 6 | **Base UI** | [base-ui.com](https://base-ui.com) | MUI's next-gen unstyled headless primitives for complete CSS styling freedom. |
| 7 | **Tailark** | [tailark.com](https://tailark.com) | Curated marketing sections, hero headers, and SaaS pricing blocks on shadcn/ui. |
| 8 | **HeroUI** | [heroui.com](https://heroui.com) | Formerly NextUI. Animated components with Tailwind Variants (`tv`) and React Aria. |
| 9 | **Mantine** | [mantine.dev](https://mantine.dev) | Complete React powerhouse: 100+ components, 50+ hooks, built-in forms & modals. |
| 10 | **DaisyUI** | [daisyui.com](https://daisyui.com) | Pure CSS semantic Tailwind plugin: 30+ instant themes and 0 kB JavaScript runtime. |
| 11 | **Ant Design** | [ant.design](https://ant.design) | Enterprise data-dense design language, cascading trees, and token algorithms. |
| 12 | **21st.dev** | [21st.dev](https://21st.dev) | "The npm for design engineers": animated spotlights, bento grids, and micro-UI. |
| 13 | **React Bits** | [reactbits.dev](https://reactbits.dev) | 200+ animated React components by David Haz: dynamic typography, 3D cards, canvas backgrounds. |

---

## 📦 What's Inside This Repository

This repository follows the open **[AgentSkills specification](https://agentskills.io)** compatible with Claude Code, Antigravity, Cursor, Windsurf, GitHub Copilot, Codex, and 40+ AI agents:

```
skill-ui/
├── SKILL.md                          # Master AI skill instructions & decision trees
├── README.md                         # Repository documentation and installation guide
├── LICENSE                           # MIT License
├── package.json                      # CLI scripts and validation
├── references/                       # Progressive disclosure documentation:
│   ├── 01-decision-framework.md      # In-depth benchmark and library selection tree
│   ├── 02-shadcn-and-base-ui.md      # Headless copy-paste, Radix & Base UI guides
│   ├── 03-enterprise-powerhouses.md  # MUI DataGrid, Ant Design tables, Mantine forms
│   ├── 04-saas-design-systems.md     # Untitled UI, AlignUI, Reshaped, Tailark
│   ├── 05-creative-and-motion.md     # 21st.dev, HeroUI, DaisyUI micro-interactions
│   ├── 06-component-crosswalk.md     # 25+ component syntax mapping across all 13 libs
│   ├── 07-theming-tokens-and-dark-mode.md # CSS variables, OKLCH, algorithms
│   ├── 08-accessibility-and-rsc.md  # WAI-ARIA focus traps, React Server Components
│   ├── 09-licensing-and-free-tier-guide.md # The "No-Problem" 100% Free UI Matrix & Replacements
│   └── 10-react-bits-catalog.md      # React Bits 200+ animated components & typography
├── scripts/
│   ├── ui-picker.js                  # Interactive & CLI UI stack recommender tool
│   └── validate-skill.js             # Automated AgentSkills validation runner
└── templates/                        # Ready-to-use canonical TypeScript components:
    ├── dashboard-metrics-card.tsx    # Untitled UI / AlignUI style SaaS metric card
    ├── advanced-data-table.tsx       # Filterable & sortable data table
    ├── command-palette.tsx           # Accessible ⌘K spotlight command palette
    ├── interactive-bento-grid.tsx    # 21st.dev modern feature bento grid
    ├── animated-modal-dialog.tsx     # HeroUI spring-animated dialog
    ├── daisy-theme-switcher.tsx      # Pure CSS multi-theme dropdown switcher
    ├── react-bits-shiny-text.tsx     # Dynamic animated light-sweep typography
    ├── react-bits-true-focus.tsx     # Sequential and hover word focus framing
    ├── react-bits-tilted-card.tsx    # Interactive 3D perspective tilt card
    ├── react-bits-star-border.tsx    # Gradient rotating perimeter CTA button
    ├── react-bits-magnet.tsx         # Cursor-attraction physics wrapper
    ├── react-bits-squares-background.tsx # Interactive animated canvas grid background
    ├── collapsible-sidebar.tsx       # Collapsible navigation sidebar with badges
    ├── auth-card.tsx                 # Full auth card (login/signup/forgot password)
    └── notification-center.tsx       # Complete notification tray with mark-all-read
```

---

## 🛡️ The "No-Problem" (100% Free & Legal) UI Stack

Avoid licensing traps, seat fees, and paywalls. This repository emphasizes **100% MIT-licensed, open-source, commercial-safe** development:

- **100% Free Core Systems**: shadcn/ui, Base UI, Mantine UI, HeroUI, DaisyUI, Ant Design, 21st.dev, **React Bits**, and MUI Core.
- **Zero-Cost Alternatives to Paid Kits**:
  - Instead of **Untitled UI Pro ($149+)** ➡️ Use `templates/dashboard-metrics-card.tsx` + `lucide-react`.
  - Instead of **MUI X DataGrid Pro ($15+/mo)** ➡️ Use `@tanstack/react-table` + `templates/advanced-data-table.tsx`.
  - Instead of **Paid Marketing Themes** ➡️ Use Tailark open blocks + `templates/interactive-bento-grid.tsx`.
  - Instead of **Commercial Motion FX** ➡️ Use React Bits (`templates/react-bits-*`) + 21st.dev.
- See [`references/09-licensing-and-free-tier-guide.md`](file:///c:/Users/Sreehari/OneDrive/Desktop/projects/skill%20ui/references/09-licensing-and-free-tier-guide.md) and [`references/10-react-bits-catalog.md`](file:///c:/Users/Sreehari/OneDrive/Desktop/projects/skill%20ui/references/10-react-bits-catalog.md) for full details.

## 💻 Live Component Studio & Web Preview App

Experience all 12 templates running live with responsive viewports, light/dark mode, and one-click code copy:

```bash
# Start the live preview web app:
npm run dev

# Or build for production:
npm run build
```

Visit `http://localhost:3000` to interact with:
- **Interactive Component Previews**: Live modals, data tables with sorting/filtering, bento grids, notification center, and onboarding wizard.
- **One-Click Code & CLI Copy**: Copy production-ready TSX source code, download `.tsx` files, or copy setup CLI commands.
- **Multi-Viewport Testing**: Switch between Desktop (100%), Tablet (768px), and Mobile (390px) responsive views with dark/light canvas controls.
- **Visual Stack Recommender**: 3-step interactive wizard matching your requirements to the ideal UI framework.
- **12-System Syntax Crosswalk**: Side-by-side syntax comparison for buttons, dialogs, forms, and data tables.

---

## 🗂️ The 31 Specialized UI/UX Skills Monorepo (`skills/`)

In addition to the core `skill-ui` meta-skill, this repository bundles **31 specialized AI coding agent skills** in the [`skills/`](skills/README.md) directory. Each skill is standalone, fully documented with a specification-compliant `SKILL.md`, and ready for individual or monorepo installation:

### 🌟 5 Core UI Domains Covered
1. **Component Systems & Architecture**: [`react-bits`](skills/README.md#1-component-systems--web-architecture), [`ui-styling`](skills/README.md#1-component-systems--web-architecture), [`rayden-code`](skills/README.md#1-component-systems--web-architecture), [`ask-sonner`](skills/README.md#1-component-systems--web-architecture), [`pick-ui-library`](skills/README.md#1-component-systems--web-architecture).
2. **Motion & Animation Engineering**: [`animate`](skills/README.md#2-motion--animation-engineering), [`animation-vocabulary`](skills/README.md#2-motion--animation-engineering), [`find-animation-opportunities`](skills/README.md#2-motion--animation-engineering), [`improve-animations`](skills/README.md#2-motion--animation-engineering), [`review-animations`](skills/README.md#2-motion--animation-engineering), [`emil-design-eng`](skills/README.md#2-motion--animation-engineering).
3. **Mobile & Native Experience**: [`mobile-app-ui-design`](skills/README.md#3-mobile-app--native-experience), [`appllama-app-design-skill`](skills/README.md#3-mobile-app--native-experience), [`appllama-usage`](skills/README.md#3-mobile-app--native-experience), [`apple-design`](skills/README.md#3-mobile-app--native-experience).
4. **Design Systems, Tokens & Identity**: [`design-system`](skills/README.md#4-design-systems-tokens--identity), [`design`](skills/README.md#4-design-systems-tokens--identity), [`design-html`](skills/README.md#4-design-systems-tokens--identity), [`brand`](skills/README.md#4-design-systems-tokens--identity), [`banner-design`](skills/README.md#4-design-systems-tokens--identity), [`slides`](skills/README.md#4-design-systems-tokens--identity), [`rayden-use`](skills/README.md#4-design-systems-tokens--identity).
5. **Design QA, Review & UX Research**: [`ui-ux-pro-max`](skills/README.md#5-design-qa-evaluation--research), [`uxui-principles`](skills/README.md#5-design-qa-evaluation--research), [`frontend-design`](skills/README.md#5-design-qa-evaluation--research), [`uizze-ui-research`](skills/README.md#5-design-qa-evaluation--research), [`design-review`](skills/README.md#5-design-qa-evaluation--research), [`design-consultation`](skills/README.md#5-design-qa-evaluation--research), [`design-shotgun`](skills/README.md#5-design-qa-evaluation--research), [`plan-design-review`](skills/README.md#5-design-qa-evaluation--research), [`prototype`](skills/README.md#5-design-qa-evaluation--research).

👉 **[Explore the full 31 skills catalog & install guide in `skills/README.md`](skills/README.md)**

---

## 🚀 Installation & How to Use

### 1. In Anthropic Claude Code
Clone or copy this folder into your project's `.claude/skills/` directory:
```bash
git clone https://github.com/isreeharim/uiskill.git .claude/skills/skill-ui
```

### 2. In Google Antigravity / Gemini CLI
Copy into your global or project skills directory:
```bash
# Project level:
git clone https://github.com/isreeharim/uiskill.git .gemini/skills/skill-ui

# Global level:
git clone https://github.com/isreeharim/uiskill.git ~/.gemini/config/skills/skill-ui
```

### 3. In Cursor / Windsurf
Add a pointer in your `.cursorrules` or `.windsurfrules`:
```markdown
When building, designing, or choosing UI components, follow the principles and patterns specified in `skill-ui/SKILL.md`.
```

---

## ⚡ Instant Stack Evaluator CLI

Run the included stack evaluator locally or in your terminal:

```bash
# Interactive mode:
node scripts/ui-picker.js

# Command line flag mode:
node scripts/ui-picker.js --type saas --priority ownership
node scripts/ui-picker.js --type enterprise --priority datagrid
node scripts/ui-picker.js --type marketing --priority zero-js
```

---

## 🧪 Validating the Skill

Run the built-in validator to confirm 100% AgentSkills specification compliance:

```bash
node scripts/validate-skill.js
```

---

## 📄 License

MIT License. Free to use in personal, open-source, or commercial software engineering workflows.
