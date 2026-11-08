type Props = { on: boolean; onChange: (on: boolean) => void; label: string; accent: string }

export function Toggle({ on, onChange, label, accent }: Props) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className="relative h-12 w-[84px] shrink-0 rounded-full transition-[background-color,transform] active:scale-95"
      style={{ background: on ? accent : 'rgba(255,255,255,0.12)' }}
    >
      <span className={`absolute left-1 top-1 size-10 rounded-full bg-white transition-transform ${on ? 'translate-x-9' : ''}`} />
    </button>
  )
}