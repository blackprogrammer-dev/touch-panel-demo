import { Bath, Film, Lightbulb, Moon, Sofa, Sun, Sunset } from 'lucide-react'
import { ArcSlider } from '../components/ArcSlider'
import { Card } from '../components/Card'
import { LinearSlider } from '../components/LinearSlider'
import { Segmented } from '../components/Segmented'
import { Toggle } from '../components/Toggle'
import type { Store } from '../data/useDevices'

const ICONS = { 'Main light': Lightbulb, Ambient: Sofa, Bathroom: Bath } as const
const SCENES = [
  { id: 'welcome', label: 'Welcome', icon: Sun },
  { id: 'evening', label: 'Evening', icon: Sunset },
  { id: 'night', label: 'Night', icon: Moon },
  { id: 'movie', label: 'Movie', icon: Film },
]
const HUE = 'linear-gradient(90deg,hsl(0 90% 55%),hsl(60 90% 55%),hsl(120 90% 55%),hsl(180 90% 55%),hsl(240 90% 55%),hsl(300 90% 55%),hsl(360 90% 55%))'
const A = '#FBBF24'

export function LightPage({ s }: { s: Store }) {
  const d = s.devices
  return (
    <div className="grid gap-4 md:h-full md:grid-cols-2 md:gap-6">
      <Card title="Brightness" icon={Sun} accent={A} order={0}>
        <ArcSlider label="Brightness" value={d.brightness} min={0} max={100} unit="%" accent={A} onChange={s.setBrightness} />
      </Card>
      <Card title="Lights" icon={Lightbulb} accent={A} order={1}>
        {Object.entries(d.lights).map(([name, on]) => {
          const Icon = ICONS[name as keyof typeof ICONS]
          return (
            <div key={name} className="flex min-h-[72px] items-center justify-between text-lg font-medium md:text-xl">
              <span className="flex min-w-0 items-center gap-3 md:gap-4">
                <Icon size={26} style={{ color: on ? A : '#8B9AB0' }} />
                {name}
              </span>
              <Toggle on={on} onChange={(v) => s.setLight(name, v)} label={name} accent={A} />
            </div>
          )
        })}
        <p className="mb-2 mt-3 text-sm text-[#8B9AB0]">Color</p>
        <LinearSlider value={d.hue} min={0} max={360} accent={A} label="Color" gradient={HUE} onChange={(hue) => s.update({ hue })} />
        <p className="mb-2 mt-4 text-sm text-[#8B9AB0]">Scene</p>
        <Segmented options={SCENES} value={d.scene} onChange={(scene) => s.update({ scene })} accent={A} />
      </Card>
    </div>
  )
}