import { Bath, Lightbulb, Sofa, Sun } from 'lucide-react'
import { ArcSlider } from '../components/ArcSlider'
import { Card } from '../components/Card'
import { Toggle } from '../components/Toggle'
import type { Store } from '../data/useDevices'

const ICONS = { 'Main light': Lightbulb, Ambient: Sofa, Bathroom: Bath } as const
const A = '#FBBF24'

export function LightPage({ s }: { s: Store }) {
  return (
    <div className="grid gap-4 md:h-full md:grid-cols-2 md:gap-6">
      <Card title="Brightness" icon={Sun} accent={A} order={0} className="flex flex-col justify-center">
        <ArcSlider label="Brightness" value={s.devices.brightness} min={0} max={100} unit="%" accent={A} onChange={s.setBrightness} />
      </Card>
      <Card title="Lights" icon={Lightbulb} accent={A} order={1} className="flex flex-col justify-center">
        {Object.entries(s.devices.lights).map(([name, on]) => {
          const Icon = ICONS[name as keyof typeof ICONS]
          return (
            <div key={name} className="flex min-h-[72px] items-center justify-between text-lg font-medium md:min-h-[84px] md:text-xl">
              <span className="flex min-w-0 items-center gap-3 md:gap-4">
                <Icon size={26} style={{ color: on ? A : '#8B9AB0' }} />
                {name}
              </span>
              <Toggle on={on} onChange={(v) => s.setLight(name, v)} label={name} accent={A} />
            </div>
          )
        })}
      </Card>
    </div>
  )
}