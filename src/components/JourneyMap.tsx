import { Reveal } from "@/components/Reveal"

// Real stops from the CV — no invented stations.
const stops = [
  { city: "Ulaanbaatar", country: "Mongolia", years: "Origin", note: "Where the steppe taught patience." },
  { city: "Moscow", country: "Russia", years: "2020 — 2025", note: "BSc International Relations, RANEPA. Translation & trade communications." },
  { city: "Budapest", country: "Hungary", years: "2025 — now", note: "MSc International Economics & Business. Data, AI validation, finance." },
]

export function JourneyMap() {
  return (
    <Reveal>
      <div className="relative">
        {/* Connecting path */}
        {/* Path is pinned to the dots' centerline (y≈8px) with a gentle ±4px
            wave so it never dips into the city names below. */}
        <svg
          className="absolute left-0 right-0 top-0 w-full h-4 hidden md:block pointer-events-none"
          viewBox="0 0 1000 16"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            className="journey-line"
            d="M 60 8 C 250 4, 350 12, 500 8 S 750 4, 940 8"
            fill="none"
            stroke="var(--glacier)"
            strokeWidth="1.5"
            strokeDasharray="6 7"
          />
        </svg>

        <ol className="grid md:grid-cols-3 gap-10 md:gap-8 relative">
          {stops.map((s, i) => (
            <li key={s.city} className="journey-node" style={{ animationDelay: `${0.4 + i * 0.45}s` }}>
              <div className="flex flex-col gap-3 mb-4">
                <div className="h-4 flex items-center">
                  <span className={`relative w-3.5 h-3.5 rounded-full bg-glacier ${i === stops.length - 1 ? "pulse-dot" : ""}`} />
                </div>
                <span className="font-mono text-xs text-ink-soft tracking-widest uppercase">{s.years}</span>
              </div>
              <h3 className="display text-2xl md:text-3xl mb-1">
                {s.city}
                <span className="text-ink-soft text-lg font-normal italic ml-2">{s.country}</span>
              </h3>
              <p className="text-ink-soft leading-relaxed max-w-xs">{s.note}</p>
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  )
}
