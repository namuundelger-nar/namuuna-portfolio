import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await prisma.blogPost.findUnique({
    where: { slug }
  })

  if (!post || !post.published) {
    notFound()
  }

  // Calculate reading time (rough estimate)
  const wordCount = post.content.split(/\s+/).length
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  return (
    <div className="theme-blog font-body-md text-on-background relative bg-background min-h-screen pb-12">
      {/* Top Navigation */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-container-max rounded-full border border-white/40 backdrop-blur-xl bg-surface/70 flex justify-between items-center px-8 py-3 z-[100] shadow-xl">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-headline-md font-headline-md tracking-widest text-primary hover:opacity-80 transition-opacity">AURA PORTFOLIO</Link>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <Link className="text-on-surface-variant font-label-md text-label-md hover:text-primary hover:scale-105 transition-transform duration-300" href="/">Home</Link>
          <Link className="text-on-surface-variant font-label-md text-label-md hover:text-primary hover:scale-105 transition-transform duration-300" href="/cv">CV</Link>
          <Link className="text-primary font-bold font-label-md text-label-md hover:scale-105 transition-transform duration-300" href="/blog">Blog</Link>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative w-full h-[60vh] min-h-[500px] flex items-end pb-24 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0 bg-primary-fixed-dim">
            {/* Keeping it simple with a gradient or default placeholder if no image per post */}
            <div className="w-full h-full bg-gradient-to-br from-primary to-secondary"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-gutter w-full">
            <div className="max-w-3xl">
              <Link href="/blog">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-label-md text-label-md mb-6 hover:bg-white/30 transition-colors cursor-pointer">
                  <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                  <span>BACK TO ALL INSIGHTS</span>
                </div>
              </Link>
              <h1 className="font-display-xl text-display-xl text-white mb-6 leading-tight drop-shadow-lg">
                {post.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
          <div className="ambient-glow top-0 -left-20"></div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 order-2 lg:order-1">
            <div className="sticky top-32 space-y-8">
              <div className="glass-card p-8 rounded-lg border-l-4 border-tertiary">
                <h4 className="font-headline-md text-headline-md text-tertiary mb-4">Post Info</h4>
                <div className="flex items-center gap-2 text-on-surface-variant font-body-md text-body-md mb-4">
                  <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-2 text-on-surface-variant font-body-md text-body-md mb-6">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                  {readingTime} Min Read
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-1.5 rounded-full bg-tertiary-container/20 text-tertiary font-label-md text-label-md">Analysis</span>
                  <span className="px-4 py-1.5 rounded-full bg-tertiary-container/20 text-tertiary font-label-md text-label-md">Strategy</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Blog Content */}
          <article className="lg:col-span-8 order-1 lg:order-2 space-y-12">
            <div className="glass-card p-10 md:p-16 rounded-xl">
              <div 
                className="prose prose-lg max-w-none prose-headings:font-headline-lg prose-headings:text-on-surface prose-p:font-body-md prose-p:text-on-surface-variant prose-a:text-primary hover:prose-a:text-secondary"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              <footer className="mt-16 pt-12 border-t border-outline-variant flex justify-between items-center">
                <div className="flex gap-4">
                  <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <span className="material-symbols-outlined">share</span>
                  </button>
                  <button className="w-12 h-12 rounded-full border border-outline-variant flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                    <span className="material-symbols-outlined">bookmark</span>
                  </button>
                </div>
              </footer>
            </div>
          </article>
        </section>

        {/* Newsletter / CTA */}
        <section className="max-w-container-max mx-auto px-margin-mobile mb-section-gap mt-12">
          <div className="relative rounded-xl overflow-hidden glass-card p-12 md:p-24 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
              <h2 className="font-display-xl text-headline-lg md:text-display-xl text-on-surface mb-6">Join the Strategic Frontier</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
                Receive monthly dossiers on geopolitics, nomadic logistics, and data-driven insights.
              </p>
              <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
                <input className="flex-grow px-6 py-4 rounded-full bg-white/50 border-none focus:ring-2 focus:ring-primary outline-none transition-all text-on-surface" placeholder="Enter your business email" type="email" />
                <button type="button" className="px-10 py-4 rounded-full bg-primary text-white font-label-md text-label-md shadow-lg hover:shadow-primary/20 transition-all">Subscribe</button>
              </form>
            </div>
          </div>
        </section>
      </main>

    </div>
  )
}
