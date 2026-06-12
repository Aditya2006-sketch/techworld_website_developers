import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Tooltip({ content, children, position = 'top' }) {
  const [visible, setVisible] = useState(false)
  const timeout = useRef(null)

  const show = () => {
    clearTimeout(timeout.current)
    timeout.current = setTimeout(() => setVisible(true), 300)
  }

  const hide = () => {
    clearTimeout(timeout.current)
    setVisible(false)
  }

  const posStyles = {
    top: 'bottom-full mb-2 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 -translate-y-1/2',
  }

  const animProps = {
    top: { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 } },
    bottom: { initial: { opacity: 0, y: -6 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: 6 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: -6 }, animate: { opacity: 1, x: 0 } },
  }

  return (
    <div className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide}>
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            {...animProps[position]}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className={`absolute z-50 ${posStyles[position]} pointer-events-none`}
          >
            <div className="glass-card px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap shadow-xl">
              {content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
