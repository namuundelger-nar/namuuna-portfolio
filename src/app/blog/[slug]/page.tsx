import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"

const dateFmt = new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" })

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({ where: { slug } })

  if (!post || !post.published) {
    notFound()
  }

  const readingTime = Math.max(1, Math.ceil(post.content.split(/\s+/).length / 200))

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 pt-16 pb-10">
        <Link href="/blog" className="eyebrow link-line pb-0.5">← Journal</Link>

        <header className="mt-10 mb-14">
          <p className="font-mono text-xs text-ink-soft mb-6 rise">
            {dateFmt.format(post.createdAt)} · {readingTime} min read
          </p>
          <h1 className="display text-4xl md:text-6xl leading-tight rise" style={{ animationDelay: "0.1s" }}>
            {post.title}
          </h1>
        </header>

        <div className="card-air arch overflow-hidden p-2 mb-14 rise" style={{ animationDelay: "0.2s" }}>
          <img src={post.coverImage || "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop"} alt="" className="arch w-full h-[280px] md:h-[400px] object-cover" />
        </div>

        <article className="rise space-y-6 text-lg leading-relaxed text-ink/90" style={{ animationDelay: "0.25s" }}>
          {post.content.split(/\n{2,}/).map((para, i) => (
            <p key={i} className="whitespace-pre-wrap">{para}</p>
          ))}
        </article>
      </main>
      <Footer />
    </>
  )
}
