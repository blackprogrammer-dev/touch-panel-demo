import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

type Props<T extends string> = { value: T; options: readonly T[]; onChange: (v: T) => void }

// Выпадающий список под палец: крупные пункты, закрывается после выбора
export function Select<T extends string>({ value, options, onChange }: Props<T>) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative" onPointerDown={(e) => e.stopPropagation()}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex min-h-12 items-center gap-2 rounded-2xl bg-white/10 px-4 font-semibold transition-transform active:scale-95"
      >
        {value}
        <ChevronDown size={18} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul role="listbox" className="absolute right-0 z-20 mt-2 w-40 rounded-2xl border border-white/10 bg-[#141B2B] p-1 shadow-xl">
          {options.map((o) => (
            <li key={o}>
              <button
                role="option"
                aria-selected={o === value}
                onClick={() => {
                  onChange(o)
                  setOpen(false)
                }}
                className={`min-h-12 w-full rounded-xl px-4 text-left font-medium ${o === value ? 'bg-white/10' : ''}`}
              >
                {o}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}