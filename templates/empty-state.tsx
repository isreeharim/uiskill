import { FilePlus2, Upload } from "lucide-react"

export function EmptyState({ onCreate, onImport }: { onCreate?: () => void; onImport?: () => void }) {
  return (
    <section aria-labelledby="empty-state-title" className="flex min-h-80 w-full flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center dark:border-zinc-700 dark:bg-zinc-900/40">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm dark:bg-zinc-800 dark:text-blue-400"><FilePlus2 className="h-6 w-6" /></div>
      <h2 id="empty-state-title" className="mt-5 text-lg font-bold text-zinc-950 dark:text-white">No projects yet</h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-zinc-500">Create a project from scratch or import one to give your team a place to start.</p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row"><button type="button" onClick={onCreate} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"><FilePlus2 className="h-4 w-4" />Create project</button><button type="button" onClick={onImport} className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"><Upload className="h-4 w-4" />Import project</button></div>
    </section>
  )
}
