import { CheckCircle2, X } from "lucide-react"

interface ToastProps {
  message: string | null
  submessage?: string
  onClose: () => void
}

export function Toast({ message, submessage, onClose }: ToastProps) {
  if (!message) return null

  return (
    <div className="fixed bottom-5 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 flex items-center justify-between gap-3 rounded-2xl border border-black/[0.08] bg-white/90 p-3 sm:px-4 sm:py-3 shadow-xl backdrop-blur-xl animate-in slide-in-from-bottom-2 fade-in dark:border-white/[0.08] dark:bg-[#161617]/90">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="text-xs sm:text-sm font-semibold text-[#1D1D1F] dark:text-[#F5F5F7] truncate">
            {message}
          </p>
          {submessage && (
            <p className="text-[11px] text-[#86868B] truncate">{submessage}</p>
          )}
        </div>
      </div>
      <button
        onClick={onClose}
        aria-label="Dismiss notification"
        className="ml-2 shrink-0 w-6 h-6 rounded-full bg-black/[0.05] dark:bg-white/[0.08] flex items-center justify-center text-[#86868B] hover:text-[#1D1D1F] dark:hover:text-[#F5F5F7] transition active:scale-[0.95]"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}
