import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { deleteProject } from "@/app/actions/project"

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">Projects</h1>
        <Link href="/admin/projects/new">
          <Button>Add Project</Button>
        </Link>
      </div>
      
      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-accent text-muted-foreground border-b border-border">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Tech Stack</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {projects.map(project => (
              <tr key={project.id} className="hover:bg-accent/50 transition-colors">
                <td className="px-4 py-3 font-medium text-foreground">{project.title}</td>
                <td className="px-4 py-3 text-muted-foreground line-clamp-1">{project.techStack}</td>
                <td className="px-4 py-3 text-right space-x-2">
                  <form action={deleteProject.bind(null, project.id)} className="inline">
                    <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-500/10 hover:text-red-500">Delete</Button>
                  </form>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">No projects found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
