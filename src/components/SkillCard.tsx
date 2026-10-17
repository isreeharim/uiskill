import React, { useState, memo } from "react"
import {
  Sparkles,
  ShieldCheck,
  Bug,
  CheckCircle2,
  Compass,
  Cpu,
  Copy,
  Check,
  Maximize2,
  FolderOpen,
  Terminal,
  BookOpen,
  Workflow
} from "lucide-react"
import { AgentSkillItem } from "../data/skills-data"

export interface SkillCardProps {
  skill: AgentSkillItem
  onInspect: (skill: AgentSkillItem) => void
  onTriggerToast: (msg: string, sub?: string) => void
  viewMode?: "grid" | "list"
  density?: "grid" | "list"
}

// Domain styling and icons with subtle, refined Apple palette
function getCategoryTheme(category: string) {
  const baseBadge = "bg-black/[0.04] text-[#1D1D1F] dark:bg-white/[0.06] dark:text-[#F5F5F7] border border-black/[0.06] dark:border-white/[0.08]"

  switch (category) {
    case "UI, Design & Motion":
      return {
        icon: Sparkles,
        badgeBg: baseBadge,
        iconColor: "text-[#0071E3] dark:text-[#2997FF]",
      }
    case "Architecture & Code Review":
      return {
        icon: ShieldCheck,
        badgeBg: baseBadge,
        iconColor: "text-[#0071E3] dark:text-[#2997FF]",
      }
    case "Debugging & Performance":
      return {
        icon: Bug,
        badgeBg: baseBadge,
        iconColor: "text-[#86868B]",
      }
    case "Testing & QA Automation":
      return {
        icon: CheckCircle2,
        badgeBg: baseBadge,
        iconColor: "text-emerald-500",
      }
    case "Product & Planning":
      return {
        icon: Compass,
        badgeBg: baseBadge,
        iconColor: "text-[#0071E3] dark:text-[#2997FF]",
      }
    case "Workflows & Agent Ops":
      return {
        icon: Workflow,
        badgeBg: baseBadge,
        iconColor: "text-[#86868B]",
      }
    default:
      return {
        icon: Cpu,
        badgeBg: baseBadge,
        iconColor: "text-[#86868B]",
      }
  }
}

/**
 * Compact high-density row view for scanning 93 skills rapidly in List View mode
 */
