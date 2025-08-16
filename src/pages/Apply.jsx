import { useState } from 'react'
import axios from 'axios'

export default function Apply() {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    team: '',
    school: '',
    city: '',
    captainName: '',
    captainEmail: '',
    captainPhone: '',
    players: '',
    game: 'CS2',
    consent: false,
  })

  const midOctober = '15 октября 2025' // инфо-блок

  function upd(k, v){ setForm(prev => ({...prev, [k]: v})) }

  async function submit(e){
    e.preventDefault()
    if (!form.consent) return alert('Нужно согласие на обработку данных')
    setSending(true)
    try {
      await axios.post('/api/apply', form)
      setSent(true)
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <section className="container-p py-16 max-w-3xl">
        <div className="glass p-6">
          <h1 className="text-2xl font-bold mb-2">Заявка отправлена 🎉</h1>
          <p className="text-white/70">
            Мы свяжемся с капитаном по указанной почте в течение 1–2 рабочих дней.
            Турнир запланирован на {midOctober}.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="container-p py-16 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Заявка на участие</h1>
      <p className="text-white/70 mb-6">
        Турнир пройдёт в середине октября (ориентировочно {midOctober}). Заполните форму, чтобы зарегистрировать команду.
      </p>

      <form onSubmit={submit} className="glass p-6 space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-white/60">Название команды</label>
            <input className="w-full bg-white/5 rounded-xl px-3 py-2 outline-none focus:ring-2 ring-brand-mint/40"
                   value={form.team} onChange={e=>upd('team', e.target.value)} required />
          </div>
          <div>
            <label className="text-sm text-white/60">Школа</label>
            <input className="w-full bg-white/5 rounded-xl px-3 py-2 outline-none focus:ring-2 ring-brand-mint/40"
                   value={form.school} onChange={e=>upd('school', e.target.value)} required />
          </div>
          <div>
            <label className="text-sm text-white/60">Город</label>
            <input className="w-full bg-white/5 rounded-xl px-3 py-2 outline-none focus:ring-2 ring-brand-mint/40"
                   value={form.city} onChange={e=>upd('city', e.target.value)} required />
          </div>
          <div>
            <label className="text-sm text-white/60">Дисциплина</label>
            <select className="w-full bg-white/5 rounded-xl px-3 py-2 outline-none focus:ring-2 ring-brand-mint/40"
                    value={form.game} onChange={e=>upd('game', e.target.value)} disabled>
              <option value="CS2">Counter-Strike 2</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-white/60">Капитан — ФИО</label>
            <input className="w-full bg-white/5 rounded-xl px-3 py-2 outline-none focus:ring-2 ring-brand-mint/40"
                   value={form.captainName} onChange={e=>upd('captainName', e.target.value)} required />
          </div>
          <div>
            <label className="text-sm text-white/60">Капитан — Email</label>
            <input type="email" className="w-full bg-white/5 rounded-xl px-3 py-2 outline-none focus:ring-2 ring-brand-mint/40"
                   value={form.captainEmail} onChange={e=>upd('captainEmail', e.target.value)} required />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-white/60">Капитан — телефон</label>
            <input className="w-full bg-white/5 rounded-xl px-3 py-2 outline-none focus:ring-2 ring-brand-mint/40"
                   value={form.captainPhone} onChange={e=>upd('captainPhone', e.target.value)} required />
          </div>
        </div>

        <div>
          <label className="text-sm text-white/60">Игроки (ФИО и классы, 5–7 человек)</label>
          <textarea rows="5" className="w-full bg-white/5 rounded-xl px-3 py-2 outline-none focus:ring-2 ring-brand-mint/40"
                    placeholder="- Игрок 1, 10А\n- Игрок 2, 11Б\n..."
                    value={form.players} onChange={e=>upd('players', e.target.value)} required />
        </div>

        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" checked={form.consent} onChange={e=>upd('consent', e.target.checked)} />
          <span className="text-white/70">Согласие на обработку персональных данных и правила лиги</span>
        </label>

        <div className="flex gap-3">
          <button disabled={sending} className="btn btn-mint">{sending ? 'Отправка…' : 'Отправить заявку'}</button>
          <a className="btn btn-primary" href="/src/assets/rules.pdf" target="_blank" rel="noreferrer">Правила лиги (PDF)</a>
        </div>
      </form>
    </section>
  )
}
