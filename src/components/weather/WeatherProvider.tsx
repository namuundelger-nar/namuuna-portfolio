"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { GLOBAL_WEATHERS, type Weather, type WeatherId } from "@/lib/weather"
import { WeatherEffects } from "./WeatherEffects"

type Ctx = { weather: Weather; setWeather: (id: WeatherId) => void; choices: Weather[] }

const WeatherContext = createContext<Ctx | null>(null)
const STORAGE_KEY = "nm-weather"

export function useWeather() {
  const ctx = useContext(WeatherContext)
  if (!ctx) throw new Error("useWeather must be used within WeatherProvider")
  return ctx
}

export function WeatherProvider({ children }: { children: React.ReactNode }) {
  const [id, setId] = useState<WeatherId>("clear")

  useEffect(() => {
    // localStorage is client-only; reading it before mount would break hydration.
    const saved = localStorage.getItem(STORAGE_KEY) as WeatherId | null
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved && GLOBAL_WEATHERS.some((w) => w.id === saved)) setId(saved)
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, id)
    document.documentElement.dataset.weather = id
  }, [id])

  const weather = GLOBAL_WEATHERS.find((w) => w.id === id) ?? GLOBAL_WEATHERS[0]

  return (
    <WeatherContext.Provider value={{ weather, setWeather: setId, choices: GLOBAL_WEATHERS }}>
      <WeatherEffects weather={weather.id} fixed />
      {children}
    </WeatherContext.Provider>
  )
}

/**
 * Local weather override (Hobby section). Everything inside ignores the
 * global sky and runs its own list of modes; CSS vars cascade from the
 * data-weather attribute on the wrapper.
 */
export function WeatherScope({
  choices,
  defaultId,
  children,
}: {
  choices: Weather[]
  defaultId?: WeatherId
  children: React.ReactNode
}) {
  const [id, setId] = useState<WeatherId>(defaultId ?? choices[0].id)
  const weather = choices.find((w) => w.id === id) ?? choices[0]

  return (
    <WeatherContext.Provider value={{ weather, setWeather: setId, choices }}>
      <div data-weather={weather.id} className="relative isolate min-h-screen wx-surface">
        <WeatherEffects weather={weather.id} />
        {children}
      </div>
    </WeatherContext.Provider>
  )
}
