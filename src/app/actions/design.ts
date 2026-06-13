"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function updateDesignConfig(formData: FormData) {
  const primaryColor = formData.get("primaryColor") as string
  const backgroundColor = formData.get("backgroundColor") as string
  const textColor = formData.get("textColor") as string
  const borderRadius = formData.get("borderRadius") as string
  let season: string | null = formData.get("season") as string
  if (!season || season === "global") season = null

  let config = await prisma.designConfig.findFirst({
    where: { season }
  })

  if (config) {
    await prisma.designConfig.update({
      where: { id: config.id },
      data: {
        primaryColor,
        backgroundColor,
        textColor,
        borderRadius,
      }
    })
  } else {
    await prisma.designConfig.create({
      data: {
        season,
        primaryColor,
        backgroundColor,
        textColor,
        borderRadius,
      }
    })
  }

  revalidatePath("/")
  revalidatePath("/admin/design")
  redirect(`/admin/design${season ? `?season=${season}` : ""}`)
}
