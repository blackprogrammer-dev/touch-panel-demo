export type Period = 'Day' | 'Week' | 'Month'
export const PERIODS: Period[] = ['Day', 'Week', 'Month']
export type Point = { label: string; kwh: number }

// Mock-данные потребления. Позже заменяются запросом к Home Assistant.
const wave = (i: number, n: number, base: number, amp: number) =>
  Math.max(0.1, Math.round((base + amp * Math.sin((i / n) * Math.PI * 3) + amp * 0.4 * Math.sin(i * 1.7)) * 10) / 10)

export function getEnergy(period: Period): Point[] {
  if (period === 'Day') return Array.from({ length: 24 }, (_, h) => ({ label: `${h}:00`, kwh: wave(h, 24, 0.9, 0.5) }))
  if (period === 'Week') return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((label, i) => ({ label, kwh: wave(i, 7, 12, 3) }))
  return Array.from({ length: 30 }, (_, d) => ({ label: `${d + 1}`, kwh: wave(d, 30, 11, 3) }))
}