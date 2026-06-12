import { motion } from 'framer-motion'

function SkeletonBlock({ className = '' }) {
  return (
    <motion.div
      animate={{ opacity: [0.4, 0.8, 0.4] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      className={`bg-gray-200 dark:bg-gray-800 rounded-xl ${className}`}
    />
  )
}

export function HeroSkeleton() {
  return (
    <div className="min-h-screen purple-gradient-bg flex flex-col justify-center px-5 md:px-8 lg:px-16 pt-20">
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col gap-4">
          <SkeletonBlock className="h-5 w-40" />
          <SkeletonBlock className="h-14 w-full" />
          <SkeletonBlock className="h-14 w-4/5" />
          <SkeletonBlock className="h-14 w-3/5" />
          <SkeletonBlock className="h-5 w-full max-w-md" />
          <SkeletonBlock className="h-5 w-3/4 max-w-sm" />
          <div className="flex gap-3 mt-2">
            <SkeletonBlock className="h-12 w-36 rounded-2xl" />
            <SkeletonBlock className="h-12 w-36 rounded-2xl" />
          </div>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {[1,2,3,4].map(i => <SkeletonBlock key={i} className="h-16 rounded-2xl" />)}
          </div>
        </div>
        <SkeletonBlock className="h-80 lg:h-[500px] rounded-3xl" />
      </div>
    </div>
  )
}

export function CardSkeleton({ count = 3 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-gray-100 dark:border-gray-800 p-5 flex flex-col gap-3">
          <SkeletonBlock className="h-12 w-12 rounded-xl" />
          <SkeletonBlock className="h-5 w-3/4" />
          <SkeletonBlock className="h-4 w-full" />
          <SkeletonBlock className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  )
}

export function SectionSkeleton() {
  return (
    <div className="py-20 px-5 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 flex flex-col items-center gap-3">
          <SkeletonBlock className="h-4 w-28" />
          <SkeletonBlock className="h-10 w-72" />
          <SkeletonBlock className="h-4 w-80" />
        </div>
        <CardSkeleton count={6} />
      </div>
    </div>
  )
}

export default SkeletonBlock
