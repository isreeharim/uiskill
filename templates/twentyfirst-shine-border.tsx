import { ArrowRight, Zap } from "lucide-react"

export function TwentyFirstShineBorder() {
  return (
    <div className="mx-auto w-full max-w-sm relative rounded-3xl p-[1.5px] bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pulse shadow-xl">
      <div className="relative rounded-[23px] bg-white p-6 dark:bg-zinc-950 text-left">
        <div className="flex items-center justify-between mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25">
            <Zap className="h-5 w-5" />
          </div>
          <span className="rounded-full bg-blue-500/10 px-2.5 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-400">
            21st.dev Shine
          </span>
        </div>

        <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">
          Shine Border Architecture
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          Continuous specular illumination along component perimeter. Built with CSS pseudo-elements and conic gradients.
        </p>

        <div className="mt-5 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">Explore Micro-Motion</span>
          <ArrowRight className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
    </div>
  )
}
export default TwentyFirstShineBorder
