import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { Point } from '../data/energy'

// Анимация графика выключена: на слабом железе она даёт лишние кадры.
// Касание по графику показывает значение, свайп страницы отсюда не начинается.
export function EnergyChart({ data, accent }: { data: Point[]; accent: string }) {
  return (
    <div className="h-full w-full" onPointerDown={(e) => e.stopPropagation()}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="kwh" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={accent} stopOpacity={0.45} />
              <stop offset="100%" stopColor={accent} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="label" tickLine={false} axisLine={false} stroke="#8B9AB0" fontSize={13} interval="preserveStartEnd" />
          <YAxis tickLine={false} axisLine={false} stroke="#8B9AB0" fontSize={13} width={48} />
          <Tooltip
            cursor={{ stroke: accent, strokeOpacity: 0.4 }}
            contentStyle={{ background: '#141B2B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, color: '#E6EDF7' }}
            formatter={(v) => `${v} kWh`}
          />
          <Area type="monotone" dataKey="kwh" stroke={accent} strokeWidth={3} fill="url(#kwh)" isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}