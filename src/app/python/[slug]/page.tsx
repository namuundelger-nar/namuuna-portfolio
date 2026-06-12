import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"

interface Props {
  params: { slug: string }
}

export default async function PythonPostPage({ params }: Props) {
  // If we can't find the slug in the DB, we will display the breathtaking mock article from the design!
  let post = await prisma.blogPost.findUnique({
    where: { slug: params.slug }
  })

  // Mock data representing the perfect "Whispers of the Python Forest" layout
  const mockPost = {
    title: "Whispers of the Python Forest",
    subtitle: "Navigating the dense digital ecosystem of Budapest's rising tech scene through organic data modeling and seasonal trend tracking",
    category: "MARKET ANALYSIS",
    date: "March 2024",
    readTime: "8 min read",
    author: "DataArtisan",
    headerImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNwaypNnc5s2ZVXOZCT0Wks0IsaWqIunNSq1ALADkOHHx9q-EE6Qd2QoUWHrs9tXNp4jJ5YgZBMbRJJq9QwhawcbxuT5fJBOsm5Z7tTi7COrRhtbwxWTiv44v4x4WjEYKMg8cu2DTFGaex96LxJz2XMzxox1Fqa9lFne8SsepyFcxrySA3lwAPz-EBSXnpgAdzNu8YpbgqkzUNsakbtp6zmI2-I3QO1-XT0JgEW25e3LPJ7cPdQPqioPrwOKRaXirPQLotNPdxWV4",
    code: `# Fetching regional data for Budapest hubs
df = pd.read_csv('budapest_tech_growth_2024.csv')

# Filtering for Python ecosystem growth
python_growth = df[df['stack'] == 'python']

# Visualizing the organic expansion
sns.kdeplot(data=python_growth, x='adoption_rate', fill=True, 
            color='#3b6934', alpha=0.6)`
  }

  // Use DB data if found, otherwise use mock
  const displayTitle = post?.title || mockPost.title;
  const displayContent = post?.content || "";

  return (
    <div className="theme-python bg-background text-on-background min-h-screen font-body-md selection:bg-primary-container selection:text-on-primary-container">
      
      {/* Navbar */}
      <Navbar />

      {/* Header Section */}
      <header className="bg-surface-variant/40 pt-20 pb-0 flex flex-col items-center text-center">
        <div className="px-6 max-w-4xl flex flex-col items-center">
          <span className="bg-white px-4 py-1.5 rounded-full text-xs font-bold tracking-widest text-primary mb-6 shadow-sm border border-outline-variant/20 uppercase">
            {mockPost.category}
          </span>
          <h1 className="font-display-lg text-4xl md:text-6xl text-on-surface mb-6 leading-tight">
            {displayTitle}
          </h1>
          <p className="font-body-lg text-lg md:text-xl text-on-surface-variant max-w-2xl mb-16 leading-relaxed">
            {mockPost.subtitle}
          </p>
        </div>
        
        {/* Full width feature image */}
        <div className="w-full h-[300px] md:h-[400px] relative">
          <img src={mockPost.headerImage} alt="Forest Mist" className="w-full h-full object-cover object-bottom" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-6 md:px-16 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 -mt-32">
        
        {/* Left Column: Article Body */}
        <article className="lg:col-span-8 bg-white rounded-[2rem] p-8 md:p-14 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-surface-variant/50">
          
          {/* Author Tag */}
          <div className="flex items-center gap-4 mb-10 pb-10 border-b border-surface-variant">
            <img alt="Author" className="w-12 h-12 rounded-full border border-outline-variant/30" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXH7dpI4u1CBw3xB1TiqFOHEpliZqWdWfUgJHcDUHU4dlktSYI3C6ogi0tn8hvCQsfzncj_tBVGMpkjvdmIRlbk1_DZzYQomoVgbpUuOsKhmLWwrEwG5JLPGC4QVbHj4I62zTVX5EDdi7-7bVtaxUpCFL4fUpROPw8FFXL0Aa_OaKhBDfk7rSssZtedFnzpY1L53ii4jQMEawU0RhpQmVbjUOSLT1LHpt-XPrlb2WvU60kk2c-8LqX3PrewHw-OE7ACpHsuPjreYw"/>
            <div>
              <div className="text-xs font-bold tracking-widest text-secondary uppercase mb-1">AUTHOR INSIGHTS</div>
              <div className="text-sm text-on-surface-variant">{mockPost.date} • {mockPost.readTime}</div>
            </div>
          </div>

          <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface mb-6 leading-snug">
            The Budapest Tech Canopy: Python's Growth in 2024
          </h2>

          <div className="prose prose-lg prose-slate max-w-none text-on-surface-variant mb-12">
            <p className="mb-6 leading-relaxed">
              {displayContent ? displayContent : "Data from the past four quarters suggests a fundamental shift in the Hungarian capital's development landscape. Much like the resilient moss that thrives in the shaded corners of a forest, Python has become the foundational layer for Budapest's burgeoning fintech and AI sectors. Our analysis indicates a 22% year-over-year increase in job postings requiring Django or FastAPI proficiency."}
            </p>
          </div>

          {/* Code Block Window */}
          <div className="bg-[#1a1a1a] rounded-xl overflow-hidden mb-12 shadow-2xl">
            <div className="bg-[#2d2d2d] px-4 py-3 flex items-center justify-between border-b border-white/5">
              <div className="text-xs font-mono text-white/50 tracking-wider">BUDAPEST_MARKET_ANALYSIS.PY</div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
            </div>
            <pre className="p-6 overflow-x-auto text-sm font-mono leading-relaxed">
              <code className="text-[#e6e6e6]">
                <span className="text-[#c678dd]">import</span> pandas <span className="text-[#c678dd]">as</span> pd<br/>
                <span className="text-[#c678dd]">import</span> seaborn <span className="text-[#c678dd]">as</span> sns<br/><br/>
                <span className="text-[#5c6370]"># Fetching regional data for Budapest hubs</span><br/>
                df = pd.<span className="text-[#61afef]">read_csv</span>(<span className="text-[#98c379]">'budapest_tech_growth_2024.csv'</span>)<br/><br/>
                <span className="text-[#5c6370]"># Filtering for Python ecosystem growth</span><br/>
                python_growth = df[df[<span className="text-[#98c379]">'stack'</span>] == <span className="text-[#98c379]">'python'</span>]<br/><br/>
                <span className="text-[#5c6370]"># Visualizing the organic expansion</span><br/>
                sns.<span className="text-[#61afef]">kdeplot</span>(data=python_growth, x=<span className="text-[#98c379]">'adoption_rate'</span>, fill=<span className="text-[#d19a66]">True</span>,<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;color=<span className="text-[#98c379]">'#3b6934'</span>, alpha=<span className="text-[#d19a66]">0.6</span>)
              </code>
            </pre>
          </div>

          <h3 className="font-headline-lg text-2xl text-on-surface mb-4">A Multi-Sensory Approach</h3>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-12">
            Beyond the numbers, we must consider the 'micro-climates' within the industry. The District XIII startup hub functions as an incubator, while older institutions in Buda are gradually grafting Python-based automation onto their legacy infrastructures.
          </p>

          {/* Two Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" alt="Analyst Desk" className="w-full aspect-video object-cover rounded-xl mb-4" />
              <h4 className="font-bold text-on-surface mb-1">The Analyst's Solitude</h4>
              <p className="text-sm text-on-surface-variant">Where environmental observation meets computational rigor.</p>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1444464666168-4e36334f4e15?auto=format&fit=crop&q=80&w=800" alt="Fern Details" className="w-full aspect-video object-cover rounded-xl mb-4" />
              <h4 className="font-bold text-on-surface mb-1">Granular Insights</h4>
              <p className="text-sm text-on-surface-variant">Looking closer at the micro-trends that drive macro-shifts.</p>
            </div>
          </div>
        </article>

        {/* Right Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-8">
          
          {/* Local Pulse Stats */}
          <div className="bg-surface-container-low rounded-[2rem] p-8 border border-surface-variant/50">
            <h3 className="font-headline-lg text-2xl text-secondary mb-8">Local Pulse</h3>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <span className="material-symbols-outlined text-primary">monitoring</span>
                <div>
                  <div className="font-bold text-sm text-on-surface">Data Scientist Demand</div>
                  <div className="text-xs text-on-surface-variant">+15.7% since Q1 2023</div>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="material-symbols-outlined text-primary">cloud_upload</span>
                <div>
                  <div className="font-bold text-sm text-on-surface">Cloud Native Migration</div>
                  <div className="text-xs text-on-surface-variant">72% of new firms</div>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <span className="material-symbols-outlined text-primary">hub</span>
                <div>
                  <div className="font-bold text-sm text-on-surface">AI Research Hubs</div>
                  <div className="text-xs text-on-surface-variant">Budapest ranks 4th in CEE</div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Card */}
          <div className="relative rounded-[2rem] overflow-hidden aspect-square shadow-lg group">
            <img src="https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&q=80&w=800" alt="Budapest" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent"></div>
            <h4 className="absolute bottom-6 left-6 right-6 font-display-md text-2xl text-white">City of Bridges & Bytes</h4>
          </div>

          {/* Newsletter Box */}
          <div className="bg-[#bcf0ae] rounded-[2rem] p-8 text-[#002201] shadow-lg">
            <h3 className="font-headline-lg text-xl mb-3">The Forest Log Newsletter</h3>
            <p className="text-sm opacity-80 mb-6 leading-relaxed">
              Deep-dive analyses delivered to your inbox every full moon.
            </p>
            <input type="email" placeholder="Your digital coordinates" className="w-full bg-white/50 border-none rounded-full px-4 py-3 text-sm placeholder:text-[#3f6d38] mb-4 focus:ring-2 focus:ring-[#3b6934] outline-none" />
            <button className="w-full bg-[#3b6934] text-white font-bold text-sm py-3 rounded-full hover:bg-[#23501e] transition-colors shadow-md">
              Join the Grove
            </button>
          </div>

        </aside>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-high py-12 mt-16 border-t border-surface-variant/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center items-center gap-3 mb-6">
            <img alt="Logo" className="w-8 h-8 rounded-full opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXH7dpI4u1CBw3xB1TiqFOHEpliZqWdWfUgJHcDUHU4dlktSYI3C6ogi0tn8hvCQsfzncj_tBVGMpkjvdmIRlbk1_DZzYQomoVgbpUuOsKhmLWwrEwG5JLPGC4QVbHj4I62zTVX5EDdi7-7bVtaxUpCFL4fUpROPw8FFXL0Aa_OaKhBDfk7rSssZtedFnzpY1L53ii4jQMEawU0RhpQmVbjUOSLT1LHpt-XPrlb2WvU60kk2c-8LqX3PrewHw-OE7ACpHsuPjreYw"/>
            <span className="font-display-md text-xl text-on-surface">DataArtisan</span>
          </div>
          <p className="text-xs text-on-surface-variant mb-6 max-w-sm mx-auto">
            © {new Date().getFullYear()} DataArtisan. Cultivating insights from the digital soil. Based in Budapest, analyzing the world.
          </p>
          <div className="flex justify-center gap-6 text-xs text-on-surface-variant font-bold">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Methodology</a>
            <a href="#" className="hover:text-primary transition-colors">Social Impact</a>
          </div>
        </div>
      </footer>

    </div>
  )
}
