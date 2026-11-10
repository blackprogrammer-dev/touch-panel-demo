import { Cpu, Flame, SlidersHorizontal, Thermometer, ToggleLeft, ToggleRight, type LucideIcon } from 'lucide-react'
import { Card } from '../components/Card'
import type { Store } from '../data/useDevices'

const ICONS: Record<string, LucideIcon> = {
  m1: ToggleRight,
  m2: ToggleLeft,
  m3: SlidersHorizontal,
  m4: SlidersHorizontal,
  m5: Thermometer,
  m6: Flame,
}

// Что делает модуль прямо сейчас: «в сети» и «работает» это разные вещи
function activity(id: string, online: boolean, d: Store['devices']): { active: boolean; text: string } {
  if (!online) return { active: false, text: 'No connection' }
  const on = Object.values(d.lights).filter(Boolean).length
  if (id === 'm1') return { active: on > 0, text: `${on} of ${Object.keys(d.lights).length} lights on` }
  if (id === 'm3') return on > 0 ? { active: true, text: `Dimming ${d.brightness}%` } : { active: false, text: 'Idle' }
  if (id === 'm5') return { active: true, text: `${d.indoorTemp.toFixed(1)}°C · ${d.humidity}%` }
  if (id === 'm6') return d.boilerOn ? { active: true, text: `Heating to ${d.boilerTemp}°C` } : { active: false, text: 'Idle' }
  return { active: false, text: 'No data' }
}

export function StatusPage({ s }: { s: Store }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:h-full md:grid-cols-3 md:grid-rows-2 md:gap-6">
      {s.devices.modules.map((m, i) => {
        const c = m.online ? '#34D399' : '#F87171'
        const { active, text } = activity(m.id, m.online, s.devices)
        const Icon = ICONS[m.id] ?? Cpu
        return (
          <Card key={m.id} order={i} className="flex min-h-[170px] flex-col justify-between md:min-h-0">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <span
                className="grid size-10 place-items-center rounded-2xl transition-all md:size-12"
                style={{
                  background: c + (m.online && !active ? '14' : '26'),
                  color: m.online && !active ? c + '99' : c,
                  boxShadow: active ? `0 0 20px ${c}55` : 'none',
                }}
              >
                <Icon size={24} />
              </span>
              <span className="flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-semibold md:px-3 md:py-1.5 md:text-sm" style={{ color: c, borderColor: c + '66' }}>
                <span className={`size-2.5 rounded-full ${m.online ? 'animate-pulse' : ''}`} style={{ background: c }} />
                {m.online ? 'Online' : 'Offline'}
              </span>
            </div>
            <div>
              <p className="text-lg font-semibold md:text-2xl">{m.name}</p>
              <p className="mt-1 text-sm md:text-base" style={{ color: active ? c : '#8B9AB0' }}>{text}</p>
            </div>
          </Card>
        )
      })}
    </div>
  )
}