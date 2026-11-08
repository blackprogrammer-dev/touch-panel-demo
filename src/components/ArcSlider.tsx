import { useRef, useState } from 'react'

type Props = {
  label: string
  value: number
  min: number
  max: number
  unit: string
  accent: string
  onChange: (value: number) => void
}

// Полукруг: центр (150,150), радиус 120, слева (min) направо (max) через верх.
const CX = 150
const CY = 150
const R = 120
const ARC = 'M 30 150 A 120 120 0 0 1 270 150'

export function ArcSlider({ label, value, min, max, unit, accent, onChange }: Props) {
  const svg = useRef<SVGSVGElement>(null)
  const [dragging, setDragging] = useState(false)

  const t = (value - min) / (max - min)
  const angle = Math.PI * (1 - t)
  const thumbX = CX + R * Math.cos(angle)
  const thumbY = CY - R * Math.sin(angle)

  const update = (e: React.PointerEvent) => {
    const r = svg.current!.getBoundingClientRect()
    const px = ((e.clientX - r.left) / r.width) * 300
    const py = ((e.clientY - r.top) / r.height) * 170
    let a = Math.atan2(CY - py, px - CX)
    if (a < 0) a = px < CX ? Math.PI : 0
    onChange(Math.round(min + (1 - a / Math.PI) * (max - min)))
  }

  const step = (delta: number) => onChange(Math.min(max, Math.max(min, value + delta)))
  const dash = `${t * 100} 100`

  return (
    <svg
      ref={svg}
      viewBox="0 0 300 170"
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      className="w-full touch-none select-none outline-none focus-visible:ring-2 focus-visible:ring-white/60"
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
      <path d={ARC} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="20" strokeLinecap="round" />
      {/* дешёвое «свечение»: тот же путь шире и прозрачнее, без filter */}
      <path d={ARC} pathLength={100} strokeDasharray={dash} fill="none" stroke={accent} strokeOpacity="0.18" strokeWidth="34" strokeLinecap="round" />
      <path d={ARC} pathLength={100} strokeDasharray={dash} fill="none" stroke={accent} strokeWidth="20" strokeLinecap="round" />
      <circle cx={thumbX} cy={thumbY} r={dragging ? 19 : 15} fill="#fff" stroke={accent} strokeWidth="5" />
      <text x="150" y="96" textAnchor="middle" fill="#8B9AB0" fontSize="14" fontWeight="600">{label}</text>
      <text x="150" y="142" textAnchor="middle" fill="#E6EDF7" fontSize="46" fontWeight="700">{value}{unit}</text>
    </svg>
  )
}