import { Cpu } from 'lucide-react'
import { Card } from '../components/Card'
import type { Store } from '../data/useDevices'

export function StatusPage({ s }: { s: Store }) {
  return (
    <div className="grid h-full grid-cols-3 grid-rows-2 gap-6">
      {s.devices.modules.map((m, i) => {
        const c = m.online ? '#34D399' : '#F87171'
        return (
          <Card key={m.id} order={i} className="flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="grid size-12 place-items-center rounded-2xl" style={{ background: c + '26', color: c }}>
                <Cpu size={24} />
              </span>
              <span className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold" style={{ color: c, borderColor: c + '66' }}>
                <span className={`size-2.5 rounded-full ${m.online ? 'animate-pulse' : ''}`} style={{ background: c }} />
                {m.online ? 'Online' : 'Offline'}
              </span>
            </div>
            <p className="text-2xl font-semibold">{m.name}</p>
          </Card>
        )
      })}
    </div>
  )
}