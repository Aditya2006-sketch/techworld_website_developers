import { useEffect, useRef } from 'react'
import { useInView } from '../../hooks/useInView'
import { motion } from 'framer-motion'

const bigStats = [
  { value: 500, suffix: '+', label: 'Happy Clients', icon: '😊', color: 'text-amber-500' },
  { value: 1000, suffix: '+', label: 'Websites Built', icon: '💻', color: 'text-blue-500' },
  { value: 99.9, suffix: '%', label: 'Uptime SLA', icon: '⚡', color: 'text-green-500' },
  { value: 250, suffix: '%', label: 'Avg Revenue Growth', icon: '📈', color: 'text-purple-500' },
  { value: 4.9, suffix: '★', label: 'Client Rating', icon: '⭐', color: 'text-amber-400' },
  { value: 5, suffix: ' Days', label: 'Avg Delivery', icon: '🚀', color: 'text-cyan-500' },
]

function BigStat({ stat, index, inView }) {
  const numRef = useRef(null)
  const animatedRef = useRef(false)

  useEffect(() => {
    if (!inView || animatedRef.current || !numRef.current) return
    animatedRef.current = true

    const target = stat.value
    const isDecimal = !Number.isInteger(target)
    const duration = 2000
    const startTime = performance.now()

    const tick = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = target * eased

      if (numRef.current) {
        numRef.current.textContent = isDecimal
          ? current.toFixed(1)
          : Math.floor(current).toString()
      }

      if (progress < 1) requestAnimationFrame(tick)
      else if (numRef.current) {
        numRef.current.textContent = isDecimal ? target.toFixed(1) : target.toString()
      }
    }

    setTimeout(() => requestAnimationFrame(tick), index * 80)
  }, [inView, stat.value, index])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="flex flex-col items-center text-center gap-2 p-5 glass-card group hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="text-3xl group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
      <div className={`text-3xl md:text-4xl font-black font-display ${stat.color}`}>
        <span ref={numRef}>0</span>
        <span>{stat.suffix}</span>
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400 font-medium leading-tight">{stat.label}</div>
    </motion.div>
  )
}

export default function StatsSection() {
  const [ref, inView] = useInView()

  return (
    <section className="py-16 px-5 md:px-8 lg:px-16 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-widest mb-2">
            By The Numbers
          </p>
          <h2 className="section-title text-2xl md:text-3xl">
            Trusted by <span className="purple-text">Hundreds</span> of Businesses
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {bigStats.map((stat, i) => (
            <BigStat key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
