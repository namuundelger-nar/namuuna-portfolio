import { prisma } from "@/lib/prisma"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Reveal } from "@/components/Reveal"
import { getAssetPath } from "@/lib/utils"

export const metadata = { title: "CV — Namuundelger Narmandakh" }

export default async function CVPage() {
  const [profile, experience, education, skills, certifications] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.experience.findMany({ orderBy: { order: "asc" } }),
    prisma.education.findMany({ orderBy: { order: "asc" } }),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
    prisma.certification.findMany({ orderBy: { order: "asc" } }),
  ])

  const skillGroups = skills.reduce<Record<string, string[]>>((acc, s) => {
    ;(acc[s.category] ??= []).push(s.name)
    return acc
  }, {})

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 md:px-10 pt-16 pb-10">
        <div className="grid lg:grid-cols-12 gap-16">

          {/* Identity rail */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <Reveal>
                <div className="arch overflow-hidden card-air p-2 max-w-[260px]">
                  <img
                    src={getAssetPath(profile?.imageUrl || "/profile-2.jpg")}
                    alt={profile?.name ?? "Portrait"}
                    className="arch w-full aspect-[4/5] object-cover"
                  />
                </div>
                <h1 className="display text-4xl mt-8 leading-tight">{profile?.name}</h1>
                <p className="text-ink-soft mt-3 leading-relaxed">{profile?.title}</p>

                <dl className="mt-8 space-y-2 font-mono text-xs text-ink-soft">
                  {profile?.location && <dd>{profile.location}</dd>}
                  {profile?.email && <dd>{profile.email}</dd>}
                  {profile?.phone && <dd>{profile.phone}</dd>}
                </dl>

                {profile?.resumeUrl && (
                  <a href={profile.resumeUrl} download className="inline-block mt-8 px-6 py-3 rounded-full bg-glacier text-white text-sm font-medium hover:-translate-y-0.5 transition-transform shadow-md">
                    Download PDF
                  </a>
                )}
              </Reveal>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-8 space-y-20">

            {experience.length > 0 && (
              <section>
                <Reveal><p className="eyebrow mb-10">Experience</p></Reveal>
                <div>
                  {experience.map((e, i) => (
                    <Reveal key={e.id} delay={i * 80}>
                      <article className="grid md:grid-cols-12 gap-4 py-8 border-t border-line group">
                        <div className="md:col-span-3 font-mono text-xs text-ink-soft pt-1.5">
                          {e.startDate} — {e.endDate ?? "now"}
                          {e.location && <p className="mt-1.5">{e.location}</p>}
                        </div>
                        <div className="md:col-span-9">
                          <h3 className="display text-2xl group-hover:text-glacier transition-colors">{e.role}</h3>
                          <p className="text-glacier text-sm font-medium mt-1">{e.company}</p>
                          <p className="text-ink-soft leading-relaxed mt-4">{e.description}</p>
                          <div className="flex flex-wrap gap-2 mt-5">
                            {e.techStack.split(",").map((t) => (
                              <span key={t} className="font-mono text-[10px] uppercase tracking-wider border border-line rounded-full px-3 py-1">
                                {t.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </section>
            )}

            {education.length > 0 && (
              <section>
                <Reveal><p className="eyebrow mb-10">Education</p></Reveal>
                {education.map((ed, i) => (
                  <Reveal key={ed.id} delay={i * 80}>
                    <article className="grid md:grid-cols-12 gap-4 py-8 border-t border-line">
                      <div className="md:col-span-3 font-mono text-xs text-ink-soft pt-1.5">
                        {ed.startDate} — {ed.endDate ?? "now"}
                        {ed.location && <p className="mt-1.5">{ed.location}</p>}
                      </div>
                      <div className="md:col-span-9">
                        <h3 className="display text-2xl">{ed.degree}</h3>
                        <p className="text-glacier text-sm font-medium mt-1">{ed.institution}</p>
                        {ed.description && <p className="text-ink-soft leading-relaxed mt-4">{ed.description}</p>}
                      </div>
                    </article>
                  </Reveal>
                ))}
              </section>
            )}

            {Object.keys(skillGroups).length > 0 && (
              <section>
                <Reveal><p className="eyebrow mb-10">Skills</p></Reveal>
                <div>
                  {Object.entries(skillGroups).map(([cat, names], i) => (
                    <Reveal key={cat} delay={i * 80}>
                      <div className="py-6 border-t border-line">
                        <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-soft mb-4">
                          {cat.replace(/^Technical - /, "")}
                        </h3>
                        <p className="display text-xl md:text-2xl leading-relaxed">
                          {names.join(" · ")}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </section>
            )}

            {certifications.length > 0 && (
              <section>
                <Reveal><p className="eyebrow mb-10">Certifications</p></Reveal>
                {certifications.map((c, i) => (
                  <Reveal key={c.id} delay={i * 80}>
                    <article className="flex flex-wrap items-baseline justify-between gap-3 py-6 border-t border-line">
                      <div>
                        <h3 className="text-lg font-medium">
                          {c.link ? (
                            <a href={c.link} target="_blank" rel="noopener noreferrer" className="link-line pb-0.5">
                              {c.name}
                            </a>
                          ) : (
                            c.name
                          )}
                        </h3>
                        <p className="text-sm text-ink-soft mt-1">{c.issuer}</p>
                      </div>
                      {c.date && <span className="font-mono text-xs text-ink-soft">{c.date}</span>}
                    </article>
                  </Reveal>
                ))}
              </section>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
