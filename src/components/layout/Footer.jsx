import { Globe } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-6xl mx-auto px-5 md:px-8 lg:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center">
            <Globe className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold text-white font-display text-sm align-centre">TechWorld</span>
        </div>

      

      </div>
    </footer>
  )
}