import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

// Sample journal entries with verified stock images (run: npx tsx scripts/seed-blogs.ts)
const posts = [
  {
    slug: "data-governance-love-letter",
    title: "Why Data Governance Is a Love Letter to Your Future Self",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    createdAt: new Date("2026-05-30"),
    content: `Nobody falls in love with data governance at first sight. It sounds like paperwork — catalogs, lineage, access policies. But every hour spent naming things properly today is an hour your future self does not spend at 2 a.m. wondering which of three "final_revenue" tables is actually final.

Good governance is mostly empathy. You are writing documentation for a stranger, and that stranger is you, six months from now, in a hurry, with a stakeholder waiting.

The practical starting point is smaller than most frameworks admit: one owner per dataset, one definition per metric, one place where both are written down. Everything else — tooling, councils, maturity models — is scaffolding around those three sentences.`,
  },
  {
    slug: "neon-nights-signal-noise",
    title: "Neon Nights: What City Lights Taught Me About Signal and Noise",
    coverImage: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1600&auto=format&fit=crop",
    createdAt: new Date("2026-04-18"),
    content: `Stand at a busy crossing at night and every sign is shouting. Pink, cyan, violet — each one engineered to win your eyes for a half-second. It is the most honest visualization of attention economics I know.

Dashboards fail the same way streets do. When every metric pulses and every card is highlighted, nothing is highlighted. The kanji you actually need — exit, station, open — is usually the smallest, calmest sign on the street.

Since that trip I design reports with a rule borrowed from those streets: one neon thing per view. Everything else gets to be quiet. If two numbers are glowing, neither of them matters.`,
  },
  {
    slug: "steppe-to-danube",
    title: "From the Steppe to the Danube: Notes on Moving Countries",
    coverImage: "https://images.unsplash.com/photo-1554797589-7241bb691973?q=80&w=1600&auto=format&fit=crop",
    createdAt: new Date("2026-03-09"),
    content: `Ulaanbaatar to Moscow was a change of language. Moscow to Budapest was a change of rhythm. Each move overwrote a small default setting I did not know I had — how early is early, how close strangers stand, what counts as cold.

The useful skill is not adaptation exactly. It is noticing. The first month in a new country is the only month you can see it clearly; after that the strange things become furniture.

I keep a note on my phone called "things that surprised me," and I add to it aggressively during those first weeks. It has become the most honest dataset I own — a time series of my own assumptions, breaking.`,
  },
  {
    slug: "winter-mountains-slow-thinking",
    title: "Winter Mountains and the Case for Slow Thinking",
    coverImage: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
    createdAt: new Date("2026-02-02"),
    content: `There is a speed limit in the mountains in winter, and it is not posted on any sign. Snow enforces it. Every step costs something, so every step gets considered.

Most analysis work happens at the opposite speed — tabs, pings, a query fired before the question is finished forming. The output looks like progress and reads like noise.

The mountain version of an analysis day: one question written down before opening the laptop, one dataset, no second screen. It feels slow for the first hour. By afternoon it is obviously faster — the way walking carefully through snow is faster than falling.`,
  },
]

async function main() {
  for (const p of posts) {
    await prisma.blogPost.upsert({
      where: { slug: p.slug },
      update: { coverImage: p.coverImage },
      create: { ...p, published: true },
    })
  }
  console.log(`Seeded ${posts.length} blog posts.`)
}

main().finally(() => prisma.$disconnect())
