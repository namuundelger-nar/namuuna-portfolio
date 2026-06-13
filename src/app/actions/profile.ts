"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { uploadFile } from "./upload"

export async function updateProfile(formData: FormData) {
  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const title = formData.get("title") as string
  const bio = formData.get("bio") as string
  const location = formData.get("location") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  let imageUrl = formData.get("imageUrl") as string
  const file = formData.get("file") as File | null

  if (file && file.size > 0) {
    const res = await uploadFile(formData)
    imageUrl = res.url
  }

  if (!id || !name || !title) throw new Error("Missing required fields")

  await prisma.profile.update({
    where: { id },
    data: {
      name,
      title,
      bio,
      location,
      email,
      phone,
      imageUrl: imageUrl || null,
    }
  })

  revalidatePath("/")
  revalidatePath("/admin")
  redirect("/admin")
}
