import type { LucideIcon } from 'lucide-react'

type Option = { id: string; label: string; icon: LucideIcon }
type Props = { options: Option[]; value: string; onChange: (id: string) => void; accent: string }

// Сегментные кнопки: режим кондиционера, сцены освещения
export function Segmented({ options, value, onChange, accent }: Props) {
  return (
    <div className="flex gap-1 rounded-2xl bg-white/[0.06] p-1" onPointerDown={(e) => e.stopPropagation()}>
      {options.map(({ id, label, icon: Icon }) => {
        const on = id === value
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl px-2 text-sm font-semibold transition-[background-color,color,transform] active:scale-95 md:text-base"
            style={{ background: on ? accent : 'transparent', color: on ? '#0A0F1C' : '#8B9AB0' }}
          >
            <Icon size={18} />
            <span className={on ? '' : 'hidden sm:inline'}>{label}</span>
          </button>
        )
      })}
    </div>
  )
}