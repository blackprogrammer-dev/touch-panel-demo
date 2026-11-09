import { Zap } from 'lucide-react'
import { useState } from 'react'
import { Card } from '../components/Card'
import { EnergyChart } from '../components/EnergyChart'
import { Select } from '../components/Select'
import { PERIODS, type Period } from '../data/energy'
import type { Store } from '../data/useDevices'

const A = '#FBBF24'

export function EnergyPage({ s }: { s: Store }) {
  const [period, setPeriod] = useState<Period>('Week')
  const data = s.getEnergy(period)
  const vals = data.map((d) => d.kwh)
  const total = vals.reduce((a, b) => a + b, 0)
  const stats = [
    ['Total', `${total.toFixed(1)} kWh`],
    ['Peak', `${Math.max(...vals).toFixed(1)} kWh`],
    ['Average', `${(total / vals.length).toFixed(1)} kWh`],
  ]
  return (
    <Card title="Electricity consumption" icon={Zap} accent={A} className="md:h-full">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-6 md:gap-10">
          {stats.map(([k, v]) => (
            <div key={k}>
              <p className="text-sm text-[#8B9AB0]">{k}</p>
              <p className="text-xl font-bold md:text-3xl">{v}</p>
            </div>
          ))}
        </div>
        <Select value={period} options={PERIODS} onChange={setPeriod} />
      </div>
      <div className="mt-4 h-[280px] md:mt-6 md:h-[360px]">
        <EnergyChart data={data} accent={A} />
      </div>
    </Card>
  )
}