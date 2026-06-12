import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X, Globe } from 'lucide-react'

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Industries', href: '#industries' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ isDark, setIsDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass border-b border-purple-100/50 dark:border-purple-900/30 shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <nav className="flex items-center justify-between px-5 md:px-8 lg:px-16 h-16 max-w-7xl mx-auto">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center shadow-md shadow-purple-200 dark:shadow-purple-900/40">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-900 dark:text-white font-display text-sm leading-none">TechWorld</div>
              <div className="text-[9px] text-purple-500 dark:text-purple-400 leading-none mt-0.5">Your Business, Our Technology</div>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Dark mode toggle */}
            <motion.button
              onClick={() => setIsDark(!isDark)}
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 rounded-xl glass border border-purple-100 dark:border-purple-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDark ? 'moon' : 'sun'}
                  initial={{ rotate: -30, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 30, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* CTA - desktop */}
            <a
              href="#contact"
              className="hidden md:inline-flex btn-primary text-xs py-2 px-4"
            >
              Get Free Quote
            </a>

            {/* Hamburger - mobile */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-9 h-9 rounded-xl glass border border-purple-100 dark:border-purple-800 flex items-center justify-center"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={menuOpen ? 'x' : 'menu'}
                  initial={{ rotate: -20, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 20, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {menuOpen
                    ? <X className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                    : <Menu className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                  }
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 inset-x-0 z-40 glass border-b border-purple-100 dark:border-purple-900/30 shadow-lg md:hidden"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMenuOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-all"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                className="btn-primary mt-2 text-sm justify-center"
                onClick={() => setMenuOpen(false)}
              >
                Get Free Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
