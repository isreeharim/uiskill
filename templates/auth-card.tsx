"use client"

import * as React from "react"
import { Eye, EyeOff, CheckCircle2, Loader2 } from "lucide-react"

function Github({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
    </svg>
  )
}

function Chrome({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="10"></circle>
      <circle cx="12" cy="12" r="4"></circle>
      <line x1="21.17" y1="8" x2="12" y2="8"></line>
      <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
      <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
    </svg>
  )
}

type AuthMode = "login" | "signup" | "forgot"

export function AuthCard() {
  const [mode, setMode] = React.useState<AuthMode>("login")
  const [showPassword, setShowPassword] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const [form, setForm] = React.useState({ email: "", password: "", name: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
    }, 1200)
  }

  if (success) {
    return (
      <div className="flex w-full min-h-[440px] items-center justify-center p-4">
        <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm text-center dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 dark:bg-emerald-950/50">
            <CheckCircle2 className="h-7 w-7 text-emerald-500" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            {mode === "forgot" ? "Check your email" : mode === "signup" ? "Account Created!" : "Welcome back!"}
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            {mode === "forgot"
              ? `We sent a password reset link to ${form.email || "your email"}`
              : mode === "signup"
              ? `Your workspace is ready, ${form.name || form.email || "Explorer"}!`
              : `Successfully signed in as ${form.email || "user"}`}
          </p>
          <button
            onClick={() => {
              setSuccess(false)
              setMode("login")
            }}
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition"
          >
            {mode === "login" ? "Sign Out / Reset" : "Continue to Dashboard"}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full min-h-[480px] items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 shadow-lg shadow-blue-500/30">
            <span className="text-2xl font-black text-white">A</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {mode === "login" ? "Welcome back" : mode === "signup" ? "Create an account" : "Reset password"}
          </h1>
          <p className="mt-1.5 text-sm text-zinc-500">
            {mode === "login" ? "Sign in to your account to continue" :
             mode === "signup" ? "Start your free trial today" :
             "We'll send you a link to reset your password"}
          </p>
        </div>

        <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-xs dark:border-zinc-800 dark:bg-zinc-900">
          {/* Social Buttons */}
          {mode !== "forgot" && (
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { icon: Github, label: "GitHub" },
                { icon: Chrome, label: "Google" },
              ].map(({ icon: Icon, label }) => (
                <button key={label} type="button"
                  className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 transition">
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          )}

          {mode !== "forgot" && (
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200 dark:border-zinc-700" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-zinc-400 dark:bg-zinc-900">or continue with email</span>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300">Full Name</label>
                <input type="text" placeholder="Jane Smith" required
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                />
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300">Email</label>
              <input type="email" placeholder="you@example.com" required
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
              />
            </div>

            {mode !== "forgot" && (
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Password</label>
                  {mode === "login" && (
                    <button type="button" onClick={() => setMode("forgot")}
                      className="text-xs text-blue-600 hover:underline dark:text-blue-400">Forgot password?</button>
                  )}
                </div>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} placeholder="••••••••" required minLength={8}
                    value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 pr-10 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition">
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}

            <button type="submit" disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-500 active:scale-[0.98] transition disabled:opacity-70">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {mode === "login" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"}
            </button>
          </form>

          {/* Toggle Mode */}
          <p className="mt-6 text-center text-xs text-zinc-500">
            {mode === "login" ? (
              <>Don't have an account?{" "}
                <button onClick={() => setMode("signup")} className="font-semibold text-blue-600 hover:underline dark:text-blue-400">Sign up</button></>
            ) : (
              <>Already have an account?{" "}
                <button onClick={() => setMode("login")} className="font-semibold text-blue-600 hover:underline dark:text-blue-400">Sign in</button></>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
