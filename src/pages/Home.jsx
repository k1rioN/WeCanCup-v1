import { motion } from 'framer-motion'
import Reveal from '../components/Reveal.jsx'
import { Link } from 'react-router-dom'
import ParticleBackground from '../components/ParticleBackground.jsx'
import Logo from '../components/Logo.jsx'
import NewsCard from '../components/NewsCard.jsx'
import MatchCard from '../components/MatchCard.jsx'

const demoNews = [
  { id: 1, title: 'Старт регистрации на сезон осень 2025', excerpt: 'Открыта регистрация для школьных команд — присоединяйтесь!', date: '2025-09-01', image: '/media/news/news1.svg' },
  { id: 2, title: 'Анонс офлайн-финала в Москве', excerpt: 'Гранд-финал пройдёт в киберарене с призами.', date: '2025-10-05', image: '/media/news/news2.svg' },
  { id: 3, title: 'Новые дисциплины: Valorant и FC25', excerpt: 'Расширяем список игр — следите за расписанием.', date: '2025-08-20', image: '/media/news/news3.svg' },
]

const demoMatches = [
  { id: 101, home: 'Lions HS',  away: 'Cyber Foxes',   date: '2025-09-12T17:00:00', homeLogo: '/media/teams/team.svg', awayLogo: '/media/teams/team.svg' },
  { id: 102, home: 'North Owls', away: 'Wolves Academy', date: '2025-09-18T18:00:00', homeLogo: '/media/teams/team.svg', awayLogo: '/media/teams/team.svg' },
  { id: 103, home: 'Pixel Kids', away: 'Aim Masters',   date: '2025-08-28T16:30:00', homeLogo: '/media/teams/team.svg', awayLogo: '/media/teams/team.svg', score:'16:12' },
  { id: 104, home: 'Neon Bears', away: 'Night Ravens',  date: '2025-07-30T15:00:00', homeLogo: '/media/teams/team.svg', awayLogo: '/media/teams/team.svg', score:'2:1' },
]

export default function Home(){
  return (
    <>
      <section className="relative overflow-hidden min-h-[95svh] md:min-h-screen flex items-center">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 [transform:scale(1.18)] md:[transform:scale(1.28)] origin-center">
            <ParticleBackground className="absolute inset-0 opacity-60" />
          </div>
        </div>
        <div className="container-p py-20 md:py-28 grid lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <motion.div initial={{opacity:0, y:10}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.6}} className="flex items-center gap-4">
              <div className="w-14 h-14"><Logo className="w-full h-full" /></div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                WECAN CUP <span className="text-brand-mint">Esports</span>
              </h1>
            </motion.div>
            <p className="text-white/70 max-w-prose">Лига для школьников 10–18: офлайн-матчи, сезоны, расписание, результаты и трансляции.</p>
            <div className="flex gap-3">
              <div className="text-sm text-brand-mint/90 bg-grey w-fit px-2 py-1 rounded-lg items-center inline-flex">
                Турнир: середина октября 2025
              </div>
              <Link className="btn btn-mint" to="/apply">Подать заявку</Link>   {/* ← заменили кнопку */}
              <Link className="btn btn-primary" to="/news">Свежие новости</Link>
            </div>
          </div>
          <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} transition={{duration:0.7}} className="glass p-6">
            <div className="rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10 shadow-lg">
              <video className="w-full aspect-video rounded-xl" src="" poster="/media/ui/hero-poster.svg" controls />
            </div>            
          </motion.div>
        </div>
      </section>

      <section className="container-p py-12">
        <h2 className="text-2xl font-semibold mb-6">Ближайшие матчи</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {demoMatches.slice(0,4).map(m => <MatchCard key={m.id} m={m} />)}
        </div>
      </section>

      <section className="container-p py-12">
        <h2 className="text-2xl font-semibold mb-6">Новости</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {demoNews.map(n => <NewsCard key={n.id} item={n} />)}
        </div>
      </section>
    </>
  )
}
