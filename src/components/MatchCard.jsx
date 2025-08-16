import { motion } from 'framer-motion'

export default function MatchCard({ m }) {
  const upcoming = new Date(m.date) > new Date()
  return (
    <motion.div whileHover={{ y: -3 }} className="glass p-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <img src={m.homeLogo} alt="" className="w-10 h-10 rounded-lg" />
        <div className="text-white/90">{m.home}</div>
      </div>
      <div className="text-white/60 text-sm">{new Date(m.date).toLocaleString('ru-RU')}</div>
      <div className="flex items-center gap-3">
        <div className="text-white/90">{m.away}</div>
        <img src={m.awayLogo} alt="" className="w-10 h-10 rounded-lg" />
      </div>
      <div className={`px-2 py-1 rounded-lg text-xs ${upcoming ? 'bg-brand-mint/15 text-brand-mint' : 'bg-brand-pink/15 text-brand-pink'}`}>
        {upcoming ? 'скоро' : (m.score ?? '—')}
      </div>
    </motion.div>
  )
}
