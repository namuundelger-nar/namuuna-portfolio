import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/Button"
import { updateBlogPost } from "@/app/actions/blog"
import Link from "next/link"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    select: { id: true },
  })
  return posts.map((post) => ({
    id: post.id,
  }))
}

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await prisma.blogPost.findUnique({ where: { id } })

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Edit Blog Post</h1>
        <Link href="/admin/blogs">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      <form action={updateBlogPost} className="space-y-6 rounded-xl border border-border p-6 bg-accent/10">
        <input type="hidden" name="id" value={post.id} />
        
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-foreground">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={post.title}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="slug" className="text-sm font-medium text-foreground">Slug (URL friendly)</label>
          <input
            id="slug"
            name="slug"
            type="text"
            required
            defaultValue={post.slug}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="coverImage" className="text-sm font-medium text-foreground">Cover Image URL</label>
          <input
            id="coverImage"
            name="coverImage"
            type="text"
            defaultValue={post.coverImage || ""}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="file" className="text-sm font-medium text-foreground">Or Upload Cover Photo</label>
          <input
            id="file"
            name="file"
            type="file"
            accept="image/*"
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="content" className="text-sm font-medium text-foreground">Content (HTML or Markdown)</label>
          <textarea
            id="content"
            name="content"
            rows={10}
            required
            defaultValue={post.content}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono"
          ></textarea>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="published"
            name="published"
            defaultChecked={post.published}
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          <label htmlFor="published" className="text-sm font-medium text-foreground">
            Publish immediately
          </label>
        </div>

        <Button type="submit">Update Post</Button>
      </form>
    </div>
  )
}
