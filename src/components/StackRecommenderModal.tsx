import React, { useState } from "react"
import {
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Terminal,
  ExternalLink,
  RotateCcw
} from "lucide-react"
import { UI_LIBRARIES, UILibrary } from "../data/stack-recommender"

interface StackRecommenderModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectComponentById: (id: string) => void
  onTriggerToast: (msg: string, sub?: string) => void
}

export function StackRecommenderModal({
  isOpen,
  onClose,
  onSelectComponentById,
  onTriggerToast,
}: StackRecommenderModalProps) {
  if (!isOpen) return null

  const [step, setStep] = useState(1)
  const [projectType, setProjectType] = useState<string>("saas")
  const [styling, setStyling] = useState<string>("tailwind")
  const [ownership, setOwnership] = useState<string>("copypaste")
  const [copiedSetup, setCopiedSetup] = useState(false)

  // Calculate recommendation based on user selections
  const getRecommendation = (): { library: UILibrary; matchedTemplates: { id: string; name: string }[] } => {
    if (projectType === "prototype" || styling === "zerocss") {
      return {
        library: UI_LIBRARIES.daisyui,
        matchedTemplates: [{ id: "daisy-theme-switcher", name: "DaisyUI Theme Switcher" }],
      }
    }

    if (projectType === "creative") {
      return {
        library: UI_LIBRARIES.twentyfirst,
        matchedTemplates: [
          { id: "interactive-bento-grid", name: "Interactive Bento Grid" },
          { id: "command-palette", name: "Command Palette (⌘K)" },
        ],
      }
    }

    if (projectType === "marketing") {
      return {
        library: UI_LIBRARIES.tailark,
        matchedTemplates: [
          { id: "pricing-plan-selector", name: "Pricing Plan Selector" },
          { id: "auth-card", name: "Authentication Card" },
          { id: "interactive-bento-grid", name: "Interactive Bento Grid" },
        ],
      }
    }

    if (projectType === "enterprise") {
      if (ownership === "managed") {
        return {
          library: UI_LIBRARIES.mui,
          matchedTemplates: [{ id: "advanced-data-table", name: "Advanced Data Table" }],
        }
      } else {
        return {
          library: UI_LIBRARIES.baseui,
          matchedTemplates: [{ id: "animated-modal-dialog", name: "Animated Modal Dialog" }],
        }
      }
    }

    // Default: SaaS
    if (styling === "tokens") {
      return {
        library: UI_LIBRARIES.reshaped,
        matchedTemplates: [{ id: "dashboard-metrics-card", name: "Dashboard Metrics Card" }],
      }
    }

    if (ownership === "copypaste") {
      return {
        library: UI_LIBRARIES.shadcn,
        matchedTemplates: [
          { id: "advanced-data-table", name: "Advanced Data Table" },
          { id: "collapsible-sidebar", name: "Collapsible Sidebar" },
          { id: "command-palette", name: "Command Palette (⌘K)" },
          { id: "dashboard-metrics-card", name: "Dashboard Metrics Card" },
        ],
      }
    } else {
      return {
        library: UI_LIBRARIES.untitledui,
        matchedTemplates: [
          { id: "dashboard-metrics-card", name: "Dashboard Metrics Card" },
          { id: "notification-center", name: "Notification Center" },
          { id: "onboarding-wizard", name: "Onboarding Wizard" },
        ],
      }
    }
  }

  const result = getRecommendation()

  const handleCopySetup = () => {
    navigator.clipboard.writeText(result.library.setup)
    setCopiedSetup(true)
    onTriggerToast("Copied setup command!", result.library.setup)
    setTimeout(() => setCopiedSetup(false), 2000)
  }

  const handleReset = () => {
    setStep(1)
    setProjectType("saas")
    setStyling("tailwind")
    setOwnership("copypaste")
  }

  // Escape key listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col w-full max-w-2xl max-h-[92vh] rounded-3xl border border-zinc-200 bg-white p-5 sm:p-8 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden"
      >
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/30">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-zinc-50">
                UI Stack Recommender
              </h2>
              <p className="text-xs text-zinc-500">
                AI Decision Engine across 12 modern UI architectures
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-200 p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Stepper indicators */}
        <div className="shrink-0 my-4 sm:my-6">
          <div className="flex items-center justify-between text-xs font-semibold text-zinc-400 mb-2">
            <span>Step {step} of 4</span>
            <span>{step === 4 ? "Recommended Architecture" : "Configuration Wizard"}</span>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  s <= step ? "bg-blue-600" : "bg-zinc-100 dark:bg-zinc-800"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scrollable Step Body */}
        <div className="flex-1 overflow-y-auto pr-1">

        {/* Step 1: Project Type */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              1. What kind of application are you building?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: "saas", title: "SaaS Dashboard / App", desc: "Metrics, sidebars, settings, tables, billing" },
                { id: "marketing", title: "Marketing / Landing Page", desc: "Hero blocks, pricing grids, testimonials, auth" },
                { id: "enterprise", title: "Enterprise Backoffice", desc: "Huge virtualized grids, ERP, banking security" },
                { id: "prototype", title: "Rapid Prototype / MVP", desc: "Fastest build speed, minimal boilerplate" },
                { id: "creative", title: "Creative / Interactive UI", desc: "Apple-style bento grids, micro-interactions, motion" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setProjectType(item.id)}
                  className={`flex flex-col text-left p-4 rounded-2xl border transition ${
                    projectType === item.id
                      ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 dark:border-blue-500 dark:bg-blue-950/20"
                      : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-850"
                  }`}
                >
                  <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-100">{item.title}</span>
                  <span className="text-[11px] text-zinc-500 mt-1">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Styling Paradigm */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              2. What styling approach fits your stack?
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: "tailwind", title: "Tailwind CSS", desc: "Utility-first classes, modern standard, ultra fast" },
                { id: "tokens", title: "CSS Custom Variables", desc: "Strict token architecture (--rs-*), multi-brand" },
                { id: "zerocss", title: "Pure Semantic CSS (Zero JS)", desc: "DaisyUI semantic classes, zero runtime overhead" },
                { id: "headless", title: "Unstyled Headless Primitives", desc: "Total freedom over CSS with bulletproof A11y" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setStyling(item.id)}
                  className={`flex flex-col text-left p-4 rounded-2xl border transition ${
                    styling === item.id
                      ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 dark:border-blue-500 dark:bg-blue-950/20"
                      : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-850"
                  }`}
                >
                  <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-100">{item.title}</span>
                  <span className="text-[11px] text-zinc-500 mt-1">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Code Ownership */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              3. What code ownership model do you require?
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {[
                { id: "copypaste", title: "100% Owned Copy-Paste Code", desc: "Direct source inside your repo (like shadcn). No black-box node_modules." },
                { id: "managed", title: "Managed NPM Package", desc: "Pre-compiled package (like MUI or Mantine). One-line installs and centralized upgrades." },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setOwnership(item.id)}
                  className={`flex flex-col text-left p-4 rounded-2xl border transition ${
                    ownership === item.id
                      ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20 dark:border-blue-500 dark:bg-blue-950/20"
                      : "border-zinc-200 bg-white hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-850"
                  }`}
                >
                  <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-100">{item.title}</span>
                  <span className="text-[11px] text-zinc-500 mt-1">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Results */}
        {step === 4 && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/60">
              <div className="flex items-center justify-between">
                <div>
                  <span className="rounded-full bg-blue-600 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                    Best Match
                  </span>
                  <h3 className="text-xl font-extrabold text-zinc-950 dark:text-zinc-50 mt-1.5">
                    {result.library.name}
                  </h3>
                </div>
                <a
                  href={result.library.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
                >
                  <span>Official Docs</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">
                <strong>Why it fits:</strong> {result.library.bestFor}
              </p>

              {/* Setup Command */}
              <div className="mt-4">
                <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">
                  Quick Setup Command:
                </span>
                <div className="mt-1 flex items-center justify-between rounded-xl bg-zinc-950 p-3 font-mono text-xs text-zinc-200">
                  <div className="flex items-center gap-2 overflow-x-auto">
                    <Terminal className="h-4 w-4 text-blue-400 shrink-0" />
                    <span className="truncate">{result.library.setup}</span>
                  </div>
                  <button
                    onClick={handleCopySetup}
                    className="ml-3 shrink-0 rounded-lg bg-zinc-800 px-2.5 py-1 text-xs text-zinc-300 hover:bg-zinc-700 hover:text-white transition"
                  >
                    {copiedSetup ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : "Copy"}
                  </button>
                </div>
              </div>

              {/* Key Strengths */}
              <div className="mt-4 space-y-1">
                {result.library.strengths.map((str) => (
                  <div key={str} className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                    <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>{str}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Matched Templates to preview */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                Matched Templates You Can Preview & Copy Right Now:
              </h4>
              <div className="flex flex-wrap gap-2">
                {result.matchedTemplates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      onClose()
                      onSelectComponentById(t.id)
                    }}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs font-medium text-zinc-800 hover:border-blue-500 hover:bg-blue-50/50 hover:text-blue-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-blue-500 transition"
                  >
                    <span>{t.name}</span>
                    <ArrowRight className="h-3 w-3 text-blue-500" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        </div>

        {/* Footer controls */}
        <div className="shrink-0 mt-6 flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
          {step > 1 && step < 4 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back</span>
            </button>
          ) : step === 4 ? (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Restart Quiz</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 active:scale-95 transition"
            >
              <span>{step === 3 ? "Show Recommendation" : "Continue"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-xs font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-white transition"
            >
              <span>Back to Preview Studio</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
