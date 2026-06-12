import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Sticky3DCanvas from '../3d/Sticky3DCanvas'

let gsap, ScrollTrigger

async function loadGSAP() {
  const [g, st] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
  gsap = g.gsap || g.default
  ScrollTrigger = st.ScrollTrigger
  gsap.registerPlugin(ScrollTrigger)
}

const storySteps = [
  {
    id: 'store',
    emoji: '🏪',
    eyebrow: 'Step 01',
    title: 'Your Local Store',
    desc: "You have a great business — loyal customers, quality products, a real story. But you're invisible online, missing hundreds of potential orders every week.",
    stat: '97%',
    statLabel: 'of consumers go online to find local businesses (Google)',
    color: 'from-amber-400 to-orange-500',
    accent: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800/40',
  },
  {
    id: 'website',
    emoji: '💻',
    eyebrow: 'Step 02',
    title: 'We Build Your Website',
    desc: 'Our team handles everything — design, content, setup and launch. You just share your business details. No tech knowledge needed from you.',
    stat: '5–7 Days',
    statLabel: 'our target delivery time for most websites',
    color: 'from-blue-400 to-blue-600',
    accent: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800/40',
  },
  {
    id: 'online',
    emoji: '🌐',
    eyebrow: 'Step 03',
    title: 'You Go Online',
    desc: 'Your store is live 24/7. Customers across your city can find you, browse products, read reviews, and place orders — even at midnight.',
    stat: '24/7',
    statLabel: 'your store stays open online, even when you sleep',
    color: 'from-cyan-400 to-cyan-600',
    accent: 'text-cyan-600 dark:text-cyan-400',
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    border: 'border-cyan-200 dark:border-cyan-800/40',
  },
  {
    id: 'customers',
    emoji: '🛒',
    eyebrow: 'Step 04',
    title: 'Customers Start Ordering',
    desc: 'Orders arrive through your website and WhatsApp. You get instant notifications. No missed calls. No lost customers.',
    stat: '24/7',
    statLabel: 'customers can reach you — even when your shop is closed',
    color: 'from-green-400 to-green-600',
    accent: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800/40',
  },
  {
    id: 'growth',
    emoji: '📈',
    eyebrow: 'Step 05',
    title: 'Your Business Grows',
    desc: 'Track visitors, manage customer inquiries, and use real data to grow smarter. Your digital presence works for you every day.',
    stat: '100%',
    statLabel: 'of our work is focused on your business growth',
    color: 'from-purple-400 to-purple-600',
    accent: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-200 dark:border-purple-800/40',
  },
]

function MobileVisual({ step }) {
  return (
    <div className="lg:hidden flex items-center justify-center py-6">
      <div className="glass-card p-6 w-48 text-center">
        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-4xl mx-auto mb-3 shadow-lg`}>
          {step.emoji}
        </div>
        <div className={`text-2xl font-black font-display bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
          {step.stat}
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{step.statLabel}</div>
      </div>
    </div>
  )
}

function StoryStep({ step, index }) {
  return (
    <div className="story-step min-h-screen flex items-center py-20" data-index={index}>
      <div className="w-full px-5 md:px-8 lg:px-0 max-w-lg">
        <MobileVisual step={step} />
        <div className="mb-5">
          <span className={`inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-3.5 py-1.5 rounded-full bg-gradient-to-r ${step.color} text-white shadow-md`}>
            <span>{step.emoji}</span>
            {step.eyebrow}
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold font-display text-gray-900 dark:text-white leading-tight mb-4">
          {step.title}
        </h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-7 max-w-md">
          {step.desc}
        </p>
        <div className={`${step.bg} ${step.border} border rounded-2xl p-5 flex items-center gap-4 w-fit`}>
          <div className={`text-4xl font-black font-display bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
            {step.stat}
          </div>
          <div className={`text-sm ${step.accent} max-w-[200px] leading-snug font-medium`}>
            {step.statLabel}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-8">
          {storySteps.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === index
                  ? `w-8 bg-gradient-to-r ${step.color}`
                  : i < index
                  ? 'w-2 bg-purple-200 dark:bg-purple-700'
                  : 'w-2 bg-gray-200 dark:bg-gray-700'
              }`}
            />
          ))}
          <span className="text-xs text-gray-400 dark:text-gray-500 ml-1">{index + 1} of {storySteps.length}</span>
        </div>
      </div>
    </div>
  )
}

export default function ScrollStorySection() {
  const sectionRef = useRef(null)
  const progressBarRef = useRef(null)

  useEffect(() => {
    let ctx
    loadGSAP().then(() => {
      if (!sectionRef.current || !gsap || !ScrollTrigger) return
      ctx = gsap.context(() => {
        const steps = sectionRef.current.querySelectorAll('.story-step')
        steps.forEach((step) => {
          const kids = step.querySelectorAll('h2, p, [class*="rounded-2xl"], [class*="flex items-center gap-2 mt"]')
          gsap.fromTo(kids,
            { opacity: 0, y: 50, filter: 'blur(4px)' },
            {
              opacity: 1, y: 0, filter: 'blur(0px)',
              duration: 0.9, stagger: 0.1, ease: 'power3.out',
              scrollTrigger: { trigger: step, start: 'top 72%', toggleActions: 'play none none reverse' }
            }
          )
        })
        if (progressBarRef.current) {
          gsap.fromTo(progressBarRef.current,
            { scaleX: 0 },
            { scaleX: 1, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom bottom', scrub: 0.5 } }
          )
        }
      }, sectionRef)
    })
    return () => ctx?.revert()
  }, [])

  return (
    <section ref={sectionRef} id="story" className="relative bg-white dark:bg-gray-950">
      <div className="sticky top-16 z-20 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800/50">
        <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-16 py-2 flex items-center justify-between">
          <span className="text-xs font-semibold text-purple-600 dark:text-purple-400 tracking-wide uppercase">Your Business Transformation</span>
          <span className="text-xs text-gray-400 dark:text-gray-500">Scroll to explore</span>
        </div>
        <div className="h-0.5 bg-gray-100 dark:bg-gray-800 overflow-hidden">
          <div ref={progressBarRef} className="h-full w-full bg-gradient-to-r from-amber-400 via-cyan-500 to-purple-600 origin-left" style={{ transform: 'scaleX(0)' }} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          <div>
            {storySteps.map((step, index) => (
              <StoryStep key={step.id} step={step} index={index} />
            ))}
          </div>
          <div className="hidden lg:block">
            <Sticky3DCanvas />
          </div>
        </div>
      </div>

      <div className="text-center pb-20 px-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="glass-card inline-flex flex-col items-center gap-4 px-8 py-6 max-w-sm mx-auto"
        >
          <div className="text-3xl">🚀</div>
          <div>
            <div className="font-bold text-gray-900 dark:text-white mb-1">Ready to Start Your Story?</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Join 500+ businesses already growing with TechWorld</div>
          </div>
          <a href="#contact" className="btn-primary w-full justify-center">Get Free Consultation</a>
        </motion.div>
      </div>
    </section>
  )
}
