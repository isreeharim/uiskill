"use client"

import * as React from "react"

export function ReshapedTokenSlider() {
  const [val, setVal] = React.useState<number>(64)

  return (
    <div className="mx-auto w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-950 font-sans text-center">
      <div className="mb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Reshaped Token System
        </span>
        <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">Token-Driven Range Slider</h3>
        <p className="mt-1 text-xs text-zinc-500">Controls native --rs-space tokens dynamically</p>
      </div>

      <div className="my-6 px-2">
        <div className="flex items-center justify-between text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300 mb-2">
          <span>0px</span>
          <span className="text-indigo-600 dark:text-indigo-400 text-sm">{val}px</span>
          <span>128px</span>
        </div>

        <input
          type="range"
          min="0"
          max="128"
          step="8"
          value={val}
          onChange={(e) => setVal(Number(e.target.value))}
          className="w-full h-2 rounded-lg bg-zinc-200 dark:bg-zinc-800 accent-indigo-600 cursor-pointer"
        />

        <div className="flex justify-between text-[10px] text-zinc-400 mt-2 font-mono">
          <span>--rs-unit-0</span>
          <span>--rs-unit-8</span>
          <span>--rs-unit-16</span>
        </div>
      </div>

      <div className="rounded-2xl bg-zinc-50 p-3 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800 text-xs flex items-center justify-between">
        <span className="text-zinc-500">Resolved CSS Property:</span>
        <code className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">
          padding: {val}px
        </code>
      </div>
    </div>
  )
}
export default ReshapedTokenSlider
