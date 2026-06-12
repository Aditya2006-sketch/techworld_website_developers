# TechWorld — Your Business, Our Technology

Premium mobile-first website for TechWorld, built with React + Vite + Three.js + Framer Motion.

## 🚀 Quick Start

```bash
# 1. Navigate into the project
cd techworld

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build
```

Open http://localhost:5173 in your browser.

---

## 📁 Project Structure

```
techworld/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── src/
    ├── App.jsx                     # Root component
    ├── main.jsx                    # Entry point
    ├── styles/
    │   └── index.css               # Global styles + Tailwind
    ├── hooks/
    │   ├── useDarkMode.js          # Dark/light mode toggle
    │   ├── useInView.js            # Scroll intersection observer
    │   └── useScrollProgress.js   # Scroll progress tracking
    ├── components/
    │   ├── 3d/
    │   │   └── StoreScene.jsx      # Three.js 3D store animation
    │   ├── layout/
    │   │   ├── Navbar.jsx          # Top navigation + dark mode
    │   │   ├── BottomNav.jsx       # Mobile bottom navigation
    │   │   └── Footer.jsx          # Footer
    │   ├── sections/
    │   │   ├── HeroSection.jsx     # Hero + 3D canvas
    │   │   ├── ServicesSection.jsx
    │   │   ├── HowItWorksSection.jsx
    │   │   ├── IndustriesSection.jsx
    │   │   ├── WhyChooseUsSection.jsx
    │   │   ├── GrowthSection.jsx   # Animated graph + counters
    │   │   ├── PortfolioSection.jsx # Filterable case studies
    │   │   ├── TestimonialsSection.jsx
    │   │   ├── PricingSection.jsx
    │   │   └── ContactSection.jsx  # Form + WhatsApp CTA
    │   └── ui/
    │       ├── AnimatedCounter.jsx
    │       ├── FloatingWhatsApp.jsx
    │       └── ScrollProgress.jsx
```

## 🎨 Design System

- **Primary Color:** Purple `#7c3aed`
- **Font Display:** Sora
- **Font Body:** Inter
- **Glassmorphism:** `.glass`, `.glass-card` utility classes
- **Dark Mode:** Class-based (`dark:` prefix), persisted to localStorage

## ⚡ Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Vite | Build tool |
| Tailwind CSS | Utility-first styling |
| Three.js + R3F | 3D store animation in hero |
| Framer Motion | Scroll animations + transitions |
| Lucide React | Icons |

## 📱 Mobile Features

- Full mobile-first responsive design
- Bottom navigation bar for mobile
- Touch-friendly 3D canvas interactions
- WhatsApp floating action button
- Safe area insets for notched phones

## 🔧 Customization

Update contact info in `ContactSection.jsx`:
- WhatsApp number: replace `919876543210`
- Email: replace `hello@techworld.com`
- Phone: replace `+91 98765 43210`

Update pricing in `PricingSection.jsx`.

Update testimonials in `TestimonialsSection.jsx`.
