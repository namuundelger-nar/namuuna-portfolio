import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { username } = await request.json()
    
    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 })
    }

    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`)
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch from GitHub" }, { status: 500 })
    }

    const repos = await response.json()
    
    // Clear existing github projects or just add new ones?
    // Let's just add new ones or update existing by github URL
    let count = 0
    for (const repo of repos) {
      if (repo.fork) continue // Skip forks

      const existing = await prisma.project.findFirst({
        where: { github: repo.html_url }
      })

      if (!existing) {
        await prisma.project.create({
          data: {
            title: repo.name.replace(/-/g, ' ').replace(/_/g, ' '),
            description: repo.description || "No description provided.",
            github: repo.html_url,
            link: repo.homepage || null,
            techStack: repo.language || "Multiple",
            featured: repo.stargazers_count > 0,
            order: count
          }
        })
        count++
      }
    }

    return NextResponse.json({ message: `Successfully synced ${count} new repositories.`, count })
  } catch (error) {
    console.error("Sync error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
