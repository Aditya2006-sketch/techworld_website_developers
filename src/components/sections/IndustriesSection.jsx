import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { ArrowRight } from 'lucide-react'

const industries = [
  { emoji: '🛒', title: 'Kirana Store', desc: 'Grocery & daily essentials', color: 'bg-green-50 dark:bg-green-900/20 hover:border-green-300 dark:hover:border-green-700' },
  { emoji: '💊', title: 'Medical Store', desc: 'Pharmacy & health products', color: 'bg-blue-50 dark:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700' },
  { emoji: '🍔', title: 'Restaurant', desc: 'Food & dining orders', color: 'bg-orange-50 dark:bg-orange-900/20 hover:border-orange-300 dark:hover:border-orange-700' },
  { emoji: '✂️', title: 'Salon', desc: 'Beauty & appointments', color: 'bg-pink-50 dark:bg-pink-900/20 hover:border-pink-300 dark:hover:border-pink-700' },
  { emoji: '👕', title: 'Clothing Store', desc: 'Fashion & apparel', color: 'bg-purple-50 dark:bg-purple-900/20 hover:border-purple-300 dark:hover:border-purple-700' },
  { emoji: '📱', title: 'Mobile Shop', desc: 'Phones & accessories', color: 'bg-indigo-50 dark:bg-indigo-900/20 hover:border-indigo-300 dark:hover:border-indigo-700' },
  { emoji: '⚡', title: 'Electronics', desc: 'Gadgets & appliances', color: 'bg-yellow-50 dark:bg-yellow-900/20 hover:border-yellow-300 dark:hover:border-yellow-700' },
  { emoji: '☕', title: 'Cafe', desc: 'Coffee & beverages', color: 'bg-amber-50 dark:bg-amber-900/20 hover:border-amber-300 dark:hover:border-amber-700' },
  { emoji: '🏪', title: 'Local Business', desc: 'Any store or service', color: 'bg-teal-50 dark:bg-teal-900/20 hover:border-teal-300 dark:hover:border-teal-700' },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } }
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
}

export default function IndustriesSection() {
  const [ref, inView] = useInView()

  return (
    <section id="industries" className="py-20 px-5 md:px-8 lg:px-16 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Industries We Serve
          </p>
          <h2 className="section-title">
            We Build for Every{' '}
            <span className="purple-text">Type of Business</span>
          </h2>
          <p className="section-subtitle mt-3 max-w-xl mx-auto">
            From your neighborhood kirana to a full-service restaurant — we've helped businesses like yours go digital and thrive.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-4"
        >
          {industries.map((industry) => (
            <motion.div
              key={industry.title}
              variants={cardVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
              className={`${industry.color} border border-transparent rounded-2xl p-4 md:p-5 flex flex-col items-center text-center gap-2 cursor-pointer transition-all duration-300 group`}
            >
              <div className="text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300">
                {industry.emoji}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm md:text-base">
                  {industry.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-tight">
                  {industry.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center mt-10"
        >
          <a href="#contact" className="btn-primary inline-flex">
            View All Industries
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
