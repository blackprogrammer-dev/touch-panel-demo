type Props = { on: boolean; onChange: (on: boolean) => void; label: string }

export function Toggle({ on, onChange, label }: Props) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => onChange(!on)}
      className={`relative h-10 w-[72px] shrink-0 rounded-full transition-colors ${on ? 'bg-[#E0B15A]' : 'bg-[#3A4856]'}`}
    >
      <span
        className={`absolute left-1 top-1 size-8 rounded-full bg-white transition-transform ${on ? 'translate-x-8' : ''}`}
      />
    </button>
  )
}