import { Suspense, useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import MorphingScene from './MorphingScene'

const phaseLabels = [
  { phase: 0, label: 'Your Store', icon: '🏪' },
  { phase: 1, label: 'Building Website', icon: '💻' },
  { phase: 2, label: 'Going Online', icon: '🌐' },
  { phase: 3, label: 'Getting Customers', icon: '🛒' },
  { phase: 4, label: 'Business Growth', icon: '📈' },
]

export default function Sticky3DCanvas() {
  const [phase, setPhase] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const steps = document.querySelectorAll('.story-step')
    if (!steps.length) return

    const observers = Array.from(steps).map((step, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setPhase(index)
        },
        { threshold: 0.4 }
      )
      observer.observe(step)
      return observer
    })

    return () => observers.forEach(obs => obs.disconnect())
  }, [])

  const current = phaseLabels[phase]

  return (
    <div
      ref={containerRef}
      className="hidden lg:block sticky top-20 h-[calc(100vh-5rem)] w-full"
    >
      {/* 3D Canvas */}
      <div className="w-full h-full relative rounded-3xl overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background: `radial-gradient(ellipse at center, ${
              ['rgba(245,158,11,0.08)', 'rgba(59,130,246,0.08)', 'rgba(6,182,212,0.08)', 'rgba(16,185,129,0.08)', 'rgba(124,58,237,0.1)'][phase]
            } 0%, transparent 70%)`
          }}
        />

        <Canvas dpr={[1, 2]} style={{ touchAction: 'none' }}>
          <Suspense fallback={null}>
            <PerspectiveCamera makeDefault position={[0, 0.5, 5]} fov={55} />
            <MorphingScene phase={phase} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              maxPolarAngle={Math.PI / 1.7}
              minPolarAngle={Math.PI / 3}
            />
          </Suspense>
        </Canvas>

        {/* Phase label overlay */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="glass-card px-5 py-2.5 flex items-center gap-2.5"
            >
              <span className="text-xl">{current.icon}</span>
              <span className="text-sm font-semibold text-gray-800 dark:text-white">{current.label}</span>
              <span className="text-xs text-purple-500 dark:text-purple-400 font-medium">Phase {phase + 1}/5</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Phase progress dots */}
        <div className="absolute top-6 left-0 right-0 flex justify-center gap-2">
          {phaseLabels.map((p) => (
            <div
              key={p.phase}
              className={`h-1 rounded-full transition-all duration-500 ${
                p.phase === phase ? 'w-8 bg-purple-500' : p.phase < phase ? 'w-3 bg-purple-300' : 'w-3 bg-gray-200 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
