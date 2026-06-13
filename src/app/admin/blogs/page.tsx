import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { deleteBlogPost } from "@/app/actions/blog"

export default async function AdminBlogsPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-foreground">Blog Posts</h1>
        <Link href="/admin/blogs/new">
          <Button>Create Post</Button>
        </Link>
      </div>
      
      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-accent text-muted-foreground border-b border-border">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {posts.map(post => (
              <tr key={post.id} className="hover:bg-accent/50 transition-colors">
                <td className="px-4 py-3 font-medium text-foreground">{post.title}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${post.published ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(post.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <Link href={`/admin/blogs/${post.id}`}>
                    <Button variant="outline" size="sm">Edit</Button>
                  </Link>
                  <form action={deleteBlogPost.bind(null, post.id)} className="inline">
                    <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-500/10 hover:text-red-500">Delete</Button>
                  </form>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No posts found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
