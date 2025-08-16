import { useEffect, useState } from 'react'
import axios from 'axios'

export default function ChatBox() {
  const [messages, setMessages] = useState([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  async function load() {
    try {
      const { data } = await axios.get('/api/chat/messages')
      setMessages(data)
    } catch {}
  }

  useEffect(() => {
    load()
    const id = setInterval(load, 4000)
    return () => clearInterval(id)
  }, [])

  async function send(e) {
    e.preventDefault()
    if (!text.trim()) return
    setLoading(true)
    try {
      await axios.post('/api/chat/messages', { author: 'Гость', text })
      setText('')
      await load()
    } finally { setLoading(false) }
  }

  return (
    <div className="glass p-4 h-[28rem] flex flex-col">
      <div className="font-semibold mb-2">Чат</div>
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-3 pr-1">
        {messages.map((m, i) => (
          <div key={i} className="bg-white/5 rounded-xl p-2">
            <div className="text-xs text-white/50">{m.author} · {new Date(m.ts).toLocaleTimeString('ru-RU')}</div>
            <div>{m.text}</div>
          </div>
        ))}
      </div>
      <form onSubmit={send} className="mt-3 flex gap-2">
        <input value={text} onChange={e => setText(e.target.value)} placeholder="Напишите сообщение…"
               className="flex-1 bg-white/5 rounded-xl px-3 py-2 outline-none focus:ring-2 ring-brand-mint/40" />
        <button disabled={loading} className="btn btn-mint">{loading ? '...' : 'Отправить'}</button>
      </form>
    </div>
  )
}
