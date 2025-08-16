import { useEffect, useRef } from 'react'

export default function ParticleBackground({ className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const DPR = Math.max(1, window.devicePixelRatio || 1)
    let raf

    function resize() {
      canvas.width = canvas.clientWidth * DPR
      canvas.height = canvas.clientHeight * DPR
    }

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: Math.random(),
      v: (Math.random() * 0.3 + 0.1) * (Math.random() < 0.5 ? 1 : -1),
      s: Math.random() * 2 + 0.5,
    }))

    function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i]
        const ax = a.x * canvas.width, ay = a.y * canvas.height
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j]
          const bx = b.x * canvas.width, by = b.y * canvas.height
          const dx = ax - bx, dy = ay - by
          const d = Math.hypot(dx, dy)
          if (d < 120 * DPR) {
            const o = 1 - d / (120 * DPR)
            ctx.strokeStyle = `rgba(255,255,255,${o * 0.08})`
            ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke()
          }
        }
      }

      for (const p of particles) {
        p.x += p.v * 0.001
        p.y += Math.sin((p.x + p.v) * 6.28) * 0.0005
        if (p.x < 0) p.x = 1
        if (p.x > 1) p.x = 0

        ctx.beginPath()
        ctx.fillStyle = 'rgba(255,255,255,0.6)'
        ctx.arc(p.x * canvas.width, p.y * canvas.height, p.s * DPR, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(loop)
    }

    resize()
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className={className} />
}
