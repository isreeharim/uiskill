"use client"

import * as React from "react"
import { ShieldCheck, Check, RotateCw } from "lucide-react"

export function ChakraPinInputOTP() {
  const [digits, setDigits] = React.useState<string[]>(["", "", "", "", "", ""])
  const [verified, setVerified] = React.useState(false)
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([])

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return
    const next = [...digits]
    next[index] = val.slice(-1)
    setDigits(next)

    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    if (next.every((d) => d !== "")) {
      setVerified(true)
    } else {
      setVerified(false)
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleReset = () => {
    setDigits(["", "", "", "", "", ""])
    setVerified(false)
    inputRefs.current[0]?.focus()
  }

  return (
    <div className="mx-auto w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-950 text-center font-sans">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400">
        <ShieldCheck className="h-6 w-6" />
      </div>

      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
        Chakra / Ark MFA Security
      </span>
      <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">Enter 6-Digit PIN</h3>
      <p className="mt-1 text-xs text-zinc-500">Security code dispatched to your registered authenticator</p>

      {/* 6 Digit Inputs */}
      <div className="my-5 flex items-center justify-center gap-2">
        {digits.map((digit, idx) => (
          <input
            key={idx}
            ref={(el) => {
              inputRefs.current[idx] = el
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(idx, e.target.value)}
            onKeyDown={(e) => handleKeyDown(idx, e)}
            className={`h-11 w-10 text-center font-mono text-lg font-bold rounded-xl border outline-none transition ${
              digit
                ? "border-teal-500 bg-teal-50/20 text-teal-950 dark:bg-teal-950/20 dark:text-teal-100 ring-2 ring-teal-500/20"
                : "border-zinc-200 bg-zinc-50 text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 focus:border-teal-500"
            }`}
          />
        ))}
      </div>

      {verified ? (
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 animate-in fade-in">
          <Check className="h-4 w-4" />
          <span>MFA Code Verified</span>
        </div>
      ) : (
        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-600 mx-auto"
        >
          <RotateCw className="h-3 w-3" />
          <span>Clear digits</span>
        </button>
      )}
    </div>
  )
}
export default ChakraPinInputOTP
