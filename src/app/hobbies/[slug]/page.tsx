import { notFound } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Reveal } from "@/components/Reveal"
import { WeatherScope } from "@/components/weather/WeatherProvider"
import { WeatherDock } from "@/components/weather/WeatherDock"
import { SEASON_WEATHERS } from "@/lib/weather"

const hobbiesData: Record<string, {
  title: string
  description: string
  entries: { date: string; title: string; text: string; photo: string }[]
}> = {
  "martial-arts": {
    title: "Martial Arts",
    description: "Training in various disciplines, building discipline, focus, and physical endurance.",
    entries: [
      {
        date: "May 20, 2026",
        title: "Advanced Sparring Seminar",
        text: "Attended a 3-day intensive seminar focusing on technical sparring and movement fluidity. It was exhausting but incredibly rewarding to train with advanced practitioners and refine my defensive techniques.",
        photo: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=800&auto=format&fit=crop"
      },
      {
        date: "March 15, 2026",
        title: "Mastering the Basics",
        text: "Today marked a milestone in my training where the foundational forms finally clicked into muscle memory. The repetitive drills are paying off in my overall speed and balance.",
        photo: "https://images.unsplash.com/photo-1593810450967-f9c42742e326?q=80&w=800&auto=format&fit=crop"
      }
    ]
  },
  "hiking": {
    title: "Hiking & Nature",
    description: "Exploring trails and finding inspiration in the organic patterns of the natural world.",
    entries: [
      {
        date: "June 02, 2026",
        title: "Summiting Mt. Bogd Khan",
        text: "A challenging 18km trek through dense pine forests and rocky terrain. The view from the peak at sunset was absolutely breathtaking, making every grueling step worth it.",
        photo: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop"
      },
      {
        date: "April 10, 2026",
        title: "Weekend Valley Trail",
        text: "Took a lighter weekend hike through the valley to clear my mind after a heavy coding sprint. Nature always has a way of resetting my focus and creativity.",
        photo: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=800&auto=format&fit=crop"
      }
    ]
  },
  "reading": {
    title: "Reading",
    description: "Constantly learning through geopolitical literature, economics, and sci-fi.",
    entries: [
      {
        date: "May 28, 2026",
        title: "Finished 'Dune' by Frank Herbert",
        text: "An absolute masterpiece of world-building and political ecology. The depth of the Arrakis ecosystem and the complex interplay of religion and power gave me a lot of philosophical food for thought.",
        photo: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=800&auto=format&fit=crop"
      },
      {
        date: "February 14, 2026",
        title: "Diving into Behavioral Economics",
        text: "Started reading 'Thinking, Fast and Slow'. It's fascinating to learn about the cognitive biases that shape human decision-making, especially how it applies to UI/UX design and AI ethics.",
        photo: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop"
      }
    ]
  }
}

export default async function HobbyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const hobby = hobbiesData[slug]

  if (!hobby) {
    notFound()
  }

  return (
    // Local weather override: the Hobby section runs its own "4 Seasons
    // Nature" sky, independent of the global dock.
    <WeatherScope choices={SEASON_WEATHERS} defaultId="summer">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 md:px-10 pt-16 pb-32">
        <div className="flex flex-wrap items-center justify-between gap-6 mb-16">
          <Link href="/" className="eyebrow link-line pb-0.5">← Home</Link>
          <div className="flex items-center gap-3">
            <span className="eyebrow hidden sm:block">4 Seasons</span>
            <WeatherDock inline />
          </div>
        </div>

        <header className="mb-20">
          <p className="eyebrow rise mb-6">Diary</p>
          <h1 className="display text-5xl md:text-7xl rise" style={{ animationDelay: "0.1s" }}>
            {hobby.title}
            <span className="text-glacier">.</span>
          </h1>
          <p className="text-lg md:text-xl text-ink-soft max-w-2xl mt-8 leading-relaxed rise" style={{ animationDelay: "0.2s" }}>
            {hobby.description}
          </p>
        </header>

        <div className="space-y-20">
          {hobby.entries.map((entry, i) => (
            <Reveal key={i}>
              <article className="grid md:grid-cols-12 gap-6 group">
                <p className="md:col-span-3 font-mono text-xs text-ink-soft pt-2 tracking-widest uppercase">
                  {entry.date}
                </p>
                <div className="md:col-span-9">
                  <h2 className="display text-3xl mb-4 group-hover:text-glacier transition-colors">
                    {entry.title}
                  </h2>
                  <p className="text-ink-soft text-lg leading-relaxed mb-8">{entry.text}</p>
                  <div className="card-air arch overflow-hidden p-2">
                    <img
                      src={entry.photo}
                      alt={entry.title}
                      className="arch w-full h-[320px] md:h-[420px] object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    />
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </main>
    </WeatherScope>
  )
}
