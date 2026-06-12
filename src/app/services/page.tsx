"use client"

import { Navbar } from "@/components/layout/Navbar"
import Link from "next/link"

export default function ServicesPage() {
  return (
    <div className="theme-spirit bg-surface-bright text-on-surface flex flex-col min-h-screen selection:bg-primary-container selection:text-on-primary-container font-sans relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#88ccff]/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 -z-10 pointer-events-none mix-blend-multiply"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#00ffff]/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 -z-10 pointer-events-none mix-blend-multiply"></div>
      
      <Navbar />

      <main className="flex-grow pt-[140px] pb-32 px-6 md:px-16 max-w-7xl mx-auto w-full flex flex-col gap-24 relative z-10">
        
        {/* Header */}
        <section className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high text-primary font-label-sm uppercase tracking-wider mb-6">
            <span className="material-symbols-outlined text-[16px]">design_services</span>
            Creative Offerings
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-on-surface mb-6 tracking-tight">
            Elevate Your <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Digital Presence</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed">
            I craft bespoke digital experiences rooted in nature's rhythm and clean, modern aesthetics. Discover how we can collaborate.
          </p>
        </section>

        {/* Services Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Service 1 */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[3rem] p-10 shadow-[0_20px_40px_-15px_rgba(0,102,138,0.1)] hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/20 to-transparent rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
            
            <div className="w-16 h-16 rounded-2xl bg-primary-container text-primary flex items-center justify-center mb-8 shadow-inner">
              <span className="material-symbols-outlined text-[32px]">web</span>
            </div>
            <h2 className="text-3xl font-bold text-on-surface mb-4">Custom Resume Websites</h2>
            <p className="text-on-surface-variant mb-8 line-clamp-3">
              Stand out from the crowd with a highly customized, interactive personal portfolio. I will design, build, and deploy a unique website tailored to your professional brand and personal aesthetic.
            </p>
            <div className="bg-surface-container-lowest p-6 rounded-2xl mb-8 border border-outline-variant/30">
              <div className="text-sm text-secondary font-bold uppercase tracking-wider mb-2">Starting at</div>
              <div className="text-4xl font-bold text-primary mb-1">$999</div>
              <div className="text-xs text-on-surface-variant">Customized features available upon request</div>
            </div>
            <Link href="#contact">
              <button className="w-full bg-primary text-white font-bold py-4 rounded-full hover:shadow-lg hover:bg-primary/90 transition-all">
                Commission a Portfolio
              </button>
            </Link>
          </div>

          {/* Service 2 */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-[3rem] p-10 shadow-[0_20px_40px_-15px_rgba(0,102,138,0.1)] hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-secondary/20 to-transparent rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
            
            <div className="w-16 h-16 rounded-2xl bg-secondary-container text-secondary flex items-center justify-center mb-8 shadow-inner">
              <span className="material-symbols-outlined text-[32px]">format_paint</span>
            </div>
            <h2 className="text-3xl font-bold text-on-surface mb-4">Personalised Design of Website by UX/UI Designer</h2>
            <p className="text-on-surface-variant mb-8 line-clamp-3">
              Need to transform your existing application? I offer UI/UX overhauls to bring modern, clean, nature-inspired or minimalistic aesthetics to your digital products.
            </p>
            <div className="bg-surface-container-lowest p-6 rounded-2xl mb-8 border border-outline-variant/30">
              <div className="text-sm text-secondary font-bold uppercase tracking-wider mb-2">Pricing</div>
              <div className="text-4xl font-bold text-secondary mb-1">$15 - $300</div>
              <div className="text-xs text-on-surface-variant">Depending on the scale of the production</div>
            </div>
            <Link href="mailto:narmandakhnamuuna@gmail.com">
              <button className="w-full bg-secondary text-white font-bold py-4 rounded-full hover:shadow-lg hover:bg-secondary/90 transition-all">
                Email Me
              </button>
            </Link>
          </div>

          {/* Service 3: Automated Job Application Bot */}
          <div className="md:col-span-2 bg-gradient-to-br from-primary-container to-secondary-container text-on-surface backdrop-blur-xl border border-white/80 rounded-[3rem] p-10 shadow-[0_20px_40px_-15px_rgba(0,102,138,0.2)] hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('/ocean-wave-1.png')] bg-cover bg-center opacity-5 mix-blend-overlay pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <div className="w-16 h-16 rounded-2xl bg-primary text-on-primary flex items-center justify-center mb-8 shadow-lg">
                  <span className="material-symbols-outlined text-[32px]">smart_toy</span>
                </div>
                <h2 className="text-4xl font-bold text-primary mb-4">Automated Resume & LinkedIn Application Engine</h2>
                <p className="text-on-surface-variant text-lg leading-relaxed mb-6">
                  Stop applying manually. This AI-powered service automatically scans LinkedIn for roles (50 to 20k jobs in 15 hours), alters your resume to flawlessly match the job description, and applies for you. 
                </p>
                <ul className="space-y-2 mb-8">
                  <li className="flex items-center gap-2 font-medium"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> Automated Gmail parsing for acceptances/rejections.</li>
                  <li className="flex items-center gap-2 font-medium"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> Filters out "unfortunately" emails automatically.</li>
                  <li className="flex items-center gap-2 font-medium"><span className="material-symbols-outlined text-primary text-sm">check_circle</span> Auto-generates step-by-step interview project plans for accepted roles.</li>
                </ul>
              </div>
              <div className="w-full md:w-1/3 flex flex-col gap-4">
                <div className="bg-white/80 p-8 rounded-[2rem] border border-white/50 text-center shadow-sm">
                  <div className="text-sm text-primary font-bold uppercase tracking-wider mb-2">Automated Tier</div>
                  <div className="text-5xl font-bold text-on-surface mb-1">Free</div>
                  <div className="text-xs text-on-surface-variant mb-6">Beta access currently free</div>
                  <button className="w-full bg-primary text-white font-bold py-4 rounded-full hover:shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2" onClick={() => alert("Redirecting to the automated portal...")}>
                    <span className="material-symbols-outlined">rocket_launch</span> Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>

        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-primary text-on-primary rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-[url('/ocean-wave-1.png')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Create Something Beautiful</h2>
              <p className="text-primary-container mb-8">
                Whether you're looking for a personal resume website or need a UI/UX refresh for your product, I'd love to hear from you. 
              </p>
              <div className="flex items-center gap-4 text-white mb-4">
                <span className="material-symbols-outlined">mail</span>
                <span>narmandakhnamuuna@gmail.com</span>
              </div>
              <div className="flex items-center gap-4 text-white">
                <span className="material-symbols-outlined">location_on</span>
                <span>Global / Remote</span>
              </div>
            </div>
            <div className="bg-white text-on-surface p-8 rounded-[2rem] shadow-xl">
              <h3 className="text-2xl font-bold text-primary mb-6">Send a Message</h3>
              <form className="flex flex-col gap-4">
                <div>
                  <label className="text-sm font-bold text-on-surface-variant mb-2 block">Name</label>
                  <input type="text" className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="Your Name" />
                </div>
                <div>
                  <label className="text-sm font-bold text-on-surface-variant mb-2 block">Email</label>
                  <input type="email" className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="text-sm font-bold text-on-surface-variant mb-2 block">Inquiry Type</label>
                  <select className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors appearance-none">
                    <option>Custom Resume Website</option>
                    <option>UI/UX Design Overhaul</option>
                    <option>General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-bold text-on-surface-variant mb-2 block">Message</label>
                  <textarea rows={4} className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Tell me about your project..."></textarea>
                </div>
                <button type="button" className="w-full bg-primary text-white font-bold py-4 rounded-xl mt-2 hover:bg-primary/90 transition-colors">
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
