import { useState } from 'react'

// Единый слой данных. Сейчас mock; позже заменяется на Home Assistant (REST/WebSocket)
// без изменений в компонентах: они видят только этот хук.
export type Devices = {
  brightness: number
  temperature: number
  lights: Record<string, boolean>
}

const initial: Devices = {
  brightness: 62,
  temperature: 22,
  lights: { 'Main light': true, 'Ambient': false, 'Bathroom': true },
}

export function useDevices() {
  const [devices, setDevices] = useState<Devices>(initial)
  return {
    devices,
    setBrightness: (brightness: number) => setDevices((d) => ({ ...d, brightness })),
    setTemperature: (temperature: number) => setDevices((d) => ({ ...d, temperature })),
    setLight: (name: string, on: boolean) =>
      setDevices((d) => ({ ...d, lights: { ...d.lights, [name]: on } })),
  }
}