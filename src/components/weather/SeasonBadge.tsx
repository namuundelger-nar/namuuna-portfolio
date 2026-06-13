"use client"

import { useWeather } from "@/components/weather/WeatherProvider"
import type { WeatherId } from "@/lib/weather"

const greetings: Record<WeatherId, { icon: string; text: string }> = {
  clear: { icon: "✨", text: "Clear skies" },
  summer: { icon: "☀️", text: "Summer vibes" },
  rain: { icon: "🌧️", text: "Spring showers" },
  snow: { icon: "❄️", text: "Winter wonder" },
  windsnow: { icon: "🌬️", text: "Blizzard mode" },
  autumn: { icon: "🍂", text: "Autumn winds" },
}

/** A small animated badge in the hero that reflects the current weather/season. */
export function SeasonBadge() {
  const { weather } = useWeather()
  const g = greetings[weather.id]

  return (
    <span className="season-badge" key={weather.id}>
      <span className="season-badge-icon" aria-hidden>{g.icon}</span>
      {g.text}
    </span>
  )
}
