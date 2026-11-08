import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'

type Props = {
  title?: string
  icon?: LucideIcon
  accent?: string
  order?: number
  className?: string
  children: ReactNode
}

// Стекло без живого blur: полупрозрачная заливка + тонкая рамка + блик сверху.
// Заголовок всегда сверху, содержимое центрируется в оставшемся месте.
export function Card({ title, icon: Icon, accent = '#8B9AB0', order = 0, className = '', children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 220, damping: 26, delay: 0.15 + order * 0.07 }}
      className={`flex flex-col rounded-[28px] border border-white/10 bg-white/[0.06] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] md:p-7 ${className}`}
    >
      {title && Icon ? (
        <>
          <div className="mb-3 flex items-center gap-2 text-base font-semibold md:mb-4 md:gap-3 md:text-lg">
            <span className="grid size-9 place-items-center md:size-11 rounded-2xl" style={{ background: accent + '26', color: accent }}>
              <Icon size={22} />
            </span>
            {title}
          </div>
          <div className="flex flex-1 flex-col justify-center">{children}</div>
        </>
      ) : (
        children
      )}
    </motion.div>
  )
}