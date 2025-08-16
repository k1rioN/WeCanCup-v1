import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/news', (req,res)=> res.json([{id:1,title:'Demo news'}]))

app.listen(3001, ()=> console.log('API on http://localhost:3001'))

// ...верх файла (app, middleware и т.д.)

const applications = []  // простая in-memory база заявок

app.post('/api/apply', (req, res) => {
  const record = { id: Date.now(), ...req.body, ts: new Date().toISOString() }
  applications.push(record)
  console.log('New application:', record)
  res.json({ ok: true, id: record.id })
})

// по желанию: админский просмотр последних 50
app.get('/api/apply', (req, res) => {
  res.json(applications.slice(-50))
})
