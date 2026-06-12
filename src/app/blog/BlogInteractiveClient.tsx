"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/Navbar"

export default function BlogInteractiveClient({ posts }: { posts: any[] }) {
  const [activeFormat, setActiveFormat] = useState<'all' | 'rain' | 'ocean' | 'snow'>('all')

  // Generate some effects
  const [rainDrops, setRainDrops] = useState<{ id: number, left: number, delay: number, duration: number }[]>([])
  const [snowFlakes, setSnowFlakes] = useState<{ id: number, left: number, delay: number, duration: number, size: number }[]>([])
  
  useEffect(() => {
    if (activeFormat === 'rain') {
      const drops = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 3,
        duration: Math.random() * 2.5 + 1.5
      }))
      setRainDrops(drops)
    }
    if (activeFormat === 'snow') {
      const flakes = Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
        size: 4 + Math.random() * 8
      }))
      setSnowFlakes(flakes)
    }
  }, [activeFormat])

  const getCardStyle = (index: number) => {
    const styles = [
      { wrapper: "aspect-[3/4]", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD__jMh6LPEZ9ec5EkCvfw3mZB8ScB8Xk-MAjQUqzqbDPmJUoN6H3PvybmIVYgMQvUyan8eXX0AeviTNceN5lRGA7ALh4PfdhSz4fxVZrZQvw-R18fz3D5ym7iSpEHRHmO7bQAdpCOzkDWkhg3ongliNMtgy0tZ0Rz9UCtv84PIWLzlxa27ljhfahu3t3Dhgu88zZs-akVAfAsqLivF__NFsgo2rZnoOYIsaQK9gVWTjb1DLz55tniy_F4clFtsdkvQvAjAR0NyXTA", label: "Ocean", icon: "water" },
      { wrapper: "aspect-video", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC04dQ4IPZgEqvSw9a_8f6aBWD0H5TXqDYacLPP9qTdsCRMttgE0a5vAvb9M8DFpkhn0c51zza2l16Hq4yq5TWZGsih1rB86Vf3drMzIJ28L1Z_1nJMnW_4pzuiUvKsasRawNNJaeRxMPGK2s2qdUikS4IHs76B0XqObLHYU2Mk3SobBXEKTuTzvgBBq93LJWF2tprmVIGbvY_Zt9WBD6cs9uCr1_AgxzqQ_7LHakwHNWFOCFjO5inM5Or2aqzbXRVCd54hYBBKs_o", label: "Cloudscapes", icon: "cloudy", isTextFirst: true },
      { wrapper: "aspect-[4/5]", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1LFFXakPKD8aA4w18XbcqnK6kBfO-dgO_jwKmwwWTT4vsBJESMtClOQJ7-7kRXDYryZOBbCC3gmJaRhIywrBz8rj1oTnWI3OQEhoTFPo_l1Nqc0WCZs11-uINnWQfaai-jh1bfpUBpR1N-8wyiozmQKfbQxrtTLNxhzgME1UhJ9FPzj2CjucvbghWCnHBGc0Z-KbznzD_DQC8d7tXLzfjyVuEko6mZj2ucTXou2Fw_hxq8EEk94XdpZ88ETuJFtLyxuMCqGrHUpM", label: "Gravity & Grace", icon: "nature", overlay: true }
    ]
    return styles[index % styles.length]
  }

  return (
    <div className={`theme-spirit bg-surface-bright font-body-md antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen relative overflow-hidden transition-colors duration-1000 ${activeFormat === 'ocean' ? 'bg-[#0f1c2e] text-white' : activeFormat === 'rain' ? 'bg-[#1a1f24] text-white' : activeFormat === 'snow' ? 'bg-[#1a2a3a] text-white' : 'text-on-surface'}`}>
      
      {/* 4D Effects Overlay */}
      {activeFormat === 'rain' && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[url('/japan-rain-1.jpg')] bg-cover bg-center opacity-60 animate-pulse-slow"></div>
          <div className="absolute inset-0 bg-[url('/japan-rain-2.jpg')] bg-cover bg-center opacity-60 mix-blend-screen transition-opacity duration-[10000ms] animate-pulse-slow-reverse"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/5 backdrop-blur-[1px]"></div>
          
          {rainDrops.map(drop => (
            <div 
              key={drop.id} 
              className="absolute top-[-10%] w-[1px] h-[30px] bg-gradient-to-b from-transparent via-white/30 to-white/60 rounded-full"
              style={{
                left: `${drop.left}%`,
                animation: `fall ${drop.duration}s linear infinite`,
                animationDelay: `${drop.delay}s`
              }}
            ></div>
          ))}
          <style jsx>{`
            @keyframes fall {
              to { transform: translateY(120vh) translateX(20px); }
            }
            @keyframes fadeSlow {
              0%, 100% { opacity: 0.3; }
              50% { opacity: 0.6; }
            }
            @keyframes fadeSlowRev {
              0%, 100% { opacity: 0.6; }
              50% { opacity: 0.3; }
            }
            .animate-pulse-slow { animation: fadeSlow 12s ease-in-out infinite; }
            .animate-pulse-slow-reverse { animation: fadeSlowRev 12s ease-in-out infinite; }
          `}</style>
        </div>
      )}

      {activeFormat === 'ocean' && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-100">
          <div className="absolute inset-[-10%] bg-[url('/realistic-ocean.jpg')] bg-cover bg-center opacity-100 animate-wave-pan"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#00ffff]/10 via-transparent to-transparent mix-blend-overlay"></div>
          <style jsx>{`
            @keyframes wave-pan {
              0% { transform: translateY(0) scale(1.05); }
              50% { transform: translateY(2%) scale(1.1); }
              100% { transform: translateY(0) scale(1.05); }
            }
            .animate-wave-pan { animation: wave-pan 6s ease-in-out infinite; }
            .ocean-wave { animation: wave 3s ease-in-out infinite; }
          `}</style>
          <div className="ocean-wave absolute bottom-[-10%] left-[-10%] right-[-10%] h-[30vh] bg-gradient-to-t from-[#88ccff] to-transparent rounded-[100%] blur-[40px] mix-blend-screen opacity-50"></div>
          <div className="ocean-wave absolute bottom-[-20%] left-[-20%] right-[-20%] h-[40vh] bg-gradient-to-t from-[#ffffff] to-transparent rounded-[100%] blur-[60px] mix-blend-screen opacity-30" style={{ animationDelay: '-4s' }}></div>
        </div>
      )}



      <div className="relative z-10">
        <Navbar />
        <main className="min-h-screen">
          {/* Hero Section: Immersive Glassmorphism */}
          <section className="relative w-full max-w-7xl mx-auto px-4 md:px-16 mt-8 mb-24">
            <div className="relative w-full h-[60vh] md:h-[70vh] rounded-[24px] overflow-hidden flex items-center justify-center bg-black">
              {/* Winter Trees Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transform hover:scale-110 transition-transform duration-[20s]" 
                style={{ backgroundImage: "url('/winter-sun-trees.jpg')" }}
              ></div>
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 transition-colors duration-1000 ${activeFormat === 'rain' ? 'bg-black/60' : activeFormat === 'ocean' ? 'bg-[#002244]/60' : activeFormat === 'snow' ? 'bg-[#b0c4de]/40' : 'bg-black/30'} backdrop-blur-[2px]`}></div>
              {/* Glassmorphism Content Card with cloud vibe in rain and ocean mode */}
              <div className={`relative z-10 ${activeFormat !== 'all' ? 'bg-white/30 backdrop-blur-3xl' : 'bg-white/10 backdrop-blur-xl'} p-8 md:p-16 rounded-[24px] shadow-[0_40px_80px_rgba(0,0,0,0.2)] text-center max-w-3xl mx-4 border border-white/20 transition-all duration-1000`}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white font-label-sm uppercase tracking-wider mb-6 backdrop-blur-md">
                  <span className="material-symbols-outlined text-[16px]">water_drop</span>
                  Vlog & Journal
                </div>
                <h1 className={`font-headline-xl text-headline-xl text-white mb-6 ${activeFormat === 'rain' ? 'drop-shadow-lg' : ''}`}>Sunny Winter Steppe</h1>
                <p className={`font-body-lg text-body-lg text-white/80 max-w-xl mx-auto ${activeFormat === 'rain' ? 'font-medium' : ''}`}>
                  A bright, cinematic exploration of Mongolian winters. Finding peace in the crisp air, sparkling snowdrifts, and vast, cloudless skies.
                </p>
              </div>
            </div>
          </section>

          {/* Featured Author/Entry Section */}
          <section className="max-w-7xl mx-auto px-4 md:px-16 mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 relative group">
                <div className={`absolute inset-0 ${activeFormat !== 'all' ? 'bg-white/10' : 'bg-primary/10'} rounded-[24px] transform translate-x-4 translate-y-4 -z-10 transition-transform group-hover:translate-x-6 group-hover:translate-y-6 duration-500`}></div>
                <img 
                  alt="Author Portrait in Nature" 
                  className="w-full aspect-[4/5] object-cover rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.2)]" 
                  src="/profile-2.jpg"
                />
              </div>
              <div className="lg:col-span-7 mt-8 lg:mt-0 lg:-ml-12 relative z-10">
                <div className={`${activeFormat !== 'all' ? 'bg-black/40 text-white border-white/10 backdrop-blur-md' : 'bg-surface-container-lowest border-surface-variant/30 text-on-surface'} p-8 md:p-12 rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] border transition-all duration-300`}>
                  <span className={`${activeFormat !== 'all' ? 'text-white/60' : 'text-secondary'} font-label-md tracking-wider uppercase mb-4 block`}>Featured Perspective</span>
                  <h2 className="font-headline-lg text-headline-lg mb-6 leading-tight">Finding Stillness in the Undergrowth</h2>
                  <p className={`font-body-md ${activeFormat !== 'all' ? 'text-white/80' : 'text-on-surface-variant'} mb-8`}>
                    In a hyper-connected world, true luxury is found in moments of profound disconnection. Wandering through botanical sanctuaries and untamed gardens provides a necessary reset for the creative mind. This entry delves into the quiet observations made while listening to the slow, deliberate growth of ancient ferns.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full ${activeFormat !== 'all' ? 'bg-white text-black' : 'bg-secondary-container text-on-secondary-container'} flex items-center justify-center cursor-pointer hover:scale-105 transition-transform`}>
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                    </div>
                    <div>
                      <p className={`font-label-md ${activeFormat !== 'all' ? 'text-white' : 'text-on-surface'}`}>Watch Vlog Entry</p>
                      <p className={`font-label-sm ${activeFormat !== 'all' ? 'text-white/60' : 'text-secondary'}`}>12 Min • 4K Resolution</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Hobbies Section */}
          <section className="max-w-7xl mx-auto px-4 md:px-16 mb-32">
            <h3 className={`font-headline-lg text-headline-lg mb-8 ${activeFormat !== 'all' ? 'text-white' : 'text-primary'}`}>Hobbies & Interests</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Martial Arts", slug: "martial-arts", icon: "sports_martial_arts", desc: "Building discipline and physical endurance.", image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=800&auto=format&fit=crop" },
                { name: "Hiking & Nature", slug: "hiking", icon: "hiking", desc: "Exploring untamed trails.", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&auto=format&fit=crop" },
                { name: "Reading", slug: "reading", icon: "menu_book", desc: "Lost in sci-fi and philosophy.", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop" }
              ].map((hobby, i) => (
                <Link href={`/hobbies/${hobby.slug}`} target="_blank" key={i} className={`block relative overflow-hidden rounded-[24px] h-[250px] group transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-xl`}>
                  <img src={hobby.image} alt={hobby.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 bg-white/20 backdrop-blur-md text-white border border-white/30`}>
                      <span className="material-symbols-outlined text-[20px]">{hobby.icon}</span>
                    </div>
                    <h4 className="font-bold text-white text-xl mb-1">{hobby.name}</h4>
                    <p className="text-sm text-white/80">{hobby.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Masonry Discovery Grid */}
          <section className="max-w-7xl mx-auto px-4 md:px-16 pb-32">
            <div className="flex items-center justify-between mb-12">
              <h3 className={`font-headline-lg text-headline-lg ${activeFormat !== 'all' ? 'text-white' : 'text-primary'}`}>Recent Explorations</h3>
              <div className="hidden md:flex gap-2">
                <button onClick={() => setActiveFormat('all')} className={`px-4 py-2 rounded-full font-label-sm cursor-pointer transition-colors ${activeFormat === 'all' ? 'bg-secondary-container text-on-secondary-container' : 'bg-white/10 text-white hover:bg-white/20'}`}>All</button>
                <button onClick={() => setActiveFormat('rain')} className={`px-4 py-2 rounded-full font-label-sm cursor-pointer transition-colors ${activeFormat === 'rain' ? 'bg-blue-500/20 text-blue-100 border border-blue-500/50' : activeFormat !== 'all' ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-surface text-on-surface hover:bg-surface-container-high'}`}>Rain</button>
                <button onClick={() => setActiveFormat('ocean')} className={`px-4 py-2 rounded-full font-label-sm cursor-pointer transition-colors ${activeFormat === 'ocean' ? 'bg-cyan-500/20 text-cyan-100 border border-cyan-500/50' : activeFormat !== 'all' ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-surface text-on-surface hover:bg-surface-container-high'}`}>Ocean</button>
                <button onClick={() => setActiveFormat('snow')} className={`px-4 py-2 rounded-full font-label-sm cursor-pointer transition-colors ${activeFormat === 'snow' ? 'bg-white/40 text-white border border-white/80' : activeFormat !== 'all' ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-surface text-on-surface hover:bg-surface-container-high'}`}>Snow</button>
              </div>
            </div>

            <div className="masonry-grid">
              {posts.map((post, i) => {
                const style = getCardStyle(i)

                if (style.isTextFirst) {
                  return (
                    <Link href={`/blog/${post.slug}`} key={post.id} className="masonry-item block z-10 relative">
                      <article className={`relative ${activeFormat !== 'all' ? 'bg-white/5 backdrop-blur-md border border-white/10 text-white' : 'bg-surface-container-lowest shadow-[0_20px_40px_rgba(18,104,112,0.03)] hover:shadow-[0_30px_60px_rgba(18,104,112,0.08)]'} rounded-[24px] overflow-hidden transition-all duration-500 group cursor-pointer h-full flex flex-col justify-between`}>
                        <div className="p-8 pb-0">
                          <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full ${activeFormat !== 'all' ? 'bg-white/10' : 'bg-surface-container-high text-on-surface'} font-label-sm mb-4`}>
                            <span className="material-symbols-outlined text-[14px]">{style.icon}</span>
                            {style.label}
                          </div>
                          <h4 className={`font-headline-lg-mobile text-headline-lg-mobile mb-4 transition-colors ${activeFormat !== 'all' ? 'group-hover:text-white/70' : 'group-hover:text-primary text-on-surface'}`}>{post.title}</h4>
                          <p className={`font-body-md mb-6 line-clamp-3 ${activeFormat !== 'all' ? 'text-white/60' : 'text-on-surface-variant'}`}>
                            {post.content.slice(0, 150)}...
                          </p>
                        </div>
                        <div className={`relative ${style.wrapper} overflow-hidden rounded-b-[24px] m-2 mt-auto`}>
                          <img className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" src={style.img} alt={post.title} />
                        </div>
                      </article>
                    </Link>
                  )
                }

                return (
                  <Link href={`/blog/${post.slug}`} key={post.id} className="masonry-item block z-10 relative">
                    <article className={`relative ${activeFormat !== 'all' ? 'bg-white/5 backdrop-blur-md border border-white/10 text-white' : 'bg-surface-container-lowest shadow-[0_20px_40px_rgba(18,104,112,0.03)] hover:shadow-[0_30px_60px_rgba(18,104,112,0.08)]'} rounded-[24px] overflow-hidden transition-all duration-500 group cursor-pointer h-full`}>
                      <div className={`relative ${style.wrapper} overflow-hidden`}>
                        <img className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" src={style.img} alt={post.title} />
                        
                        {!style.overlay && (
                          <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-1">
                            <span className={`material-symbols-outlined text-[14px] ${activeFormat !== 'all' ? 'text-white' : 'text-primary'}`}>{style.icon}</span>
                            <span className={`font-label-sm ${activeFormat !== 'all' ? 'text-white' : 'text-primary'}`}>{style.label}</span>
                          </div>
                        )}
                        
                        {style.overlay && (
                          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                            <h4 className="font-headline-lg-mobile text-headline-lg-mobile text-white mb-2 transition-colors">{post.title}</h4>
                            <p className="font-body-md text-white/80 line-clamp-2">
                              {post.content.slice(0, 100)}...
                            </p>
                          </div>
                        )}
                      </div>
                      {!style.overlay && (
                        <div className="p-6">
                          <h4 className={`font-headline-lg-mobile text-headline-lg-mobile mb-2 transition-colors ${activeFormat !== 'all' ? 'group-hover:text-white/70' : 'group-hover:text-primary text-on-surface'}`}>{post.title}</h4>
                          <p className={`font-body-md line-clamp-2 ${activeFormat !== 'all' ? 'text-white/60' : 'text-on-surface-variant'}`}>
                            {post.content.slice(0, 100)}...
                          </p>
                        </div>
                      )}
                    </article>
                  </Link>
                )
              })}
              
              {/* If no posts, show the static quote card */}
              {posts.length === 0 && (
                <article className={`masonry-item ${activeFormat !== 'all' ? 'bg-white/10 text-white border border-white/20' : 'bg-primary-container text-on-primary-container'} p-8 rounded-[24px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex flex-col justify-center min-h-[300px] z-10 relative backdrop-blur-md`}>
                  <span className={`material-symbols-outlined text-[32px] mb-4 ${activeFormat !== 'all' ? 'text-white/70' : ''}`}>format_quote</span>
                  <p className="font-headline-lg-mobile text-headline-lg-mobile leading-relaxed mb-6">
                    "Nature does not hurry, yet everything is accomplished."
                  </p>
                  <p className={`font-label-md uppercase tracking-widest ${activeFormat !== 'all' ? 'text-white/50' : 'text-on-primary-container/70'}`}>Lao Tzu</p>
                </article>
              )}
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className={`${activeFormat !== 'all' ? 'bg-black/40 text-white border-white/10 backdrop-blur-md' : 'bg-surface-container-lowest border-secondary-container'} w-full py-12 border-t relative z-10 transition-colors duration-500`}>
          <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-4 md:px-16 gap-8">
            <div className={`font-headline-lg text-headline-lg mb-4 md:mb-0 ${activeFormat !== 'all' ? 'text-white' : 'text-primary'}`}>
              Spirit Portfolio
            </div>
            <div className="flex flex-wrap justify-center gap-6 mb-4 md:mb-0">
              <a className={`font-body-md transition-colors ${activeFormat !== 'all' ? 'text-white/60 hover:text-white' : 'text-on-surface-variant hover:text-primary'}`} href="#">Privacy Policy</a>
              <a className={`font-body-md transition-colors ${activeFormat !== 'all' ? 'text-white/60 hover:text-white' : 'text-on-surface-variant hover:text-primary'}`} href="#">Terms</a>
              <a className={`font-body-md transition-colors ${activeFormat !== 'all' ? 'text-white/60 hover:text-white' : 'text-on-surface-variant hover:text-primary'}`} href="https://www.linkedin.com/in/namuundelger-narmandakh-488822389/?skipRedirect=true" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className={`font-body-md transition-colors ${activeFormat !== 'all' ? 'text-white/60 hover:text-white' : 'text-on-surface-variant hover:text-primary'}`} href="https://github.com/namuundelger-nar" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
            <div className={`font-body-md transition-opacity text-center md:text-right ${activeFormat !== 'all' ? 'text-white/50 hover:text-white/80' : 'text-on-surface-variant opacity-80 hover:opacity-100'}`}>
              © {new Date().getFullYear()} Spirit Portfolio. Crafted with Intention.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
