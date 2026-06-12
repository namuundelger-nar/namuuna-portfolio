"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { isAdmin } from "@/lib/auth"

export async function updateContentBlock(key: string, value: string) {
  if (!(await isAdmin())) {
    return { ok: false, error: "Unauthorized" }
  }
  const trimmed = value.trim()
  if (!trimmed) {
    return { ok: false, error: "Content cannot be empty" }
  }

  await prisma.contentBlock.upsert({
    where: { key },
    update: { value: trimmed },
    create: { key, value: trimmed },
  })
  await prisma.contentRevision.create({ data: { blockKey: key, value: trimmed } })

  revalidatePath("/", "layout")
  return { ok: true }
}
