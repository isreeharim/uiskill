import { useState, useEffect } from "react"
import { X, Compass, Copy, Check } from "lucide-react"

interface LibraryCrosswalkModalProps {
  isOpen: boolean
  onClose: () => void
  onTriggerToast: (msg: string, sub?: string) => void
}

interface ComponentCrosswalkItem {
  name: string
  description: string
  examples: {
    system: string
    code: string
  }[]
}

const CROSSWALK_DATA: ComponentCrosswalkItem[] = [
  {
    name: "Primary Action Button",
    description: "Syntax comparison for basic variant, size, and icons across libraries",
    examples: [
      {
        system: "shadcn/ui",
        code: `<Button variant="default" size="default">\n  <Plus className="mr-2 h-4 w-4" /> Create Project\n</Button>`,
      },
      {
        system: "Mantine UI",
        code: `<Button variant="filled" color="blue" leftSection={<Plus size={16} />}>\n  Create Project\n</Button>`,
      },
      {
        system: "HeroUI (NextUI)",
        code: `<Button color="primary" variant="solid" startContent={<Plus size={16} />}>\n  Create Project\n</Button>`,
      },
      {
        system: "DaisyUI",
        code: `<button className="btn btn-primary gap-2">\n  <Plus className="w-4 h-4" /> Create Project\n</button>`,
      },
      {
        system: "MUI Material UI",
        code: `<Button variant="contained" color="primary" startIcon={<Plus />}>\n  Create Project\n</Button>`,
      },
      {
        system: "Ant Design",
        code: `<Button type="primary" icon={<PlusOutlined />}>\n  Create Project\n</Button>`,
      },
    ],
  },
  {
    name: "Modal Dialog / Confirmation",
    description: "Overlay dialog syntax and state triggers",
    examples: [
      {
        system: "shadcn/ui",
        code: `<Dialog open={open} onOpenChange={setOpen}>\n  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Confirm Action</DialogTitle>\n    </DialogHeader>\n  </DialogContent>\n</Dialog>`,
      },
      {
        system: "Mantine UI",
        code: `<Modal opened={opened} onClose={close} title="Confirm Action">\n  <Modal.Body>\n    Are you sure?\n  </Modal.Body>\n</Modal>`,
      },
      {
        system: "HeroUI (NextUI)",
        code: `<Modal isOpen={isOpen} onOpenChange={onOpenChange}>\n  <ModalContent>\n    {(onClose) => (\n      <ModalHeader>Confirm Action</ModalHeader>\n    )}\n  </ModalContent>\n</Modal>`,
      },
      {
        system: "DaisyUI",
        code: `<dialog className="modal modal-open">\n  <div className="modal-box">\n    <h3 className="font-bold text-lg">Confirm Action</h3>\n    <div className="modal-action">\n      <button className="btn">Close</button>\n    </div>\n  </div>\n</dialog>`,
      },
    ],
  },
  {
    name: "Data Table / Grid",
    description: "Data density, columns, and virtualization patterns",
    examples: [
      {
        system: "shadcn/ui",
        code: `// Built on TanStack Table v8\nconst table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })\nreturn <Table><TableHeader>...</TableHeader><TableBody>...</TableBody></Table>`,
      },
      {
        system: "MUI Material UI",
        code: `// Built on MUI X DataGrid\n<DataGrid\n  rows={rows}\n  columns={columns}\n  pageSizeOptions={[5, 10, 25]}\n  checkboxSelection\n/>`,
      },
      {
        system: "Ant Design",
        code: `<Table\n  dataSource={dataSource}\n  columns={columns}\n  pagination={{ pageSize: 10 }}\n/>`,
      },
      {
        system: "HeroUI (NextUI)",
        code: `<Table aria-label="Example static collection table">\n  <TableHeader columns={columns}>\n    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}\n  </TableHeader>\n  <TableBody items={rows}>...</TableBody>\n</Table>`,
      },
    ],
  },
]

export function LibraryCrosswalkModal({
  isOpen,
  onClose,
  onTriggerToast,
}: LibraryCrosswalkModalProps) {
  if (!isOpen) return null

  const [activeItem, setActiveItem] = useState(0)
  const current = CROSSWALK_DATA[activeItem]
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  const handleCopy = (code: string, index: number, system: string) => {
    navigator.clipboard.writeText(code)
    setCopiedIndex(index)
    onTriggerToast(`Copied ${system} snippet!`)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col max-h-[88vh] w-full max-w-4xl rounded-3xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 overflow-hidden"
      >
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between border-b border-zinc-200 p-4 sm:p-5 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 text-white shadow-sm shadow-purple-500/30">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-zinc-950 dark:text-zinc-50">
                12-System Component Crosswalk
              </h2>
              <p className="text-xs text-zinc-500">
                Direct syntax translations between modern UI libraries
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-xl border border-zinc-200 p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:border-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-200 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Component Selector Pills */}
        <div className="shrink-0 flex items-center gap-2 border-b border-zinc-200 bg-zinc-50/60 p-3 dark:border-zinc-800 dark:bg-zinc-900/40 overflow-x-auto no-scrollbar">
          {CROSSWALK_DATA.map((item, idx) => (
            <button
              key={item.name}
              onClick={() => setActiveItem(idx)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition ${
                activeItem === idx
                  ? "bg-purple-600 text-white shadow-sm"
                  : "bg-white text-zinc-600 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* Code Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="mb-2">
            <h3 className="text-base font-bold text-zinc-950 dark:text-zinc-50">{current.name}</h3>
            <p className="text-xs text-zinc-500">{current.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {current.examples.map((ex, idx) => (
              <div
                key={ex.system}
                className="flex flex-col rounded-2xl border border-zinc-200 bg-zinc-950 text-zinc-100 overflow-hidden shadow-sm dark:border-zinc-800"
              >
                <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-3.5 py-2">
                  <span className="font-semibold text-xs text-purple-400">{ex.system}</span>
                  <button
                    onClick={() => handleCopy(ex.code, idx, ex.system)}
                    className="flex items-center gap-1 rounded-lg bg-zinc-800 px-2 py-1 text-[11px] font-medium text-zinc-300 hover:bg-zinc-700 hover:text-white transition"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3.5 overflow-x-auto font-mono text-xs leading-relaxed">
                  <pre className="text-zinc-200">{ex.code}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
