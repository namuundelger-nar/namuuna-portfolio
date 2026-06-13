"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { uploadFile } from "./upload"

export async function createBlogPost(formData: FormData) {
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const content = formData.get("content") as string
  const published = formData.get("published") === "on"
  let coverImage = formData.get("coverImage") as string | null
  const file = formData.get("file") as File | null

  if (file && file.size > 0) {
    const res = await uploadFile(formData)
    coverImage = res.url
  }

  if (!title || !slug || !content) throw new Error("Missing required fields")

  try {
    await prisma.blogPost.create({
      data: {
        title,
        slug,
        content,
        published,
        coverImage,
      }
    })
  } catch (error) {
    throw new Error("Failed to create post. Slug might already exist.")
  }

  revalidatePath("/blog")
  revalidatePath("/admin/blogs")
  redirect("/admin/blogs")
}

export async function updateBlogPost(formData: FormData) {
  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const content = formData.get("content") as string
  const published = formData.get("published") === "on"
  let coverImage = formData.get("coverImage") as string | null
  const file = formData.get("file") as File | null

  if (file && file.size > 0) {
    const res = await uploadFile(formData)
    coverImage = res.url
  }

  if (!id || !title || !slug || !content) throw new Error("Missing required fields")

  await prisma.blogPost.update({
    where: { id },
    data: {
      title,
      slug,
      content,
      published,
      ...(coverImage !== null ? { coverImage } : {})
    }
  })

  revalidatePath("/blog")
  revalidatePath("/admin/blogs")
  redirect("/admin/blogs")
}

export async function deleteBlogPost(id: string) {
  await prisma.blogPost.delete({ where: { id } })
  revalidatePath("/blog")
  revalidatePath("/admin/blogs")
}
