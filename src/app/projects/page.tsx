import { prisma } from "@/lib/prisma"
import ProjectsClient from "./ProjectsClient"

export default async function ProjectsPage() {
  const dbProjects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  })

  // Mock data representing the perfect "Project Archive" layout
  const mockProjects = [
    {
      id: "1",
      title: "Cloud Gallery",
      description: "An experimental visual repository translating weather patterns into generative art. Using real-time barometric data to shape digital sculptures that mirror the fluidity of the stratosphere.",
      imageUrl: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?auto=format&fit=crop&q=80&w=1200",
      tags: ["UI/UX Design"],
      icon: "cloud",
      featured: true,
      link: "#"
    },
    {
      id: "2",
      title: "Financial Ecosystem Analysis",
      description: "Mapping market volatility through the metaphor of forest decay and rebirth. A comprehensive study on resilient economic structures.",
      imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
      tags: ["Financial Analysis"],
      icon: "forest",
      featured: false,
      link: "#"
    },
    {
      id: "3",
      title: "Neural Horizon",
      description: "Exploring the boundary where deep learning models begin to exhibit 'hallucinatory' creative behaviors, visualized through frost patterns.",
      imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800",
      tags: ["AI Engineer", "Data Analysis"],
      icon: "ac_unit",
      featured: false,
      link: "#"
    }
  ]

  // Use DB data if we have at least 3 projects, else use mock to show off the layout perfectly
  const projects = dbProjects.length >= 3 ? dbProjects.map((p, i) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    imageUrl: mockProjects[i % 3].imageUrl, // using placeholder images since DB images might not exist
    tags: p.techStack.split(',').map(t => t.trim()),
    icon: mockProjects[i % 3].icon,
    featured: p.featured,
    link: p.link || "#"
  })) : mockProjects;

  return <ProjectsClient projects={projects} />
}
