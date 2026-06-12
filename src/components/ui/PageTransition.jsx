import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

// Splash/intro screen shown once on first load
function SplashScreen({ onDone }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center purple-gradient-bg"
    >
      {/* Animated logo */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 160, damping: 14 }}
        className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center shadow-2xl shadow-purple-300/50 dark:shadow-purple-900/50 mb-6"
      >
        <span className="text-4xl">🌐</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold font-display text-gray-900 dark:text-white">
          TechWorld
        </h1>
        <p className="text-sm text-purple-500 dark:text-purple-400 mt-1">
          Your Business, Our Technology
        </p>
      </motion.div>

      {/* Animated loading bar */}
      <motion.div
        className="mt-10 w-48 h-1 rounded-full bg-purple-100 dark:bg-purple-900/40 overflow-hidden"
      >
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          onAnimationComplete={onDone}
          className="h-full w-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full"
        />
      </motion.div>

      {/* Floating blobs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-200/30 dark:bg-purple-800/20 blur-3xl blob" />
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-purple-300/20 dark:bg-purple-700/10 blur-3xl blob-delayed" />
    </motion.div>
  )
}

export default function PageTransition({ children }) {
  const [showSplash, setShowSplash] = useState(() => {
    // Only show splash on first visit per session
    return !sessionStorage.getItem('tw_visited')
  })
  const [splashDone, setSplashDone] = useState(false)

  const handleSplashDone = () => {
    sessionStorage.setItem('tw_visited', '1')
    setSplashDone(true)
    setTimeout(() => setShowSplash(false), 700)
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {showSplash && !splashDone && (
          <SplashScreen key="splash" onDone={handleSplashDone} />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: showSplash ? 0 : 0 }}
      >
        {children}
      </motion.div>
    </>
  )
}
