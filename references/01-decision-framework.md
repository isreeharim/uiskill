# UI Architecture Decision Framework: The 13-System Benchmark

This document provides an exhaustive architectural evaluation and decision framework to choose the ideal UI library or design system for any project.

---

## 1. Deep Comparison Matrix

| Evaluation Dimension | shadcn/ui | Untitled UI | MUI Material UI | Reshaped | AlignUI | Base UI | Tailark | HeroUI | Mantine | DaisyUI | Ant Design | 21st.dev | React Bits |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| **Ecosystem & Host** | React / Next.js | React / Figma | React | React / Figma | React / Next.js | React (Any) | React / Next.js | React / Next.js | React | Web (Any) | React | React / Next.js | React / Next.js |
| **Styling Foundation** | Tailwind CSS | Tailwind CSS | Pigment/Emotion | Native CSS Vars | Tailwind CSS | None (Unstyled) | Tailwind CSS | Tailwind Variants | CSS Modules | Pure Tailwind | CSS-in-JS | Tailwind + Motion | Tailwind + Motion |
| **Accessibility Engine** | Radix UI | Radix / Custom | Custom ARIA | Custom ARIA | Radix UI | Custom ARIA / Radix | Radix UI | React Aria | Custom ARIA | Semantic HTML | Custom ARIA | Radix / Custom | Semantic HTML / ARIA |
| **Bundle Overhead (JS)** | 0 kB (Self-hosted) | Minimal | 45-80 kB (Gzipped)| ~8 kB | Minimal | ~5-12 kB | 0 kB (Self-hosted)| ~18-35 kB | ~25-45 kB | 0 kB JS | 70-120 kB | Minimal | Minimal (Per-component) |
| **SSR / RSC Ready** | Native | Native | High (Pigment) | Full | Native | Full | Native | Client wrapper | Client wrapper | Instant | Client wrapper | Client wrapper | Client wrapper ("use client") |
| **Customization Depth** | Unlimited | High (Tailwind) | Medium-High | High (Tokens) | High | Unlimited | High | High (Slots) | High (Theme) | High (Themes) | Medium (Tokens) | Unlimited | Unlimited |
| **Component Count** | 50+ | 100+ | 80+ | 40+ | 60+ | 30+ (Growing) | 40+ Blocks | 50+ | 100+ | 55+ | 70+ | Thousands | 200+ |
| **Complex Data Table** | TanStack Table | Pre-styled Grid | MUI X DataGrid | Custom Grid | Pre-styled Grid | Unstyled Table | Blocks | Basic Table | Mantine Table | HTML Table | Enterprise Table| Curated blocks | Custom / Focused on FX |
| **Figma Sync Parity** | Community kits | World Class | Official Kit | Built-in Sync | Official Kit | In progress | Based on shadcn | Community kits | Community kits | Third-party | Official Kit | Varied | Community kits |
| **License** | MIT | Commercial/Pro | MIT / Core | MIT / Pro | Free / Pro | MIT | MIT / Commercial | MIT | MIT | MIT | MIT | MIT / Free | **MIT (100% Free)** |

---

## 2. Selection Flowchart (Ascii Architecture)

```
[PROJECT START]
       │
       ▼
Is it a Marketing Website or Landing Page?
  ├─► YES:
  │     ├─ Need copy-paste pre-built sections (Hero, Pricing, FAQs)? ────► TAILARK
  │     ├─ Ultra-lean static build with 0 JS runtime? ──────────────────► DAISYUI
  │     └─ Eye-popping animations, bento grids, particle buttons? ─────► 21ST.DEV
  │
  └─► NO (Application / Dashboard / Tool):
        │
        ▼
Do you have an enterprise need for massive virtualized data tables, pivot grids, or multi-level trees?
  ├─► YES:
  │     ├─ Classic enterprise backoffice, high density, Asian/Global standard? ──► ANT DESIGN
  │     ├─ Full enterprise data suite with Excel export, cell editing? ─────────► MUI (MUI X)
  │     └─ Modern React with rich hooks, forms, and zero-runtime CSS? ──────────► MANTINE
  │
  └─► NO:
        │
        ▼
What is your styling and architecture philosophy?
  ├─ "I want 100% code ownership, zero package-lock lock-in, Tailwind CSS" ─────► SHADCN/UI
  ├─ "I want a headless, completely unstyled primitive with bulletproof A11y" ────► BASE UI
  ├─ "I want Figma-first design token synchronization with CSS custom props" ────► RESHAPED
  ├─ "I want premier B2B SaaS dashboard design patterns and metric cards" ──────► UNTITLED UI
  ├─ "I want luxury SaaS aesthetics with OKLCH palettes and Remix Icons" ────────► ALIGNUI
  └─ "I want slick animated components with frosted glass and spring physics" ──► HEROUI
```

