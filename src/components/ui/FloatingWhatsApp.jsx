import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'

export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass-card p-4 w-64 mb-1"
          >
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">👋 Hey there!</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Want to grow your business online?
            </p>
            <a
              href="https://wa.me/918446588965?text=Hi TechWorld! I want to build a website for my business."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-semibold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Chat with us now!
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 rounded-2xl bg-green-500 hover:bg-green-600 text-white flex items-center justify-center shadow-xl shadow-green-200 dark:shadow-green-900/30 transition-colors"
        aria-label="Open WhatsApp chat"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={open ? 'x' : 'chat'}
            initial={{ rotate: -20, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 20, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          </motion.div>
        </AnimatePresence>
      </motion.button>


    </div>
  )
}
