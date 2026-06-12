"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createProject(formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const techStack = formData.get("techStack") as string
  const link = formData.get("link") as string
  const github = formData.get("github") as string

  if (!title || !description || !techStack) throw new Error("Missing required fields")

  await prisma.project.create({
    data: {
      title,
      description,
      techStack,
      link: link || null,
      github: github || null,
    }
  })

  revalidatePath("/")
  revalidatePath("/admin/projects")
  redirect("/admin/projects")
}

export async function deleteProject(id: string) {
  await prisma.project.delete({ where: { id } })
  revalidatePath("/")
  revalidatePath("/admin/projects")
}
