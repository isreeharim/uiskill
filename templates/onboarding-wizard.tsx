"use client"

import * as React from "react"
import { ArrowLeft, ArrowRight, Check, CircleUserRound, Rocket, Users } from "lucide-react"

const steps = [
  { title: "Your workspace", description: "Give your team a recognizable home.", icon: CircleUserRound },
  { title: "Invite your team", description: "Collaboration works better together.", icon: Users },
  { title: "You are ready", description: "A few details and you can get started.", icon: Rocket },
]

export function OnboardingWizard() {
  const [step, setStep] = React.useState(0)
  const [workspace, setWorkspace] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [complete, setComplete] = React.useState(false)
  const current = steps[step]

  function next() {
    if (step === 0 && !workspace.trim()) return
    if (step === steps.length - 1) setComplete(true)
    else setStep((value) => value + 1)
  }

  if (complete) {
    return (
      <section aria-labelledby="onboarding-complete-title" className="mx-auto w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
          <Check className="h-7 w-7" />
        </div>
        <h2 id="onboarding-complete-title" className="mt-5 text-xl font-bold text-zinc-950 dark:text-white">
          Your workspace is ready!
        </h2>
        <p className="mt-2 text-sm text-zinc-500">
          Welcome to <strong>{workspace || "your new workspace"}</strong>.
          {email ? ` An invite has been sent to ${email}.` : " You can invite more teammates anytime."}
        </p>
        <button
          type="button"
          onClick={() => {
            setStep(0)
            setComplete(false)
            setWorkspace("")
            setEmail("")
          }}
          className="mt-6 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-950 transition"
        >
          Start Over
        </button>
      </section>
    )
  }

  return (
    <section aria-labelledby="onboarding-title" className="mx-auto w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-950">
      <ol aria-label="Onboarding progress" className="mb-8 flex items-center gap-2">
        {steps.map((item, index) => (
          <li
            key={item.title}
            aria-current={index === step ? "step" : undefined}
            className={`h-1.5 flex-1 rounded-full transition-all ${
              index <= step ? "bg-blue-600" : "bg-zinc-100 dark:bg-zinc-800"
            }`}
          />
        ))}
      </ol>

      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
        <current.icon className="h-5 w-5" />
      </div>
      <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-blue-600">
        Step {step + 1} of {steps.length}
      </p>
      <h2 id="onboarding-title" className="mt-2 text-2xl font-bold tracking-tight text-zinc-950 dark:text-white">
        {current.title}
      </h2>
      <p className="mt-2 text-sm text-zinc-500">{current.description}</p>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          next()
        }}
        className="mt-7"
      >
        {step === 0 && (
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Workspace name
            <input
              value={workspace}
              onChange={(event) => setWorkspace(event.target.value)}
              placeholder="Acme Inc."
              required
              className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </label>
        )}
        {step === 1 && (
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
            Teammate email <span className="font-normal text-zinc-400">(optional)</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="teammate@acme.com"
              className="mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </label>
        )}
        {step === 2 && (
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
            <p className="font-semibold text-zinc-950 dark:text-white">{workspace || "Your workspace"}</p>
            {email && <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">Invited: {email}</p>}
            <p className="mt-1">You can change workspace settings later from the team settings menu.</p>
          </div>
        )}

        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => setStep((value) => value - 1)}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 disabled:invisible dark:text-zinc-300 dark:hover:bg-zinc-900 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </button>
          <button
            type="submit"
            disabled={step === 0 && !workspace.trim()}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition"
          >
            <span>{step === steps.length - 1 ? "Launch workspace" : "Continue"}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </form>
    </section>
  )
}
