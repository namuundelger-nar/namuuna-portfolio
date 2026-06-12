import Link from "next/link"
import { logout } from "@/app/actions/auth"
import { Button } from "@/components/ui/Button"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-background px-4 sm:px-6">
        <Link href="/admin" className="font-bold text-lg text-foreground">
          CMS Admin
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" target="_blank" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            View Site
          </Link>
          <form action={logout}>
            <Button variant="outline" size="sm">Logout</Button>
          </form>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 border-r border-border bg-background p-4 hidden md:block">
          <nav className="flex flex-col gap-2">
            <Link href="/admin" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">Dashboard</Link>
            <Link href="/admin/profile" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">Profile</Link>
            <Link href="/admin/design" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">Design</Link>
            <Link href="/admin/blogs" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">Blog Posts</Link>
            <Link href="/admin/projects" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">Projects</Link>
            <div className="my-2 border-t border-border"></div>
            <Link href="/admin/sync" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">sync</span> Data Sync</Link>
            <Link href="/admin/job-bot" className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">smart_toy</span> Job Bot Analytics</Link>
          </nav>
        </aside>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
