// src/pages/About.jsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'

const stats = [
  { k: '1500+', v: 'зарегистрированных игроков' },
  { k: '120+',  v: 'школьных команд' },
  { k: '1 сезон', v: 'осень 2025 (CS2)' },
  { k: '10–18', v: 'возраст участников' },
]

const roadmap = [
  { date: 'Сентябрь',         title: 'Отборочные',  text: 'Онлайн-матчи BO1 по сетке Swiss.' },
  { date: 'Начало октября',   title: 'Группы',      text: 'Групповой этап BO1/BO3, очки и статистика.' },
  { date: 'Середина октября', title: 'Плей-офф',    text: 'Double Elimination BO3.' },
  { date: 'Конец октября',    title: 'Гранд-финал', text: 'Офлайн-сцена, призы от партнёров.' },
]

const values = [
  { t: 'Честная игра', d: 'Анти-чит, проверка аккаунтов и судейство.' },
  { t: 'Развитие',     d: 'Фидбек тренеров и мастер-классы от комьюнити.' },
  { t: 'Безопасность', d: 'Модерация, правила, согласия родителей.' },
  { t: 'Возможности',  d: 'Стажировки, рекомендации и медиа-поддержка.' },
]

const faqs = [
  { q: 'Кто может участвовать?', a: 'Школьники 10–18 лет. Команда 5–7 человек, капитан 14+.' },
  { q: 'Сколько стоит участие?', a: 'Бесплатно в пилотном сезоне. Нужна регистрация команды.' },
  { q: 'Где проходят матчи?', a: 'Отборочные и группы — онлайн, финал — офлайн (город объявим в новостях).' },
  { q: 'Какие требования к оборудованию?', a: 'Стабильный интернет и PC, соответствующий минимальным требованиям CS2.' },
]

export default function About() {
  return (
    <section className="flex flex-col">
      {/* HERO */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-[0.35] pointer-events-none">
          <div className="absolute -left-24 -top-24 w-[38rem] h-[38rem] rounded-full blur-3xl"
               style={{ background: 'radial-gradient(closest-side, rgba(255,182,193,.22), transparent 70%)' }} />
          <div className="absolute -right-24 -bottom-24 w-[42rem] h-[42rem] rounded-full blur-3xl"
               style={{ background: 'radial-gradient(closest-side, rgba(152,255,152,.22), transparent 70%)' }} />
        </div>

        <div className="container-p py-16 md:py-24 grid lg:grid-cols-2 gap-10 items-center">
          <Reveal>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              О лиге <span className="text-brand-mint">WECAN CUP</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-white/70 text-lg">
              Создаём честную и вдохновляющую киберспортивную среду для школьников.
              Главная дисциплина сезона — <span className="text-white">Counter-Strike 2</span>.
              Регистрация открыта, финал — в середине октября.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="lg:col-span-2">
            <div className="glass p-4 md:p-6 rounded-2xl grid sm:grid-cols-4 gap-4">
              {stats.map((s,i)=>(
                <div key={i} className="text-center sm:text-left">
                  <div className="text-2xl md:text-3xl font-extrabold text-white">{s.k}</div>
                  <div className="text-white/60 text-sm">{s.v}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* ROADMAP */}
      <div className="container-p py-12 md:py-16">
        <Reveal><h2 className="text-2xl md:text-3xl font-semibold mb-6">Как проходит сезон</h2></Reveal>
        <div className="relative">
          <div className="absolute left-2 md:left-1/2 top-0 bottom-0 w-px bg-white/10" />
          <div className="space-y-6">
            {roadmap.map((r, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className={`grid md:grid-cols-2 gap-6 items-start ${i%2 ? 'md:text-left' : 'md:text-right'}`}>
                  <div className={`${i%2 ? 'md:order-1' : 'md:order-2'}`}>
                    <div className="glass p-5 rounded-2xl h-full">
                      <div className="text-brand-mint text-sm mb-1">{r.date}</div>
                      <div className="font-semibold text-lg mb-1">{r.title}</div>
                      <p className="text-white/70">{r.text}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* VALUES */}
      <div className="container-p py-12">
        <Reveal><h2 className="text-2xl md:text-3xl font-semibold mb-6">Ценности</h2></Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
          {values.map((v,i)=>(
            <Reveal key={i} delay={i*0.05}>
              <div className="glass p-5 rounded-2xl h-full hover:translate-y-[-2px] transition">
                <div className="text-white font-semibold mb-1">{v.t}</div>
                <p className="text-white/70 text-sm">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* PARTNERS */}
      <div className="container-p py-12">
        <Reveal><h2 className="text-2xl md:text-3xl font-semibold mb-6">Партнёрам</h2></Reveal>
        <Reveal delay={0.05}>
          <div className="glass p-6 rounded-2xl grid lg:grid-cols-2 gap-6 items-center">
            <img src="/src/assets/about-partners.svg" alt="" className="w-full rounded-xl opacity-90" />
            <div>
              <p className="text-white/70">
                Ищем бренды, которым близки образование и киберспорт. Партнёрские пакеты: интеграции в трансляциях,
                офлайн-зона на финале и активности для школ.
              </p>
              <div className="mt-4 flex gap-3">
                <Link to="/contact" className="btn btn-primary">Стать партнёром</Link>
                <Link to="/apply" className="btn btn-mint">Подать заявку</Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* FAQ */}
      <div className="container-p py-12 md:py-16">
        <Reveal><h2 className="text-2xl md:text-3xl font-semibold mb-6">FAQ</h2></Reveal>

        {/* колонки не растягивают друг друга по высоте */}
        <div className="grid lg:grid-cols-2 gap-4 items-start">
          {faqs.map((f,i)=>(
            <FAQItem key={i} q={f.q} a={f.a} delay={i*0.04} />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="container-p pb-16">
        <Reveal>
          <div className="glass p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-white font-semibold text-lg">Готовы участвовать в сезоне?</div>
              <div className="text-white/70 text-sm">Турнир — середина октября. Команды 5–7 человек, капитан 14+.</div>
            </div>
            <div className="flex gap-3">
              <Link to="/apply" className="btn btn-mint">Подать заявку</Link>
              <Link to="/news" className="btn btn-primary">Свежие новости</Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/** Аккордеон FAQ с корректной анимацией открытия/закрытия и без «расползания» ширины */
function FAQItem({ q, a, delay = 0 }) {
  const [open, setOpen] = useState(false)

  return (
    <Reveal delay={delay}>
      {/* layout="position" — анимируем только перемещение по оси Y (не ширину) */}
      <motion.div layout="position" className="w-full">
        <div className="glass rounded-2xl ring-1 ring-white/10">
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
            className="w-full flex items-center justify-between cursor-pointer p-5 text-left"
          >
            <span className="font-semibold text-lg md:text-xl pr-4">{q}</span>
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 ring-1 ring-white/10">
              <motion.span
                initial={false}
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ type: 'spring', stiffness: 520, damping: 28 }}
                className="text-white/85 text-xl leading-none select-none"
              >
                +
              </motion.span>
            </span>
          </button>

          {/* Контент с полноценной анимацией и клиппингом */}
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 pt-0 text-white/70">
                  {a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </Reveal>
  )
}
