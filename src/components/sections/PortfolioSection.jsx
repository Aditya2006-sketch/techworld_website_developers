import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { MessageCircle } from 'lucide-react'

const sampleProjects = [
  {
    title: 'Kirana Store Website',
    category: 'Grocery',
    emoji: '🛒',
    color: 'from-green-400 to-green-600',
    bg: 'bg-green-50 dark:bg-green-900/20',
    features: ['Product Catalog', 'WhatsApp Orders', 'Store Info'],
  },
  {
    title: 'Medical Store Website',
    category: 'Medical',
    emoji: '💊',
    color: 'from-blue-400 to-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    features: ['Medicine Catalog', 'Home Delivery', 'Contact Form'],
  },
  {
    title: 'Restaurant Website',
    category: 'Restaurant',
    emoji: '🍔',
    color: 'from-orange-400 to-orange-600',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    features: ['Online Menu', 'Table Booking', 'Gallery'],
  },
  {
    title: 'Salon Website',
    category: 'Salon',
    emoji: '✂️',
    color: 'from-pink-400 to-pink-600',
    bg: 'bg-pink-50 dark:bg-pink-900/20',
    features: ['Appointment Booking', 'Services List', 'Photo Gallery'],
  },
  {
    title: 'Clothing Store',
    category: 'Fashion',
    emoji: '👕',
    color: 'from-purple-400 to-purple-600',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    features: ['Product Catalog', 'Size Guide', 'WhatsApp Chat'],
  },
  {
    title: 'Electronics Shop',
    category: 'Electronics',
    emoji: '⚡',
    color: 'from-indigo-400 to-indigo-600',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    features: ['Product Compare', 'Specs Display', 'Contact Form'],
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } }
}

export default function PortfolioSection() {
  const [ref, inView] = useInView()

  return (
    <section id="portfolio" className="py-20 px-5 md:px-8 lg:px-16 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          
          <h2 className="section-title">
            Websites We{' '}
            <span className="purple-text">Can Build For You</span>
          </h2>
          <p className="section-subtitle mt-3 max-w-xl mx-auto">
            Here are examples of the kind of websites we build for different types of businesses. Your website will be custom-designed for you.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {sampleProjects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-card p-5 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-2xl shadow-md`}>
                  {project.emoji}
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${project.bg} text-gray-600 dark:text-gray-300`}>
                  {project.category}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{project.title}</h3>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {project.features.map(f => (
                  <span key={f} className="text-[10px] px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-medium">
                    {f}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-10"
        >
          
          
        </motion.div>
      </div>
    </section>
  )
}
