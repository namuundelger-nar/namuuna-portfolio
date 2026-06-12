import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/Button"
import { updateDesignConfig } from "@/app/actions/design"

export default async function AdminDesignPage() {
  let config = await prisma.designConfig.findFirst()

  // Defaults if empty
  if (!config) {
    config = {
      id: "new",
      primaryColor: "#fafafa",
      backgroundColor: "#09090b",
      textColor: "#fafafa",
      borderRadius: "0.5rem",
      updatedAt: new Date(),
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Design Configurator</h1>
      <p className="text-muted-foreground mb-8">
        Customize the global colors and shapes of your portfolio. Changes will be instantly applied across the website.
      </p>

      <form action={updateDesignConfig} className="space-y-8 rounded-xl border border-border p-6 bg-accent/10">
        
        {/* Colors */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4 border-b border-border pb-2">Colors</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            <div className="space-y-2">
              <label htmlFor="primaryColor" className="text-sm font-medium text-foreground block">Primary / Accent Color</label>
              <div className="flex items-center gap-3">
                <input
                  id="primaryColor"
                  name="primaryColor"
                  type="color"
                  defaultValue={config.primaryColor}
                  className="h-10 w-10 cursor-pointer rounded-md border border-border bg-background p-1"
                />
                <span className="text-sm text-muted-foreground font-mono">{config.primaryColor}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="backgroundColor" className="text-sm font-medium text-foreground block">Background Color</label>
              <div className="flex items-center gap-3">
                <input
                  id="backgroundColor"
                  name="backgroundColor"
                  type="color"
                  defaultValue={config.backgroundColor}
                  className="h-10 w-10 cursor-pointer rounded-md border border-border bg-background p-1"
                />
                <span className="text-sm text-muted-foreground font-mono">{config.backgroundColor}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="textColor" className="text-sm font-medium text-foreground block">Text Color</label>
              <div className="flex items-center gap-3">
                <input
                  id="textColor"
                  name="textColor"
                  type="color"
                  defaultValue={config.textColor}
                  className="h-10 w-10 cursor-pointer rounded-md border border-border bg-background p-1"
                />
                <span className="text-sm text-muted-foreground font-mono">{config.textColor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shapes */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4 border-b border-border pb-2">Shapes & Corners</h2>
          <div className="space-y-2 max-w-xs">
            <label htmlFor="borderRadius" className="text-sm font-medium text-foreground block">Corner Style</label>
            <select
              id="borderRadius"
              name="borderRadius"
              defaultValue={config.borderRadius}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="0px">Sharp (0px)</option>
              <option value="0.25rem">Slightly Rounded</option>
              <option value="0.5rem">Rounded (Default)</option>
              <option value="1rem">Very Rounded</option>
              <option value="9999px">Pill / Circular</option>
            </select>
          </div>
        </div>

        <Button type="submit">Save Design</Button>
      </form>
    </div>
  )
}
