import axios from 'axios'
import { useState } from 'react'

export default function Contact(){
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({name:'', email:'', message:''})

  async function submit(e){
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post('/api/contact', form)
      setSent(true)
    } finally { setLoading(false) }
  }

  return (
    <section className="container-p py-12 grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Контакты</h1>
        <p className="text-white/70">Партнёрства, вопросы СМИ, участие школ — пишите нам.</p>
        <div className="glass p-4">
          <div>Почта: <a className="text-brand-mint hover:underline" href="mailto:hello@wecancup.gg">hello@wecancup.gg</a></div>
          <div>Telegram: <a className="text-brand-pink hover:underline" href="https://t.me/wecan_cup" target="_blank" rel="noreferrer">@wecan_cup</a></div>
        </div>
      </div>
      <div className="glass p-6">
        {!sent ? (
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="text-sm text-white/60">Имя</label>
              <input className="w-full bg-white/5 rounded-xl px-3 py-2 outline-none focus:ring-2 ring-brand-mint/40"
                     value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
            </div>
            <div>
              <label className="text-sm text-white/60">Email</label>
              <input type="email" className="w-full bg-white/5 rounded-xl px-3 py-2 outline-none focus:ring-2 ring-brand-mint/40"
                     value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
            </div>
            <div>
              <label className="text-sm text-white/60">Сообщение</label>
              <textarea rows="5" className="w-full bg-white/5 rounded-xl px-3 py-2 outline-none focus:ring-2 ring-brand-mint/40"
                        value={form.message} onChange={e=>setForm({...form, message:e.target.value})} required />
            </div>
            <button disabled={loading} className="btn btn-mint">{loading ? 'Отправка…' : 'Отправить'}</button>
          </form>
        ) : (
          <div className="p-4">Спасибо! Мы свяжемся с вами в ближайшее время.</div>
        )}
      </div>
    </section>
  )
}
