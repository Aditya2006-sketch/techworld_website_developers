import { useDarkMode } from './hooks/useDarkMode'
import PageTransition from './components/ui/PageTransition'
import Navbar from './components/layout/Navbar'
import BottomNav from './components/layout/BottomNav'
import Footer from './components/layout/Footer'
import ScrollProgress from './components/ui/ScrollProgress'
import FloatingWhatsApp from './components/ui/FloatingWhatsApp'
import HeroSection from './components/sections/HeroSection'
import ServicesSection from './components/sections/ServicesSection'
import ScrollStorySection from './components/sections/ScrollStorySection'
import IndustriesSection from './components/sections/IndustriesSection'
import WhyChooseUsSection from './components/sections/WhyChooseUsSection'
import PortfolioSection from './components/sections/PortfolioSection'
import TestimonialsSection from './components/sections/TestimonialsSection'
import ContactSection from './components/sections/ContactSection'

export default function App() {
  const [isDark, setIsDark] = useDarkMode()

  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
        <ScrollProgress />
        <Navbar isDark={isDark} setIsDark={setIsDark} />

        <main>
          <HeroSection />
          <ServicesSection />
          <ScrollStorySection />
          <IndustriesSection />
          <WhyChooseUsSection />
          <PortfolioSection />
          <TestimonialsSection />
          <ContactSection />
        </main>

      
        <BottomNav />
        <FloatingWhatsApp />
      </div>
    </PageTransition>
  )
}
