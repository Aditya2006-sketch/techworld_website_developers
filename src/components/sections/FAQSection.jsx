import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '../../hooks/useInView'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: 'How long does it take to build my website?',
    a: 'Most websites are delivered in 5–7 business days from when we receive your business details. E-commerce stores with many products may take 10–14 days. We always communicate timelines upfront.',
  },
  {
    q: 'Do I need any technical knowledge?',
    a: 'Absolutely none! You just tell us about your business, share your logo and some photos, and we handle everything — design, development, hosting, domain setup, and launch. We also provide full training.',
  },
  {
    q: 'What happens after my website is live?',
    a: 'We provide free support for the period included in your plan (1–6 months). After that, we offer affordable monthly maintenance packages. We also train you to update basic content yourself.',
  },
  {
    q: 'Can customers place orders and make payments online?',
    a: 'Yes! Our Business and Premium plans include full e-commerce with online payment gateways (Razorpay, UPI, cards). Orders also come via WhatsApp with automatic notifications.',
  },
  {
    q: 'Will my website work on mobile phones?',
    a: '100%. All our websites are mobile-first, meaning they look and work perfectly on any smartphone. Over 80% of your customers will visit from mobile, so this is our top priority.',
  },
  {
    q: 'What is the pricing and are there monthly fees?',
    a: 'Our plans start at ₹4,999 as a one-time payment. There are no monthly fees for the website itself. Optional add-ons like cloud hosting renewal or maintenance are clearly priced separately.',
  },
  {
    q: 'Can you help with WhatsApp Business integration?',
    a: 'Yes! We integrate WhatsApp Business API so you receive order notifications, can send automated confirmations to customers, and manage customer queries — all through WhatsApp.',
  },
  {
    q: 'Do you help with Google ranking (SEO)?',
    a: 'All plans include basic on-page SEO setup. Our Premium plan includes a full SEO audit and local Google Business Profile optimization so your store appears when people search nearby.',
  },
]

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-purple-50/50 dark:hover:bg-purple-900/10 transition-colors duration-200"
      >
        <span className="font-semibold text-gray-900 dark:text-white text-sm md:text-base leading-snug">
          {item.q}
        </span>
        <span className="flex-shrink-0">
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            {open
              ? <Minus className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              : <Plus className="w-4 h-4 text-gray-400 dark:text-gray-500" />
            }
          </motion.div>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-4">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  const [ref, inView] = useInView()

  return (
    <section id="faq" className="py-20 px-5 md:px-8 lg:px-16 purple-gradient-bg">
      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm uppercase tracking-widest mb-3">
            FAQ
          </p>
          <h2 className="section-title">
            Questions?{' '}
            <span className="purple-text">Answered.</span>
          </h2>
          <p className="section-subtitle mt-3 max-w-xl mx-auto">
            Everything you need to know before taking your business online with TechWorld.
          </p>
        </motion.div>

        <div className="flex flex-col gap-3">
          {faqs.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-10 glass-card p-5 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="text-left">
            <p className="font-semibold text-gray-900 dark:text-white text-sm">Still have questions?</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Our team replies within 2 hours on WhatsApp</p>
          </div>
          <a
            href="https://wa.me/919876543210?text=Hi! I have a question about TechWorld services."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm flex-shrink-0"
          >
            💬 Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}
