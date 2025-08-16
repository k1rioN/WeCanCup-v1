import { Link, NavLink, useLocation } from 'react-router-dom'
import { useRef, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo.jsx'

const nav = [
  { to: '/',       label: 'Главная' },
  { to: '/about',  label: 'О лиге' },
  { to: '/news',   label: 'Новости' },
  { to: '/gallery',label: 'Галерея' },
  { to: '/contact',label: 'Контакты' },
  { to: '/apply',  label: 'Подать заявку' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [ripples, setRipples] = useState([])
  const [hovered, setHovered] = useState(null) // ← текущий пункт под курсором ('/news' и т.п.)
  const barRef = useRef(null)
  const location = useLocation()

  // какой пункт сейчас «выделяем» пилюлей
  const currentTargetPath = useMemo(
    () => hovered ?? normalize(location.pathname),
    [hovered, location.pathname]
  )

  function spawnRipple(e) {
    const bar = barRef.current
    if (!bar) return
    const br = bar.getBoundingClientRect()
    const x = e.clientX - br.left
    const y = e.clientY - br.top
    const id = Date.now()
    setRipples(r => [...r, { id, x, y }])
    setTimeout(() => setRipples(r => r.filter(t => t.id !== id)), 700)
  }

  return (
    <header className="sticky top-0 z-40 bg-bg/80 backdrop-blur">
      <div className="container-p h-16 flex items-center justify-between border-b border-white/10">
        <Link to="/" className="flex items-center gap-3">
          <Logo className="w-8 h-8" />
          <span className="font-semibold tracking-wide">WECAN CUP</span>
        </Link>

        {/* Desktop nav */}
        <nav
          ref={barRef}
          className="relative hidden md:flex items-center gap-1"
          onMouseLeave={() => setHovered(null)}     // ← уводим курсор — возвращаемся к активному
        >
          {/* Ripples (вода при клике) */}
          <AnimatePresence>
            {ripples.map(r => (
              <motion.span
                key={r.id}
                initial={{ scale: 0, opacity: 0.35 }}
                animate={{ scale: 1.8, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute rounded-full"
                style={{
                  left: r.x, top: r.y, width: 6, height: 6, transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(circle, rgba(152,255,152,.35), rgba(255,182,193,.18) 40%, transparent 60%)',
                  filter: 'blur(2px)'
                }}
              />
            ))}
          </AnimatePresence>

          {nav.map(i => {
            const isHighlighted = normalize(i.to) === currentTargetPath
            return (
              <NavLink
                key={i.to}
                to={i.to}
                onMouseEnter={() => setHovered(normalize(i.to))} // ← ховерим — пилюля едет сюда
                onMouseDown={spawnRipple}
                className="relative px-3 py-2 rounded-2xl text-[15px] font-medium transition will-change-transform hover:translate-y-[-1px]"
              >
                {({ isActive }) => (
                  <>
                    {isHighlighted && (
                      <motion.span
                        layoutId="navActive"
                        transition={{ type: 'spring', stiffness: 420, damping: 36, mass: 0.6 }}
                        className="absolute inset-0 rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur-md animate-water shadow-soft"
                        style={{
                          boxShadow: '0 6px 18px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.06)'
                        }}
                      />
                    )}
                    <span className={`relative z-10 ${isActive ? 'text-brand-mint' : 'text-white'}`}>
                      {i.label}
                    </span>
                  </>
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(v => !v)} className="md:hidden btn btn-primary">Меню</button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-b border-white/10 bg-bg"
          >
            <div className="container-p py-3 flex flex-col">
              {nav.map(i => (
                <NavLink
                  key={i.to}
                  to={i.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `relative px-3 py-2 rounded-xl ${isActive ? 'bg-white/10 text-brand-mint' : 'hover:bg-white/5'}`
                  }
                >
                  {i.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

// Нормализуем пути вида '/news/' -> '/news'
function normalize(p){ return (p || '/').replace(/\/+$/,'') || '/' }
