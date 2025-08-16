// src/components/Footer.jsx
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-gradient-to-r from-gray-950 via-gray-900/80 to-gray-950">
      {/* один ряд на десктопе, аккуратно складывается на мобилках */}
      <div className="container-p py-4 md:py-5 flex flex-col md:flex-row items-center md:items-center justify-between gap-4">
        {/* Лого/описание — сильно компактно */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-white font-semibold tracking-wide">WECAN CUP</span>
          <span className="hidden sm:inline text-sm text-white/60 truncate">
            Лига для школьников 10–18 лет
          </span>
        </div>

        {/* Навигация — в ОДНУ строку (wrap на маленьких экранах) */}
        <nav className="order-last md:order-none flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm">
          <Link to="/" className="hover:text-brand-mint transition">Главная</Link>
          <Link to="/about" className="hover:text-brand-mint transition">О лиге</Link>
          <Link to="/news" className="hover:text-brand-mint transition">Новости</Link>
          <Link to="/gallery" className="hover:text-brand-mint transition">Галерея</Link>
          <Link to="/contact" className="hover:text-brand-mint transition">Контакты</Link>
          <Link to="/apply" className="hover:text-brand-mint transition">Заявка</Link>
        </nav>

        {/* Соцсети + копирайт справа (в одну линию) */}
        <div className="flex items-center gap-4 text-sm whitespace-nowrap">
          <a href="https://t.me/wecan_cup" target="_blank" rel="noreferrer" className="hover:text-brand-pink transition">Telegram</a>
          <a href="#" target="_blank" rel="noreferrer" className="hover:text-brand-mint transition">YouTube</a>
          <span className="hidden md:inline text-white/50">© {new Date().getFullYear()} WECAN CUP</span>
        </div>
      </div>
    </footer>
  )
}
