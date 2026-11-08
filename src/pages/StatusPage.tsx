import { Cpu } from 'lucide-react'
import { Card } from '../components/Card'
import type { Store } from '../data/useDevices'

export function StatusPage({ s }: { s: Store }) {
  return (
    <div className="grid grid-cols-2 gap-4 md:h-full md:grid-cols-3 md:grid-rows-2 md:gap-6">
      {s.devices.modules.map((m, i) => {
        const c = m.online ? '#34D399' : '#F87171'
        return (
          <Card key={m.id} order={i} className="flex min-h-[150px] flex-col justify-between md:min-h-0">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <span className="grid size-10 place-items-center md:size-12 rounded-2xl" style={{ background: c + '26', color: c }}>
                <Cpu size={24} />
              </span>
              <span className="flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-semibold md:px-3 md:py-1.5 md:text-sm" style={{ color: c, borderColor: c + '66' }}>
                <span className={`size-2.5 rounded-full ${m.online ? 'animate-pulse' : ''}`} style={{ background: c }} />
                {m.online ? 'Online' : 'Offline'}
              </span>
            </div>
            <p className="text-lg font-semibold md:text-2xl">{m.name}</p>
          </Card>
        )
      })}
    </div>
  )
}