# 🎨 The Ultimate UI & UX Skills Monorepo (32 Skills)

Welcome to the **UI & UX Agent Skills Monorepo**. This directory bundles **32 production-grade, specialized AI coding skills** conforming to the open **[AgentSkills specification](https://agentskills.io)**. 

Compatible with **Anthropic Claude Code**, **Google Antigravity / Gemini CLI**, **Cursor**, **Windsurf**, **GitHub Copilot**, and **OpenAI Codex**.

---

## 📂 Complete Catalog of All 32 UI Skills

### 1. Component Systems & Web Architecture
| Skill Folder | Description & Capabilities |
|---|---|
| [`react-bits/`](./react-bits/SKILL.md) | Complete guide and reference for 200+ animated, interactive components by David Haz (ShinyText, TrueFocus, TiltedCard, StarBorder, Magnet, Squares). |
| [`ui-styling/`](./ui-styling/SKILL.md) | shadcn/ui components (Radix + Tailwind), dark mode toggles, accessible dialogs, and canvas-based visual designs. |
| [`rayden-code/`](./rayden-code/SKILL.md) | Generates production React code using Rayden UI components, token props, and premium layout patterns. |
| [`ask-sonner/`](./ask-sonner/SKILL.md) | Master guide to Sonner toasts in React: promise toasts, dismiss timers, positioners, and dark-mode styling. |
| [`pick-ui-library/`](./pick-ui-library/SKILL.md) | Fast-path evaluator to select the optimal UI library for any new web project. |

---

### 2. Motion & Animation Engineering
| Skill Folder | Description & Capabilities |
|---|---|
| [`animate/`](./animate/SKILL.md) | Builds UI motion from scratch with purposeful curves, durations, exit states, and interruptible physics. |
| [`animation-vocabulary/`](./animation-vocabulary/SKILL.md) | Reverse-lookup glossary turning vague motion ideas into exact design and CSS animation terms. |
| [`find-animation-opportunities/`](./find-animation-opportunities/SKILL.md) | Scans a codebase for static UI elements that need purposeful motion with exact millisecond and easing values. |
| [`improve-animations/`](./improve-animations/SKILL.md) | Senior motion advisor that audits UI motion code and generates prioritized animation roadmaps. |
| [`review-animations/`](./review-animations/SKILL.md) | Critiques existing animation diffs for performance, reduced-motion compliance, and feel. |
| [`emil-design-eng/`](./emil-design-eng/SKILL.md) | Encodes Emil Kowalski's philosophy on UI polish, subtle interaction feedback, and micro-details. |

---

### 3. Mobile App & Native Experience
| Skill Folder | Description & Capabilities |
|---|---|
| [`mobile-app-ui-design/`](./mobile-app-ui-design/SKILL.md) | Designs high-quality mobile app UI/UX screens, onboarding flows, and navigation for React Native, Flutter, and SwiftUI. |
| [`appllama-app-design-skill/`](./appllama-app-design-skill/SKILL.md) | Builds native-feeling mobile app screens inspired by top-grossing App Store benchmarks. |
| [`appllama-usage/`](./appllama-usage/SKILL.md) | Researches real mobile apps, paywalls, and feature flows using the Appllama MCP. |
| [`apple-design/`](./apple-design/SKILL.md) | Apple's Human Interface Guidelines (HIG) translated for web: spring physics, sheet interactions, translucency, and SF typography. |
| [`apple-premium-ui/`](./apple-premium-ui/SKILL.md) | Build premium, Apple-inspired web interfaces grounded in HIG principles without AI-slop styling. macOS & iOS component specifications. |


---

### 4. Design Systems, Tokens & Identity
| Skill Folder | Description & Capabilities |
|---|---|
| [`design-system/`](./design-system/SKILL.md) | 3-layer token architecture (primitive → semantic → component), CSS variables, and component specifications. |
| [`design/`](./design/SKILL.md) | Comprehensive visual design: brand identity, logo generation (55 styles), and corporate identity programs. |
| [`design-html/`](./design-html/SKILL.md) | Finalizes production-quality, responsive HTML/CSS layouts. |
| [`brand/`](./brand/SKILL.md) | Visual identity guidelines, tone of voice, marketing frameworks, and brand compliance. |
| [`banner-design/`](./banner-design/SKILL.md) | Generates professional banners for website heroes, social ads, and marketing creative in 22 styles. |
| [`slides/`](./slides/SKILL.md) | Builds strategic HTML presentations and slide decks with Chart.js data visualizations. |
| [`rayden-use/`](./rayden-use/SKILL.md) | Maintains Rayden UI components and screens in Figma via Figma MCP with design token enforcement. |

---

### 5. Design QA, Evaluation & Research
| Skill Folder | Description & Capabilities |
|---|---|
| [`ui-ux-pro-max/`](./ui-ux-pro-max/SKILL.md) | Searchable local database with 84 UI styles, 192 color palettes, 74 font pairings, and UX guidelines across 22 stacks. |
| [`uxui-principles/`](./uxui-principles/SKILL.md) | Evaluates interfaces against 168 research-backed UX/UI principles and catches antipatterns. |
| [`frontend-design/`](./frontend-design/SKILL.md) | Guidance for distinctive, intentional visual design when building new interfaces without generic templates. |
| [`uizze-ui-research/`](./uizze-ui-research/SKILL.md) | References real-world web and iOS product UI contracts via UIZZE MCP. |
| [`design-review/`](./design-review/SKILL.md) | Designer's eye QA: spots visual inconsistencies, alignment flaws, AI slop, and slow interactions. |
| [`design-consultation/`](./design-consultation/SKILL.md) | Consults on products, researches visual landscapes, and proposes complete custom design systems. |
| [`design-shotgun/`](./design-shotgun/SKILL.md) | Generates multiple AI design variants and opens an interactive comparison review board. |
| [`plan-design-review/`](./plan-design-review/SKILL.md) | Evaluates technical feature plans from a designer's perspective before code is written. |
| [`prototype/`](./prototype/SKILL.md) | Rapid interactive prototyping pipeline to validate product UX and interactions. |

---

## 🚀 How to Install Any Skill Into Your Agent

### 1. In Anthropic Claude Code
Install a single skill or all skills:
```bash
# Install a specific skill (e.g., react-bits):
git clone https://github.com/isreeharim/uiskill.git temp-skills
cp -r temp-skills/skills/react-bits .claude/skills/react-bits
rm -rf temp-skills

# Install all 31 UI skills at once:
git clone https://github.com/isreeharim/uiskill.git temp-skills
cp -r temp-skills/skills/* .claude/skills/
rm -rf temp-skills
```

### 2. In Google Antigravity / Gemini CLI
```bash
# Global user skills:
cp -r skills/* ~/.gemini/config/skills/

# Project level:
cp -r skills/* .gemini/skills/
```

### 3. In Cursor / Windsurf
Add a pointer in your `.cursorrules` or `.windsurfrules`:
```markdown
Refer to the UI skills in the `skills/` directory for design tokens, motion guidelines, component specifications, and accessibility guardrails.
```
