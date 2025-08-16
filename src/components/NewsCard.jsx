import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NewsCard({ item }) {
  return (
    <motion.article whileHover={{ y: -4, scale: 1.01 }} className="glass overflow-hidden">
      <motion.img src={item.image} alt="" className="h-40 w-full object-cover"
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}
      />
      <div className="p-4 space-y-2">
        <div className="text-xs text-white/60">{new Date(item.date).toLocaleDateString('ru-RU')}</div>
        <h3 className="font-semibold text-lg">{item.title}</h3>
        <p className="text-white/70" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {item.excerpt}
        </p>
        <Link to="/news" className="text-brand-mint hover:underline">Читать</Link>
      </div>
    </motion.article>
  )
}
