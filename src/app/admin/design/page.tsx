import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/Button"
import { updateDesignConfig } from "@/app/actions/design"

// Presets re-skin the base (Clear) theme; weather moods keep their own palettes.
const presets = [
  {
    name: "Glacier Morning",
    tagline: "The signature look — calm blue on porcelain white",
    primaryColor: "#21638d", backgroundColor: "#f7fafc", textColor: "#15242f",
  },
  {
    name: "Steppe Dawn",
    tagline: "Warm sand and saddle-leather amber",
    primaryColor: "#a05f2c", backgroundColor: "#faf5ec", textColor: "#2c2317",
  },
  {
    name: "Pine Mist",
    tagline: "Quiet forest green over cool paper",
    primaryColor: "#2e6b4f", backgroundColor: "#f3f8f5", textColor: "#14271e",
  },
  {
    name: "Tokyo Neon",
    tagline: "Midnight violet with electric cyan",
    primaryColor: "#4cc9f0", backgroundColor: "#12101f", textColor: "#ece9f7",
  },
  {
    name: "Porcelain Ink",
    tagline: "Monochrome editorial — pure type, no color",
    primaryColor: "#1f1f1f", backgroundColor: "#fcfcfa", textColor: "#191919",
  },
  {
    name: "Lavender Dusk",
    tagline: "Soft violet for slow evenings",
    primaryColor: "#6b5ca5", backgroundColor: "#f7f5fb", textColor: "#26203a",
  },
]

import Link from "next/link"

export default async function AdminDesignPage({ searchParams }: { searchParams: Promise<{ season?: string }> }) {
  const params = await searchParams
  const seasonParam = params.season || "global"
  const season = seasonParam === "global" ? null : seasonParam

  const config = await prisma.designConfig.findFirst({
    where: { season }
  })
  
  const current = {
    primaryColor: config?.primaryColor ?? "#21638d",
    backgroundColor: config?.backgroundColor ?? "#f7fafc",
    textColor: config?.textColor ?? "#15242f",
    borderRadius: config?.borderRadius ?? "1rem",
  }

  const tabs = [
    { id: "global", label: "Global Theme" },
    { id: "spring", label: "Spring" },
    { id: "summer", label: "Summer" },
    { id: "autumn", label: "Autumn" },
    { id: "winter", label: "Winter" },
  ]

  return (
    <div className="max-w-4xl">
      <p className="eyebrow mb-3">Design sandbox</p>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h1 className="display text-4xl text-foreground">Theme presets</h1>
        
        <div className="flex bg-accent/20 p-1 rounded-lg w-max">
          {tabs.map(tab => (
            <Link 
              key={tab.id} 
              href={`/admin/design${tab.id === 'global' ? '' : `?season=${tab.id}`}`}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${seasonParam === tab.id ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>
      
      <p className="text-muted-foreground mb-10 max-w-2xl">
        Presets restyle the site&apos;s base theme — accent, paper, and ink.
        You are currently editing the <strong>{tabs.find(t => t.id === seasonParam)?.label}</strong> configuration.
      </p>

      {/* Preset gallery */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
        {presets.map((p) => {
          const active =
            p.primaryColor === current.primaryColor &&
            p.backgroundColor === current.backgroundColor
          return (
            <form key={p.name} action={updateDesignConfig}>
              <input type="hidden" name="season" value={seasonParam} />
              <input type="hidden" name="primaryColor" value={p.primaryColor} />
              <input type="hidden" name="backgroundColor" value={p.backgroundColor} />
              <input type="hidden" name="textColor" value={p.textColor} />
              <input type="hidden" name="borderRadius" value={current.borderRadius} />
              <button
                type="submit"
                className={`w-full text-left rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer ${
                  active ? "border-primary ring-2 ring-primary/40" : "border-border"
                }`}
              >
                {/* Live mini-preview of the preset */}
                <div className="p-5 h-36 flex flex-col justify-between" style={{ backgroundColor: p.backgroundColor }}>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-xl" style={{ color: p.textColor, fontFamily: "'Fraunces Variable', serif" }}>
                      Aa
                    </span>
                    <span className="flex gap-1.5">
                      <span className="w-5 h-5 rounded-full" style={{ backgroundColor: p.primaryColor }} />
                      <span className="w-5 h-5 rounded-full border" style={{ backgroundColor: p.backgroundColor, borderColor: p.textColor + "33" }} />
                      <span className="w-5 h-5 rounded-full" style={{ backgroundColor: p.textColor }} />
                    </span>
                  </div>
                  <div>
                    <span
                      className="inline-block text-[10px] font-bold px-3 py-1.5 rounded-full"
                      style={{ backgroundColor: p.primaryColor, color: p.backgroundColor }}
                    >
                      Read my CV
                    </span>
                  </div>
                </div>
                <div className="px-5 py-4 bg-background border-t border-border">
                  <p className="font-bold text-sm text-foreground flex items-center justify-between">
                    {p.name}
                    {active && <span className="text-primary text-[10px] font-mono uppercase tracking-widest">Active</span>}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{p.tagline}</p>
                </div>
              </button>
            </form>
          )
        })}
      </div>

      {/* Fine-tuning */}
      <h2 className="display text-2xl mb-2 text-foreground">Fine-tune {tabs.find(t => t.id === seasonParam)?.label}</h2>
      <p className="text-muted-foreground text-sm mb-6">Or mix your own from any starting point.</p>
      <form action={updateDesignConfig} className="rounded-3xl border border-border p-6 bg-accent/10 space-y-6">
        <input type="hidden" name="season" value={seasonParam} />
        <div className="grid gap-6 sm:grid-cols-3">
          {([
            ["primaryColor", "Accent", current.primaryColor],
            ["backgroundColor", "Paper", current.backgroundColor],
            ["textColor", "Ink", current.textColor],
          ] as const).map(([name, label, value]) => (
            <div key={name} className="space-y-2">
              <label htmlFor={name} className="text-sm font-medium text-foreground block">{label}</label>
              <div className="flex items-center gap-3">
                <input
                  id={name}
                  name={name}
                  type="color"
                  defaultValue={value}
                  className="h-11 w-11 cursor-pointer rounded-xl border border-border bg-background p-1"
                />
                <span className="text-sm text-muted-foreground font-mono">{value}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-2 max-w-xs">
          <label htmlFor="borderRadius" className="text-sm font-medium text-foreground block">Corner style</label>
          <select
            id="borderRadius"
            name="borderRadius"
            defaultValue={current.borderRadius}
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="0px">Sharp</option>
            <option value="0.5rem">Rounded</option>
            <option value="1rem">Very rounded</option>
            <option value="9999px">Pill</option>
          </select>
        </div>
        <Button type="submit">Save custom theme</Button>
      </form>
    </div>
  )
}
