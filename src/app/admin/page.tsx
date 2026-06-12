import { prisma } from "@/lib/prisma"

export default async function AdminDashboard() {
  const profile = await prisma.profile.findFirst()
  const postCount = await prisma.blogPost.count()
  const projectCount = await prisma.project.count()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-foreground">Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-border p-6 shadow-sm bg-accent/10">
          <h3 className="font-semibold text-muted-foreground mb-2">Total Blogs</h3>
          <p className="text-4xl font-bold text-foreground">{postCount}</p>
        </div>
        
        <div className="rounded-xl border border-border p-6 shadow-sm bg-accent/10">
          <h3 className="font-semibold text-muted-foreground mb-2">Total Projects</h3>
          <p className="text-4xl font-bold text-foreground">{projectCount}</p>
        </div>
      </div>
      
      <div className="mt-8 rounded-xl border border-border p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Profile Overview</h2>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p><strong className="text-foreground">Name:</strong> {profile?.name}</p>
          <p><strong className="text-foreground">Title:</strong> {profile?.title}</p>
          <p><strong className="text-foreground">Email:</strong> {profile?.email}</p>
        </div>
      </div>
    </div>
  )
}
