import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"
import { isAdmin } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { key, value } = await req.json()
    const trimmed = (value || "").trim()

    if (!trimmed) {
      return NextResponse.json({ error: "Content cannot be empty" }, { status: 400 })
    }

    await prisma.contentBlock.upsert({
      where: { key },
      update: { value: trimmed },
      create: { key, value: trimmed },
    })
    await prisma.contentRevision.create({ data: { blockKey: key, value: trimmed } })

    revalidatePath("/", "layout")
    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal Server Error" },
      { status: 500 }
    )
  }
}
