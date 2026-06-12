import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { ArrowRight, Code2, ShoppingCart, Cloud, BarChart3, MessageCircle, Users } from 'lucide-react'

const services = [
  {
    icon: Code2,
    title: 'Website Development',
    desc: 'Custom, fast and mobile-friendly websites built for your business.',
    color: 'from-purple-500 to-purple-700',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    iconBg: 'bg-purple-100 dark:bg-purple-900/40',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },

  
  {
    icon: Users,
    title: 'Customer Management',
    desc: 'CRM tools to manage customers, loyalty programs and follow-ups.',
    color: 'from-rose-500 to-rose-700',
    bg: 'bg-rose-50 dark:bg-rose-900/20',
    iconBg: 'bg-rose-100 dark:bg-rose-900/40',
    iconColor: 'text-rose-600 dark:text-rose-400',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
}

function ServiceCard({ service, index }) {
  const Icon = service.icon

  return (
    <motion.div
      variants={cardVariants}
      className={`${service.bg} rounded-2xl p-5 border border-transparent hover:border-purple-200 dark:hover:border-purple-700/50 transition-all duration-300 group cursor-pointer`}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className={`${service.iconBg} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-6 h-6 ${service.iconColor}`} />
        </div>
        <ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-purple-500 group-hover:translate-x-1 transition-all duration-300 mt-1 flex-shrink-0" />
      </div>
      <h3 className="font-bold text-gray-900 dark:text-white mt-3 text-base">{service.title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed">{service.desc}</p>
    </motion.div>
  )
}

export default function ServicesSection() {
  const [ref, inView] = useInView()

  return (
    <section id="services" className="py-20 px-5 md:px-8 lg:px-16 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.p
            variants={cardVariants}
            className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-widest mb-3"
          >
            Our Services
          </motion.p>
          <motion.h2 variants={cardVariants} className="section-title">
            Complete Solutions for{' '}
            <span className="purple-text">Your Business</span>
          </motion.h2>
          <motion.p variants={cardVariants} className="section-subtitle mt-3 max-w-xl mx-auto">
            Everything your local business needs to grow online — from a beautiful website to powerful tools that work while you sleep.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
