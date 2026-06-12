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
        <svg
          className="absolute left-0 right-0 top-7 w-full h-10 hidden md:block"
          viewBox="0 0 1000 40"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            className="journey-line"
            d="M 60 20 C 250 -10, 400 50, 500 20 S 800 -8, 940 20"
            fill="none"
            stroke="var(--glacier)"
            strokeWidth="1.5"
            strokeDasharray="6 7"
          />
        </svg>

        <ol className="grid md:grid-cols-3 gap-10 md:gap-8 relative">
          {stops.map((s, i) => (
            <li key={s.city} className="journey-node" style={{ animationDelay: `${0.4 + i * 0.45}s` }}>
              <div className="flex items-center gap-3 mb-4">
                <span className={`relative w-3.5 h-3.5 rounded-full bg-glacier ${i === stops.length - 1 ? "pulse-dot" : ""}`} />
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
