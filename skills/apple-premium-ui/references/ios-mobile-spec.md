# iOS Mobile Web Design System & Component Specification

This reference translates the official **Apple iOS UI Kit** into production-grade mobile web tokens, layouts, and responsive CSS/Tailwind patterns.

Use this specification when building mobile-first web applications, responsive views, mobile SaaS dashboards, bottom sheets, or touch-driven interfaces that adhere to Apple Human Interface Guidelines for iOS.

---

## 1. Viewport Geometry & Safe Area Architecture

Mobile web interfaces running on iOS devices require strict respect for device bezels, the Dynamic Island / notch, and the home indicator:

```
┌────────────────────────────────────────┐
│  9:41              📶 🔋               │  Status Bar / Dynamic Island (47px–54px)
├────────────────────────────────────────┤
│  [Back]               [Action]         │  Navigation Bar (44px standard)
│  Large Page Title                      │  Large Title Area (52px collapsible)
├────────────────────────────────────────┤
│                                        │
│  Content Area                          │
│  - Inset Grouped Lists                 │
│  - Action Cards & Touch Targets        │
│  - Minimum 44px touch targets          │
│                                        │
├────────────────────────────────────────┤
│  [Tab 1]   [Tab 2]   [Tab 3]   [Tab 4] │  Tab Bar (49px)
│                                        │  Home Indicator Inset (34px safe area)
└────────────────────────────────────────┘
```

### Safe Area CSS Setup
Ensure the HTML viewport meta tag enables viewport-fit cover:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
```

Apply safe area environment variables in CSS:
```css
:root {
  --safe-area-top: env(safe-area-inset-top, 20px);
  --safe-area-bottom: env(safe-area-inset-bottom, 20px);
  --safe-area-left: env(safe-area-inset-left, 0px);
  --safe-area-right: env(safe-area-inset-right, 0px);
}
```

---

## 2. Dynamic iOS Color Palette & Materials

iOS uses a multi-tier semantic color system that automatically adapts to light and dark modes:

### Surface Backgrounds
```css
:root {
  /* Canvas Backgrounds */
  --ios-bg-primary: #FFFFFF;
  --ios-bg-secondary: #F2F2F7;         /* Grouped table background */
  --ios-bg-tertiary: #FFFFFF;          /* Inset card background */

  /* Labels */
  --ios-label-primary: #000000;
  --ios-label-secondary: rgba(60, 60, 67, 0.60);
  --ios-label-tertiary: rgba(60, 60, 67, 0.30);
  --ios-label-quaternary: rgba(60, 60, 67, 0.18);

  /* Separators */
  --ios-separator: rgba(60, 60, 67, 0.29);
  --ios-separator-opaque: #C6C6C8;

  /* System Accents */
  --ios-blue: #007AFF;
  --ios-green: #34C759;
  --ios-indigo: #5856D6;
  --ios-orange: #FF9500;
  --ios-pink: #FF2D55;
  --ios-purple: #AF52DE;
  --ios-red: #FF3B30;
  --ios-teal: #5AC8FA;
  --ios-yellow: #FFCC00;
}

.dark {
  --ios-bg-primary: #000000;
  --ios-bg-secondary: #1C1C1E;         /* Grouped table background */
  --ios-bg-tertiary: #2C2C2E;          /* Inset card background */

  --ios-label-primary: #FFFFFF;
  --ios-label-secondary: rgba(235, 235, 245, 0.60);
  --ios-label-tertiary: rgba(235, 235, 245, 0.30);
  --ios-label-quaternary: rgba(235, 235, 245, 0.16);

  --ios-separator: rgba(84, 84, 88, 0.65);
  --ios-separator-opaque: #38383A;

  --ios-blue: #0A84FF;
  --ios-green: #30D158;
  --ios-indigo: #5E5CE6;
  --ios-orange: #FF9F0A;
  --ios-pink: #FF375F;
  --ios-purple: #BF5AF2;
  --ios-red: #FF453A;
  --ios-teal: #64D2FF;
  --ios-yellow: #FFD60A;
}
```

---

## 3. Large Title Navigation Bar

The iOS large title navigation bar establishes strong visual hierarchy and smoothly compresses as the user scrolls:

- **Unscrolled State**: Large headline (`34px`, tracking `-0.02em`, weight `700`) sitting below a transparent 44px action bar.
- **Scrolled State**: As content scrolls, the header shrinks to a fixed 44px bar, displaying the title centered (`17px`, weight `600`) with a frosted translucent background:
  ```css
  .ios-navbar-scrolled {
    position: sticky;
    top: 0;
    z-index: 40;
    height: 44px;
    padding-top: var(--safe-area-top);
    background-color: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    border-bottom: 0.5px solid var(--ios-separator);
  }
  ```

---

## 4. Inset Grouped Lists (The Canonical iOS Pattern)

Rather than scattered individual cards, iOS groups related settings and rows into continuous rounded blocks with inset dividers.

### Inset Grouped Container
```css
.ios-inset-group {
  margin: 16px 16px;
  background-color: var(--ios-bg-tertiary);
  border-radius: 12px;
  overflow: hidden;
  border: 0.5px solid var(--ios-separator);
}

