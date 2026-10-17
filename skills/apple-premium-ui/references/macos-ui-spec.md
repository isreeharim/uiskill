# macOS Web Design System & Component Specification

This reference translates the official **Apple macOS UI Kit** specifications into production-grade, accessible web design tokens, layout structures, and CSS/Tailwind patterns.

Use this specification when building desktop-focused web applications, dashboards, SaaS workspaces, or administrative tools that embody macOS desktop software's precision, hierarchy, and spatial restraint.

---

## 1. Spatial Structure & Window Anatomy

A macOS-inspired desktop interface consists of clear structural planes:

```
┌────────────────────────────────────────────────────────────────────────┐
│  🔴 🟡 🟢   [Toolbar / Unified Header: Title, Controls, Search]       │  Height: 52px
├─────────────────┬──────────────────────────────────────────────────────┤
│                 │                                                      │
│  Sidebar        │  Main Content Area                                   │
│  (Source List)  │  (Data tables, canvases, inspectors, feeds)          │
│                 │                                                      │
│  Width:         │                                                      │
│  210px–260px    │                                                      │
│                 ├──────────────────────────────────────────────────────┤
│                 │  Bottom Status Bar / Footer (Optional)   Height: 28px│
└─────────────────┴──────────────────────────────────────────────────────┘
```

### Window Chrome & Border Radii
- **Window Frame**: Outer container radius is `10px` to `12px`.
- **Window Border**: `1px solid rgba(0, 0, 0, 0.12)` (Light mode) / `1px solid rgba(255, 255, 255, 0.14)` (Dark mode).
- **Window Shadow**: Deep, diffuse ambient depth that separates the application window from the desktop background:
  ```css
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.08),
    0 8px 24px -4px rgba(0, 0, 0, 0.12),
    0 24px 60px -12px rgba(0, 0, 0, 0.20);
  ```

---

## 2. Window Controls ("Traffic Lights")

Standard window management controls on macOS have exact dimensions and colors:

```css
.traffic-lights {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
}

.traffic-light {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 0.5px solid rgba(0, 0, 0, 0.15);
}

.traffic-light-close    { background-color: #FF5F56; }
.traffic-light-minimize { background-color: #FFBD2E; }
.traffic-light-zoom     { background-color: #27C93F; }
```

---

## 3. Sidebar (Source List)

The sidebar provides hierarchical navigation and categorization.

### Key Characteristics
- **Width**: `210px` to `260px` fixed, or resizable with a subtle splitter handle.
- **Surface**: Subtle translucency with vibrancy:
  - Light: `background: rgba(246, 246, 246, 0.85); backdrop-filter: blur(20px);`
  - Dark: `background: rgba(30, 30, 30, 0.85); backdrop-filter: blur(20px);`
- **Right Border**: Hairline divider `1px solid rgba(0, 0, 0, 0.08)` (Light) / `rgba(255, 255, 255, 0.08)` (Dark).
- **Section Headers**: `11px`, weight `600`, uppercase or small tracking (`0.05em`), muted foreground (`#86868B`).
- **Sidebar Row Item**:
  - Height: `28px` to `32px`.
  - Padding: `0 8px`.
  - Radius: `6px`.
  - Active Row State:
    - Light: `background-color: rgba(0, 0, 0, 0.06); font-weight: 500;` (or semantic accent `bg-[#007AFF] text-white`).
    - Dark: `background-color: rgba(255, 255, 255, 0.10); font-weight: 500;`.

---

## 4. Toolbar & Controls

The macOS toolbar is compact, unified, and functional.

### Height & Layout
- **Toolbar Height**: `52px` standard unified bar.
- **Item Alignment**: Centered vertically with 8px horizontal control gap.

### Segmented Controls (Pill Track Switcher)
The canonical macOS view switcher:
- **Track**: Height `26px`–`28px`, background `rgba(0, 0, 0, 0.05)` (Light) / `rgba(255, 255, 255, 0.1)` (Dark), radius `6px`–`7px`, padding `2px`.
- **Active Segment**: White card with hairline border and micro-shadow:
  ```css
  .segmented-item-active {
    background-color: #FFFFFF;
    color: #1D1D1F;
    border-radius: 5px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12), 0 0 1px rgba(0, 0, 0, 0.08);
    font-weight: 500;
  }
  .dark .segmented-item-active {
    background-color: #3A3A3C;
    color: #F5F5F7;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }
  ```

### Search Field
- Inset field with subtle background: `rgba(0, 0, 0, 0.04)` (Light) / `rgba(255, 255, 255, 0.08)` (Dark).
- Height: `26px`–`28px`.
- Border-radius: `6px`.
- Integrated search icon (`13px`) with muted color.

---

## 5. macOS Form Controls & Inputs

### Standard Push Button
```css
.macos-button {
  height: 24px;
  padding: 0 10px;
  font-size: 13px;
  font-weight: 400;
  border-radius: 5px;
  background-color: #FFFFFF;
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 0.5px 1px rgba(0, 0, 0, 0.05);
  color: #1D1D1F;
  cursor: pointer;
  transition: all 0.12s ease;
}

.macos-button:hover {
  background-color: #F8F8F8;
}

.macos-button:active {
  background-color: #EFEFEF;
  transform: translateY(0.5px);
}

.macos-button-accent {
  background-color: #007AFF;
  color: #FFFFFF;
  border-color: #006BE0;
}

.macos-button-accent:hover {
  background-color: #006BE0;
}
```

### Toggle Switch
- Width: `38px`, Height: `22px`.
- Track Border-Radius: `11px`.
- Thumb: White circle `18px × 18px` with soft drop shadow `0 1px 2px rgba(0,0,0,0.2)`.
- Inactive Track: `rgba(120, 120, 128, 0.16)`.
- Active Track: `#34C759` (or `#007AFF`).

---

## 6. Table & List Views

macOS lists and tables prioritize scan speed, density, and legibility:

- **Row Height**:
  - Compact: `24px`–`28px`
  - Regular: `32px`–`36px`
  - Large / Media: `44px`–`52px`
- **Alternating Rows**: Subtle alternation (`transparent` vs `rgba(0, 0, 0, 0.015)`) or clean dividers (`1px solid rgba(0, 0, 0, 0.05)`).
- **Hover State**: Faint tint (`rgba(0, 0, 0, 0.03)` / `rgba(255, 255, 255, 0.04)`).
- **Selection State**: Accent blue `#007AFF` (with white text) or light tint `rgba(0, 122, 255, 0.1)` (with blue text).
- **Column Headers**: `11px`, font-weight `500`, muted gray text with right hairline vertical dividers.

---

## 7. Popovers, Menus & Sheets

- **Context / Action Menus**:
  - Background: `rgba(255, 255, 255, 0.92)` (Light) / `rgba(38, 38, 38, 0.92)` (Dark).
  - Blur: `backdrop-filter: blur(24px)`.
  - Border: `1px solid rgba(0, 0, 0, 0.1)`.
  - Radius: `8px`.
  - Item Padding: `4px 10px`, item height `24px`.
  - Hover Item: High-contrast blue highlight `#007AFF` with white text, radius `4px`.
- **Modal Sheets**:
  - Anchored directly under the toolbar / window header rather than floating in the center of the viewport.
  - Slide down from the titlebar with subtle overshoot spring physics (`cubic-bezier(0.16, 1, 0.3, 1)`).
