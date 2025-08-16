import { useMemo, useState } from 'react'
import MatchCard from '../components/MatchCard.jsx'
import ChatBox from '../components/ChatBox.jsx'

const demoMatches = [
  { id: 101, home: 'Lions HS',  away: 'Cyber Foxes',   date: '2025-09-12T17:00:00', homeLogo: '/src/assets/team1.svg', awayLogo: '/src/assets/team2.svg' },
  { id: 102, home: 'North Owls', away: 'Wolves Academy', date: '2025-09-18T18:00:00', homeLogo: '/src/assets/team3.svg', awayLogo: '/src/assets/team4.svg' },
  { id: 103, home: 'Pixel Kids', away: 'Aim Masters',   date: '2025-08-28T16:30:00', homeLogo: '/src/assets/team2.svg', awayLogo: '/src/assets/team1.svg', score:'16:12' },
  { id: 104, home: 'Neon Bears', away: 'Night Ravens',  date: '2025-07-30T15:00:00', homeLogo: '/src/assets/team4.svg', awayLogo: '/src/assets/team3.svg', score:'2:1' },
]

export default function Matches(){
  const [tab, setTab] = useState('upcoming')
  const [q, setQ] = useState('')

  const filtered = useMemo(()=>{
    const now = new Date()
    return demoMatches.filter(m => {
      const isUpcoming = new Date(m.date) > now
      const okTab = tab === 'upcoming' ? isUpcoming : !isUpcoming
      const okQ = (m.home + m.away).toLowerCase().includes(q.toLowerCase())
      return okTab && okQ
    })
  }, [tab, q])

  return (
    <section className="container-p py-12 grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-3xl font-bold">Матчи</h1>
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={()=>setTab('upcoming')} className={`btn ${tab==='upcoming'?'btn-mint':'bg-white/5'}`}>Ближайшие</button>
          <button onClick={()=>setTab('past')} className={`btn ${tab==='past'?'btn-primary':'bg-white/5'}`}>Прошедшие</button>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Поиск команды"
                 className="ml-auto bg-white/5 px-3 py-2 rounded-xl outline-none focus:ring-2 ring-brand-pink/40"/>
        </div>
        <div className="grid gap-3">
          {filtered.map(m => <MatchCard key={m.id} m={m} />)}
          {filtered.length === 0 && <div className="text-white/60">Матчей не найдено.</div>}
        </div>
      </div>
      <div><ChatBox /></div>
    </section>
  )
}
