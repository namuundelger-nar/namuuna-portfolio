import { prisma } from "@/lib/prisma"
import { Navbar } from "@/components/layout/Navbar"
import Image from "next/image"
import CVTabsClient from "./CVTabsClient"

export default async function CVPage() {
  const profile = await prisma.profile.findFirst()
  const experiences = await prisma.experience.findMany({ orderBy: { order: "asc" } })
  const educations = await prisma.education.findMany({ orderBy: { order: "asc" } })
  const skills = await prisma.skill.findMany({ orderBy: { order: "asc" } })
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } })
  const certifications = await prisma.certification.findMany({ orderBy: { order: "asc" } })

  if (!profile) return <div>Please complete profile in admin.</div>

  return (
    <div className="theme-cv font-body-md text-on-surface relative min-h-screen">
      <Navbar />
      
      {/* Main Content Background */}
      <div 
        className="absolute inset-0 z-[-1] ghibli-bg opacity-30" 
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBIndwGLSUnXxjG3wfqRf38AJqPBnheR-LPEfdHEdw7u8CsMJ094D6XgvG4A7LtGIOBbXRfyRq_SnOA-GFIY2S4V_P_g5PLcZ_5kIPrmqVBfuAo9jQcBWwJJmFbmVv6fhtJ1zbLUPxfi8gS0qauooZoY0jtCxNETo0v5e27WgCFvxhMexouVLxmBL2_Z2MUCOAM0BQcXDnmutTpz5XA44Qn7_KZHbP0EnR4aZVPccMUgHk-cHxL4p7luI5ik3neRSE122HVNAwwP1E')" }}
      ></div>

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 relative z-10 pt-32">
        
        {/* Header Profile Section */}
        <section className="glass-card rounded-[24px] p-8 md:p-12 mb-gutter flex flex-col md:flex-row items-center gap-8">
          <div className="w-48 h-48 rounded-[24px] overflow-hidden shadow-[0_20px_40px_rgba(18,104,112,0.15)] flex-shrink-0 relative">
            <Image 
              alt={profile.name} 
              className="object-cover" 
              src={profile.imageUrl || "/profile-placeholder.png"}
              fill
              sizes="(max-width: 768px) 192px, 192px"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="font-headline-xl text-headline-xl text-primary mb-2">{profile.name}</h1>
            <p className="font-body-lg text-body-lg text-secondary mb-4">{profile.title}</p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {skills.slice(0, 3).map(skill => (
                <span key={skill.id} className="bg-secondary-container text-on-secondary-container px-4 py-1 rounded-full font-label-md text-label-md">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CV Tabs Client */}
        <CVTabsClient experiences={experiences} educations={educations} skills={skills} projects={projects} certifications={certifications} />
      </main>

      {/* Footer */}
      <footer className="w-full py-12 bg-surface-container-lowest border-t border-secondary-container relative z-10 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto px-margin-desktop gap-gutter">
          <div className="font-headline-lg text-headline-lg text-primary">{profile.name}</div>
          <div className="flex gap-6">
            {profile.linkedin && <a href={profile.linkedin} className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">LinkedIn</a>}
            {profile.github && <a href={profile.github} className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md">GitHub</a>}
          </div>
          <div className="text-on-surface-variant font-body-md text-body-md opacity-80 hover:opacity-100 transition-opacity">
            © {new Date().getFullYear()} {profile.name}. Crafted with Intention.
          </div>
        </div>
      </footer>
    </div>
  )
}
