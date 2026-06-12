import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'

const steps = [
  {
    step: '1',
    title: 'Your Store',
    desc: 'Tell us about your business, products and requirements. Simple onboarding in minutes.',
    emoji: '🏪',
    color: 'from-purple-500 to-purple-600',
  },
  {
    step: '2',
    title: 'We Build Your Website',
    desc: 'Our expert team crafts your professional website with your branding and content.',
    emoji: '💻',
    color: 'from-blue-500 to-blue-600',
  },
  {
    step: '3',
    title: 'Go Online',
    desc: 'Your website goes live for the world. We handle hosting, domain and security.',
    emoji: '🌐',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    step: '4',
    title: 'Get Customers',
    desc: 'Customers find you online and place orders directly from your website.',
    emoji: '🛒',
    color: 'from-green-500 to-green-600',
  },
  {
    step: '5',
    title: 'Grow Business',
    desc: 'Watch your sales grow with analytics, WhatsApp alerts and customer management.',
    emoji: '📈',
    color: 'from-amber-500 to-orange-500',
  },
]

function StepCard({ step, index }) {
  const [ref, inView] = useInView()
  const isEven = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex items-center gap-4 md:gap-6"
    >
      {/* Left side: step content (mobile: always left) */}
      <div className={`flex-1 ${isEven ? 'md:text-right md:order-1' : 'md:order-3'}`}>
        <div className={`glass-card p-4 md:p-5 inline-block w-full md:max-w-xs ${isEven ? 'md:ml-auto' : ''}`}>
          <div className="text-3xl mb-2">{step.emoji}</div>
          <h3 className="font-bold text-gray-900 dark:text-white text-base">{step.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{step.desc}</p>
        </div>
      </div>

      {/* Center: step number */}
      <div className="flex flex-col items-center gap-0 order-first md:order-2 flex-shrink-0">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-sm md:text-base shadow-lg`}
        >
          {step.step}
        </motion.div>
        {index < steps.length - 1 && (
          <div className="w-0.5 h-16 md:h-20 bg-gradient-to-b from-purple-200 to-transparent dark:from-purple-800" />
        )}
      </div>

      {/* Right side: image/illustration placeholder (desktop only) */}
      <div className={`hidden md:block flex-1 ${isEven ? 'md:order-3' : 'md:order-1'}`} />
    </motion.div>
  )
}

export default function HowItWorksSection() {
  const [ref, inView] = useInView()

  return (
    <section id="how-it-works" className="py-20 px-5 md:px-8 lg:px-16 purple-gradient-bg">
      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-widest mb-3">
            How It Works
          </p>
          <h2 className="section-title">
            Simple as{' '}
            <span className="purple-text">1-2-3</span>
          </h2>
          <p className="section-subtitle mt-3 max-w-md mx-auto">
            We make it incredibly simple to take your business online. No tech knowledge needed.
          </p>
        </motion.div>

        <div className="flex flex-col gap-0">
          {steps.map((step, i) => (
            <StepCard key={step.step} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
