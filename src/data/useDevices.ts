import { useState } from 'react'
import { getEnergy } from './energy'

// Единый слой данных. Сейчас mock; позже заменяется на Home Assistant (REST/WebSocket)
// без изменений в компонентах: они видят только этот хук.
export type Mod = { id: string; name: string; online: boolean }
type Devices = {
  brightness: number
  temperature: number
  lights: Record<string, boolean>
  hue: number
  scene: string
  boilerOn: boolean
  boilerTemp: number
  acMode: string
  modules: Mod[]
}

const initial: Devices = {
  brightness: 62,
  temperature: 22,
  lights: { 'Main light': true, Ambient: false, Bathroom: true },
  hue: 40,
  scene: 'evening',
  boilerOn: true,
  boilerTemp: 55,
  acMode: 'cool',
  modules: [
    { id: 'm1', name: '3 Switch Module', online: true },
    { id: 'm2', name: '6 Switch Module', online: false },
    { id: 'm3', name: 'AC Dimming', online: true },
    { id: 'm4', name: 'DC Dimming', online: false },
    { id: 'm5', name: 'Sensors', online: true },
    { id: 'm6', name: 'Floor Heating', online: true },
  ],
}

export function useDevices() {
  const [devices, setDevices] = useState<Devices>(initial)
  return {
    devices,
    setBrightness: (brightness: number) => setDevices((d) => ({ ...d, brightness })),
    setTemperature: (temperature: number) => setDevices((d) => ({ ...d, temperature })),
    setLight: (name: string, on: boolean) => setDevices((d) => ({ ...d, lights: { ...d.lights, [name]: on } })),
    update: (patch: Partial<Devices>) => setDevices((d) => ({ ...d, ...patch })),
    getEnergy,
  }
}

export type Store = ReturnType<typeof useDevices>