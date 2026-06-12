"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function updateProfile(formData: FormData) {
  const id = formData.get("id") as string
  const name = formData.get("name") as string
  const title = formData.get("title") as string
  const bio = formData.get("bio") as string
  const location = formData.get("location") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const imageUrl = formData.get("imageUrl") as string

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
