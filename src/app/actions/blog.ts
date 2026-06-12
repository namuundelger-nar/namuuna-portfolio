"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createBlogPost(formData: FormData) {
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const content = formData.get("content") as string
  const published = formData.get("published") === "on"

  if (!title || !slug || !content) throw new Error("Missing required fields")

  try {
    await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        published,
      }
    })
  } catch (error) {
    throw new Error("Failed to create post. Slug might already exist.")
  }

  revalidatePath("/blog")
  revalidatePath("/admin/blogs")
  redirect("/admin/blogs")
}

export async function deleteBlogPost(id: string) {
  await prisma.blogPost.delete({ where: { id } })
  revalidatePath("/blog")
  revalidatePath("/admin/blogs")
}
