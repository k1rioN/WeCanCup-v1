// src/components/ParticleBackground.jsx
import { useEffect, useRef } from "react";

/**
 * Анимированный фон с частицами.
 * - Работает через <canvas>
 * - Учитывает devicePixelRatio (ретина → четкая картинка)
 * - Авто-ресайз по контейнеру
 *
 * Пример использования:
 * <div className="absolute inset-0 -z-10 pointer-events-none">
 *   <ParticleBackground className="absolute inset-0 opacity-60" />
 * </div>
 */
export default function ParticleBackground({
  className = "",
  // на всякий случай оставляю параметры, можно крутить визуал без правок логики
  density = 0.00018, // частиц на пиксель площади (0.00018 ≈ 80–120 частиц на экран)
  maxSpeed = 0.25,   // скорость частиц (px/frame)
  linkDist = 160,    // радиус соединения линией (px)
  dotSize = 2.0,     // радиус точки (px)
  colorMint = "#98FF98",
  colorPink = "#FFB6C1",
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    const DPR = Math.max(1, window.devicePixelRatio || 1);

    // ---------- helpers ----------
    const rand = (min, max) => min + Math.random() * (max - min);

    const resize = () => {
      // реальный CSS-размер
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      // внутренний буфер канваса с учетом DPR
      canvas.width = Math.max(1, Math.floor(w * DPR));
      canvas.height = Math.max(1, Math.floor(h * DPR));
      // масштабируем контекст, чтобы рисовать в CSS-координатах
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      // перерасчет количества частиц по площади
      const targetCount = Math.max(30, Math.floor(w * h * density));
      const arr = particlesRef.current;

      if (arr.length > targetCount) {
        arr.length = targetCount;
      } else {
        while (arr.length < targetCount) {
          arr.push({
            x: rand(0, w),
            y: rand(0, h),
            vx: rand(-maxSpeed, maxSpeed),
            vy: rand(-maxSpeed, maxSpeed),
            // лёгкий разброс цвета
            tint: Math.random() < 0.5 ? "mint" : "pink",
          });
        }
      }
    };

    // ---------- анимация ----------
    const step = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const pts = particlesRef.current;

      // фон — прозрачный, чтобы компонент был «поверх темы»
      ctx.clearRect(0, 0, w, h);

      // мягкий «виньет» для глубины
      const grad = ctx.createRadialGradient(w * 0.8, h * 0.2, 0, w * 0.8, h * 0.2, Math.max(w, h));
      grad.addColorStop(0, "rgba(255,255,255,0.03)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // обновление и рисование точек
      ctx.fillStyle = "rgba(255,255,255,0.45)";
      for (let p of pts) {
        p.x += p.vx;
        p.y += p.vy;

        // отражение от краев
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // точка
        ctx.beginPath();
        ctx.arc(p.x, p.y, dotSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // линии между близкими точками
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist) {
            const t = 1 - d / linkDist; // близко → ярче
            // градиент с фирменными цветами
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grad.addColorStop(0, a.tint === "mint" ? hexWithAlpha(colorMint, 0.22 * t) : hexWithAlpha(colorPink, 0.22 * t));
            grad.addColorStop(1, b.tint === "mint" ? hexWithAlpha(colorMint, 0.22 * t) : hexWithAlpha(colorPink, 0.22 * t));
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    // ---------- init ----------
    resize();
    // старт анимации (в следующий кадр после resize)
    rafRef.current = requestAnimationFrame(step);
    window.addEventListener("resize", resize);

    // ---------- cleanup ----------
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [density, maxSpeed, linkDist, dotSize, colorMint, colorPink]);

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} />;
}

/** Примесь: цвет #RRGGBB -> rgba с прозрачностью */
function hexWithAlpha(hex, alpha = 1) {
  // поддержка формата #RRGGBB
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return hex;
  const r = parseInt(m[1], 16);
  const g = parseInt(m[2], 16);
  const b = parseInt(m[3], 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
