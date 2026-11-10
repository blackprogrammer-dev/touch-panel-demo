import { useEffect, useState } from 'react'
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
  indoorTemp: number
  humidity: number
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
  indoorTemp: 21.5,
  humidity: 48,
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

  // Имитация датчиков: температура в комнате плавно идёт к заданной, влажность слегка плавает.
  // Если ничего не изменилось, состояние не трогаем (лишние перерисовки на слабом железе не нужны).
  useEffect(() => {
    const id = setInterval(() => {
      setDevices((d) => {
        const diff = d.temperature - d.indoorTemp
        const step = Math.min(0.2, Math.abs(diff))
        const indoorTemp = Math.round((d.indoorTemp + Math.sign(diff) * step) * 10) / 10
        const humidity = 48 + Math.round(3 * Math.sin(Date.now() / 20000))
        return indoorTemp === d.indoorTemp && humidity === d.humidity ? d : { ...d, indoorTemp, humidity }
      })
    }, 2000)
    return () => clearInterval(id)
  }, [])

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