export const SkillRow = memo(function SkillRow({
  skill,
  onInspect,
  onTriggerToast,
}: {
  skill: AgentSkillItem
  onInspect: (skill: AgentSkillItem) => void
  onTriggerToast: (msg: string, sub?: string) => void
}) {
  const [copiedPrompt, setCopiedPrompt] = useState(false)
  const [copiedPath, setCopiedPath] = useState(false)
  const { icon: CategoryIcon, badgeBg, iconColor } = getCategoryTheme(skill.category)

  const handleCopyPrompt = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(skill.activationPrompt)
    setCopiedPrompt(true)
    onTriggerToast(`Copied activation prompt!`, skill.name)
    setTimeout(() => setCopiedPrompt(false), 2000)
  }

  const handleCopyPath = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(skill.path)
    setCopiedPath(true)
    onTriggerToast(`Copied skill path!`, skill.path)
    setTimeout(() => setCopiedPath(false), 2000)
  }

  return (
    <div
      onClick={() => onInspect(skill)}
      className="group relative flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-black/[0.08] bg-white hover:border-black/[0.16] hover:bg-black/[0.01] dark:border-white/[0.08] dark:bg-[#161617] dark:hover:border-white/[0.16] dark:hover:bg-white/[0.02] transition-all duration-150 cursor-pointer"
    >
      {/* Left: Domain Icon, Identifier & Badges */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className={`h-8 w-8 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] flex items-center justify-center shrink-0 ${iconColor} group-hover:scale-105 transition-transform duration-150`}>
          <CategoryIcon className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono font-semibold text-xs text-[#1D1D1F] dark:text-[#F5F5F7] group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF] transition-colors">
              {skill.name}
            </span>
            <span className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium border ${badgeBg} shrink-0`}>
              <span>{skill.category}</span>
            </span>
            <span className="font-mono text-[10px] rounded-md px-1.5 py-0.5 bg-black/[0.04] text-[#86868B] dark:bg-white/[0.06] dark:text-[#86868B] border border-black/[0.06] dark:border-white/[0.08] shrink-0">
              {skill.sourceType}
            </span>
          </div>
          <p className="mt-0.5 text-[11px] text-[#86868B] truncate max-w-xl">
            {skill.description}
          </p>
        </div>
      </div>

      {/* Middle: Short prompt snippet */}
      <div className="hidden xl:flex items-center gap-1.5 text-[11px] font-mono text-[#86868B] shrink-0 max-w-xs truncate">
        <Terminal className="h-3.5 w-3.5 text-[#86868B] shrink-0" />
        <span className="truncate">{skill.activationPrompt}</span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={handleCopyPath}
          title={`Copy skill path: ${skill.path}`}
          className="rounded-lg border border-black/[0.08] bg-black/[0.02] p-1.5 text-[#86868B] hover:text-[#1D1D1F] hover:bg-black/[0.05] dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-[#86868B] dark:hover:text-[#F5F5F7] dark:hover:bg-white/[0.08] transition active:scale-[0.97]"
        >
          {copiedPath ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <FolderOpen className="h-3.5 w-3.5" />}
        </button>

        <button
          onClick={handleCopyPrompt}
          title="Copy 1-click activation prompt"
          className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition active:scale-[0.97] ${
            copiedPrompt
              ? "bg-emerald-600 text-white"
              : "bg-[#1D1D1F] text-white hover:bg-black dark:bg-[#F5F5F7] dark:text-[#1D1D1F] dark:hover:bg-white"
          }`}
        >
          {copiedPrompt ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          <span>{copiedPrompt ? "Copied" : "Copy Prompt"}</span>
        </button>

        <button
          onClick={() => onInspect(skill)}
          title="View full guidelines and instructions"
          className="rounded-lg border border-black/[0.08] bg-black/[0.02] p-1.5 text-[#86868B] hover:text-[#1D1D1F] hover:bg-black/[0.05] dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-[#86868B] dark:hover:text-[#F5F5F7] dark:hover:bg-white/[0.08] transition active:scale-[0.97]"
        >
          <BookOpen className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
})

/**
 * Precision Skill Card modeled after Apple HIG guidelines
 */
export const SkillCard = memo(function SkillCard({
  skill,
  onInspect,
  onTriggerToast,
  viewMode = "grid",
  density,
}: SkillCardProps) {
  const activeMode = density || viewMode

  // If in list mode, render high-density row
  if (activeMode === "list") {
    return (
      <SkillRow
        skill={skill}
        onInspect={onInspect}
        onTriggerToast={onTriggerToast}
      />
    )
  }

  const [copiedPrompt, setCopiedPrompt] = useState(false)
  const [copiedPath, setCopiedPath] = useState(false)
  const { icon: CategoryIcon, badgeBg, iconColor } = getCategoryTheme(skill.category)

  const handleCopyPrompt = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(skill.activationPrompt)
    setCopiedPrompt(true)
    onTriggerToast(`Copied activation prompt!`, skill.name)
    setTimeout(() => setCopiedPrompt(false), 2000)
  }

  const handleCopyPath = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(skill.path)
    setCopiedPath(true)
    onTriggerToast(`Copied skill path!`, skill.path)
    setTimeout(() => setCopiedPath(false), 2000)
  }

  return (
    <div
      onClick={() => onInspect(skill)}
      className="apple-card group relative flex flex-col justify-between rounded-2xl border border-black/[0.08] bg-white dark:border-white/[0.08] dark:bg-[#161617] overflow-hidden cursor-pointer h-[320px]"
    >
      {/* Top Header */}
      <div className="p-4 border-b border-black/[0.06] dark:border-white/[0.06]">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[10px] font-medium ${badgeBg}`}
            >
              <CategoryIcon className={`h-3 w-3 ${iconColor}`} />
              <span>{skill.category}</span>
            </span>

            <span className="font-mono text-[10px] rounded-md px-1.5 py-0.5 bg-black/[0.04] text-[#86868B] dark:bg-white/[0.06] dark:text-[#86868B] border border-black/[0.06] dark:border-white/[0.08]">
              {skill.sourceType}
            </span>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleCopyPath}
              title={`Copy skill path: ${skill.path}`}
              aria-label="Copy skill path"
              className="rounded-lg border border-black/[0.08] bg-black/[0.02] p-1.5 text-[#86868B] hover:text-[#1D1D1F] hover:bg-black/[0.05] dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-[#86868B] dark:hover:text-[#F5F5F7] dark:hover:bg-white/[0.08] transition active:scale-[0.97]"
            >
              {copiedPath ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <FolderOpen className="h-3.5 w-3.5" />}
            </button>

            <button
              onClick={() => onInspect(skill)}
              title="Inspect guidelines and instructions"
              aria-label="Inspect guidelines"
              className="rounded-lg border border-black/[0.08] bg-black/[0.02] p-1.5 text-[#86868B] hover:text-[#1D1D1F] hover:bg-black/[0.05] dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-[#86868B] dark:hover:text-[#F5F5F7] dark:hover:bg-white/[0.08] transition active:scale-[0.97]"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Skill Name */}
        <h3 className="text-sm font-semibold font-mono tracking-tight text-[#1D1D1F] dark:text-[#F5F5F7] group-hover:text-[#0071E3] dark:group-hover:text-[#2997FF] transition-colors truncate">
          {skill.name}
        </h3>

        {/* Description */}
        <p className="mt-1 text-xs text-[#86868B] leading-relaxed line-clamp-2">
          {skill.description}
        </p>
      </div>

      {/* Middle Interactive Activation Box */}
      <div className="p-3.5 bg-[#F5F5F7]/60 dark:bg-[#000000]/30 border-b border-black/[0.06] dark:border-white/[0.06] flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[10px] font-mono text-[#86868B] uppercase tracking-wider mb-1.5">
            <span className="flex items-center gap-1.5">
              <Terminal className="h-3 w-3 text-[#0071E3] dark:text-[#2997FF]" />
              <span>Activation Prompt</span>
            </span>
            <span className="text-[10px] text-[#86868B]">1-Click</span>
          </div>
          <div className="rounded-xl border border-black/[0.08] bg-white p-2.5 font-mono text-[11px] text-[#1D1D1F] dark:border-white/[0.08] dark:bg-[#161617] dark:text-[#F5F5F7] line-clamp-2 select-all leading-snug">
            {skill.activationPrompt}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-2.5 flex flex-wrap gap-1 items-center">
          {skill.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-black/[0.04] px-1.5 py-0.5 text-[10px] font-mono text-[#86868B] dark:bg-white/[0.06] dark:text-[#86868B] border border-black/[0.06] dark:border-white/[0.08]"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-3 bg-white dark:bg-[#161617] flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => onInspect(skill)}
          className="flex items-center gap-1.5 text-xs font-medium text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] transition px-1 py-1"
        >
          <BookOpen className="h-3.5 w-3.5 text-[#86868B]" />
          <span>View Guidelines</span>
        </button>

        <button
          onClick={handleCopyPrompt}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold shadow-xs transition active:scale-[0.97] ${
            copiedPrompt
              ? "bg-emerald-600 text-white"
              : "bg-[#1D1D1F] text-white hover:bg-black dark:bg-[#F5F5F7] dark:text-[#1D1D1F] dark:hover:bg-white"
          }`}
        >
          {copiedPrompt ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          <span>{copiedPrompt ? "Copied" : "Copy Prompt"}</span>
        </button>
      </div>
    </div>
  )
})
