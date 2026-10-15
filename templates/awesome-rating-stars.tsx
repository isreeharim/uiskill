"use client"

import * as React from "react"
import { Star } from "lucide-react"

export function AwesomeRatingStars() {
  const [rating, setRating] = React.useState<number>(4)
  const [hoverRating, setHoverRating] = React.useState<number>(0)

  const labels: Record<number, string> = {
    1: "Needs Critical Work",
    2: "Fair Prototype",
    3: "Good Production Base",
    4: "Excellent Design Standard",
    5: "Exceptional Master-Grade UI",
  }

  const currentScore = hoverRating || rating

  return (
    <div className="mx-auto w-full max-w-sm rounded-3xl border border-zinc-200 bg-white p-6 shadow-md dark:border-zinc-800 dark:bg-zinc-950 text-center font-sans">
      <div className="mb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
          Awesome React Components
        </span>
        <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">Interactive Rating Stars</h3>
        <p className="mt-1 text-xs text-zinc-500">Hover-reactive fractional feedback widget</p>
      </div>

      {/* Stars Row */}
      <div className="my-5 flex items-center justify-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= currentScore
          return (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              className="p-1 transition-transform hover:scale-125 active:scale-95 outline-none"
            >
              <Star
                className={`h-7 w-7 transition-colors ${
                  isFilled
                    ? "fill-amber-400 text-amber-400 drop-shadow-sm"
                    : "text-zinc-300 dark:text-zinc-700"
                }`}
              />
            </button>
          )
        })}
      </div>

      <div className="rounded-2xl bg-zinc-50 p-3 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800">
        <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
          {labels[currentScore] || "Select Rating"}
        </span>
        <p className="text-[11px] text-zinc-400 mt-0.5 font-mono">{currentScore} out of 5 stars</p>
      </div>
    </div>
  )
}
export default AwesomeRatingStars
