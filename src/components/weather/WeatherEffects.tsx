"use client"

import { useEffect, useState } from "react"
import type { WeatherId } from "@/lib/weather"

type P = { id: number; left: number; delay: number; duration: number; size: number; blur: boolean }

/**
 * Full-bleed atmosphere for a weather mode: the sky itself lives in CSS
 * (var(--sky) on .wx-sky, driven by [data-weather]); this renders the moving
 * parts — sun halo, snowfall, rain streaks, drifting flakes, ocean swell.
 * Particles are generated after mount so SSR and client markup match.
 */
export function WeatherEffects({ weather, fixed = false }: { weather: WeatherId; fixed?: boolean }) {
  const [parts, setParts] = useState<P[]>([])

  useEffect(() => {
    // Random positions must not run during render/SSR or hydration mismatches.
    const counts: Record<WeatherId, number> = { clear: 0, snow: 48, rain: 64, windsnow: 44, ocean: 0 }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setParts(
      Array.from({ length: counts[weather] }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration:
          weather === "rain" ? 0.9 + Math.random() * 1.4 : 5 + Math.random() * 6,
        size: 3 + Math.random() * 5,
        blur: Math.random() > 0.7,
      }))
    )
  }, [weather])

  return (
    <div className={`${fixed ? "fixed" : "absolute"} inset-0 -z-10 overflow-hidden pointer-events-none`} aria-hidden>
      {/* Sky — gradient comes from the active [data-weather] CSS vars */}
      <div className="wx-sky absolute inset-0" />

      {weather === "clear" && (
        <>
          <div className="wx-halo absolute -top-40 right-[12%] w-[34rem] h-[34rem] rounded-full" />
          <div className="wx-haze absolute bottom-0 left-0 right-0 h-[40vh]" />
        </>
      )}

      {weather === "snow" &&
        parts.map((p) => (
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

      {weather === "windsnow" &&
        parts.map((p) => (
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
          <div className="wx-mist absolute bottom-0 left-0 right-0 h-[35vh]" />
        </>
      )}

      {weather === "ocean" && (
        <>
          <div className="wx-wave absolute bottom-[-12%] left-[-12%] right-[-12%] h-[34vh] rounded-[100%]" />
          <div className="wx-wave wx-wave-2 absolute bottom-[-20%] left-[-20%] right-[-20%] h-[42vh] rounded-[100%]" />
          <div className="wx-shimmer absolute inset-x-0 top-0 h-[55vh]" />
        </>
      )}
    </div>
  )
}
