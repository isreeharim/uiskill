import React, { useState } from "react"
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

// Domain styling and icons with subtle, refined palette
function getCategoryTheme(category: string) {
  switch (category) {
    case "UI, Design & Motion":
      return {
        icon: Sparkles,
        badgeBg: "bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400 border-purple-200/60 dark:border-purple-800/50",
        iconColor: "text-purple-500",
      }
    case "Architecture & Code Review":
      return {
        icon: ShieldCheck,
        badgeBg: "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 border-blue-200/60 dark:border-blue-800/50",
        iconColor: "text-blue-500",
      }
    case "Debugging & Performance":
      return {
        icon: Bug,
        badgeBg: "bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/50",
        iconColor: "text-amber-500",
      }
    case "Testing & QA Automation":
      return {
        icon: CheckCircle2,
        badgeBg: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-200/60 dark:border-emerald-800/50",
        iconColor: "text-emerald-500",
      }
    case "Product & Planning":
      return {
        icon: Compass,
        badgeBg: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 border-indigo-200/60 dark:border-indigo-800/50",
        iconColor: "text-indigo-500",
      }
    case "Workflows & Agent Ops":
      return {
        icon: Workflow,
        badgeBg: "bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400 border-teal-200/60 dark:border-teal-800/50",
        iconColor: "text-teal-500",
      }
    default:
      return {
        icon: Cpu,
        badgeBg: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-300 border-zinc-200/60 dark:border-zinc-700/60",
        iconColor: "text-zinc-500",
      }
  }
}

/**
 * Compact high-density row view for scanning 93 skills rapidly in List View mode
 */
export function SkillRow({
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
      className="group relative flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-zinc-200/80 bg-white hover:border-zinc-300 hover:bg-zinc-50/70 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/50 transition-all duration-150 cursor-pointer"
    >
      {/* Left: Domain Icon, Identifier & Badges */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className={`h-8 w-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center shrink-0 ${iconColor} group-hover:scale-105 transition-transform duration-150`}>
          <CategoryIcon className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono font-semibold text-xs text-zinc-950 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {skill.name}
            </span>
            <span className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium border ${badgeBg} shrink-0`}>
              <span>{skill.category}</span>
            </span>
            <span className="font-mono text-[10px] rounded-md px-1.5 py-0.5 bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-700/60 shrink-0">
              {skill.sourceType}
            </span>
          </div>
          <p className="mt-0.5 text-[11px] text-zinc-500 dark:text-zinc-400 truncate max-w-xl">
            {skill.description}
          </p>
        </div>
      </div>

      {/* Middle: Short prompt snippet */}
      <div className="hidden xl:flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 dark:text-zinc-500 shrink-0 max-w-xs truncate">
        <Terminal className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
        <span className="truncate">{skill.activationPrompt}</span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={handleCopyPath}
          title={`Copy skill path: ${skill.path}`}
          className="rounded-lg border border-zinc-200 bg-zinc-50 p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition active:scale-[0.97]"
        >
          {copiedPath ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <FolderOpen className="h-3.5 w-3.5" />}
        </button>

        <button
          onClick={handleCopyPrompt}
          title="Copy 1-click activation prompt"
          className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition active:scale-[0.97] ${
            copiedPrompt
              ? "bg-emerald-600 text-white"
              : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          }`}
        >
          {copiedPrompt ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          <span>{copiedPrompt ? "Copied" : "Copy Prompt"}</span>
        </button>

        <button
          onClick={() => onInspect(skill)}
          title="View full guidelines and instructions"
          className="rounded-lg border border-zinc-200 bg-white p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition active:scale-[0.97]"
        >
          <BookOpen className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

/**
 * Precision Skill Card modeled after GitHub & Raycast extension cards
 */
export function SkillCard({
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
  const { icon: CategoryIcon, badgeBg } = getCategoryTheme(skill.category)

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
      className="group relative flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white shadow-xs transition-all duration-200 hover:border-zinc-300 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700/80 overflow-hidden cursor-pointer h-[320px]"
    >
      {/* Top Header */}
      <div className="p-4 border-b border-zinc-100 dark:border-zinc-800/60">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-semibold ${badgeBg}`}
            >
              <CategoryIcon className="h-3 w-3" />
              <span>{skill.category}</span>
            </span>

            <span className="font-mono text-[10px] rounded-md px-1.5 py-0.5 bg-zinc-100 text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-700/60">
              {skill.sourceType}
            </span>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleCopyPath}
              title={`Copy skill path: ${skill.path}`}
              aria-label="Copy skill path"
              className="rounded-lg border border-zinc-200 bg-zinc-50 p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition active:scale-[0.97]"
            >
              {copiedPath ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <FolderOpen className="h-3.5 w-3.5" />}
            </button>
            <button
              onClick={() => onInspect(skill)}
              title="Inspect guidelines and instructions"
              aria-label="Inspect guidelines"
              className="rounded-lg border border-zinc-200 bg-white p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 transition active:scale-[0.97]"
            >
              <Maximize2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Skill Name */}
        <h3 className="text-sm font-bold font-mono tracking-tight text-zinc-950 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
          {skill.name}
        </h3>

        {/* Description */}
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
          {skill.description}
        </p>
      </div>

      {/* Middle Interactive Activation Box */}
      <div className="p-3.5 bg-zinc-50/50 dark:bg-zinc-900/30 border-b border-zinc-100 dark:border-zinc-800/60 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
            <span className="flex items-center gap-1">
              <Terminal className="h-3 w-3 text-blue-500" />
              <span>Activation Prompt</span>
            </span>
            <span className="text-[10px] text-zinc-400">1-Click</span>
          </div>
          <div className="rounded-lg border border-zinc-200/80 bg-white p-2 font-mono text-[11px] text-zinc-700 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 line-clamp-2 select-all leading-snug">
            {skill.activationPrompt}
          </div>
        </div>

        {/* Tags */}
        <div className="mt-2.5 flex flex-wrap gap-1 items-center">
          {skill.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[10px] font-mono text-zinc-500 dark:bg-zinc-800/80 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-800"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-3 bg-white dark:bg-zinc-950 flex items-center justify-between gap-2" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => onInspect(skill)}
          className="flex items-center gap-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition px-1 py-1"
        >
          <BookOpen className="h-3.5 w-3.5 text-zinc-400" />
          <span>View Guidelines</span>
        </button>

        <button
          onClick={handleCopyPrompt}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold shadow-xs transition active:scale-[0.97] ${
            copiedPrompt
              ? "bg-emerald-600 text-white"
              : "bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          }`}
        >
          {copiedPrompt ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          <span>{copiedPrompt ? "Copied" : "Copy Prompt"}</span>
        </button>
      </div>
    </div>
  )
}
