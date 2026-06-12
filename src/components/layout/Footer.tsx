import { prisma } from "@/lib/prisma"

export async function Footer() {
  let profile = null
  try {
    profile = await prisma.profile.findFirst()
  } catch {}

  return (
    <footer className="relative mt-32 border-t border-line">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-20">
        <p className="eyebrow mb-6">Contact</p>
        <a
          href={`mailto:${profile?.email ?? "narmandakhnamuuna@gmail.com"}`}
          className="display block text-4xl md:text-7xl leading-tight link-line w-max max-w-full break-all"
        >
          Say hello<span className="text-glacier">.</span>
        </a>
        <div className="mt-14 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="font-mono text-xs text-ink-soft space-y-1.5">
            {profile?.email && <p>{profile.email}</p>}
            {profile?.phone && <p>{profile.phone}</p>}
            {profile?.location && <p>{profile.location}</p>}
          </div>
          <div className="flex gap-8 text-sm font-medium">
            {profile?.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="link-line pb-0.5">LinkedIn</a>
            )}
            {profile?.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-line pb-0.5">GitHub</a>
            )}
          </div>
          <p className="font-mono text-xs text-ink-soft">
            © {new Date().getFullYear()} {profile?.name ?? "Namuundelger Narmandakh"}
          </p>
        </div>
      </div>
    </footer>
  )
}
