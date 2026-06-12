import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const items = [
  { emoji: '🛒', text: 'Patel Kirana — +185% orders' },
  { emoji: '💊', text: 'Gupta Medical — +300% revenue' },
  { emoji: '🍔', text: "Sharma's Restaurant — +400% delivery" },
  { emoji: '✂️', text: 'Anita Salon — fully booked daily' },
  { emoji: '👕', text: 'Priya Fashion — city-wide sales' },
  { emoji: '📱', text: 'TechZone Mobile — +220% reach' },
  { emoji: '☕', text: 'Cafe Bloom — 300+ daily orders' },
  { emoji: '⚡', text: 'Spark Electronics — +260% growth' },
]

// Duplicate for seamless loop
const doubled = [...items, ...items]

export default function MarqueeBanner() {
  return (
    <div className="w-full overflow-hidden py-3 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-700 relative">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-purple-600 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-purple-700 to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="inline-flex items-center gap-2 text-white text-sm font-medium flex-shrink-0">
            <span className="text-base">{item.emoji}</span>
            <span>{item.text}</span>
            <span className="text-purple-300 mx-2">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
