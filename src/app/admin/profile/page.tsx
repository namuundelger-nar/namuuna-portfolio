import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/Button"
import { updateProfile } from "@/app/actions/profile"
import Image from "next/image"

export default async function AdminProfilePage() {
  const profile = await prisma.profile.findFirst()

  if (!profile) return <div>No profile found.</div>

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Edit Profile</h1>

      <form action={updateProfile} className="space-y-6 rounded-xl border border-border p-6 bg-accent/10">
        <input type="hidden" name="id" value={profile.id} />
        
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-32 h-32 relative rounded-xl overflow-hidden border border-border shrink-0 bg-background">
            <Image 
              src={profile.imageUrl || "/profile-placeholder.png"} 
              alt="Profile" 
              fill 
              className="object-cover"
            />
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <label htmlFor="imageUrl" className="text-sm font-medium text-foreground">Profile Image URL</label>
              <input
                id="imageUrl"
                name="imageUrl"
                type="text"
                defaultValue={profile.imageUrl || ""}
                placeholder="/profile-placeholder.png or https://..."
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <p className="text-xs text-muted-foreground">Path to an image in the public folder (e.g. `/my-photo.jpg`) or an external URL.</p>
            </div>
            <div className="space-y-2 mt-4">
              <label htmlFor="file" className="text-sm font-medium text-foreground">Or Upload New Photo</label>
              <input
                id="file"
                name="file"
                type="file"
                accept="image/*"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</label>
            <input id="name" name="name" type="text" defaultValue={profile.name} required className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-foreground">Professional Title</label>
            <input id="title" name="title" type="text" defaultValue={profile.title} required className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
            <input id="email" name="email" type="email" defaultValue={profile.email || ""} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone</label>
            <input id="phone" name="phone" type="text" defaultValue={profile.phone || ""} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="location" className="text-sm font-medium text-foreground">Location</label>
            <input id="location" name="location" type="text" defaultValue={profile.location || ""} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="bio" className="text-sm font-medium text-foreground">Bio / Summary</label>
            <textarea id="bio" name="bio" rows={4} defaultValue={profile.bio} className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"></textarea>
          </div>
        </div>

        <Button type="submit">Save Changes</Button>
      </form>
    </div>
  )
}
