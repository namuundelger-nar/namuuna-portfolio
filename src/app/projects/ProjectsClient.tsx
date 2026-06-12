"use client"

import Link from "next/link"
import { useState } from "react"
import { Navbar } from "@/components/layout/Navbar"

export default function ProjectsClient({ projects }: { projects: any[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All")

  const categories = ["All", "Financial Analysis", "AI Engineer", "UI/UX Design", "Data Analysis"]

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.tags.some((tag: string) => tag.toLowerCase().includes(activeCategory.toLowerCase())))

  const featured = filteredProjects.find(p => p.featured) || filteredProjects[0] || null
  const secondary = featured ? filteredProjects.filter(p => p.id !== featured.id) : []

  return (
    <div className="theme-cloud bg-surface-bright text-on-surface min-h-screen font-body-md selection:bg-primary-container selection:text-on-primary-container">
      
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary-container/30 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/3 -z-10 pointer-events-none"></div>

      <Navbar />

      {/* Header Section */}
      <header className="pt-32 pb-16 flex flex-col items-center text-center px-4">
        <div className="inline-flex items-center gap-2 bg-[#bcf0ae]/30 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-[#3b6934] mb-6 border border-[#bcf0ae]">
          <span className="material-symbols-outlined text-[14px]">landscape</span>
          CURATED EXPEDITIONS
        </div>
        <h1 className="font-display-lg text-5xl md:text-6xl text-on-surface mb-6">
          Project Archive
        </h1>
        <p className="text-on-surface-variant max-w-xl text-lg leading-relaxed mb-8">
          A digital herbarium where data structures meet organic growth. Exploring the intersections of machine learning, atmospheric design, and human ethics.
        </p>
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold text-sm transition-colors ${activeCategory === cat ? 'bg-primary text-white shadow-md' : 'bg-surface-container text-on-surface hover:bg-primary-container hover:text-primary'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-6 md:px-16 py-8 relative z-10">
        
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20 text-on-surface-variant text-xl">
            No projects found in this category.
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            
            {/* Featured Project */}
            {featured && (
              <article className="bg-white rounded-3xl overflow-hidden shadow-sm border border-surface-variant/50 hover:shadow-xl transition-shadow duration-500 group flex flex-col md:flex-row">
                <div className="relative h-[300px] md:h-auto md:w-1/2 overflow-hidden">
                  <img src={featured.imageUrl} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    {featured.tags.map((tag: string, i: number) => (
                      <span key={i} className="bg-black/40 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-8 md:p-10 flex flex-col md:w-1/2">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-display-md text-3xl text-primary">{featured.title}</h2>
                    <span className="material-symbols-outlined text-primary text-2xl">{featured.icon}</span>
                  </div>
                  <p className="text-on-surface-variant text-lg leading-relaxed mb-8 flex-grow">
                    {featured.description}
                  </p>
                  <a href={featured.link} className="inline-flex items-center gap-2 text-[#1c648e] font-bold text-sm hover:gap-4 transition-all w-max">
                    Explore Project <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </a>
                </div>
              </article>
            )}

            {/* Secondary Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {secondary.map((project: any) => (
                <article key={project.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-surface-variant/50 hover:shadow-xl transition-shadow duration-500 group flex flex-col">
                  <div className="relative h-[200px] w-full overflow-hidden">
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                      {project.tags.slice(0,2).map((tag: string, i: number) => (
                        <div key={i} className="bg-black/40 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-primary mb-3">
                      <span className="material-symbols-outlined text-[16px]">{project.icon}</span>
                      <span className="text-xs font-bold uppercase tracking-widest">{project.tags[0] || 'PROJECT'}</span>
                    </div>
                    <h3 className="font-display-md text-2xl text-on-surface mb-3">{project.title}</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed mb-6 flex-grow">
                      {project.description}
                    </p>
                    <a href={project.link} className="text-primary font-bold text-sm inline-flex items-center gap-1 hover:underline mt-auto">
                      View <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </main>

    </div>
  )
}
