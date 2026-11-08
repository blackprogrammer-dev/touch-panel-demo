import { useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'
import { useDrag } from '@use-gesture/react'
import { useDevices } from './data/useDevices'
import { ArcSlider } from './components/ArcSlider'
import { Toggle } from './components/Toggle'

const PAGES = ['Light', 'Climate'] as const
const SPRING = { type: 'spring', stiffness: 260, damping: 32 } as const
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v))

export default function App() {
  const { devices, setBrightness, setTemperature, setLight } = useDevices()
  const [index, setIndex] = useState(0)
  const [width, setWidth] = useState(window.innerWidth)
  const stage = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)

  useEffect(() => {
    const el = stage.current
    if (!el) return
    const ro = new ResizeObserver(() => setWidth(el.clientWidth))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // при смене размера окна остаёмся на текущей странице
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => x.set(-index * width), [width])

  // переход из меню выглядит как свайп: та же пружина
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

  // На Raspberry Pi без живого blur: полупрозрачные панели дешевле для GPU
  const card = 'rounded-3xl bg-white/[0.07] p-8'

  return (
    <div ref={stage} {...bind()} className="relative h-full w-full touch-pan-y overflow-hidden bg-[#101820]">
      <nav className="absolute inset-x-0 top-0 z-10 flex justify-center gap-2 p-5">
        {PAGES.map((name, i) => (
          <button
            key={name}
            onClick={() => goTo(i)}
            className={`min-h-12 min-w-32 rounded-full px-6 text-lg transition-colors ${
              i === index ? 'bg-[#E0B15A] text-[#101820]' : 'bg-white/10 text-[#E8EEF2]'
            }`}
          >
            {name}
          </button>
        ))}
      </nav>

      <motion.div className="flex h-full" style={{ x, width: width * PAGES.length }}>
        <section className="flex h-full items-center justify-center gap-8 px-16 pt-24" style={{ width }}>
          <div className={`${card} w-[420px]`}>
            <ArcSlider label="Brightness" value={devices.brightness} min={0} max={100} unit="%" onChange={setBrightness} />
          </div>
          <div className={`${card} w-[420px]`}>
            {Object.entries(devices.lights).map(([name, on]) => (
              <div key={name} className="flex min-h-16 items-center justify-between text-xl">
                {name}
                <Toggle on={on} onChange={(v) => setLight(name, v)} label={name} />
              </div>
            ))}
          </div>
        </section>

        <section className="flex h-full items-center justify-center gap-8 px-16 pt-24" style={{ width }}>
          <div className={`${card} w-[420px]`}>
            <ArcSlider label="Target" value={devices.temperature} min={16} max={30} unit="°C" onChange={setTemperature} />
          </div>
          <div className={`${card} w-[420px] text-xl`}>
            <p className="text-[#8FA1B2]">Indoor</p>
            <p className="text-5xl font-semibold">21.5°C</p>
            <p className="mt-6 text-[#8FA1B2]">Humidity</p>
            <p className="text-5xl font-semibold">48%</p>
          </div>
        </section>
      </motion.div>
    </div>
  )
}