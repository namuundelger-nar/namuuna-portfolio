"use client"

import { useState } from "react"
import Link from "next/link"

export default function CVTabsClient({ experiences = [], educations = [], skills = [], projects = [], certifications = [] }: any) {
  const [activeTab, setActiveTab] = useState<'main' | 'languages' | 'certifications' | 'hobbies'>('main')
  const [selectedSkill, setSelectedSkill] = useState<any>(null)
  const [skillTab, setSkillTab] = useState<'certifications' | 'projects'>('certifications')
  const [selectedCertUrl, setSelectedCertUrl] = useState<string | null>(null)

  const languages = [
    { name: "English", proficiency: "Fluent" },
    { name: "Russian", proficiency: "Fluent" },
    { name: "Spanish", proficiency: "Upper Intermediate" },
    { name: "Hungarian", proficiency: "Beginner" },
    { name: "German", proficiency: "Intermediate" },
    { name: "Mongolian", proficiency: "Native" }
  ]

  // If a skill is selected, we show the skill proof view
  if (selectedSkill) {
    // Filter certifications that might match this skill (simple string inclusion)
    // Or if admin hasn't mapped them yet, just show all for demo purposes if empty
    let relatedCerts = certifications.filter((c: any) => 
      c.name.toLowerCase().includes(selectedSkill.name.toLowerCase()) || 
      selectedSkill.name.toLowerCase().includes(c.name.toLowerCase())
    )
    if (relatedCerts.length === 0 && certifications.length > 0) {
      // fallback for demo
      relatedCerts = certifications
    }

    let relatedProjects = projects.filter((p: any) => 
      p.techStack.toLowerCase().includes(selectedSkill.name.toLowerCase())
    )
    if (relatedProjects.length === 0 && projects.length > 0) {
      // fallback for demo
      relatedProjects = projects
    }

    return (
      <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        <button 
          onClick={() => setSelectedSkill(null)}
          className="flex items-center gap-2 text-primary font-bold mb-6 hover:text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined">arrow_back</span>
          Back to CV
        </button>

        <div className="glass-card rounded-[24px] p-8 md:p-12 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-sm font-bold text-secondary uppercase tracking-widest mb-2">Skill Overview</h2>
            <h1 className="text-4xl md:text-5xl font-bold text-primary">{selectedSkill.name}</h1>
          </div>
          <div className="flex bg-surface-container-low rounded-full p-1 border border-outline-variant/30">
            <button 
              onClick={() => setSkillTab('certifications')}
              className={`px-6 py-2 rounded-full font-bold transition-all ${skillTab === 'certifications' ? 'bg-primary text-white shadow-md' : 'text-on-surface-variant hover:text-primary'}`}
            >
              Certifications
            </button>
            <button 
              onClick={() => setSkillTab('projects')}
              className={`px-6 py-2 rounded-full font-bold transition-all ${skillTab === 'projects' ? 'bg-primary text-white shadow-md' : 'text-on-surface-variant hover:text-primary'}`}
            >
              Projects
            </button>
          </div>
        </div>

        {skillTab === 'certifications' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 flex flex-col gap-4">
              {relatedCerts.length > 0 ? relatedCerts.map((cert: any) => (
                <button
                  key={cert.id}
                  onClick={() => setSelectedCertUrl(cert.link)}
                  className={`text-left p-6 rounded-[24px] border transition-all ${selectedCertUrl === cert.link ? 'bg-primary-container border-primary shadow-lg' : 'bg-surface-bright border-outline-variant/30 hover:border-primary/50 hover:bg-surface-container-lowest'}`}
                >
                  <h3 className="font-bold text-lg text-on-surface mb-2">{cert.name}</h3>
                  <p className="text-sm text-secondary">{cert.issuer}</p>
                </button>
              )) : (
                <div className="p-6 text-on-surface-variant bg-surface-container-low rounded-2xl">No certifications linked yet.</div>
              )}
            </div>
            <div className="md:col-span-8 bg-surface-container-highest rounded-[24px] border border-outline-variant/30 overflow-hidden min-h-[600px] relative flex items-center justify-center">
              {selectedCertUrl ? (
                <iframe src={selectedCertUrl} className="w-full h-full absolute inset-0" title="Certificate Viewer" />
              ) : (
                <div className="text-center text-on-surface-variant p-8">
                  <span className="material-symbols-outlined text-6xl mb-4 opacity-50">workspace_premium</span>
                  <p>Select a certification to view its document.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {skillTab === 'projects' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProjects.length > 0 ? relatedProjects.map((project: any) => (
              <div key={project.id} className="glass-card rounded-[24px] p-8 flex flex-col h-full border border-outline-variant/30 hover:-translate-y-1 transition-transform">
                <h3 className="text-2xl font-bold text-primary mb-4">{project.title}</h3>
                <p className="text-on-surface-variant mb-6 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.split(',').map((tech: string, i: number) => (
                    <span key={i} className={`px-3 py-1 rounded-full text-xs font-bold ${tech.trim().toLowerCase() === selectedSkill.name.toLowerCase() ? 'bg-primary text-white' : 'bg-secondary-container text-on-secondary-container'}`}>
                      {tech.trim()}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <Link href={project.link} target="_blank" className="text-primary font-bold hover:underline flex items-center gap-1">
                    View Project <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </Link>
                )}
              </div>
            )) : (
              <div className="col-span-full p-8 text-center text-on-surface-variant bg-surface-container-low rounded-2xl">
                No projects explicitly linked to this skill yet.
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  // Main CV View
  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('main')}
          className={`px-8 py-3 rounded-full font-bold transition-all shadow-sm whitespace-nowrap ${activeTab === 'main' ? 'bg-primary text-white scale-105' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}
        >
          Experience & Education
        </button>
        <button 
          onClick={() => setActiveTab('languages')}
          className={`px-8 py-3 rounded-full font-bold transition-all shadow-sm whitespace-nowrap ${activeTab === 'languages' ? 'bg-primary text-white scale-105' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}
        >
          Languages
        </button>
        <button 
          onClick={() => setActiveTab('certifications')}
          className={`px-8 py-3 rounded-full font-bold transition-all shadow-sm whitespace-nowrap ${activeTab === 'certifications' ? 'bg-primary text-white scale-105' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}
        >
          Certifications
        </button>
        <button 
          onClick={() => setActiveTab('hobbies')}
          className={`px-8 py-3 rounded-full font-bold transition-all shadow-sm whitespace-nowrap ${activeTab === 'hobbies' ? 'bg-primary text-white scale-105' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'}`}
        >
          Hobbies
        </button>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'main' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter masonry-layout">
          {/* Experience */}
          <section className="glass-card rounded-[24px] p-8 col-span-1 md:col-span-8 hover:bg-surface-container-lowest transition-colors duration-300">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-headline-lg text-headline-lg text-primary">Experience</h2>
            </div>
            <div className="space-y-6">
              {experiences.length > 0 ? experiences.map((exp: any, i: number) => {
                const parts = exp.description.split('Skills:');
                const descText = parts[0];
                const skillsText = parts[1] ? parts[1].trim() : null;
                const skillsList = skillsText ? skillsText.split(',').map((s: string) => s.trim()) : [];

                return (
                  <div key={exp.id} className="relative pl-6 border-l border-secondary-container">
                    <div className={`absolute w-3 h-3 rounded-full -left-[6.5px] top-1.5 ${i % 2 === 0 ? 'bg-primary' : 'bg-secondary'}`}></div>
                    <h3 className="font-body-lg text-body-lg font-bold text-on-surface">{exp.role}</h3>
                    <p className="font-label-md text-label-md text-secondary mb-2">{exp.company} • {exp.startDate} - {exp.endDate || "Present"}</p>
                    <p className="text-on-surface-variant whitespace-pre-wrap">{descText.trim()}</p>
                    {skillsList.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {skillsList.map((skill: string, idx: number) => (
                          <Link 
                            key={idx} 
                            href="/projects" 
                            target="_blank"
                            className="bg-primary/10 text-primary font-bold text-xs px-3 py-1 rounded-full hover:bg-primary hover:text-white transition-colors flex items-center gap-1"
                          >
                            {skill} <span className="material-symbols-outlined text-[12px]">open_in_new</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }) : (
                <p className="text-on-surface-variant">No experience added yet.</p>
              )}
            </div>
          </section>

          {/* Education */}
          <section className="glass-card rounded-[24px] p-8 col-span-1 md:col-span-4 hover:bg-surface-container-lowest transition-colors duration-300">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-headline-lg text-headline-lg text-primary">Education</h2>
            </div>
            <div className="space-y-6">
              {educations.length > 0 ? educations.map((edu: any, i: number) => (
                <div key={edu.id}>
                  <h3 className="font-body-lg text-body-lg font-bold text-on-surface">{edu.degree}</h3>
                  <p className="font-label-md text-label-md text-secondary">{edu.institution} • {edu.startDate} - {edu.endDate || "Present"}</p>
                  {edu.description && <p className="text-on-surface-variant mt-2 text-sm">{edu.description}</p>}
                  {i < educations.length - 1 && <div className="h-px w-full bg-secondary-container mt-6"></div>}
                </div>
              )) : (
                <p className="text-on-surface-variant">No education added yet.</p>
              )}
            </div>
          </section>

          {/* Skills */}
          <section className="glass-card rounded-[24px] p-8 col-span-1 md:col-span-12 hover:bg-surface-container-lowest transition-colors duration-300 mt-6">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-headline-lg text-headline-lg text-primary">Skills</h2>
            </div>
            <div className="flex flex-wrap gap-4">
              {skills.length > 0 ? skills.map((skill: any) => (
                <button 
                  key={skill.id} 
                  onClick={() => setSelectedSkill(skill)}
                  className="bg-surface-bright border border-secondary-container px-6 py-3 rounded-full flex items-center gap-2 hover:bg-primary hover:text-white transition-colors cursor-pointer shadow-sm hover:shadow-md"
                >
                  <span className="font-label-md text-label-md">{skill.name}</span>
                </button>
              )) : (
                <p className="text-on-surface-variant">No skills added yet.</p>
              )}
            </div>
          </section>
        </div>
      )}

      {/* Languages Tab Content */}
      {activeTab === 'languages' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {languages.map((lang, idx) => (
            <div key={idx} className="glass-card rounded-[24px] p-8 flex flex-col justify-center gap-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-2xl font-bold text-primary">{lang.name}</h3>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant/30 px-4 py-2 rounded-xl inline-block w-fit">
                <span className="text-sm font-bold text-secondary uppercase tracking-wider">{lang.proficiency}</span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Hobbies Tab Content */}
      {activeTab === 'hobbies' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/hobbies/martial-arts" target="_blank" className="block relative overflow-hidden rounded-[24px] h-[300px] group transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-xl">
            <img src="https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=800&auto=format&fit=crop" alt="Martial Arts" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-left">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-white/20 backdrop-blur-md text-white border border-white/30">
                <span className="material-symbols-outlined text-[24px]">sports_martial_arts</span>
              </div>
              <h3 className="font-bold text-white text-2xl mb-2">Martial Arts</h3>
              <p className="text-sm text-white/80 mb-4">Building discipline and physical endurance.</p>
              <div className="mt-auto text-white font-bold flex items-center gap-1 group-hover:underline text-sm uppercase tracking-wider">View Gallery <span className="material-symbols-outlined text-sm">arrow_forward</span></div>
            </div>
          </Link>
          <Link href="/hobbies/hiking" target="_blank" className="block relative overflow-hidden rounded-[24px] h-[300px] group transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-xl">
            <img src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&auto=format&fit=crop" alt="Hiking & Nature" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-left">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-white/20 backdrop-blur-md text-white border border-white/30">
                <span className="material-symbols-outlined text-[24px]">hiking</span>
              </div>
              <h3 className="font-bold text-white text-2xl mb-2">Hiking & Nature</h3>
              <p className="text-sm text-white/80 mb-4">Exploring untamed trails.</p>
              <div className="mt-auto text-white font-bold flex items-center gap-1 group-hover:underline text-sm uppercase tracking-wider">View Gallery <span className="material-symbols-outlined text-sm">arrow_forward</span></div>
            </div>
          </Link>
          <Link href="/hobbies/reading" target="_blank" className="block relative overflow-hidden rounded-[24px] h-[300px] group transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-xl">
            <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop" alt="Reading" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            
            <div className="absolute inset-0 p-8 flex flex-col justify-end text-left">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-white/20 backdrop-blur-md text-white border border-white/30">
                <span className="material-symbols-outlined text-[24px]">menu_book</span>
              </div>
              <h3 className="font-bold text-white text-2xl mb-2">Reading</h3>
              <p className="text-sm text-white/80 mb-4">Lost in sci-fi and philosophy.</p>
              <div className="mt-auto text-white font-bold flex items-center gap-1 group-hover:underline text-sm uppercase tracking-wider">View Gallery <span className="material-symbols-outlined text-sm">arrow_forward</span></div>
            </div>
          </Link>
        </div>
      )}
      {/* Certifications Tab Content */}
      {activeTab === 'certifications' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.length > 0 ? certifications.map((cert: any) => (
            <div key={cert.id} className="glass-card rounded-[24px] p-8 flex flex-col h-full border border-outline-variant/30 hover:-translate-y-1 transition-transform">
              <h3 className="text-2xl font-bold text-primary mb-2">{cert.name}</h3>
              <p className="text-on-surface-variant font-bold mb-4">{cert.issuer}</p>
              {cert.description && <div className="text-sm text-on-surface-variant mb-6 flex-grow whitespace-pre-wrap">{cert.description}</div>}
              {cert.badgeId && (
                <div className="mb-6 flex justify-center w-full">
                  <div data-iframe-width="150" data-iframe-height="270" data-share-badge-id={cert.badgeId} data-share-badge-host="https://www.credly.com"></div>
                  <script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js"></script>
                </div>
              )}
              {cert.link && (
                <Link href={cert.link} target="_blank" className="text-primary font-bold hover:underline flex items-center gap-1 mt-auto">
                  View Certificate <span className="material-symbols-outlined text-sm">open_in_new</span>
                </Link>
              )}
            </div>
          )) : (
            <div className="col-span-full p-8 text-center text-on-surface-variant bg-surface-container-low rounded-2xl">
              No certifications added yet.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
