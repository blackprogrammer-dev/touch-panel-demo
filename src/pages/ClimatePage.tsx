import { Droplets, Thermometer } from 'lucide-react'
import { ArcSlider } from '../components/ArcSlider'
import { Card } from '../components/Card'
import type { Store } from '../data/useDevices'

const A = '#2DD4BF'

export function ClimatePage({ s }: { s: Store }) {
  return (
    <div className="grid gap-4 md:h-full md:grid-cols-2 md:gap-6">
      <Card title="Target" icon={Thermometer} accent={A} order={0} className="flex flex-col justify-center">
        <ArcSlider label="Target" value={s.devices.temperature} min={16} max={30} unit="°C" accent={A} onChange={s.setTemperature} />
      </Card>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-1 md:grid-rows-2 md:gap-6">
        <Card title="Indoor" icon={Thermometer} accent={A} order={1} className="flex flex-col justify-center">
          <p className="text-4xl font-bold md:text-6xl">21.5°C</p>
        </Card>
        <Card title="Humidity" icon={Droplets} accent="#60A5FA" order={2} className="flex flex-col justify-center">
          <p className="text-4xl font-bold md:text-6xl">48%</p>
        </Card>
      </div>
    </div>
  )
}