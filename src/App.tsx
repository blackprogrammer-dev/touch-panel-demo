import { useEffect, useRef, useState, type ReactNode } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from 'framer-motion'
import { useDrag } from '@use-gesture/react'
import { Activity, Lightbulb, Thermometer } from 'lucide-react'
import { useDevices } from './data/useDevices'
import { LightPage } from './pages/LightPage'
import { ClimatePage } from './pages/ClimatePage'
import { StatusPage } from './pages/StatusPage'

const PARALLAX = true // поставьте false, если на Raspberry Pi будут лаги
const SPRING = { type: 'spring', stiffness: 260, damping: 32 } as const
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))

const PAGES = [
  { name: 'Light', icon: Lightbulb },
  { name: 'Climate', icon: Thermometer },
  { name: 'Status', icon: Activity },
]

// Три слоя фона едут медленнее страниц (f = доля сдвига): отсюда глубина
const LAYERS = [
  { f: 0.12, bg: 'radial-gradient(40% 55% at 15% 30%, rgba(251,191,36,.16), transparent 70%), radial-gradient(35% 50% at 85% 75%, rgba(45,212,191,.12), transparent 70%)' },
  { f: 0.3, bg: 'radial-gradient(22% 35% at 30% 15%, rgba(99,102,241,.18), transparent 70%), radial-gradient(25% 40% at 70% 85%, rgba(251,191,36,.10), transparent 70%)' },
  { f: 0.5, bg: 'radial-gradient(10% 18% at 20% 70%, rgba(45,212,191,.14), transparent 70%), radial-gradient(12% 20% at 60% 25%, rgba(129,140,248,.14), transparent 70%)' },
]

function Layer({ x, f, bg, width, k }: { x: MotionValue<number>; f: number; bg: string; width: number; k: number }) {
  const tx = useTransform(x, (v) => v * f * k)
  return <motion.div className="absolute inset-y-0 left-0" style={{ x: tx, width: width * (1 + f * k * (PAGES.length - 1)), background: bg }} />
}

// Глубина: чем дальше страница от центра, тем она меньше и тусклее
function Page({ i, x, width, children }: { i: number; x: MotionValue<number>; width: number; children: ReactNode }) {
  const p = useTransform(x, (v) => Math.min(1, Math.abs(-v / width - i)))
  const scale = useTransform(p, [0, 1], [1, 0.94])
  const opacity = useTransform(p, [0, 1], [1, 0.35])
  return (
    <motion.section className="h-full shrink-0 px-10 pb-8 pt-[104px]" style={{ width, scale, opacity }}>
      {children}
    </motion.section>
  )
}

export default function App() {
  const store = useDevices()
  const [index, setIndex] = useState(0)
  const [width, setWidth] = useState(window.innerWidth)
  const stage = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const reduce = useReducedMotion()
  const k = PARALLAX && !reduce ? 1 : 0

  useEffect(() => {
    const el = stage.current
    if (!el) return
    const ro = new ResizeObserver(() => setWidth(el.clientWidth))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => x.set(-index * width), [width])

  const goTo = (i: number) => {
    setIndex(i)
    animate(x, -i * width, SPRING)
  }

  const bind = useDrag(
    ({ movement: [mx], velocity: [vx], active }) => {
      if (active) {
        x.set(clamp(-index * width + mx, -(PAGES.length - 1) * width - 60, 60))
        return
      }
      const passed = Math.abs(mx) > width * 0.2 || vx > 0.5
      goTo(clamp(index + (passed ? (mx < 0 ? 1 : -1) : 0), 0, PAGES.length - 1))
    },
    { axis: 'x', filterTaps: true },
  )

  return (
    <div ref={stage} {...bind()} className="relative h-full w-full touch-pan-y overflow-hidden bg-[#0A0F1C]">
      {LAYERS.map((l) => (
        <Layer key={l.f} x={x} width={width} k={k} f={l.f} bg={l.bg} />
      ))}

      <nav className="absolute inset-x-0 top-0 z-10 flex justify-center p-5">
        <div className="flex gap-1 rounded-full border border-white/10 bg-white/[0.06] p-1.5">
          {PAGES.map(({ name, icon: Icon }, i) => (
            <button
              key={name}
              onClick={() => goTo(i)}
              className={`flex min-h-12 items-center gap-2 rounded-full px-6 text-lg font-semibold transition-[background-color,color,transform] active:scale-95 ${
                i === index ? 'bg-white text-[#0A0F1C]' : 'text-[#8B9AB0]'
              }`}
            >
              <Icon size={20} />
              {name}
            </button>
          ))}
        </div>
      </nav>

      <motion.div className="relative flex h-full" style={{ x, width: width * PAGES.length }}>
        <Page i={0} x={x} width={width}><LightPage s={store} /></Page>
        <Page i={1} x={x} width={width}><ClimatePage s={store} /></Page>
        <Page i={2} x={x} width={width}><StatusPage s={store} /></Page>
      </motion.div>
    </div>
  )
}