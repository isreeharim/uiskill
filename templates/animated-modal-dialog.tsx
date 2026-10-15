"use client"

import * as React from "react"
import { X, AlertCircle } from "lucide-react"

interface AnimatedModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  inline?: boolean
}

export function AnimatedModalDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm Action",
  cancelText = "Cancel",
  inline = false,
}: AnimatedModalProps) {
  const modalRef = React.useRef<HTMLDivElement>(null)

  // Focus trap & Escape listener
  React.useEffect(() => {
    if (!isOpen || inline) return

    document.body.style.overflow = "hidden"

    // Focus the first button in modal
    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusableElements && focusableElements.length > 0) {
      focusableElements[0].focus()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        onClose()
        return
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusables || focusables.length === 0) return

        const first = focusables[0]
        const last = focusables[focusables.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose, inline])

  if (!isOpen) return null

  if (inline) {
    return (
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className="relative w-full max-w-sm mx-auto overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 text-left font-sans"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-3 top-3 rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-rose-50 p-2 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 shrink-0">
            <AlertCircle className="h-4 w-4" />
          </div>
          <div className="pr-4">
            <h3 id="modal-title" className="text-xs font-bold text-zinc-950 dark:text-zinc-50">
              {title}
            </h3>
            <p id="modal-description" className="mt-1 text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-zinc-200 px-2.5 py-1 text-[11px] font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 transition"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className="rounded-lg bg-rose-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-xs hover:bg-rose-500 active:scale-95 transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl duration-200 animate-in zoom-in-95 dark:border-zinc-800 dark:bg-zinc-950"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 rounded-full p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-4">
          <div className="rounded-2xl bg-rose-50 p-3 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 shrink-0">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div>
            <h3 id="modal-title" className="text-lg font-bold text-zinc-950 dark:text-zinc-50">
              {title}
            </h3>
            <p id="modal-description" className="mt-1.5 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900 transition"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 active:scale-95 transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  )
}
