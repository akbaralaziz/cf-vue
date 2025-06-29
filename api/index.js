// src/index.js (Cloudflare Worker backend)
import { Hono } from 'hono'

const app = new Hono()

// Endpoint untuk menyimpan data ke D1
app.post('/api/barang', async (c) => {
  const { nama, harga, jumlah } = await c.req.json()

  await c.env.DB.prepare(`
    INSERT INTO barang (nama, harga, jumlah) VALUES (?, ?, ?)
  `).bind(nama, harga, jumlah).run()

  return c.json({ success: true, message: 'Barang berhasil disimpan' })
})

// Endpoint untuk ambil semua barang
app.get('/api/barang', async (c) => {
  const result = await c.env.DB.prepare(`SELECT * FROM barang`).all()
  return c.json(result.results)
})

export default app
