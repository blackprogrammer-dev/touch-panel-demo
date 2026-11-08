import { Droplets, Thermometer } from 'lucide-react'
import { ArcSlider } from '../components/ArcSlider'
import { Card } from '../components/Card'
import type { Store } from '../data/useDevices'

const A = '#2DD4BF'

export function ClimatePage({ s }: { s: Store }) {
  return (
    <div className="grid h-full grid-cols-2 gap-6">
      <Card title="Target" icon={Thermometer} accent={A} order={0} className="flex flex-col justify-center">
        <ArcSlider label="Target" value={s.devices.temperature} min={16} max={30} unit="°C" accent={A} onChange={s.setTemperature} />
      </Card>
      <div className="grid grid-rows-2 gap-6">
        <Card title="Indoor" icon={Thermometer} accent={A} order={1} className="flex flex-col justify-center">
          <p className="text-6xl font-bold">21.5°C</p>
        </Card>
        <Card title="Humidity" icon={Droplets} accent="#60A5FA" order={2} className="flex flex-col justify-center">
          <p className="text-6xl font-bold">48%</p>
        </Card>
      </div>
    </div>
  )
}