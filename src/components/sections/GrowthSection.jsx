import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import AnimatedCounter from '../ui/AnimatedCounter'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
const barHeights = [20, 35, 28, 55, 48, 80]

const stats = [
  { value: 250, suffix: '%', label: 'Avg Revenue Growth' },
  { value: 500, suffix: '+', label: 'Businesses Helped' },
  { value: 3, suffix: 'x', label: 'More Customers' },
  { value: 5, suffix: ' Days', label: 'Average Delivery' },
]

function AnimatedBar({ height, index, inView, month }) {
  return (
    <div className="flex flex-col items-center gap-1 flex-1">
      <div className="w-full flex flex-col justify-end" style={{ height: '100px' }}>
        <motion.div
          initial={{ height: 0 }}
          animate={inView ? { height: `${height}%` } : { height: 0 }}
          transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className={`w-full rounded-t-lg ${
            index === barHeights.length - 1
              ? 'bg-gradient-to-t from-purple-700 to-purple-500'
              : 'bg-gradient-to-t from-purple-300 to-purple-200 dark:from-purple-800 dark:to-purple-700'
          }`}
          style={{ height: '100%' }}
        />
      </div>
      <span className="text-[10px] text-gray-400 dark:text-gray-500">{month}</span>
    </div>
  )
}

export default function GrowthSection() {
  const [ref, inView] = useInView()

  return (
    <section id="growth" className="py-20 px-5 md:px-8 lg:px-16 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left: Content */}
          <div ref={ref}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-widest mb-3"
            >
              Business Growth
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="section-title mb-4"
            >
              Real Results from{' '}
              <span className="purple-text">Real Clients</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="section-subtitle mb-8"
            >
              Our clients consistently see measurable growth in customers, orders, and revenue after going digital with TechWorld.
            </motion.p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="glass-card p-4 text-center"
                >
                  <div className="text-2xl md:text-3xl font-bold font-display purple-text">
                    {inView && (
                      <AnimatedCounter
                        target={stat.value}
                        suffix={stat.suffix}
                        duration={2000}
                      />
                    )}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Animated graph card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass-card p-6 md:p-8"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Revenue Growth</p>
                <div className="text-4xl md:text-5xl font-bold font-display purple-text">
                  {inView && <AnimatedCounter target={250} prefix="+" suffix="%" duration={2500} />}
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-600 dark:text-green-400 text-xs font-semibold">Live</span>
              </div>
            </div>

            {/* Bar chart */}
            <div className="flex items-end gap-2 h-[100px] mb-2">
              {barHeights.map((h, i) => (
                <AnimatedBar
                  key={months[i]}
                  height={h}
                  index={i}
                  inView={inView}
                  month={months[i]}
                />
              ))}
            </div>

            {/* Trend line SVG */}
            <div className="mt-4 pt-4 border-t border-purple-100 dark:border-purple-900/30">
              <svg viewBox="0 0 300 60" className="w-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  d="M0,50 C30,45 60,35 100,28 C140,21 160,30 200,15 C240,5 260,8 300,2"
                  fill="none"
                  stroke="url(#lineGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
                />
                <motion.path
                  d="M0,50 C30,45 60,35 100,28 C140,21 160,30 200,15 C240,5 260,8 300,2 L300,60 L0,60 Z"
                  fill="url(#areaGrad)"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 1 }}
                />
                {/* Data points */}
                {[
                  [0, 50], [60, 35], [100, 28], [160, 30], [200, 15], [300, 2]
                ].map(([x, y], i) => (
                  <motion.circle
                    key={i}
                    cx={x}
                    cy={y}
                    r="4"
                    fill="white"
                    stroke="#7c3aed"
                    strokeWidth="2"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.8 + i * 0.15 }}
                  />
                ))}
              </svg>
            </div>

            <div className="flex items-center justify-between mt-3 text-xs text-gray-400 dark:text-gray-500">
              <span>Jan 2024</span>
              <span className="text-purple-500 font-semibold">↑ 6 months growth</span>
              <span>Jun 2024</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
