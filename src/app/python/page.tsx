import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Navbar } from "@/components/layout/Navbar"

export default async function PythonPage() {
  const posts = await prisma.blogPost.findMany({
    where: { 
      published: true,
      OR: [
        { title: { contains: 'python' } },
        { content: { contains: 'python' } },
        { title: { contains: 'Python' } },
        { content: { contains: 'Python' } },
      ]
    },
    orderBy: { createdAt: 'desc' }
  })

  // We provide some default static snippets if the DB is empty so the layout still shines!
  const snippets = posts.length > 0 ? posts.map(p => ({
    id: p.id,
    title: p.title,
    content: p.content.slice(0, 100) + "...",
    code: `def run_analysis(data):\n    return data.describe()\n# Source: ${p.title}`,
    date: new Date(p.createdAt).toLocaleDateString()
  })) : [
    {
      id: '1',
      title: "Data Pipeline Automation",
      content: "Automating ETL processes using Pandas and SQLAlchemy. This snippet extracts daily transaction data and transforms it for the main data warehouse.",
      code: "import pandas as pd\nimport sqlalchemy\n\ndef etl_process():\n    df = pd.read_csv('daily_sales.csv')\n    df['total'] = df['price'] * df['qty']\n    engine = sqlalchemy.create_engine(DB_URL)\n    df.to_sql('sales', engine, if_exists='append')",
      date: "Oct 12, 2024"
    },
    {
      id: '2',
      title: "Geospatial Heatmaps",
      content: "Generating heatmaps for strategic routing using Folium. This visually maps out cluster density based on nomadic movements.",
      code: "import folium\nfrom folium.plugins import HeatMap\n\nm = folium.Map(location=[47.92, 106.92], zoom_start=6)\nHeatMap(data=coordinates).add_to(m)\nm.save('heatmap.html')",
      date: "Nov 03, 2024"
    },
    {
      id: '3',
      title: "Machine Learning: Predictive Models",
      content: "Using Scikit-Learn to predict future asset values based on historical trends. A Random Forest model with hyperparameter tuning.",
      code: "from sklearn.ensemble import RandomForestRegressor\nfrom sklearn.model_selection import train_test_split\n\nX_train, X_test, y_train, y_test = train_test_split(X, y)\nmodel = RandomForestRegressor(n_estimators=100)\nmodel.fit(X_train, y_train)\nprint(model.score(X_test, y_test))",
      date: "Jan 18, 2025"
    }
  ]

  return (
    <div className="theme-python bg-background text-on-background font-body-md min-h-screen">
      {/* CSS-only Rain Effect using multiple drops */}
      <div className="rain-container" id="rain-layer">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="drop" 
            style={{ 
              left: `${Math.random() * 100}%`, 
              animationDuration: `${Math.random() * 2 + 1}s`, 
              animationDelay: `${Math.random() * 2}s` 
            }}
          ></div>
        ))}
      </div>

      {/* TopNavBar */}
      <Navbar />

      {/* Hero Section */}
      <header className="relative pt-[180px] pb-24 px-4 text-center z-20 forest-gradient border-b border-white/40">
        <div className="max-w-3xl mx-auto relative">
          <span className="material-symbols-outlined text-primary text-5xl mb-6">terminal</span>
          <h1 className="font-display-lg text-display-lg text-on-background mb-6">Forest Log <br/><span className="text-primary italic">.py</span></h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            A living repository of Python scripts, ETL pipelines, and machine learning models. Built to process the complex data environments of the digital steppe.
          </p>
        </div>
      </header>

      {/* Code Snippets Section */}
      <main className="max-w-7xl mx-auto px-4 md:px-16 py-24 relative z-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-background">Latest Scripts</h2>
            <p className="text-on-surface-variant">Production-ready snippets and analytical models.</p>
          </div>
          <div className="hidden md:flex gap-4">
            <span className="px-4 py-2 bg-white/60 border border-white/80 rounded-full text-label-sm font-label-sm text-primary shadow-sm backdrop-blur-md cursor-pointer hover:bg-white transition-colors">Data Science</span>
            <span className="px-4 py-2 bg-surface-container border border-outline-variant/30 rounded-full text-label-sm font-label-sm text-on-surface-variant cursor-pointer hover:bg-white transition-colors">Automation</span>
          </div>
        </div>

        <div className="space-y-12">
          {snippets.map((snippet, idx) => (
            <article key={snippet.id} className="asymmetric-bento glass-card rounded-[24px] p-6 md:p-12 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group">
              <div className="col-span-12 lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-sm text-[10px] tracking-wider uppercase border border-secondary-fixed/50">
                      Python 3.10+
                    </span>
                    <span className="text-on-surface-variant text-label-sm">{snippet.date}</span>
                  </div>
                  <Link href={`/python/whispers-of-the-python-forest`}>
                    <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-background mb-4 group-hover:text-primary transition-colors cursor-pointer">
                      {snippet.title}
                    </h3>
                  </Link>
                  <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">
                    {snippet.content}
                  </p>
                </div>
                <button className="flex items-center gap-2 text-primary font-label-sm uppercase tracking-widest w-fit hover:gap-4 transition-all">
                  <span className="material-symbols-outlined text-[18px]">content_copy</span>
                  Copy Source
                </button>
              </div>

              <div className="col-span-12 lg:col-span-7">
                <div className="code-container shadow-2xl h-full min-h-[250px]">
                  <div className="code-rain opacity-30"></div>
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Mac window controls */}
                    <div className="flex gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    {/* Code Block */}
                    <pre className="text-primary-fixed font-mono text-[13px] md:text-sm leading-relaxed overflow-x-auto">
                      <code>
                        {snippet.code}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Footer CTA */}
      <section className="bg-surface-container-high border-t border-white/30 py-24 relative z-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <span className="material-symbols-outlined text-4xl text-primary mb-6">code_blocks</span>
          <h2 className="font-display-md text-display-md text-on-background mb-6">Build the Infrastructure</h2>
          <p className="font-body-lg text-on-surface-variant mb-10">
            Need custom data pipelines or automated financial models? Let's engineer a solution tailored to your ecosystem.
          </p>
          <button className="bg-on-background text-background px-10 py-4 rounded-full font-label-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-xl">
            Initiate Project
          </button>
        </div>
      </section>

      {/* Very Bottom Footer */}
      <footer className="bg-background py-8 text-center border-t border-surface-container-high relative z-20">
        <p className="text-on-surface-variant font-label-sm">
          © {new Date().getFullYear()} DataArtisan. Engineered in Python.
        </p>
      </footer>
    </div>
  )
}
