"use client"

import * as React from "react"
import { ShieldCheck, Cpu, Zap, Database, ArrowRight } from "lucide-react"

interface BentoCardProps {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  badge: string
  className?: string
}

function BentoCard({ title, description, icon: Icon, badge, className = "" }: BentoCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-zinc-700 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="rounded-2xl bg-zinc-100 p-3 text-zinc-900 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-zinc-900 dark:text-zinc-100">
          <Icon className="h-6 w-6" />
        </div>
        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
          {badge}
        </span>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      </div>

      <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
        <span>Explore feature</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  )
}

export function InteractiveBentoGrid() {
  return (
    <div className="mx-auto max-w-6xl py-12 px-6">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-zinc-950 dark:text-zinc-50">
          Architected for modern scale
        </h2>
        <p className="mt-3 text-base text-zinc-500 dark:text-zinc-400">
          Every layer designed for optimal developer experience and zero runtime bloat.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BentoCard
          title="Edge Verification"
          description="Instant validation of incoming payloads with cryptographically signed tokens and zero latency overhead."
          icon={ShieldCheck}
          badge="Security"
          className="md:col-span-2"
        />
        <BentoCard
          title="AI Synthesis"
          description="Real-time multi-agent orchestrations with local inference fallback."
          icon={Cpu}
          badge="Intelligence"
        />
        <BentoCard
          title="Sub-millisecond State"
          description="Synchronized distributed cache with automatic invalidation and optimistic UI updates."
          icon={Zap}
          badge="Speed"
        />
        <BentoCard
          title="Zero-Loss Persistence"
          description="Automatic append-only event sourcing with point-in-time branch snapshots."
          icon={Database}
          badge="Reliability"
          className="md:col-span-2"
        />
      </div>
    </div>
  )
}
