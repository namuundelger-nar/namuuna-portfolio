export type WeatherId = "clear" | "snow" | "rain" | "windsnow" | "ocean"

export type Weather = {
  id: WeatherId
  label: string
  /** Content over this sky reads dark or light. Drives the data-weather CSS vars. */
  ink: "dark" | "light"
}

/** Site-wide weather modes, switchable from the floating dock. */
export const GLOBAL_WEATHERS: Weather[] = [
  { id: "clear", label: "Clear", ink: "dark" },
  { id: "snow", label: "Snow", ink: "dark" },
  { id: "rain", label: "Rain", ink: "light" },
  { id: "ocean", label: "Ocean", ink: "dark" },
]

/** Hobby section "4 Seasons Nature" — local override of the global weather. */
export const SEASON_WEATHERS: Weather[] = [
  { id: "snow", label: "Snow", ink: "dark" },
  { id: "rain", label: "Rain", ink: "light" },
  { id: "windsnow", label: "Wind & Snow", ink: "dark" },
  { id: "ocean", label: "Ocean", ink: "dark" },
]
