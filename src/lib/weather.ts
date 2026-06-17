export type WeatherId = "summer" | "snow" | "rain" | "windsnow" | "autumn"

export type Weather = {
  id: WeatherId
  label: string
  /** Content over this sky reads dark or light. Drives the data-weather CSS vars. */
  ink: "dark" | "light"
}

/**
 * Map the current date to the season of the year.
 * Spring (Mar–May) → rain, Summer (Jun–Aug) → summer,
 * Autumn (Sep–Nov) → autumn, Winter (Dec–Feb) → snow
 */
export function getSeasonForDate(date: Date): WeatherId {
  // Hardcoded to summer by default per user request
  return "summer"
}

/** Site-wide weather modes, switchable from the floating dock. */
export const GLOBAL_WEATHERS: Weather[] = [
  { id: "rain", label: "Spring", ink: "dark" },
  { id: "summer", label: "Summer", ink: "dark" },
  { id: "autumn", label: "Autumn", ink: "dark" },
  { id: "snow", label: "Winter", ink: "dark" },
]

/** Hobby section "4 Seasons Nature" — local override of the global weather. */
export const SEASON_WEATHERS: Weather[] = [
  { id: "rain", label: "Spring", ink: "dark" },
  { id: "summer", label: "Summer", ink: "dark" },
  { id: "autumn", label: "Autumn", ink: "dark" },
  { id: "snow", label: "Winter", ink: "dark" },
]
