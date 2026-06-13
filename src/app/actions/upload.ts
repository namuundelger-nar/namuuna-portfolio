"use server"

import { writeFile, mkdir } from "fs/promises"
import { join } from "path"

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File
  if (!file) {
    throw new Error("No file uploaded")
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const uploadDir = join(process.cwd(), "public/uploads")
  await mkdir(uploadDir, { recursive: true })

  // Clean filename
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, "-")}`
  const path = join(uploadDir, filename)

  await writeFile(path, buffer)
  
  return { url: `/uploads/${filename}` }
}
