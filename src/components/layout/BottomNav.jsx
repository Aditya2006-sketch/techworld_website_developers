import { motion } from 'framer-motion'
import { Home, Grid, Briefcase, Phone } from 'lucide-react'

const tabs = [
  { label: 'Home', icon: Home, href: '#hero' },
  { label: 'Services', icon: Grid, href: '#services' },
  { label: 'Portfolio', icon: Briefcase, href: '#portfolio' },
  { label: 'Contact', icon: Phone, href: '#contact' },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <a
              key={tab.label}
              href={tab.href}
              className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl group transition-all"
            >
              <Icon className="w-5 h-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
              <span className="text-[10px] text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors font-medium">
                {tab.label}
              </span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
