import * as React from "react"
import { Smartphone, Globe, Monitor, ExternalLink, Sparkles } from "lucide-react"

export interface CrossPlatformCardProps {
  title?: string
  description?: string
  tag?: string
  platformSupport?: ("iOS" | "Android" | "Web")[]
  onPress?: () => void
}

/**
 * Universal Cross-Platform Interactive Card
 * Inspired by React Native for Web (necolas/react-native-web) and Adobe React Spectrum.
 * Demonstrates platform-agnostic layout tokens, keyboard focus traps, and touch press feedback.
 */
export function UniversalCrossPlatformCard({
  title = "Universal Design System Primitive",
  description = "A single codebase running seamlessly across mobile native (iOS / Android) and desktop Web DOM with zero layout divergence.",
  tag = "Cross-Platform",
  platformSupport = ["Web", "iOS", "Android"],
  onPress,
}: CrossPlatformCardProps) {
  const [isPressed, setIsPressed] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${title}: ${description}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onPress?.()
        }
      }}
      onClick={onPress}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setIsPressed(false)
      }}
      className={`group relative w-full cursor-pointer overflow-hidden rounded-2xl border transition-all duration-200 select-none ${
        isPressed
          ? "scale-[0.985] border-blue-500 bg-blue-50/40 shadow-inner dark:bg-blue-950/20"
          : isHovered
          ? "border-blue-400/80 bg-white shadow-md dark:border-blue-500/40 dark:bg-zinc-900"
          : "border-zinc-200/80 bg-white shadow-xs dark:border-zinc-800 dark:bg-zinc-950"
      } p-6`}
    >
      {/* Top badges */}
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/80 dark:text-blue-300">
          <Sparkles className="h-3 w-3" />
          {tag}
        </span>

        {/* Multi-Platform Badges */}
        <div className="flex items-center gap-1.5">
          {platformSupport.includes("Web") && (
            <span
              title="Desktop & Mobile Web"
              className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
            >
              <Globe className="h-3.5 w-3.5" />
            </span>
          )}
          {platformSupport.includes("iOS") && (
            <span
              title="iOS Native"
              className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
            >
              <Smartphone className="h-3.5 w-3.5" />
            </span>
          )}
          {platformSupport.includes("Android") && (
            <span
              title="Android Native"
              className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
            >
              <Monitor className="h-3.5 w-3.5" />
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mt-4">
        <h3 className="text-base font-semibold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-50 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          {description}
        </p>
      </div>

      {/* Footer link */}
      <div className="mt-5 flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800/80 text-xs text-zinc-400">
        <span>Touch & Keyboard Accessible</span>
        <span className="flex items-center gap-1 font-medium text-blue-600 dark:text-blue-400">
          Inspect Architecture <ExternalLink className="h-3 w-3" />
        </span>
      </div>
    </div>
  )
}
