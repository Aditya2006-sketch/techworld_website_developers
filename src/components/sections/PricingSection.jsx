import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { Check, Zap } from 'lucide-react'

const plans = [
  {
    name: 'Starter',
    price: '₹4,999',
    period: 'one-time',
    desc: 'Perfect for small stores just getting started online.',
    color: 'border-gray-200 dark:border-gray-700',
    badge: null,
    features: [
      '5-page professional website',
      'Mobile responsive design',
      'Contact form & WhatsApp button',
      'Google Maps integration',
      'Basic SEO setup',
      '1 month free support',
      'Free domain (.in) for 1 year',
    ],
    cta: 'Get Started',
    ctaClass: 'btn-secondary w-full justify-center',
  },
  {
    name: 'Business',
    price: '₹9,999',
    period: 'one-time',
    desc: 'For growing businesses ready to take orders online.',
    color: 'border-purple-500 dark:border-purple-400',
    badge: '⚡ Most Popular',
    features: [
      'Everything in Starter',
      'Online ordering system',
      'Product catalog (up to 100)',
      'WhatsApp order notifications',
      'Customer reviews section',
      'Google Analytics setup',
      '3 months free support',
      'Free domain + hosting (1 year)',
    ],
    cta: 'Get Started',
    ctaClass: 'btn-primary w-full justify-center',
    highlight: true,
  },
  {
    name: 'Premium',
    price: '₹19,999',
    period: 'one-time',
    desc: 'Full-stack digital solution for established businesses.',
    color: 'border-gray-200 dark:border-gray-700',
    badge: null,
    features: [
      'Everything in Business',
      'E-commerce with payment gateway',
      'Unlimited products',
      'Customer loyalty program',
      'CRM & customer management',
      'Advanced analytics dashboard',
      'Multi-branch support',
      '6 months free support',
    ],
    cta: 'Contact Us',
    ctaClass: 'btn-secondary w-full justify-center',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } }
}

export default function PricingSection() {
  const [ref, inView] = useInView()

  return (
    <section id="pricing" className="py-20 px-5 md:px-8 lg:px-16 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Pricing Plans
          </p>
          <h2 className="section-title">
            Simple, Transparent{' '}
            <span className="purple-text">Pricing</span>
          </h2>
          <p className="section-subtitle mt-3 max-w-xl mx-auto">
            No monthly fees, no hidden charges. Pay once, own your website forever. All plans include free setup and training.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`relative rounded-2xl border-2 ${plan.color} p-6 flex flex-col gap-5 transition-all duration-300 ${
                plan.highlight
                  ? 'bg-gradient-to-b from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-900 shadow-xl shadow-purple-100 dark:shadow-purple-900/20'
                  : 'bg-white dark:bg-gray-900'
              }`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 text-white text-xs font-bold whitespace-nowrap shadow-lg">
                  {plan.badge}
                </div>
              )}

              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">{plan.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{plan.desc}</p>
              </div>

              <div>
                <div className="text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-white">
                  {plan.price}
                </div>
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{plan.period} · no renewal fees</div>
              </div>

              <ul className="flex flex-col gap-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <div className="w-4 h-4 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <a href="#contact" className={plan.ctaClass}>
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center text-sm text-gray-400 dark:text-gray-500 mt-8"
        >
          💬 Not sure which plan? <a href="#contact" className="text-purple-600 dark:text-purple-400 hover:underline font-medium">Chat with us on WhatsApp</a> — we'll recommend the right one for your business.
        </motion.p>
      </div>
    </section>
  )
}
