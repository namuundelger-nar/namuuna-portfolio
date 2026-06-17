"use client"

import { usePathname } from "next/navigation"
import type { WeatherId } from "@/lib/weather"
import { useWeather } from "./WeatherProvider"

/** Animated icon per mode — pure CSS/SVG, animated even while idle. */
function WeatherIcon({ id }: { id: WeatherId }) {
  switch (id) {

    case "summer":
      return (
        <svg viewBox="0 0 24 24" className="wx-icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          {/* Sun body */}
          <circle cx="12" cy="10" r="4.5" fill="currentColor" stroke="none" className="wx-icon-rays" />
          {/* Heat waves below sun */}
          <path className="wx-icon-gust" d="M5 17c2-1.5 4-1.5 6 0s4 1.5 6 0" style={{ animationDelay: "0s" }} />
          <path className="wx-icon-gust" d="M5 20.5c2-1.5 4-1.5 6 0s4 1.5 6 0" style={{ animationDelay: "0.4s" }} />
        </svg>
      )
    case "snow":
      return (
        <svg viewBox="0 0 24 24" className="wx-icon wx-icon-bob" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          {[0, 60, 120].map((r) => (
            <line key={r} x1="12" y1="3" x2="12" y2="21" transform={`rotate(${r} 12 12)`} />
          ))}
          {[0, 60, 120, 180, 240, 300].map((r) => (
            <path key={r} d="M12 4.5 L10 7 M12 4.5 L14 7" transform={`rotate(${r} 12 12)`} />
          ))}
        </svg>
      )
    case "rain":
      return (
        <svg viewBox="0 0 24 24" className="wx-icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M7 11a5 5 0 1 1 9.6-2A3.8 3.8 0 0 1 16 16.5H7.5A4 4 0 0 1 7 11z" />
          <line className="wx-icon-drop" x1="9" y1="18.5" x2="8.4" y2="21" />
          <line className="wx-icon-drop" x1="13" y1="18.5" x2="12.4" y2="21" style={{ animationDelay: "0.35s" }} />
          <line className="wx-icon-drop" x1="17" y1="18.5" x2="16.4" y2="21" style={{ animationDelay: "0.7s" }} />
        </svg>
      )
    case "windsnow":
      return (
        <svg viewBox="0 0 24 24" className="wx-icon" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path className="wx-icon-gust" d="M2 8h11a3 3 0 1 0-3-3" />
          <path className="wx-icon-gust" d="M2 13h16a3 3 0 1 1-3 3" style={{ animationDelay: "0.5s" }} />
          <circle className="wx-icon-bob" cx="6" cy="18.5" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      )
    case "autumn":
      return (
        <svg viewBox="0 0 24 24" className="wx-icon wx-icon-bob" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C8 2 4 6 4 11c0 3 2 6 4 8 1 2 4 3 4 3s3-1 4-3c2-2 4-5 4-8 0-5-4-9-8-9z" />
          <path d="M12 22v-8" />
          <path d="M12 18l-3-2" />
          <path d="M12 14l3-2" />
        </svg>
      )
  }
}

/**
 * The weather switcher. Each button carries a live animated icon; the active
 * mode expands to show its label. Floats bottom-center site-wide, or renders
 * inline when `inline` (Hobby section's 4 Seasons toggle).
 */
export function WeatherDock({ inline = false }: { inline?: boolean }) {
  const { weather, setWeather, choices } = useWeather()
  const pathname = usePathname()

  // The Hobby section runs its own 4-Seasons toggle; hide the global dock
  // there so two weather controls never compete on screen.
  if (!inline && pathname.startsWith("/hobbies")) return null

  return (
    <div
      className={
        inline
          ? "inline-flex"
          : "fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex"
      }
    >
      <div className="wx-dock flex items-center gap-1 rounded-full px-2 py-1.5" role="radiogroup" aria-label="Weather">
        {choices.map((w) => {
          const active = w.id === weather.id
          return (
            <button
              key={w.id}
              role="radio"
              aria-checked={active}
              title={w.label}
              onClick={() => setWeather(w.id)}
              className={`wx-dock-btn flex items-center gap-2 rounded-full cursor-pointer transition-all duration-500 ${
                active ? "wx-dock-active pl-3 pr-4 py-2" : "p-2 opacity-60 hover:opacity-100"
              }`}
            >
              <span className="w-5 h-5 block">
                <WeatherIcon id={w.id} />
              </span>
              <span
                className={`font-mono text-[11px] uppercase tracking-[0.18em] overflow-hidden whitespace-nowrap transition-all duration-500 ${
                  active ? "max-w-28" : "max-w-0"
                }`}
              >
                {w.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
