import { useEffect, useRef, useState } from 'react'
import { useInView } from '../../hooks/useInView'

export default function AnimatedCounter({ target, suffix = '', prefix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView()
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    const numTarget = parseFloat(target.toString().replace(/[^0-9.]/g, ''))
    const startTime = performance.now()

    const update = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * numTarget))
      if (progress < 1) requestAnimationFrame(update)
      else setCount(numTarget)
    }

    requestAnimationFrame(update)
  }, [inView, target, duration])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}
