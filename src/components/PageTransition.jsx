// PageTransition.jsx
import { motion } from 'framer-motion'
export default function PageTransition({ children }) {
  return (
    <motion.main initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                 transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} className="flex-1">
      {children}
    </motion.main>
  )
}
