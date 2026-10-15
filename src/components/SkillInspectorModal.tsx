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

  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (skill) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [skill, onClose])

  if (!skill) return null

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(skill.activationPrompt)
    setCopiedPrompt(true)
    onTriggerToast("Copied activation prompt!", skill.name)
    setTimeout(() => setCopiedPrompt(false), 2000)
  }

  const handleCopyPath = () => {
    navigator.clipboard.writeText(skill.path)
    setCopiedPath(true)
    onTriggerToast("Copied skill path!", skill.path)
    setTimeout(() => setCopiedPath(false), 2000)
  }

  const handleCopyContent = () => {
    navigator.clipboard.writeText(skill.contentPreview)
    setCopiedContent(true)
    onTriggerToast("Copied skill guidelines!", `${skill.name} instructions`)
    setTimeout(() => setCopiedContent(false), 2000)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col w-full max-w-4xl max-h-[90vh] rounded-3xl border border-zinc-200/80 bg-white shadow-2xl dark:border-zinc-800/80 dark:bg-zinc-950 overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 p-5 dark:border-zinc-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                {skill.category}
              </span>
              <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                {skill.sourceType} Skill
              </span>
            </div>
            <h2 className="text-xl font-mono font-bold text-zinc-950 dark:text-zinc-50">
              {skill.name}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyPrompt}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold shadow-xs transition active:scale-95 ${
                copiedPrompt
                  ? "bg-emerald-600 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-500"
              }`}
            >
              {copiedPrompt ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span>{copiedPrompt ? "Copied" : "Copy Prompt"}</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close skill inspector"
              className="rounded-xl border border-zinc-200 p-2 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:hover:bg-zinc-900 dark:hover:text-zinc-100 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Path & Tabs Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-3 border-b border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/30">
          {/* File Path Bar */}
          <div className="flex items-center gap-2 text-xs text-zinc-500 truncate max-w-xl">
            <FolderOpen className="h-4 w-4 text-blue-500 shrink-0" />
            <span className="font-mono truncate">{skill.path}</span>
            <button
              onClick={handleCopyPath}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-[11px] font-semibold shrink-0"
            >
              {copiedPath ? "Copied!" : "Copy Path"}
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setActiveTab("guidelines")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === "guidelines"
                  ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
              }`}
            >
              Instructions (SKILL.md)
            </button>
            <button
              onClick={() => setActiveTab("overview")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === "overview"
                  ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
              }`}
            >
              Activation & Prompts
            </button>
            <button
              onClick={() => setActiveTab("setup")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === "setup"
                  ? "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
              }`}
            >
              Agent Integration
            </button>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {activeTab === "guidelines" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
                    Skill Knowledge & Execution Guidelines
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Extracted instructions loaded into the AI agent when this skill is invoked
                  </p>
                </div>

                <button
                  onClick={handleCopyContent}
                  className="flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 transition"
                >
                  {copiedContent ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedContent ? "Copied" : "Copy Source"}</span>
                </button>
              </div>

              {/* Guidelines Code Viewer */}
              <div className="relative rounded-2xl border border-zinc-200 bg-zinc-900 p-4 font-mono text-xs text-zinc-200 dark:border-zinc-800 max-h-[500px] overflow-y-auto whitespace-pre-wrap leading-relaxed select-text">
                {skill.contentPreview || "No explicit markdown body found in SKILL.md"}
              </div>
            </div>
          )}

          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Description Block */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Skill Purpose & Capabilities
                </h4>
                <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-4 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-300 leading-relaxed">
                  {skill.description}
                </div>
              </div>

              {/* 1-Click Activation Prompt Box */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Universal Activation Prompt
                  </h4>
                  <button
                    onClick={handleCopyPrompt}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {copiedPrompt ? "Copied!" : "Copy"}
                  </button>
                </div>
                <div className="rounded-2xl border border-blue-500/30 bg-blue-50/30 p-4 font-mono text-xs text-blue-900 dark:border-blue-900/40 dark:bg-blue-950/20 dark:text-blue-200 leading-relaxed">
                  {skill.activationPrompt}
                </div>
                <p className="mt-2 text-xs text-zinc-500">
                  Tip: Paste this directly into your Antigravity, Claude Code, Cursor, or Codex chat to immediately mount this skill's capabilities.
                </p>
              </div>

              {/* Metadata Attributes */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                  <span className="text-[11px] text-zinc-400">Domain</span>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{skill.category}</p>
                </div>
                <div className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                  <span className="text-[11px] text-zinc-400">Mount Type</span>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{skill.sourceType} Skill</p>
                </div>
                <div className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                  <span className="text-[11px] text-zinc-400">Identifier</span>
                  <p className="text-sm font-mono font-semibold text-zinc-900 dark:text-zinc-100">{skill.id}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "setup" && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-zinc-950 dark:text-zinc-50">
                How to Invoke & Activate This Skill
              </h3>
              <p className="text-xs text-zinc-500">
                Skills adhere to the open AgentSkills specification and can be activated across different AI coding environments.
              </p>

              <div className="space-y-3">
                <div className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
                  <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100 mb-1 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-blue-500" />
                    <span>In Google Antigravity / Gemini CLI</span>
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-2">
                    Skills located in <code className="text-xs font-mono bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded">~/.gemini/config/skills</code> or <code className="text-xs font-mono bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded">builtin/skills</code> are auto-discovered. You can invoke it naturally or via prompt:
                  </p>
                  <pre className="rounded-xl bg-zinc-900 p-2.5 font-mono text-xs text-zinc-200 overflow-x-auto">
                    {`Use the ${skill.name} skill to help me with this task`}
                  </pre>
                </div>

                <div className="rounded-2xl border border-zinc-200 p-4 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40">
                  <h4 className="font-bold text-xs text-zinc-900 dark:text-zinc-100 mb-1 flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-purple-500" />
                    <span>In Claude Code / Codex / Cursor</span>
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-2">
                    Reference the full file path directly in the conversation or add it to your project's <code className="text-xs font-mono bg-zinc-200/60 dark:bg-zinc-800 px-1 py-0.5 rounded">.agents/</code> or prompt instructions:
                  </p>
                  <pre className="rounded-xl bg-zinc-900 p-2.5 font-mono text-xs text-zinc-200 overflow-x-auto">
                    {`Please follow the guidelines in ${skill.path}`}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-zinc-200 p-4 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950">
          <button
            onClick={handleCopyPath}
            className="flex items-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition"
          >
            <FolderOpen className="h-4 w-4 text-zinc-400" />
            <span>{copiedPath ? "Path Copied!" : "Copy File Path"}</span>
          </button>

          <button
            onClick={handleCopyPrompt}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-blue-500 transition active:scale-95"
          >
            {copiedPrompt ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copiedPrompt ? "Prompt Copied to Clipboard" : "Copy Activation Prompt"}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
