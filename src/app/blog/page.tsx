import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Reveal } from "@/components/Reveal"

export const metadata = { title: "Journal — Namuundelger Narmandakh" }

const dateFmt = new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" })

export default async function BlogIndex() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  })
  const [featured, ...rest] = posts

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 md:px-10 pt-16 pb-10">
        <header className="mb-20">
          <p className="eyebrow rise mb-6">Notes on data, places & weather</p>
          <h1 className="display text-5xl md:text-7xl rise" style={{ animationDelay: "0.1s" }}>
            Journal<span className="text-glacier">.</span>
          </h1>
        </header>

        {!featured ? (
          <p className="text-ink-soft">First entry coming soon.</p>
        ) : (
          <>
            <Reveal>
              <Link href={`/blog/${featured.slug}`} className="card-air rounded-[2.5rem] overflow-hidden block group mb-16 grid md:grid-cols-2">
                {featured.coverImage && (
                  <div className="overflow-hidden">
                    <img
                      src={featured.coverImage}
                      alt=""
                      className="w-full h-full min-h-[260px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
                <div className="p-10 md:p-14">
                  <p className="font-mono text-xs text-ink-soft mb-6">
                    Latest — {dateFmt.format(featured.createdAt)}
                  </p>
                  <h2 className="display text-3xl md:text-4xl leading-tight group-hover:text-glacier transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-ink-soft leading-relaxed mt-6 line-clamp-3">
                    {featured.content.slice(0, 280)}
                  </p>
                  <span className="inline-block mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-glacier">
                    Read entry →
                  </span>
                </div>
              </Link>
            </Reveal>

            <div>
              {rest.map((post, i) => (
                <Reveal key={post.id} delay={(i % 4) * 90}>
                  <Link href={`/blog/${post.slug}`} className="group grid md:grid-cols-12 gap-4 items-center py-6 border-t border-line">
                    {post.coverImage && (
                      <div className="md:col-span-2 overflow-hidden rounded-2xl">
                        <img
                          src={post.coverImage}
                          alt=""
                          className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    )}
                    <span className={`font-mono text-xs text-ink-soft ${post.coverImage ? "md:col-span-2" : "md:col-span-4"}`}>
                      {dateFmt.format(post.createdAt)}
                    </span>
                    <h3 className="display text-2xl md:text-3xl md:col-span-6 group-hover:text-glacier transition-colors">
                      {post.title}
                    </h3>
                    <span className="md:col-span-2 md:text-right font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft group-hover:text-glacier transition-colors">
                      Read →
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
