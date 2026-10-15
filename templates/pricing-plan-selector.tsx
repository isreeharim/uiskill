"use client"

import * as React from "react"
import { Check, Sparkles } from "lucide-react"

const plans = [
  {
    name: "Starter",
    monthly: 0,
    description: "For personal projects and experiments.",
    features: ["3 projects", "1 team member", "Community support"],
  },
  {
    name: "Pro",
    monthly: 24,
    description: "For growing teams shipping together.",
    features: ["Unlimited projects", "Up to 10 team members", "Priority support"],
    featured: true,
  },
  {
    name: "Scale",
    monthly: 79,
    description: "For organizations with advanced needs.",
    features: ["Unlimited team members", "SAML SSO", "Dedicated success manager"],
  },
]

export function PricingPlanSelector() {
  const [annual, setAnnual] = React.useState(true)
  const [selected, setSelected] = React.useState("Pro")
  const priceFor = (monthly: number) => (annual ? Math.round(monthly * 0.8) : monthly)

  return (
    <section
      aria-labelledby="pricing-title"
      className="mx-auto w-full max-w-5xl rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-600">Simple pricing</p>
          <h2 id="pricing-title" className="mt-1 text-2xl font-bold text-zinc-950 dark:text-white">
            Choose a plan that fits
          </h2>
          <p className="mt-2 text-sm text-zinc-500">Change or cancel anytime.</p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={annual}
          aria-label="Billing cycle toggle"
          onClick={() => setAnnual(!annual)}
          className="inline-flex items-center gap-2 self-start rounded-full bg-zinc-100 p-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
        >
          <span
            className={`rounded-full px-3 py-1.5 transition ${
              !annual ? "bg-white text-zinc-950 shadow-sm dark:bg-zinc-700 dark:text-white" : ""
            }`}
          >
            Monthly
          </span>
          <span
            className={`rounded-full px-3 py-1.5 transition ${
              annual ? "bg-white text-zinc-950 shadow-sm dark:bg-zinc-700 dark:text-white" : ""
            }`}
          >
            Annual <span className="text-emerald-600 font-semibold">-20%</span>
          </span>
        </button>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {plans.map((plan) => {
          const isSelected = selected === plan.name
          const currentPrice = priceFor(plan.monthly)

          return (
            <article
              key={plan.name}
              className={`relative flex flex-col justify-between rounded-2xl border p-5 transition ${
                isSelected
                  ? "border-blue-500 ring-2 ring-blue-500/15"
                  : "border-zinc-200 dark:border-zinc-800"
              } ${plan.featured ? "bg-blue-50/40 dark:bg-blue-950/10" : ""}`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-5 inline-flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
                  <Sparkles className="h-3 w-3" />
                  Most popular
                </span>
              )}

              <div>
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white">{plan.name}</h3>
                <p className="mt-1 min-h-10 text-sm text-zinc-500">{plan.description}</p>
                <div className="mt-5">
                  <p className="text-3xl font-bold text-zinc-950 dark:text-white">
                    ${currentPrice}
                    <span className="text-sm font-normal text-zinc-500">/mo</span>
                  </p>
                  <p className="mt-1 text-xs text-zinc-400">
                    {annual && plan.monthly > 0
                      ? `$${currentPrice * 12} billed annually`
                      : annual
                      ? "Free forever"
                      : "Billed monthly"}
                  </p>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => setSelected(plan.name)}
                  className={`mt-5 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                    isSelected
                      ? "bg-blue-600 text-white hover:bg-blue-500"
                      : "bg-zinc-100 text-zinc-800 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                  }`}
                >
                  {isSelected ? "Selected" : `Choose ${plan.name}`}
                </button>

                <ul className="mt-5 space-y-3 border-t border-zinc-200 pt-5 text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
