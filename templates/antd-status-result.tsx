"use client"

import * as React from "react"
import { CheckCircle2, AlertCircle, RefreshCw } from "lucide-react"

export function AntdStatusResult() {
  const [status, setStatus] = React.useState<"success" | "error" | "processing">("success")

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-950 text-center">
      <div className="flex justify-center gap-1.5 mb-5 bg-zinc-100 dark:bg-zinc-900 p-1 rounded-2xl w-fit mx-auto text-xs">
        {(["success", "error", "processing"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`rounded-xl px-3 py-1 font-semibold capitalize transition ${
              status === s
                ? "bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-zinc-100"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {status === "success" && (
        <div className="animate-in fade-in zoom-in-95 duration-200">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">Operation Successful</h3>
          <p className="mt-1 text-xs text-zinc-500 max-w-xs mx-auto">
            Order #20491823 has been confirmed. Invoices have been dispatched to your primary email address.
          </p>
          <button className="mt-5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition">
            Go to Console
          </button>
        </div>
      )}

      {status === "error" && (
        <div className="animate-in fade-in zoom-in-95 duration-200">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">Submission Failed</h3>
          <p className="mt-1 text-xs text-zinc-500 max-w-xs mx-auto">
            Please check your card credentials or network connectivity before re-attempting authorization.
          </p>
          <button className="mt-5 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-500 transition">
            Retry Payment
          </button>
        </div>
      )}

      {status === "processing" && (
        <div className="animate-in fade-in zoom-in-95 duration-200">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
            <RefreshCw className="h-8 w-8 animate-spin" />
          </div>
          <h3 className="text-lg font-bold text-zinc-950 dark:text-zinc-50">Building Edge Replica</h3>
          <p className="mt-1 text-xs text-zinc-500 max-w-xs mx-auto">
            Synchronizing cluster nodes and issuing cryptographic TLS certificates.
          </p>
          <span className="inline-block mt-4 text-[11px] font-mono text-zinc-400">Elapsed: 4.2s</span>
        </div>
      )}
    </div>
  )
}
export default AntdStatusResult
