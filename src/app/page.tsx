import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { JourneyMap } from "@/components/JourneyMap"
import { Reveal } from "@/components/Reveal"
import { Editable } from "@/components/cms/Editable"
import { SeasonBadge } from "@/components/weather/SeasonBadge"

export default async function Home() {
  const [profile, projects, skills] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.project.findMany({ orderBy: { order: "asc" }, take: 3 }),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
  ])

  if (!profile) {
    return <div className="p-8">Please complete your profile in the admin portal.</div>
  }

  const [firstName, ...restName] = profile.name.split(" ")
  const skillRowA = skills.filter((_, i) => i % 2 === 0)
  const skillRowB = skills.filter((_, i) => i % 2 === 1)

  const hobbies = [
    { name: "Martial Arts", slug: "martial-arts", note: "Discipline, focus, endurance", image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=800&auto=format&fit=crop" },
    { name: "Hiking & Nature", slug: "hiking", note: "Trails, peaks, steppe air", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&auto=format&fit=crop" },
    { name: "Reading", slug: "reading", note: "Geopolitics, economics, sci-fi", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop" },
  ]

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 md:px-10">

        {/* ---- Hero ---- */}
        <section className="relative pt-16 md:pt-24 pb-24 md:pb-36">
          {/* Ghost word — her name in Mongolian Cyrillic, a nod to the journey */}
          <span className="ghost-word absolute -top-2 right-0 text-[16vw] leading-none hidden lg:block pointer-events-none" aria-hidden>
            Намуун
          </span>

          <div className="grid md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-7">
              <div className="flex flex-wrap items-center gap-4 rise mb-8" style={{ animationDelay: "0.05s" }}>
                <p className="eyebrow">
                  {profile.location} · open to opportunities
                </p>
                <SeasonBadge />
              </div>
              <h1 className="display text-6xl md:text-8xl leading-[0.95] rise" style={{ animationDelay: "0.15s" }}>
                {firstName}
                <br />
                <em className="text-ink-soft font-light">{restName.join(" ")}</em>
              </h1>
              <p className="mt-8 text-lg md:text-xl text-ink-soft max-w-xl leading-relaxed rise" style={{ animationDelay: "0.3s" }}>
                {profile.title}
              </p>
              <div className="mt-10 flex flex-wrap gap-4 rise" style={{ animationDelay: "0.45s" }}>
                <Link href="/cv" className="cta-primary px-7 py-3.5 rounded-full text-sm font-medium">
                  Read my CV
                </Link>
                {profile.resumeUrl && (
                  <a href={profile.resumeUrl} download className="px-7 py-3.5 rounded-full border border-line text-sm font-medium card-air">
                    Download PDF
                  </a>
                )}
              </div>
            </div>

            <div className="md:col-span-5 rise" style={{ animationDelay: "0.35s" }}>
              <div className="relative max-w-sm ml-auto">
                <div className="arch overflow-hidden card-air profile-ring p-2.5">
                  <img
                    src={profile.imageUrl || "/profile-1.jpg"}
                    alt={profile.name}
                    className="arch w-full aspect-[4/5] object-cover"
                  />
                </div>
                <p className="font-mono text-[11px] text-ink-soft mt-4 text-right tracking-widest uppercase">
                  Ulaanbaatar → Moscow → Budapest
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---- Bio ---- */}
        <section className="py-20 glow-divider">
          <Reveal>
            <p className="eyebrow mb-8"><span className="section-num">01</span> — About</p>
            <p className="display text-2xl md:text-4xl leading-snug max-w-4xl">
              {profile.bio.split(" ").map((word, i) => (
                <span key={i}>
                  <span className="animate-word-rise" style={{ animationDelay: `${0.2 + (0.05 * i)}s` }}>
                    {word}
                  </span>
                  {" "}
                </span>
              ))}
            </p>
          </Reveal>
        </section>

        {/* ---- Journey ---- */}
        <section className="py-20 glow-divider">
          <p className="eyebrow mb-14"><span className="section-num">02</span> — The journey</p>
          <JourneyMap />
        </section>

        {/* ---- Skills marquee ---- */}
        {skills.length > 0 && (
          <section className="py-20 glow-divider overflow-hidden">
            <Reveal>
              <p className="eyebrow mb-12"><span className="section-num">03</span> — Toolkit</p>
            </Reveal>
            <div className="space-y-4 -mx-6 md:-mx-10">
              {[skillRowA, skillRowB].map((row, r) =>
                row.length === 0 ? null : (
                  <div key={r} className={`marquee-track ${r === 1 ? "reverse" : ""}`}>
                    {[...row, ...row].map((s, i) => (
                      <span key={`${s.id}-${i}`} className="card-air rounded-full px-6 py-3 text-sm font-medium whitespace-nowrap">
                        {s.name}
                        <span className="font-mono text-[10px] text-ink-soft ml-3 uppercase tracking-wider">
                          {s.category.replace(/^Technical - /, "")}
                        </span>
                      </span>
                    ))}
                  </div>
                )
              )}
            </div>
          </section>
        )}

        {/* ---- Selected work ---- */}
        {projects.length > 0 && (
          <section className="py-20 glow-divider">
            <Reveal className="flex items-baseline justify-between mb-14">
              <p className="eyebrow"><span className="section-num">04</span> — Selected work</p>
              <Link href="/projects" className="link-line pb-0.5 text-sm font-medium">All projects</Link>
            </Reveal>
            <div className="space-y-5">
              {projects.map((p, i) => (
                <Reveal key={p.id} delay={i * 120}>
                  <a
                    href={p.link || p.github || "/projects"}
                    target={p.link || p.github ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="card-air rounded-3xl p-8 md:p-10 grid md:grid-cols-12 gap-6 items-baseline group block"
                  >
                    <span className="font-mono text-sm md:col-span-1 section-num">0{i + 1}</span>
                    <h3 className="display text-2xl md:text-3xl md:col-span-4 group-hover:text-glacier transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-ink-soft leading-relaxed md:col-span-5">{p.description}</p>
                    <div className="md:col-span-2 flex md:justify-end flex-wrap gap-2">
                      {p.techStack.split(",").slice(0, 3).map((t) => (
                        <span key={t} className="font-mono text-[10px] uppercase tracking-wider border border-line rounded-full px-3 py-1.5">
                          {t.trim()}
                        </span>
                      ))}
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* ---- Quote (inline-editable by the author) ---- */}
        <section className="py-24 glow-divider text-center quote-section">
          <Reveal>
            <Editable
              blockKey="home.quote"
              fallback={`"The data is not the destination; it is the soil from which meaning grows."`}
              as="blockquote"
              className="display italic text-3xl md:text-5xl leading-tight max-w-4xl mx-auto block"
            />
          </Reveal>
        </section>

        {/* ---- Hobbies ---- */}
        <section className="py-20 glow-divider">
          <Reveal>
            <p className="eyebrow mb-14"><span className="section-num">05</span> — Off the clock</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {hobbies.map((h, i) => (
              <Reveal key={h.slug} delay={i * 120}>
                <Link href={`/hobbies/${h.slug}`} className="card-air arch block p-2.5 pb-8 text-center group overflow-hidden">
                  <div className="arch overflow-hidden mb-6">
                    <img
                      src={h.image}
                      alt={h.name}
                      className="arch w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="display text-2xl mb-2 group-hover:text-glacier transition-colors">{h.name}</h3>
                  <p className="text-sm text-ink-soft mb-5">{h.note}</p>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-glacier">
                    Open diary →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
