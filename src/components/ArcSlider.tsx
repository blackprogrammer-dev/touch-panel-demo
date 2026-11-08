import { useRef, useState } from 'react'

type Props = {
  label: string
  value: number
  min: number
  max: number
  unit: string
  onChange: (value: number) => void
}

// Полукруг: центр (150,150), радиус 120, слева (min) направо (max) через верх.
const CX = 150
const CY = 150
const R = 120

export function ArcSlider({ label, value, min, max, unit, onChange }: Props) {
  const svg = useRef<SVGSVGElement>(null)
  const [dragging, setDragging] = useState(false)

  const t = (value - min) / (max - min) // 0..1
  const angle = Math.PI * (1 - t) // π (слева) .. 0 (справа)
  const thumbX = CX + R * Math.cos(angle)
  const thumbY = CY - R * Math.sin(angle)

  const update = (e: React.PointerEvent) => {
    const r = svg.current!.getBoundingClientRect()
    const px = ((e.clientX - r.left) / r.width) * 300
    const py = ((e.clientY - r.top) / r.height) * 170
    let a = Math.atan2(CY - py, px - CX) // -π..π
    if (a < 0) a = px < CX ? Math.PI : 0 // ниже дуги: ближайший край
    onChange(Math.round(min + (1 - a / Math.PI) * (max - min)))
  }

  const step = (delta: number) => onChange(Math.min(max, Math.max(min, value + delta)))

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
      className="w-full touch-none select-none outline-none focus-visible:ring-2 focus-visible:ring-[#E0B15A]"
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
      <path d="M 30 150 A 120 120 0 0 1 270 150" fill="none" stroke="#2A3744" strokeWidth="22" strokeLinecap="round" />
      <path
        d="M 30 150 A 120 120 0 0 1 270 150"
        pathLength={100}
        strokeDasharray={`${t * 100} 100`}
        fill="none"
        stroke="#E0B15A"
        strokeWidth="22"
        strokeLinecap="round"
      />
      <circle cx={thumbX} cy={thumbY} r={dragging ? 17 : 14} fill="#fff" stroke="#E0B15A" strokeWidth="4" />
      <text x="150" y="92" textAnchor="middle" className="fill-[#8FA1B2] text-[14px]">{label}</text>
      <text x="150" y="138" textAnchor="middle" className="fill-[#E8EEF2] text-[44px] font-semibold">{value}{unit}</text>
    </svg>
  )
}