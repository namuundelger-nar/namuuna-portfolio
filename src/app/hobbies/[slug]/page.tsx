import { notFound } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"

const hobbiesData: Record<string, any> = {
  "martial-arts": {
    title: "Martial Arts",
    description: "Training in various disciplines, building discipline, focus, and physical endurance.",
    coverImage: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2000&auto=format&fit=crop",
    entries: [
      {
        date: "May 20, 2026",
        title: "Advanced Sparring Seminar",
        text: "Attended a 3-day intensive seminar focusing on technical sparring and movement fluidity. It was exhausting but incredibly rewarding to train with advanced practitioners and refine my defensive techniques.",
        photo: "https://images.unsplash.com/photo-1545620958-868bf03058c4?q=80&w=800&auto=format&fit=crop"
      },
      {
        date: "March 15, 2026",
        title: "Mastering the Basics",
        text: "Today marked a milestone in my training where the foundational forms finally clicked into muscle memory. The repetitive drills are paying off in my overall speed and balance.",
        photo: "https://images.unsplash.com/photo-1526508915835-4fc1786fb26f?q=80&w=800&auto=format&fit=crop"
      }
    ]
  },
  "hiking": {
    title: "Hiking & Nature",
    description: "Exploring trails and finding inspiration in the organic patterns of the natural world.",
    coverImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2000&auto=format&fit=crop",
    entries: [
      {
        date: "June 02, 2026",
        title: "Summiting Mt. Bogd Khan",
        text: "A challenging 18km trek through dense pine forests and rocky terrain. The view from the peak at sunset was absolutely breathtaking, making every grueling step worth it.",
        photo: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop"
      },
      {
        date: "April 10, 2026",
        title: "Weekend Valley Trail",
        text: "Took a lighter weekend hike through the valley to clear my mind after a heavy coding sprint. Nature always has a way of resetting my focus and creativity.",
        photo: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=800&auto=format&fit=crop"
      }
    ]
  },
  "reading": {
    title: "Reading",
    description: "Constantly learning through geopolitical literature, economics, and sci-fi.",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2000&auto=format&fit=crop",
    entries: [
      {
        date: "May 28, 2026",
        title: "Finished 'Dune' by Frank Herbert",
        text: "An absolute masterpiece of world-building and political ecology. The depth of the Arrakis ecosystem and the complex interplay of religion and power gave me a lot of philosophical food for thought.",
        photo: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=800&auto=format&fit=crop"
      },
      {
        date: "February 14, 2026",
        title: "Diving into Behavioral Economics",
        text: "Started reading 'Thinking, Fast and Slow'. It's fascinating to learn about the cognitive biases that shape human decision-making, especially how it applies to UI/UX design and AI ethics.",
        photo: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop"
      }
    ]
  }
}

export default function HobbyPage({ params }: { params: { slug: string } }) {
  const hobby = hobbiesData[params.slug]

  if (!hobby) {
    notFound()
  }

  return (
    <div className="theme-spirit bg-surface-bright text-on-surface min-h-screen selection:bg-primary-container selection:text-on-primary-container font-sans relative overflow-hidden">
      {/* Aesthetic Background Gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 -z-10 pointer-events-none mix-blend-multiply"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 -z-10 pointer-events-none mix-blend-multiply"></div>
      
      <div className="relative z-10">
        <Navbar />
        
        <main className="min-h-screen pb-24">
          {/* Hero Section */}
          <section className="relative w-full max-w-5xl mx-auto px-4 md:px-8 mt-8 mb-16">
            <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-bold mb-6 hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined">arrow_back</span>
              Back to Insights
            </Link>
            
            <div className="relative w-full h-[50vh] md:h-[60vh] rounded-[32px] overflow-hidden flex items-end p-8 md:p-16 bg-black shadow-2xl">
              {/* Cover Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transform hover:scale-110 transition-transform duration-[20s]" 
                style={{ backgroundImage: `url(${hobby.coverImage})` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent mix-blend-multiply"></div>
              
              {/* Glassmorphism Title */}
              <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl max-w-2xl text-white shadow-xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{hobby.title}</h1>
                <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                  {hobby.description}
                </p>
              </div>
            </div>
          </section>

          {/* Diary Feed / Mini Blog Layout */}
          <section className="w-full max-w-4xl mx-auto px-4 md:px-8">
            <h2 className="text-3xl font-bold text-primary mb-12 flex items-center gap-3">
              <span className="material-symbols-outlined text-[32px]">auto_stories</span>
              Diary Entries
            </h2>
            
            <div className="space-y-16">
              {hobby.entries.map((entry: any, index: number) => (
                <article key={index} className="flex flex-col md:flex-row gap-8 items-start group">
                  {/* Date Column */}
                  <div className="md:w-1/4 flex-shrink-0 pt-2">
                    <div className="text-sm font-bold text-secondary uppercase tracking-widest mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      {entry.date}
                    </div>
                  </div>
                  
                  {/* Content Column */}
                  <div className="md:w-3/4 flex flex-col gap-4">
                    <h3 className="text-2xl md:text-3xl font-display-md text-on-surface group-hover:text-primary transition-colors">
                      {entry.title}
                    </h3>
                    <p className="text-on-surface-variant text-lg leading-relaxed mb-4">
                      {entry.text}
                    </p>
                    
                    {/* Entry Photo */}
                    <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-md">
                      <img 
                        src={entry.photo} 
                        alt={entry.title} 
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
