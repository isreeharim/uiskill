# Licensing & Free-Tier Guide: The "No-Problem" UI Matrix

This guide details the exact licensing terms, free tiers, and 100% safe commercial usage rules across all 12 UI systems, plus zero-cost open-source alternatives for paid features.

---

## 1. The "No-Problem" (100% Free & Open-Source) Tier

These libraries have **zero paywalls, zero commercial restrictions, and zero licensing fees**. You can use them in client projects, commercial SaaS apps, open-source repositories, and enterprise applications without ever paying a dollar:

| Library | License | Free Component Coverage | Commercial SaaS Use |
|---|---|---|---|
| **shadcn/ui** | MIT | 100% of all components & blocks | ✅ 100% Free & Legal |
| **Base UI** | MIT | 100% of all unstyled primitives | ✅ 100% Free & Legal |
| **Mantine UI** | MIT | 100% of all 100+ components & 50+ hooks | ✅ 100% Free & Legal |
| **HeroUI (NextUI)** | MIT | 100% of all animated components | ✅ 100% Free & Legal |
| **DaisyUI** | MIT | 100% of all 55+ components & 30+ themes | ✅ 100% Free & Legal |
| **Ant Design** | MIT | 100% of all enterprise tables & forms | ✅ 100% Free & Legal |
| **21st.dev** | MIT / Community | 100% of community-submitted micro-UI | ✅ 100% Free & Legal |
| **MUI Core (`@mui/material`)**| MIT | 100% of core components | ✅ 100% Free & Legal |

---

## 2. Freemium & Dual-Licensed Libraries: What is Free vs. Paid

For the libraries below, understand what you can use freely ("No Problem") versus what is behind a paid license:

### A. Untitled UI React
- **What is Free ("No Problem")**:
  - Public component previews and design patterns.
  - The open-source icon package: `@untitledui/icons-react` (MIT).
  - Clean-room recreations built with Tailwind CSS + Lucide icons (like `templates/dashboard-metrics-card.tsx`).
- **What is Paid**:
  - The full 10,000+ variant Figma design file and the private, pre-bundled Pro React repository.
- **Rule**: Do not download their paid private repository and upload it to a public GitHub repo. Replicating similar layouts from scratch in your own code is 100% legal.

### B. Reshaped
- **What is Free ("No Problem")**:
  - The core `reshaped` npm package and `--rs-` CSS variable engine (MIT).
  - All standard layouts, cards, buttons, modals, and typography components.
- **What is Paid**:
  - Reshaped Pro enterprise add-ons and automated Figma variable sync tokens.
- **Rule**: You can ship production commercial applications using the free npm package without paying.

### C. AlignUI
- **What is Free ("No Problem")**:
  - Free base components, `@alignui/cli`, OKLCH palettes, and Remix Icon bindings.
- **What is Paid**:
  - AlignUI Pro advanced blocks and pre-built Figma template packages.
- **Rule**: Free base components can be copied, customized, and used in commercial software freely.

### D. Tailark
- **What is Free ("No Problem")**:
  - Open-source marketing blocks (MIT) distributed via tailark.com and 21st.dev.
- **What is Paid**:
  - Paid full-page marketing template kits.
- **Rule**: Open-source blocks can be copied into your `src/components/ui` folder with zero licensing friction.

### E. MUI X (DataGrid)
- **What is Free ("No Problem")**:
  - The standard `<DataGrid />` package (`@mui/x-data-grid`) is MIT licensed. It includes client-side sorting, pagination, filtering, column resizing, and basic selection.
- **What is Paid**:
  - `<DataGridPro />` and `<DataGridPremium />` (Excel export, server-side row grouping, cell range selection, master-detail tree views).
- **Rule**: The basic DataGrid is completely free. If you need advanced pivot tables and Excel export without paying for MUI X Pro, use the **TanStack Table** recipe below.

---

## 3. "Zero-Cost" Drop-in Replacements for Paid Features

If a project needs features often locked behind paid tiers, use these 100% free, MIT-licensed combinations:

### 1. Paid Enterprise DataGrid Pro ➡️ TanStack Table + shadcn/ui
- **Paid Alternative**: MUI X DataGrid Pro ($15+/dev/month).
- **Zero-Cost Solution**: `@tanstack/react-table` + `templates/advanced-data-table.tsx`.
- **Capabilities**: Infinite virtual scrolling (via `@tanstack/react-virtual`), multi-column sorting, faceted filters, CSV export, and row selection. 100% MIT, zero cost.

### 2. Paid SaaS Dashboard Kits ➡️ Tailwind + Lucide + Tremor/Recharts
- **Paid Alternative**: Untitled UI Pro ($149+).
- **Zero-Cost Solution**: `templates/dashboard-metrics-card.tsx` + `lucide-react` + `@tremor/react` or Recharts.
- **Capabilities**: Pixel-perfect SaaS metric cards, sparklines, badge trends, and audit logs.

### 3. Paid Animation Blocks ➡️ 21st.dev + Framer Motion
- **Paid Alternative**: Commercial UI packs.
- **Zero-Cost Solution**: `templates/interactive-bento-grid.tsx` + `templates/command-palette.tsx`.
- **Capabilities**: Spotlight cards, border-beam glows, canvas shaders, and ⌘K command palettes.

---

## 4. The 100% "No-Problem" SaaS Starter Stack

For any developer wanting a **100% free, 0-cost, 0-legal-risk** production SaaS stack:

```bash
# Core Application Stack (100% MIT):
npx shadcn@latest init
npm install lucide-react @tanstack/react-table class-variance-authority clsx tailwind-merge

# Need rich full-stack hooks & forms?
npm install @mantine/hooks @mantine/form

# Need rapid pure CSS UI with 0 JS bundle weight?
npm install -D daisyui@latest
```
