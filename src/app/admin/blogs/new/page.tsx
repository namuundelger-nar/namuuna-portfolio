import { Button } from "@/components/ui/Button"
import { createBlogPost } from "@/app/actions/blog"
import Link from "next/link"

export default function NewBlogPage() {
  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-foreground">Create New Blog Post</h1>
        <Link href="/admin/blogs">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      <form action={createBlogPost} className="space-y-6 rounded-xl border border-border p-6 bg-accent/10">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-foreground">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            required
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
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary font-mono"
          ></textarea>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="published"
            name="published"
            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
          />
          <label htmlFor="published" className="text-sm font-medium text-foreground">
            Publish immediately
          </label>
        </div>

        <Button type="submit">Create Post</Button>
      </form>
    </div>
  )
}
