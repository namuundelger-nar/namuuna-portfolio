import { prisma } from "@/lib/prisma"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Reveal } from "@/components/Reveal"

export const metadata = { title: "Projects — Namuundelger Narmandakh" }

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } })

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 md:px-10 pt-16 pb-10">
        <header className="mb-20">
          <p className="eyebrow rise mb-6">Archive</p>
          <h1 className="display text-5xl md:text-7xl rise" style={{ animationDelay: "0.1s" }}>
            Projects<span className="text-glacier">.</span>
          </h1>
        </header>

        {projects.length === 0 ? (
          <p className="text-ink-soft">Projects will appear here once published from the dashboard.</p>
        ) : (
          <div>
            {projects.map((p, i) => {
              const href = p.link || p.github
              return (
                <Reveal key={p.id} delay={(i % 4) * 90}>
                  <a
                    href={href ?? undefined}
                    target={href ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className={`group grid md:grid-cols-12 gap-4 items-baseline py-10 border-t border-line ${href ? "" : "pointer-events-none"}`}
                  >
                    <span className="display text-ink-soft/60 text-xl md:col-span-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="md:col-span-5 flex items-baseline gap-4">
                      <h2 className="display text-3xl md:text-4xl group-hover:text-glacier group-hover:translate-x-2 transition-all duration-300">
                        {p.title}
                      </h2>
                      {p.featured && (
                        <span className="font-mono text-[10px] uppercase tracking-widest text-teal border border-teal/40 rounded-full px-2.5 py-1">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-ink-soft leading-relaxed md:col-span-4">{p.description}</p>
                    <div className="md:col-span-2 flex md:justify-end items-center gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-ink-soft hidden md:block">
                        {p.techStack.split(",")[0]?.trim()}
                      </span>
                      {href && (
                        <span className="w-9 h-9 rounded-full border border-line flex items-center justify-center group-hover:bg-glacier group-hover:text-white group-hover:border-glacier transition-colors">
                          ↗
                        </span>
                      )}
                    </div>
                  </a>
                </Reveal>
              )
            })}
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
