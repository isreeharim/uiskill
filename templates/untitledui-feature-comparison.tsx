import { Check, Minus } from "lucide-react"

interface FeatureRow {
  name: string
  starter: boolean
  pro: boolean
  enterprise: boolean
}

const FEATURES: FeatureRow[] = [
  { name: "Live Preview Sandbox", starter: true, pro: true, enterprise: true },
  { name: "1-Click TSX Source Export", starter: true, pro: true, enterprise: true },
  { name: "93 AgentSkills Integration", starter: false, pro: true, enterprise: true },
  { name: "Custom OKLCH Token Algorithmic Palette", starter: false, pro: true, enterprise: true },
  { name: "Self-Hosted Private Registry & SAML SSO", starter: false, pro: false, enterprise: true },
]

export function UntitledUIFeatureComparison() {
  return (
    <div className="mx-auto w-full max-w-lg overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-950 font-sans">
      <div className="mb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Untitled UI React System
        </span>
        <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">Feature Comparison Matrix</h3>
        <p className="mt-0.5 text-xs text-zinc-500">Figma-to-code enterprise B2B SaaS pricing table</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-bold">
              <th className="py-2.5 px-2 text-zinc-500">Capability</th>
              <th className="py-2.5 px-2 text-center text-zinc-700 dark:text-zinc-300">Free</th>
              <th className="py-2.5 px-2 text-center text-blue-600 dark:text-blue-400">Pro</th>
              <th className="py-2.5 px-2 text-center text-purple-600 dark:text-purple-400">Enterprise</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
            {FEATURES.map((f, i) => (
              <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40">
                <td className="py-2.5 px-2 font-medium text-zinc-800 dark:text-zinc-200">{f.name}</td>
                <td className="py-2.5 px-2 text-center">
                  {f.starter ? (
                    <Check className="h-4 w-4 text-emerald-500 mx-auto" />
                  ) : (
                    <Minus className="h-4 w-4 text-zinc-300 dark:text-zinc-600 mx-auto" />
                  )}
                </td>
                <td className="py-2.5 px-2 text-center">
                  {f.pro ? (
                    <Check className="h-4 w-4 text-blue-600 mx-auto" />
                  ) : (
                    <Minus className="h-4 w-4 text-zinc-300 dark:text-zinc-600 mx-auto" />
                  )}
                </td>
                <td className="py-2.5 px-2 text-center">
                  <Check className="h-4 w-4 text-purple-600 mx-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default UntitledUIFeatureComparison
