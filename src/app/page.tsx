import { prisma } from "@/lib/prisma"
import { Navbar } from "@/components/layout/Navbar"
import { TiltPhoto } from "@/components/TiltPhoto"
import Link from "next/link"

export default async function Home() {
  const profile = await prisma.profile.findFirst()
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  })
  const featuredProject = projects.find(p => p.featured) || projects[0]

  if (!profile) {
    return <div className="p-8">Please complete your profile in the admin portal.</div>
  }

  return (
    <div className="theme-cloud bg-surface-bright text-on-surface flex flex-col min-h-screen selection:bg-primary-container selection:text-on-primary-container font-sans">
      <Navbar />

      <main className="flex-grow pt-[140px] pb-32 px-6 md:px-16 max-w-7xl mx-auto w-full flex flex-col gap-24 relative z-10">
        
        {/* Subtle Background Glows for "Cloud & Sky" vibe */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-container/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-container/40 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 -z-10 pointer-events-none"></div>

        {/* Hero Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center min-h-[60vh]">
          <div className="md:col-span-7 flex flex-col gap-8 z-10">
            {profile.location && (
              <div className="inline-flex items-center gap-2 bg-white/60 shadow-sm px-5 py-2 rounded-full w-max text-primary font-bold text-xs uppercase tracking-widest backdrop-blur-md border border-white/80">
                <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>flight_takeoff</span>
                {profile.location}
              </div>
            )}
            
            <h1 className="text-5xl md:text-7xl font-bold text-on-surface max-w-2xl leading-[1.1] tracking-tight">
              {profile.name.split(' ')[0]} <br/>
              <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                {profile.title}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed">
              {profile.bio}
            </p>
            
            <div className="flex gap-4 mt-2">
              {profile.resumeUrl && (
                <a href={profile.resumeUrl} download target="_blank" rel="noopener noreferrer">
                  <button className="bg-primary text-white font-bold text-sm px-8 py-4 rounded-full hover:-translate-y-1 transition-transform duration-300 shadow-xl shadow-primary/20">
                    Download CV
                  </button>
                </a>
              )}
              <Link href="/blog">
                <button className="bg-white text-primary border border-primary/10 font-bold text-sm px-8 py-4 rounded-full hover:bg-surface-container-lowest hover:shadow-lg transition-all duration-300">
                  Read Insights
                </button>
              </Link>
            </div>
          </div>
          
          <div className="md:col-span-5 relative h-full min-h-[400px] flex items-center justify-center p-2 z-10">
            {/* TiltPhoto framed in a cloud-like rounded container */}
            <div className="w-full h-full max-w-sm aspect-[4/5] relative bg-white p-4 rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,102,138,0.15)] border border-white/80 rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative">
                <TiltPhoto 
                  imageUrl={profile.imageUrl || "/profile-placeholder.png"} 
                  alt={profile.name}
                />
              </div>

            </div>
          </div>
        </section>

        {/* Cloud Bento Grid Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12">
          
          {/* Featured Project */}
          {featuredProject && (
            <div className="md:col-span-8 bg-white rounded-[3rem] p-10 flex flex-col justify-between group hover:shadow-[0_30px_80px_-20px_rgba(0,102,138,0.15)] transition-all duration-500 overflow-hidden relative border border-surface-variant/50">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-primary-container/50 to-transparent rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <span className="bg-surface-container px-4 py-1.5 rounded-full text-xs font-bold text-primary uppercase tracking-widest">Featured Project</span>
                  {featuredProject.link && (
                    <a href={featuredProject.link} target="_blank" rel="noopener noreferrer">
                      <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant group-hover:bg-primary group-hover:text-white transition-colors cursor-pointer">
                        <span className="material-symbols-outlined text-[20px]">arrow_outward</span>
                      </div>
                    </a>
                  )}
                </div>
                <h3 className="text-3xl font-bold text-on-surface mb-4">{featuredProject.title}</h3>
                <p className="text-on-surface-variant text-lg max-w-xl mb-10 leading-relaxed">
                  {featuredProject.description}
                </p>
              </div>
              <div className="flex gap-2 flex-wrap relative z-10">
                {featuredProject.techStack.split(',').map((tech, i) => (
                  <span key={i} className="bg-surface-container px-4 py-2 rounded-full text-xs font-bold text-on-surface-variant">
                    {tech.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stats/Mini Card */}
          <div className="md:col-span-4 bg-gradient-to-br from-primary to-secondary text-white rounded-[3rem] p-10 flex flex-col justify-center items-center text-center group hover:shadow-[0_30px_80px_-20px_rgba(0,102,138,0.3)] transition-all duration-500 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuD__jMh6LPEZ9ec5EkCvfw3mZB8ScB8Xk-MAjQUqzqbDPmJUoN6H3PvybmIVYgMQvUyan8eXX0AeviTNceN5lRGA7ALh4PfdhSz4fxVZrZQvw-R18fz3D5ym7iSpEHRHmO7bQAdpCOzkDWkhg3ongliNMtgy0tZ0Rz9UCtv84PIWLzlxa27ljhfahu3t3Dhgu88zZs-akVAfAsqLivF__NFsgo2rZnoOYIsaQK9gVWTjb1DLz55tniy_F4clFtsdkvQvAjAR0NyXTA')] opacity-10 mix-blend-overlay bg-cover bg-center"></div>
            <span className="material-symbols-outlined text-5xl text-primary-container mb-6 group-hover:scale-110 transition-transform relative z-10">monitoring</span>
            <h4 className="text-6xl font-bold mb-3 relative z-10">98%</h4>
            <p className="text-sm text-primary-container uppercase tracking-widest font-bold relative z-10">Accuracy Rate</p>
          </div>

          {/* Inspirational Quote */}
          <div className="md:col-span-12 bg-white rounded-[3rem] p-10 md:p-14 flex items-center shadow-sm border border-surface-variant/50 relative overflow-hidden group hover:shadow-xl transition-shadow duration-500">
            <div className="absolute right-0 bottom-0 text-[200px] text-surface-container leading-none font-serif opacity-50 -mb-10 -mr-10 select-none group-hover:text-primary-container transition-colors duration-700">"</div>
            <div className="flex-grow relative z-10 flex justify-center text-center">
              <p className="text-2xl md:text-4xl font-serif text-on-surface italic leading-relaxed max-w-4xl text-balance">
                "The data is not the destination; it is the soil from which meaning grows."
              </p>
            </div>
          </div>

        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white w-full py-12 px-6 md:px-16 mt-auto border-t border-surface-variant/50 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="font-bold text-xl text-primary">
          {profile.name}
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">LinkedIn</a>
          )}
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">GitHub</a>
          )}
          {profile.twitter && (
            <a href={profile.twitter} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-on-surface-variant hover:text-primary transition-colors">Twitter</a>
          )}
        </div>
        <div className="text-sm text-on-surface-variant font-medium text-center md:text-right">
          © {new Date().getFullYear()} {profile.name}.
        </div>
      </footer>
    </div>
  )
}
