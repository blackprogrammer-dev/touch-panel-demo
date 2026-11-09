import { Fan, Flame, RefreshCw, Snowflake, Thermometer, Wind } from 'lucide-react'
import { ArcSlider } from '../components/ArcSlider'
import { Card } from '../components/Card'
import { LinearSlider } from '../components/LinearSlider'
import { Segmented } from '../components/Segmented'
import { Toggle } from '../components/Toggle'
import type { Store } from '../data/useDevices'

const A = '#2DD4BF'
const BOILER = '#FB7185'
const MODES = [
  { id: 'cool', label: 'Cool', icon: Snowflake },
  { id: 'heat', label: 'Heat', icon: Flame },
  { id: 'fan', label: 'Fan', icon: Fan },
  { id: 'auto', label: 'Auto', icon: RefreshCw },
]

export function ClimatePage({ s }: { s: Store }) {
  const d = s.devices
  return (
    <div className="grid gap-4 md:h-full md:grid-cols-2 md:gap-6">
      <Card title="Target" icon={Thermometer} accent={A} order={0}>
        <ArcSlider label="Target" value={d.temperature} min={16} max={30} unit="°C" accent={A} onChange={s.setTemperature} />
      </Card>
      <div className="grid gap-4 md:grid-rows-3 md:gap-6">
        <Card title="Indoor" icon={Thermometer} accent={A} order={1}>
          <div className="flex gap-8">
            <div>
              <p className="text-sm text-[#8B9AB0]">Temperature</p>
              <p className="text-4xl font-bold md:text-5xl">21.5°C</p>
            </div>
            <div>
              <p className="text-sm text-[#8B9AB0]">Humidity</p>
              <p className="text-4xl font-bold md:text-5xl">48%</p>
            </div>
          </div>
        </Card>
        <Card title="Boiler" icon={Flame} accent={BOILER} order={2}>
          <div className="flex flex-wrap items-center gap-3 md:flex-nowrap md:gap-4">
            <span className="text-3xl font-bold md:order-1 md:w-24">{d.boilerTemp}°C</span>
            <div className="order-last w-full md:order-2 md:w-auto md:flex-1">
              <LinearSlider value={d.boilerTemp} min={45} max={65} ticks={11} accent={BOILER} label="Boiler temperature" onChange={(boilerTemp) => s.update({ boilerTemp })} />
            </div>
            <div className="ml-auto md:order-3">
              <Toggle on={d.boilerOn} onChange={(boilerOn) => s.update({ boilerOn })} label="Boiler" accent={BOILER} />
            </div>
          </div>
        </Card>
        <Card title="Air conditioner" icon={Wind} accent="#60A5FA" order={3}>
          <Segmented options={MODES} value={d.acMode} onChange={(acMode) => s.update({ acMode })} accent="#60A5FA" />
        </Card>
      </div>
    </div>
  )
}