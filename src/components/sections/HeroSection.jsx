import { Suspense, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import StoreScene from '../3d/StoreScene'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }
  })
}

export default function HeroSection() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const yText = useTransform(scrollYProgress, [0, 1], [0, -80])
  const yCanvas = useTransform(scrollYProgress, [0, 1], [0, 60])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden purple-gradient-bg"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob absolute top-[-10%] right-[-15%] w-[60vw] h-[60vw] max-w-[500px] max-h-[500px] rounded-full bg-purple-200/40 dark:bg-purple-900/20 blur-3xl" />
        <div className="blob-delayed absolute bottom-[10%] left-[-10%] w-[50vw] h-[50vw] max-w-[400px] max-h-[400px] rounded-full bg-purple-100/50 dark:bg-purple-800/10 blur-3xl" />
      </div>

      {/* Badge */}
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        style={{ y: yText }}
        className="relative z-10 pt-24 px-5 md:px-8 lg:px-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-purple-200 dark:border-purple-700 text-sm font-medium text-purple-700 dark:text-purple-300">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Now Accepting New Clients 🚀
        </div>
      </motion.div>

      {/* Main content grid */}
      <div className="relative z-10 flex-1 grid lg:grid-cols-2 gap-0 lg:gap-8 items-center px-5 md:px-8 lg:px-16 pt-6 pb-8">

        {/* Left: Text content */}
        <motion.div style={{ y: yText, opacity }} className="flex flex-col gap-5 max-w-xl">
          <motion.h1
            custom={0.15}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="section-title text-4xl md:text-5xl lg:text-6xl"
          >
            We Build Websites That Grow Your{' '}
            <span className="purple-text">Business</span>
          </motion.h1>

          <motion.p
            custom={0.3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="section-subtitle text-base md:text-lg max-w-md"
          >
            Helping local stores & small businesses go digital with stunning websites, online ordering, and smart growth tools.
          </motion.p>

          {/* CTA */}
          <motion.div
            custom={0.45}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <motion.a
              href="#contact"
              className="btn-primary text-sm md:text-base inline-flex"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right: 3D Canvas */}
        <motion.div
          style={{ y: yCanvas }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full h-[320px] md:h-[420px] lg:h-[540px] order-first lg:order-last"
        >
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-200/30 to-purple-400/10 dark:from-purple-900/20 dark:to-purple-700/10 blur-xl" />
          <Canvas shadows dpr={[1, 2]} className="rounded-3xl" style={{ touchAction: 'none' }}>
            <Suspense fallback={null}>
              <PerspectiveCamera makeDefault position={[0, 1.5, 6]} fov={50} />
              <StoreScene />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={false}
                maxPolarAngle={Math.PI / 1.8}
                minPolarAngle={Math.PI / 3}
                rotateSpeed={0.5}
                touches={{ ONE: 1, TWO: 0 }}
              />
            </Suspense>
          </Canvas>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="relative z-10 flex flex-col items-center gap-1.5 pb-6"
      >
        <span className="text-xs text-gray-400">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border-2 border-purple-300 dark:border-purple-600 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-purple-400" />
        </motion.div>
      </motion.div>

    </section>
  )
}
