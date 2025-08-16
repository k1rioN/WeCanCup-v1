import { motion, useAnimation } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function Reveal({ children, y = 16, delay = 0, className = '' }) {
  const controls = useAnimation()
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) controls.start({ opacity: 1, y: 0 })
    }, { threshold: 0.12 })
    io.observe(el)
    return () => io.disconnect()
  }, [controls])

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={controls}
      transition={{ duration: 0.55, ease: [0.22,1,0.36,1], delay }}
    >
      {children}
    </motion.div>
  )
}
