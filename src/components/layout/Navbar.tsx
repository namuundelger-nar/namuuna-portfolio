import Link from "next/link"

const links = [
  { href: "/", label: "Home" },
  { href: "/cv", label: "CV" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Journal" },
  { href: "/services", label: "Services" },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-40">
      <nav className="card-air !rounded-none border-x-0 border-t-0">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <Link href="/" className="display text-xl tracking-tight">
            Namuundelger
            <span className="text-glacier">.</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="link-line pb-0.5 text-sm font-medium text-ink-soft hover:text-ink transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a
              href="mailto:narmandakhnamuuna@gmail.com"
              className="hidden sm:block text-sm font-medium px-5 py-2 rounded-full bg-glacier text-white hover:-translate-y-0.5 transition-transform shadow-md"
            >
              Get in touch
            </a>
            <Link href="/admin" aria-label="Author dashboard" className="eyebrow hover:text-ink transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
