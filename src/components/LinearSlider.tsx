import { useRef, useState } from 'react'

type Props = {
  value: number
  min: number
  max: number
  accent: string
  label: string
  ticks?: number // число делений на шкале
  gradient?: string // свой фон дорожки (например, для выбора цвета)
  onChange: (value: number) => void
}

const THUMB = 36

export function LinearSlider({ value, min, max, accent, label, ticks, gradient, onChange }: Props) {
  const track = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const t = (value - min) / (max - min)

  const update = (e: React.PointerEvent) => {
    const r = track.current!.getBoundingClientRect()
    const k = Math.min(1, Math.max(0, (e.clientX - r.left - THUMB / 2) / (r.width - THUMB)))
    onChange(Math.round(min + k * (max - min)))
  }
  const step = (d: number) => onChange(Math.min(max, Math.max(min, value + d)))

  return (
    <div
      ref={track}
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      className="relative h-12 w-full touch-none select-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-white/60"
      style={{ background: gradient ?? 'rgba(255,255,255,0.08)' }}
      onPointerDown={(e) => {
        e.stopPropagation() // не даём странице начать свайп
        e.currentTarget.setPointerCapture(e.pointerId)
        setDragging(true)
        update(e)
      }}
      onPointerMove={(e) => dragging && update(e)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') step(1)
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') step(-1)
      }}
    >
      {!gradient && (
        <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `calc(${THUMB / 2}px + (100% - ${THUMB}px) * ${t})`, background: accent }} />
      )}
      {ticks && (
        <div className="pointer-events-none absolute inset-x-5 inset-y-0 flex items-center justify-between">
          {Array.from({ length: ticks }, (_, i) => (
            <span key={i} className="h-3 w-0.5 rounded bg-white/25" />
          ))}
        </div>
      )}
      <div
        className="absolute top-1/2 -translate-y-1/2 rounded-full border-4 bg-white transition-[width,height]"
        style={{
          width: dragging ? THUMB + 4 : THUMB,
          height: dragging ? THUMB + 4 : THUMB,
          left: `calc((100% - ${THUMB}px) * ${t} - ${dragging ? 2 : 0}px)`,
          borderColor: gradient ? `hsl(${value} 90% 55%)` : accent,
        }}
      />
    </div>
  )
}