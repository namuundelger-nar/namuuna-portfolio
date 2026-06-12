import { Button } from "@/components/ui/Button"
import { createProject } from "@/app/actions/project"
import Link from "next/link"

export default function NewProjectPage() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Add New Project</h1>
        <Link href="/admin/projects">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      <form action={createProject} className="space-y-6 rounded-xl border border-border p-6 bg-accent/10">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-foreground">Project Title</label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium text-foreground">Description</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            required
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          ></textarea>
        </div>

        <div className="space-y-2">
          <label htmlFor="techStack" className="text-sm font-medium text-foreground">Tech Stack (comma separated)</label>
          <input
            id="techStack"
            name="techStack"
            type="text"
            placeholder="e.g. React, Next.js, Tailwind CSS"
            required
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="link" className="text-sm font-medium text-foreground">Live URL (optional)</label>
            <input
              id="link"
              name="link"
              type="url"
              placeholder="https://..."
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="github" className="text-sm font-medium text-foreground">GitHub URL (optional)</label>
            <input
              id="github"
              name="github"
              type="url"
              placeholder="https://github.com/..."
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <Button type="submit">Add Project</Button>
      </form>
    </div>
  )
}
