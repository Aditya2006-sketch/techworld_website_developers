import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { IndianRupee, Zap, Palette, Headphones, ShieldCheck, TrendingUp } from 'lucide-react'

const reasons = [
  {
    icon: IndianRupee,
    title: 'Affordable Pricing',
    desc: 'Best quality websites at prices local businesses can afford. No hidden fees.',
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
  },
  {
    icon: Zap,
    title: 'Fast Delivery',
    desc: 'Your website is ready in 5–7 days. We respect your time and deadlines.',
    color: 'text-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
  },
  {
    icon: Palette,
    title: 'Modern Design',
    desc: 'Trendy, user-friendly designs that make your business look premium online.',
    color: 'text-pink-500',
    bg: 'bg-pink-50 dark:bg-pink-900/20',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    desc: 'We are always here for you via WhatsApp, phone and email. Always.',
    color: 'text-green-500',
    bg: 'bg-green-50 dark:bg-green-900/20',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Reliable',
    desc: 'SSL encryption, daily backups and 99.9% uptime SLA on all websites.',
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    icon: TrendingUp,
    title: 'Proven Results',
    desc: 'Our clients see an average 2.5x increase in customer inquiries within 3 months.',
    color: 'text-cyan-500',
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
}

export default function WhyChooseUsSection() {
  const [ref, inView] = useInView()

  return (
    <section id="why-us" className="py-20 px-5 md:px-8 lg:px-16 purple-gradient-bg">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Why Choose Us
          </p>
          <h2 className="section-title">
            The TechWorld{' '}
            <span className="purple-text">Advantage</span>
          </h2>
          <p className="section-subtitle mt-3 max-w-xl mx-auto">
            We're not just web developers — we're your digital growth partners invested in your success.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {reasons.map((reason) => {
            const Icon = reason.icon
            return (
              <motion.div
                key={reason.title}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="glass-card p-5 flex gap-4 group cursor-default"
              >
                <div className={`${reason.bg} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${reason.color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm">{reason.title}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{reason.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
