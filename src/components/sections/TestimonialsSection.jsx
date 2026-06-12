import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { MessageCircle, Star } from 'lucide-react'

export default function TestimonialsSection() {
  const [ref, inView] = useInView()

  return (
    <section id="testimonials" className="py-20 px-5 md:px-8 lg:px-16 purple-gradient-bg overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Client Reviews
          </p>
          <h2 className="section-title">
            What Our Clients{' '}
            <span className="purple-text">Will Say</span>
          </h2>
          <p className="section-subtitle mt-3 max-w-xl mx-auto">
            We just launched — client reviews coming soon. Be the first to work with us and share your experience!
          </p>
        </motion.div>

        {/* Empty state card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card p-10 md:p-14 flex flex-col items-center text-center gap-5"
        >
          <div className="flex gap-1">
            {Array(5).fill(0).map((_, i) => (
              <Star key={i} className="w-7 h-7 text-gray-200 dark:text-gray-700" />
            ))}
          </div>

          <div className="text-5xl">🤝</div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Your Review Could Be First!
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
              We're a fresh agency passionate about helping local businesses grow online. Work with us and let's build something great together.
            </p>
          </div>

          <a
            href="https://wa.me/918446588965?text=Hi TechWorld! I want to be your first client."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <MessageCircle className="w-4 h-4" />
            Become Our First Client
          </a>
        </motion.div>
      </div>
    </section>
  )
}
