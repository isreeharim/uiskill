import { useState, useEffect } from "react"
import {
  X,
  Copy,
  Check,
  FolderOpen,
  Sparkles,
  Terminal
} from "lucide-react"
import { AgentSkillItem } from "../data/skills-data"
import { copyToClipboard } from "../utils/clipboard"

interface SkillInspectorModalProps {
  skill: AgentSkillItem | null
  onClose: () => void
  onTriggerToast: (msg: string, sub?: string) => void
}

export function SkillInspectorModal({
  skill,
  onClose,
  onTriggerToast,
}: SkillInspectorModalProps) {
  const [activeTab, setActiveTab] = useState<"guidelines" | "overview" | "setup">("guidelines")
  const [copiedPrompt, setCopiedPrompt] = useState(false)
  const [copiedPath, setCopiedPath] = useState(false)
  const [copiedContent, setCopiedContent] = useState(false)

  // Reset state and listen for Escape key
  useEffect(() => {
    if (!skill) return

    setActiveTab("guidelines")
    setCopiedPrompt(false)
    setCopiedPath(false)
    setCopiedContent(false)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [skill?.id, onClose])

  if (!skill) return null

  const handleCopyPrompt = async () => {
    const copied = await copyToClipboard(skill.activationPrompt)
    if (!copied) {
      onTriggerToast("Could not copy prompt", "Clipboard access was unavailable.")
      return
    }
    setCopiedPrompt(true)
    onTriggerToast("Copied activation prompt!", skill.name)
    setTimeout(() => setCopiedPrompt(false), 2000)
  }

  const handleCopyPath = async () => {
    const copied = await copyToClipboard(skill.path)
    if (!copied) {
      onTriggerToast("Could not copy path", "Clipboard access was unavailable.")
      return
    }
    setCopiedPath(true)
    onTriggerToast("Copied skill path!", skill.path)
    setTimeout(() => setCopiedPath(false), 2000)
  }

  const handleCopyContent = async () => {
    const copied = await copyToClipboard(skill.contentPreview)
    if (!copied) {
      onTriggerToast("Could not copy guidelines", "Clipboard access was unavailable.")
      return
    }
    setCopiedContent(true)
    onTriggerToast("Copied skill guidelines!", `${skill.name} instructions`)
    setTimeout(() => setCopiedContent(false), 2000)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/40 dark:bg-black/60 backdrop-blur-xl animate-in fade-in"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="skill-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col w-full max-w-4xl max-h-[90vh] rounded-2xl border border-black/[0.1] dark:border-white/[0.12] bg-white dark:bg-[#161617] shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/[0.06] dark:border-white/[0.06] p-4 sm:p-5 bg-white dark:bg-[#161617]">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              <span className="rounded-md bg-[#0071E3]/10 px-2 py-0.5 text-[10px] sm:text-xs font-medium text-[#0071E3] dark:bg-[#2997FF]/15 dark:text-[#2997FF] border border-[#0071E3]/20 dark:border-[#2997FF]/30">
                {skill.category}
              </span>
              <span className="rounded-md bg-black/[0.04] px-2 py-0.5 text-[10px] sm:text-xs font-mono text-[#86868B] dark:bg-white/[0.06] dark:text-[#86868B] border border-black/[0.06] dark:border-white/[0.08]">
                {skill.sourceType} Skill
              </span>
            </div>
            <h2 id="skill-modal-title" className="text-base sm:text-lg font-mono font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
              {skill.name}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyPrompt}
              className={`flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-xs font-semibold shadow-xs transition active:scale-[0.97] ${
                copiedPrompt
                  ? "bg-emerald-600 text-white"
                  : "bg-[#0071E3] text-white hover:bg-[#0077ED] dark:bg-[#2997FF] dark:text-black dark:hover:bg-[#47A6FF]"
              }`}
            >
              {copiedPrompt ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedPrompt ? "Copied" : "Copy Prompt"}</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close skill inspector"
              className="shrink-0 min-h-[32px] min-w-[32px] w-8 h-8 rounded-full bg-black/[0.05] dark:bg-white/[0.08] hover:bg-black/[0.1] dark:hover:bg-white/[0.14] text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] flex items-center justify-center transition-all active:scale-[0.95]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Path & Tabs Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-5 py-2.5 border-b border-black/[0.06] dark:border-white/[0.06] bg-[#F5F5F7]/80 dark:bg-[#161617]/50">
          {/* File Path Bar */}
          <div className="flex items-center gap-2 text-xs text-[#86868B] truncate max-w-xl">
            <FolderOpen className="h-3.5 w-3.5 text-[#0071E3] dark:text-[#2997FF] shrink-0" />
            <span className="font-mono text-[11px] truncate">{skill.path}</span>
            <button
              onClick={handleCopyPath}
              className="text-[#0071E3] hover:underline dark:text-[#2997FF] text-[11px] font-medium shrink-0"
            >
              {copiedPath ? "Copied!" : "Copy Path"}
            </button>
          </div>

          {/* Segmented Control Navigation */}
          <div
            role="tablist"
            aria-label="Skill details tabs"
            className="flex items-center rounded-lg bg-black/[0.05] dark:bg-white/[0.08] p-0.5 border border-black/[0.04] dark:border-white/[0.06] shrink-0"
          >
            <button
              role="tab"
              aria-selected={activeTab === "guidelines"}
              onClick={() => setActiveTab("guidelines")}
              className={`rounded-md px-3 py-1 text-xs font-medium transition active:scale-[0.98] ${
                activeTab === "guidelines"
                  ? "bg-white text-[#1D1D1F] shadow-xs dark:bg-[#2C2C2E] dark:text-[#F5F5F7]"
                  : "text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]"
              }`}
            >
              Instructions
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
              className={`rounded-md px-3 py-1 text-xs font-medium transition active:scale-[0.98] ${
                activeTab === "overview"
                  ? "bg-white text-[#1D1D1F] shadow-xs dark:bg-[#2C2C2E] dark:text-[#F5F5F7]"
                  : "text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]"
              }`}
            >
              Activation
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "setup"}
              onClick={() => setActiveTab("setup")}
              className={`rounded-md px-3 py-1 text-xs font-medium transition active:scale-[0.98] ${
                activeTab === "setup"
                  ? "bg-white text-[#1D1D1F] shadow-xs dark:bg-[#2C2C2E] dark:text-[#F5F5F7]"
                  : "text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7]"
              }`}
            >
              Integration
            </button>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#F5F5F7]/30 dark:bg-[#000000]/40">
          {activeTab === "guidelines" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                    Skill Knowledge & Execution Guidelines
                  </h3>
                  <p className="text-xs text-[#86868B]">
                    Extracted instructions loaded into the AI agent when this skill is invoked
                  </p>
                </div>

                <button
                  onClick={handleCopyContent}
                  className="flex items-center gap-1.5 rounded-lg border border-black/[0.08] dark:border-white/[0.08] bg-white dark:bg-[#161617] px-3 py-1.5 text-xs font-medium text-[#1D1D1F] dark:text-[#F5F5F7] hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition active:scale-[0.97]"
                >
                  {copiedContent ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedContent ? "Copied" : "Copy Source"}</span>
                </button>
              </div>

              {/* Guidelines Code Viewer */}
              <div className="relative rounded-2xl border border-black/[0.08] bg-black/[0.03] dark:bg-white/[0.03] p-4 font-mono text-xs text-[#1D1D1F] dark:border-white/[0.08] dark:text-[#F5F5F7] max-h-[500px] overflow-y-auto whitespace-pre-wrap leading-relaxed select-text">
                {skill.contentPreview || "No explicit markdown body found in SKILL.md"}
              </div>
            </div>
          )}

          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Description Block */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#86868B] mb-2">
                  Skill Purpose & Capabilities
                </h4>
                <div className="rounded-2xl border border-black/[0.08] bg-white p-4 text-sm text-[#1D1D1F] dark:border-white/[0.08] dark:bg-[#161617] dark:text-[#F5F5F7] leading-relaxed">
                  {skill.description}
                </div>
              </div>

              {/* 1-Click Activation Prompt Box */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#86868B]">
                    Universal Activation Prompt
                  </h4>
                  <button
                    onClick={handleCopyPrompt}
                    className="text-xs font-medium text-[#0071E3] dark:text-[#2997FF] hover:underline"
                  >
                    {copiedPrompt ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="rounded-2xl border border-[#0071E3]/20 bg-[#0071E3]/5 p-4 font-mono text-xs text-[#0071E3] dark:border-[#2997FF]/30 dark:bg-[#2997FF]/10 dark:text-[#2997FF] leading-relaxed">
                  {skill.activationPrompt}
                </div>
                <p className="mt-2 text-xs text-[#86868B]">
                  Tip: Paste this directly into your Antigravity, Claude Code, Cursor, or Codex chat to immediately mount this skill's capabilities.
                </p>
              </div>

              {/* Metadata Attributes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="rounded-xl border border-black/[0.08] bg-white p-3 dark:border-white/[0.08] dark:bg-[#161617]">
                  <span className="text-[11px] text-[#86868B]">Domain</span>
                  <p className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mt-0.5">{skill.category}</p>
                </div>
                <div className="rounded-xl border border-black/[0.08] bg-white p-3 dark:border-white/[0.08] dark:bg-[#161617]">
                  <span className="text-[11px] text-[#86868B]">Mount Type</span>
                  <p className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mt-0.5">{skill.sourceType} Skill</p>
                </div>
                <div className="rounded-xl border border-black/[0.08] bg-white p-3 dark:border-white/[0.08] dark:bg-[#161617]">
                  <span className="text-[11px] text-[#86868B]">Identifier</span>
                  <p className="text-sm font-mono font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] mt-0.5">{skill.id}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "setup" && (
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7]">
                How to Invoke & Activate This Skill
              </h3>
              <p className="text-xs text-[#86868B]">
                Skills adhere to the open AgentSkills specification and can be activated across different AI coding environments.
              </p>

              <div className="space-y-3">
                <div className="rounded-2xl border border-black/[0.08] p-4 dark:border-white/[0.08] bg-white dark:bg-[#161617]">
                  <h4 className="font-semibold text-xs text-[#1D1D1F] dark:text-[#F5F5F7] mb-1 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#0071E3] dark:text-[#2997FF]" />
                    <span>In Google Antigravity / Gemini CLI</span>
                  </h4>
                  <p className="text-xs text-[#86868B] mb-2">
                    Skills located in <code className="text-xs font-mono bg-black/[0.04] dark:bg-white/[0.06] px-1 py-0.5 rounded">~/.gemini/config/skills</code> or <code className="text-xs font-mono bg-black/[0.04] dark:bg-white/[0.06] px-1 py-0.5 rounded">builtin/skills</code> are auto-discovered. You can invoke it naturally or via prompt:
                  </p>
                  <pre className="rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] p-2.5 font-mono text-xs text-[#1D1D1F] dark:text-[#F5F5F7] overflow-x-auto">
                    {`Use the ${skill.name} skill to help me with this task`}
                  </pre>
                </div>

                <div className="rounded-2xl border border-black/[0.08] p-4 dark:border-white/[0.08] bg-white dark:bg-[#161617]">
                  <h4 className="font-semibold text-xs text-[#1D1D1F] dark:text-[#F5F5F7] mb-1 flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-[#0071E3] dark:text-[#2997FF]" />
                    <span>In Claude Code / Codex / Cursor</span>
                  </h4>
                  <p className="text-xs text-[#86868B] mb-2">
                    Reference the full file path directly in the conversation or add it to your project's <code className="text-xs font-mono bg-black/[0.04] dark:bg-white/[0.06] px-1 py-0.5 rounded">.agents/</code> or prompt instructions:
                  </p>
                  <pre className="rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.06] dark:border-white/[0.06] p-2.5 font-mono text-xs text-[#1D1D1F] dark:text-[#F5F5F7] overflow-x-auto">
                    {`Please follow the guidelines in ${skill.path}`}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-black/[0.06] dark:border-white/[0.06] p-4 bg-white dark:bg-[#161617]">
          <button
            onClick={handleCopyPath}
            className="flex items-center gap-1.5 text-xs font-medium text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] transition"
          >
            <FolderOpen className="h-4 w-4 text-[#86868B]" />
            <span>{copiedPath ? "Path Copied!" : "Copy File Path"}</span>
          </button>

          <button
            onClick={handleCopyPrompt}
            className="flex items-center gap-2 rounded-lg bg-[#0071E3] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0077ED] dark:bg-[#2997FF] dark:text-black dark:hover:bg-[#47A6FF] transition active:scale-[0.97]"
          >
            {copiedPrompt ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copiedPrompt ? "Prompt Copied" : "Copy Activation Prompt"}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
