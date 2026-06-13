"use client"

import { useEffect, useState } from "react"
import type { WeatherId } from "@/lib/weather"

type P = {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  blur: boolean
  seed: number
}

/**
 * Full-bleed atmosphere for a weather mode: the sky itself lives in CSS
 * (var(--sky) on .wx-sky, driven by [data-weather]); this renders the moving
 * parts — sun halo, snowfall, rain streaks, fireflies, drifting leaves.
 *
 * All effects use position:fixed so they cover the full viewport and stay
 * behind content via z-index:-10. Particles float freely as the user scrolls.
 */
export function WeatherEffects({ weather }: { weather: WeatherId }) {
  const [parts, setParts] = useState<P[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const counts: Record<WeatherId, number> = {
      clear: 0,
      summer: 35,
      snow: 48,
      rain: 64,
      windsnow: 44,
      autumn: 55,
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParts(
      Array.from({ length: counts[weather] }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration:
          weather === "rain"
            ? 0.9 + Math.random() * 1.4
            : weather === "summer"
            ? 6 + Math.random() * 10
            : weather === "autumn"
            ? 6 + Math.random() * 7
            : 5 + Math.random() * 6,
        size: 3 + Math.random() * 5,
        blur: Math.random() > 0.65,
        seed: Math.random(),
      }))
    )
    setReady(false)
    const t = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(t)
  }, [weather])

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{ opacity: ready ? 1 : 0, transition: "opacity 0.8s ease-in" }}
      aria-hidden
    >
      {/* Sky gradient from [data-weather] CSS vars */}
      <div className="wx-sky absolute inset-0" />

      {/* ───── Clear: clean, minimal — no sun, just atmosphere ───── */}
      {weather === "clear" && (
        <div className="wx-haze absolute bottom-0 left-0 right-0 h-[30vh]" />
      )}

      {/* ───── Summer: the sun mode — golden halo + fireflies ───── */}
      {weather === "summer" && (
        <>
          <div className="wx-sun-halo absolute -top-32 right-[8%] w-[40rem] h-[40rem] rounded-full" />
          <div className="wx-heat-shimmer absolute bottom-0 left-0 right-0 h-[25vh]" />
          {parts.map((p) => (
            <span
              key={p.id}
              className="wx-firefly absolute rounded-full"
              style={{
                left: `${p.left}%`,
                bottom: `${5 + p.seed * 40}%`,
                width: 3 + p.size * 0.8,
                height: 3 + p.size * 0.8,
                filter: p.blur ? "blur(2px)" : undefined,
                animationDuration: `${p.duration}s, ${2 + p.seed * 3}s`,
                animationDelay: `${p.delay}s, ${p.seed * 2}s`,
              }}
            />
          ))}
        </>
      )}

      {/* ───── Snow: gentle snowfall ───── */}
      {weather === "snow" && (
        <>
          {parts.map((p) => (
            <span
              key={p.id}
              className="wx-flake absolute rounded-full"
              style={{
                left: `${p.left}%`,
                width: p.size,
                height: p.size,
                filter: p.blur ? "blur(2px)" : undefined,
                animation: `wx-snowfall ${p.duration}s linear ${p.delay}s infinite`,
              }}
            />
          ))}
          <div className="wx-snow-ground absolute bottom-0 left-0 right-0 h-[8vh]" />
        </>
      )}

      {/* ───── Wind + Snow: angled drift ───── */}
      {weather === "windsnow" && (
        <>
          {parts.map((p) => (
            <span
              key={p.id}
              className="wx-flake absolute rounded-full"
              style={{
                left: `${p.left}%`,
                width: p.size,
                height: p.size,
                filter: p.blur ? "blur(2px)" : undefined,
                animation: `wx-drift ${p.duration * 0.6}s ease-in ${p.delay}s infinite`,
              }}
            />
          ))}
          <div className="wx-snow-ground absolute bottom-0 left-0 right-0 h-[8vh]" />
        </>
      )}

      {/* ───── Rain: spring shower ───── */}
      {weather === "rain" && (
        <>
          {parts.map((p) => (
            <span
              key={p.id}
              className="wx-streak absolute top-[-12%]"
              style={{
                left: `${p.left}%`,
                height: 30 + p.size * 8,
                animation: `wx-rainfall ${p.duration}s linear ${p.delay}s infinite`,
              }}
            />
          ))}
          <div className="wx-rain-mist absolute bottom-0 left-0 right-0 h-[18vh]" />
        </>
      )}

      {/* ───── Autumn: gentle leaf drift (subtle, like snow) ───── */}
      {weather === "autumn" && (
        <>
          {parts.map((p) => {
            const variant = p.id % 4
            const leafClasses = [
              "wx-leaf",
              "wx-leaf wx-leaf-2",
              "wx-leaf wx-leaf-3",
              "wx-leaf wx-leaf-4",
            ]
            // Smaller sizes — ambient, not attention-grabbing
            const leafSize = 4 + p.size * 1.2
            return (
              <span
                key={p.id}
                className={`${leafClasses[variant]} absolute`}
                style={{
                  left: `${p.left}%`,
                  width: leafSize,
                  height: leafSize,
                  filter: p.blur ? "blur(1.5px)" : undefined,
                  animation: `wx-leaf-drift ${p.duration}s linear ${p.delay}s infinite`,
                }}
              />
            )
          })}
          <div className="wx-autumn-ground absolute bottom-0 left-0 right-0 h-[10vh]" />
        </>
      )}
    </div>
  )
}
