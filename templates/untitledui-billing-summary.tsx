import { CreditCard, Download, ExternalLink } from "lucide-react"

export function UntitledUIBillingSummary() {
  return (
    <div className="mx-auto w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-950 font-sans">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Untitled UI Billing
          </span>
          <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">Active Subscription</h3>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
          Auto-Renews
        </span>
      </div>

      <div className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-zinc-800 dark:text-zinc-200">Scale Enterprise Plan</span>
          <span className="font-extrabold text-zinc-950 dark:text-zinc-50">$149 / mo</span>
        </div>
        <p className="mt-1 text-[11px] text-zinc-500">Next billing date: November 1, 2026</p>

        <div className="mt-3 flex items-center justify-between pt-3 border-t border-zinc-200/60 dark:border-zinc-800 text-xs">
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
            <CreditCard className="h-4 w-4 text-blue-500" />
            <span className="font-mono text-[11px]">•••• 4920</span>
          </div>
          <button className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline">
            Update Card
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs">
        <button className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100">
          <Download className="h-3.5 w-3.5" />
          <span>Download PDF Invoices</span>
        </button>
        <button className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1">
          <span>Manage Plan</span>
          <ExternalLink className="h-3 w-3" />
        </button>
      </div>
    </div>
  )
}
export default UntitledUIBillingSummary