---

## 3. Detailed Tradeoff Profiles

### A. shadcn/ui
- **When to choose**: The default choice for modern Next.js / Vite web applications. You want to modify component source code freely without fighting third-party npm abstractions.
- **Tradeoffs**: You maintain the component code in your repo. Major updates to Radix or Tailwind may require manual refactoring.

### B. Untitled UI React
- **When to choose**: Fast-growing SaaS startups with a dedicated product designer using Untitled UI in Figma. Unbeatable design polish for B2B dashboards, metrics, billing panels, and onboarding flows.
- **Tradeoffs**: Advanced component variants and the full Figma design system require a commercial license.

### C. MUI (Material UI)
- **When to choose**: Proven enterprise platforms requiring robust out-of-the-box form handling, date pickers, and the gold standard DataGrid Pro.
- **Tradeoffs**: Higher bundle weight and historical CSS-in-JS complexity (though improving with Pigment CSS). Can look like a generic Google app if themes are not customized.

### D. Reshaped
- **When to choose**: Design-system architects building multi-brand or multi-theme applications where Figma variables and CSS tokens must remain 1:1 synchronized.
- **Tradeoffs**: Smaller ecosystem and community component extensions compared to Tailwind-first giants.

### E. AlignUI
- **When to choose**: Startups wanting a modern, sophisticated alternative to default shadcn styling with superior compound component APIs and OKLCH color support.
- **Tradeoffs**: Emerging library with a growing community compared to mature behemoths like Ant Design.

### F. Base UI (MUI Team)
- **When to choose**: Building a bespoke internal corporate design system from scratch where you demand complete control over every CSS selector without re-inventing ARIA keyboard behavior.
- **Tradeoffs**: Requires you to write all the visual styling yourself (unstyled).

### G. Tailark
- **When to choose**: Building SaaS landing pages, auth screens, and marketing funnels on top of an existing shadcn codebase in record time.
- **Tradeoffs**: Focused on marketing blocks and page sections rather than dense interactive application widgets.

### H. HeroUI
- **When to choose**: Consumer applications, Web3 portals, interactive SaaS products where users expect instant visual feedback, tactile ripple effects, and iOS-like aesthetics.
- **Tradeoffs**: Relies on Tailwind Variants runtime, slightly heavier than pure static Tailwind utility classes.

### I. Mantine
- **When to choose**: Full-stack React engineers who want a unified ecosystem providing components, state management, form validation, hooks, notifications, and modals without stitching 10 separate libraries together.
- **Tradeoffs**: Uses CSS Modules instead of utility-first Tailwind classes (a pro or con depending on team preference).

### J. DaisyUI
- **When to choose**: Rapid prototyping, internal tools, multi-framework environments (Rails, Django, Svelte, Vue), or teams seeking 0 kB JS overhead.
- **Tradeoffs**: Built on pure CSS classes, so complex keyboard-accessible interactions (e.g. multi-select combo boxes, combobox search) require custom JS or third-party primitives.

### K. Ant Design (antd)
- **When to choose**: Large-scale enterprise admin dashboards, international business systems with complex cascading select boxes, multi-layered data trees, and high-density forms.
- **Tradeoffs**: Heavy JavaScript footprint, opinionated visual language that is difficult to completely disguise.

### L. 21st.dev
- **When to choose**: Adding that "10% design engineer magic" — interactive canvas backgrounds, magnetic buttons, spotlight cards, bento grids, and border-beam glows.
- **Tradeoffs**: High concentration of Framer Motion and canvas animations can impact performance if overused on mobile devices.

### M. React Bits (David Haz)
- **When to choose**: Statement landing pages, dynamic text effects (`ShinyText`, `TrueFocus`), 3D cards (`TiltedCard`, `StarBorder`), cursor physics (`Magnet`), and interactive canvas grids (`Squares`, `Aurora`).
- **Tradeoffs**: Focuses primarily on animation & presentation components; pair with shadcn/ui or Base UI for core data forms and tables.