.ios-inset-header {
  font-size: 13px;
  font-weight: 400;
  text-transform: uppercase;
  color: var(--ios-label-secondary);
  padding: 0 16px 6px 16px;
  letter-spacing: -0.01em;
}

.ios-inset-footer {
  font-size: 13px;
  font-weight: 400;
  color: var(--ios-label-secondary);
  padding: 6px 16px 16px 16px;
}
```

### Inset Row & Hairline Divider
```css
.ios-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 44px;
  padding: 11px 16px;
  position: relative;
  background-color: transparent;
  transition: background-color 0.12s ease;
}

.ios-row:active {
  background-color: rgba(0, 0, 0, 0.05);
}

/* Inset separator that does not touch the left edge */
.ios-row:not(:last-child)::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 16px; /* Offset to align with text */
  right: 0;
  height: 0.5px;
  background-color: var(--ios-separator);
}
```

---

## 5. Tab Bar (Bottom Navigation)

The primary navigational anchor on iOS mobile web apps:

- **Height**: `49px` (+ `safe-area-inset-bottom`).
- **Material**: Translucent frosted blur:
  ```css
  .ios-tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: calc(49px + var(--safe-area-bottom));
    padding-bottom: var(--safe-area-bottom);
    background-color: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(25px) saturate(180%);
    -webkit-backdrop-filter: blur(25px) saturate(180%);
    border-top: 0.5px solid var(--ios-separator);
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 50;
  }
  ```
- **Tab Item**:
  - Vertical layout: 24px icon on top, 10px label below.
  - Active color: `var(--ios-blue)`.
  - Inactive color: `var(--ios-label-secondary)`.

---

## 6. Bottom Sheets & Modal Drawers

For secondary flows, filtering, and contextual editing on mobile:

- **Top Drag Grabber**:
  - Width: `36px`, Height: `5px`, Radius: `2.5px`.
  - Color: `rgba(60, 60, 67, 0.3)`.
  - Margin: `8px auto 12px auto`.
- **Corner Radii**: Top-left and top-right `16px` to `20px`.
- **Backdrop Dimmer**: `rgba(0, 0, 0, 0.4)` smooth fade.
- **Physics**: Bottom slide-in with spring physics (`cubic-bezier(0.16, 1, 0.3, 1)`).

---

## 7. Touch Controls & Mobile Affordances

### 1. Primary Full-Width Action Button
```css
.ios-primary-btn {
  width: 100%;
  height: 50px;
  border-radius: 14px;
  background-color: var(--ios-blue);
  color: #FFFFFF;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.015em;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: transform 0.12s ease, opacity 0.12s ease;
}

.ios-primary-btn:active {
  transform: scale(0.98);
  opacity: 0.9;
}
```

### 2. Segmented Switcher (Mobile)
- Height: `32px`, Radius: `8px`, Padding: `2px`.
- Active segment sliding pill: `#FFFFFF` with `box-shadow: 0 1px 3px rgba(0,0,0,0.15), 0 0.5px 1px rgba(0,0,0,0.06)`.

### 3. iOS Toggle Switch
- Width: `51px`, Height: `31px`, Corner radius: `15.5px`.
- Thumb: White circle `27px × 27px`, margin `2px`.
- Active state track: `#34C759`.
- Smooth slide transition: `transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)`.
