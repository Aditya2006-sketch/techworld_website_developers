import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { Phone, MessageCircle, Clock } from 'lucide-react'

// ⚠️ APNA NUMBER YAHAN DALO
const PHONE = '+91 8446588965'
const PHONE_HREF = 'tel:+918446588965'
const WHATSAPP = 'https://wa.me/918446588965?text=Hi TechWorld! I want to build a website for my business.'

export default function ContactSection() {
  const [ref, inView] = useInView()

  return (
    <section id="contact" className="py-20 px-5 md:px-8 lg:px-16 purple-gradient-bg pb-28 md:pb-20">
      <div className="max-w-xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Contact Us
          </p>
          <h2 className="section-title">
            Let's Build Something{' '}
            <span className="purple-text">Together</span>
          </h2>
          <p className="section-subtitle mt-3">
            Reach out directly — we'll get back to you right away.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {/* WhatsApp */}
          <motion.a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-5 p-6 rounded-2xl bg-green-500 hover:bg-green-600 text-white transition-colors duration-300 shadow-lg shadow-green-200 dark:shadow-green-900/30"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-7 h-7" />
            </div>
            <div>
              <div className="font-bold text-xl">WhatsApp</div>
              <div className="text-green-100 text-sm mt-0.5">{PHONE} · Tap to chat</div>
            </div>
          </motion.a>

          {/* Call */}
          <motion.a
            href={PHONE_HREF}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-5 p-6 rounded-2xl glass-card hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300"
          >
            <div className="w-14 h-14 rounded-2xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center flex-shrink-0">
              <Phone className="w-7 h-7 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <div className="font-bold text-xl text-gray-900 dark:text-white">Call Us</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">{PHONE} · Tap to call</div>
            </div>
          </motion.a>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800/30"
          >
            <Clock className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <p className="text-sm text-amber-700 dark:text-amber-400 font-medium">
              Available Mon – Sat, 9:00 AM to 8:00 PM
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
